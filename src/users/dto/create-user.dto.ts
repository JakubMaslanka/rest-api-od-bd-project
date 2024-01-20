import { IsEmail, IsEnum, IsString, IsOptional, MinLength, Matches } from "class-validator";
import { UserRole } from "../entities/user.entity";

export class CreateUserDto {
	@MinLength(3)
	@IsString()
	firstName: string;

	@MinLength(3)
	@IsString()
	lastName: string;

	@IsEmail()
	email: string;

	@IsEnum(UserRole)
	role: UserRole = UserRole.Consultant;

	@IsString()
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
