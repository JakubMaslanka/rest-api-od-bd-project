import { v4 as uuid } from "uuid";
import { Injectable, Logger } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UsersRepository } from "./users.repository";
import { User, UserRole } from "./entities/user.entity";

@Injectable()
export class UsersService {
	protected readonly logger = new Logger(UsersService.name);

	constructor(private readonly usersRepository: UsersRepository) {}

	create(createUserDto: CreateUserDto) {
		const user = new User({
			...createUserDto,
			id: uuid(),
			role: UserRole.User,
			refreshToken: ""
		});
		return this.usersRepository.create(user);
	}

	findAll() {
		return this.usersRepository.find({});
	}

	async findOne(id: string) {
		const user = await this.usersRepository.findOne({ id });
		return user;
	}

	async findOneByEmail(email: string) {
		try {
			const users = await this.usersRepository.find({ email });
			return users[0];
		} catch (error) {
			return null;
		}
	}

	update(id: string, updateUserDto: UpdateUserDto) {
		return this.usersRepository.findAndUpdate({ id }, updateUserDto);
	}

	remove(id: string) {
		return this.usersRepository.findOneAndDelete({ id });
	}
}
