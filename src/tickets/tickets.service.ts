import { v4 as uuid } from "uuid";
import { ForbiddenException, Injectable, Logger } from "@nestjs/common";
import { UsersService } from "@/users/users.service";
import { TicketsRepository } from "./tickets.repository";
import { CreateMessageDto } from "./dto/create-message.dto";
import { CreateTicketDto } from "./dto/create-ticket.dto";
import { UpdateTicketDto } from "./dto/update-ticket.dto";
import { Message, Ticket } from "./entities/ticket.entity";

@Injectable()
export class TicketsService {
	protected readonly logger = new Logger(TicketsService.name);

	constructor(
		private readonly ticketsRepository: TicketsRepository,
		private readonly usersService: UsersService
	) {}

	async create(createTicketDto: CreateTicketDto, userId: string) {
		const user = await this.usersService.findOne(userId);
		if (!user) {
			throw new ForbiddenException("User not found");
		}
		const ticket = new Ticket({
			...createTicketDto,
			id: uuid(),
			creatorId: user.id,
			assignId: null,
			messages: null
		});

		return this.ticketsRepository.create(ticket);
	}

	async createMessage(ticketId: Ticket["id"], userId: string, createMessageDto: CreateMessageDto) {
		const { messages } = await this.findOne(ticketId);
		const newMessage: Message = {
			...createMessageDto,
			id: uuid(),
			isDeleted: false,
			senderUserId: userId,
			createdAt: new Date()
		};
		const newMessages = [...(messages ?? []), newMessage];
		return this.update(ticketId, { messages: newMessages } as UpdateTicketDto);
	}

	async removeMessage(ticketId: Ticket["id"], messageId: Message["id"]) {
		const { messages } = await this.findOne(ticketId);
		const filtredMessages = messages.filter((message) => message.id !== messageId);
		return this.update(ticketId, { messages: filtredMessages } as UpdateTicketDto);
	}

	findAll() {
		return this.ticketsRepository.findTicketsWithUsers();
	}

	async findOne(id: string) {
		return this.ticketsRepository.findOne({ id });
	}

	update(id: string, updateTicketDto: UpdateTicketDto) {
		return this.ticketsRepository.findAndUpdate({ id }, updateTicketDto);
	}

	remove(id: string) {
		return this.ticketsRepository.findOneAndDelete({ id });
	}
}
