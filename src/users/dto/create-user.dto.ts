import {
	IsEmail,
	IsEnum,
	IsNotEmpty,
	IsString,
	IsOptional,
	MinLength,
	Matches
} from "class-validator";
import { UserRole } from "../entities/user.entity";

export class CreateUserDto {
	@MinLength(3)
	@IsString()
	@IsNotEmpty()
	firstName: string;

	@MinLength(3)
	@IsString()
	@IsNotEmpty()
	lastName: string;

	@IsEmail()
	@IsNotEmpty()
	email: string;

	@IsEnum(UserRole)
	@IsOptional()
	role: UserRole = UserRole.User;

	@IsString()
	@IsNotEmpty()
	@MinLength(8, { message: "Password must be at least 8 characters long." })
	@Matches(/(?=.*[a-z])/, { message: "Password must contain at least one lowercase letter." })
	@Matches(/(?=.*[A-Z])/, { message: "Password must contain at least one uppercase letter." })
	@Matches(/(?=.*\d)/, { message: "Password must contain at least one number." })
	@Matches(/(?=.*[\W])/, { message: "Password must contain at least one special character." })
	password: string;

	@IsString()
	@IsOptional()
	refreshToken: string;
}
