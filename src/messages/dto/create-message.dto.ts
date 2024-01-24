import { IsString, MaxLength, MinLength } from "class-validator";
import { Ticket } from "@/tickets/entities/ticket.entity";

export class CreateMessageDto {
	@MinLength(1)
	@MaxLength(255)
	@IsString()
	message: string;

	@IsString()
	ticketId: Ticket["id"];
}
