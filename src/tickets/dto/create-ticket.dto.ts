import {
	IsEnum,
	IsInstance,
	IsOptional,
	IsString,
	IsUUID,
	MaxLength,
	MinLength
} from "class-validator";
import { TicketStatus } from "../entities/ticket.entity";
import { Message } from "@/messages/entities/message.entity";

export class CreateTicketDto {
	@MinLength(5)
	@MaxLength(30)
	@IsString()
	title: string;

	@IsString()
	description: string;

	@IsEnum(TicketStatus)
	status: TicketStatus = TicketStatus.Open;

	@IsOptional()
	@IsString()
	@IsUUID()
	assignId?: string = null;

	@IsOptional()
	@IsInstance(Message)
	messages: Message[] = [];
}
