import { IsEmail, IsString } from "class-validator";
import { UserRole } from "@/users/entities/user.entity";

export type JwtPayload = {
	sub: string;
	email: string;
	role: UserRole;
};

export class AuthDto {
	@IsEmail()
	@IsString()
	email: string;

	@IsString()
	password: string;
}
