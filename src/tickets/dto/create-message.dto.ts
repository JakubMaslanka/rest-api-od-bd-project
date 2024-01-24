import { IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export class CreateMessageDto {
	@MinLength(1)
	@MaxLength(255)
	@IsString()
	content: string;

	@IsString()
	@IsOptional()
	senderUserId: string;
}
