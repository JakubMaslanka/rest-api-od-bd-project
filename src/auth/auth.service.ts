import * as bcrypt from "bcrypt";
import { BadRequestException, ForbiddenException, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { CreateUserDto } from "@/users/dto/create-user.dto";
import { UsersService } from "@/users/users.service";
import { AuthDto, JwtPayload } from "./dto/auth.dto";

@Injectable()
export class AuthService {
	constructor(
		private readonly usersService: UsersService,
		private readonly jwtService: JwtService,
		private readonly configService: ConfigService
	) {}

	public async signUp(createUserDto: CreateUserDto): Promise<ReturnType<typeof this.getTokens>> {
		// Check if user exists
		const userExists = await this.usersService.findOneByEmail(createUserDto.email);
		if (userExists) {
			throw new BadRequestException("User already exists");
		}

		// Hash password
		const hash = await this.hashData(createUserDto.password);
		const newUser = await this.usersService.create({
			...createUserDto,
			password: hash
		});

		const tokens = await this.getTokens({
			sub: newUser.id,
			email: newUser.email,
			role: newUser.role
		});
		await this.updateRefreshToken(newUser.id, tokens.refreshToken);

		return tokens;
	}

	public async signIn(data: AuthDto): Promise<ReturnType<typeof this.getTokens>> {
		// Check if user exists
		const user = await this.usersService.findOneByEmail(data.email);
		if (!user) throw new BadRequestException("User does not exist");

		const passwordMatches = await bcrypt.compare(user.password, data.password);
		if (!passwordMatches) throw new BadRequestException("Password is incorrect");

		const tokens = await this.getTokens({ sub: user.id, email: user.email, role: user.role });
		await this.updateRefreshToken(user.id, tokens.refreshToken);

		return tokens;
	}

	public async refreshTokens(
		email: string,
		refreshToken: string
	): Promise<ReturnType<typeof this.getTokens>> {
		const user = await this.usersService.findOneByEmail(email);
		if (!user || !user.refreshToken) throw new ForbiddenException("Access Denied");

		const refreshTokenMatches = await bcrypt.compare(user.refreshToken, refreshToken);
		if (!refreshTokenMatches) throw new ForbiddenException("Access Denied");

		const tokens = await this.getTokens({ sub: user.id, email: user.email, role: user.role });
		await this.updateRefreshToken(user.id, tokens.refreshToken);

		return tokens;
	}

	public async logout(userId: string) {
		return this.usersService.update(userId, { refreshToken: null });
	}

	private async hashData(data: string) {
		const salt = await bcrypt.genSalt(12);
		const hashedData = await bcrypt.hash(data, salt);

		return hashedData;
	}

	private async updateRefreshToken(userId: string, refreshToken: string) {
		const hashedRefreshToken = await this.hashData(refreshToken);

		await this.usersService.update(userId, {
			refreshToken: hashedRefreshToken
		});
	}

	private async getTokens(payload: JwtPayload) {
		const [accessToken, refreshToken] = await Promise.all([
			this.jwtService.signAsync(payload, {
				secret: this.configService.getOrThrow<string>("JWT_ACCESS_SECRET"),
				expiresIn: this.configService.getOrThrow<string>("JWT_ACCESS_EXPIRES_IN")
			}),
			this.jwtService.signAsync(payload, {
				secret: this.configService.getOrThrow<string>("JWT_REFRESH_SECRET"),
				expiresIn: this.configService.getOrThrow<string>("JWT_REFRESH_EXPIRES_IN")
			})
		]);

		return {
			accessToken,
			refreshToken
		};
	}
}
