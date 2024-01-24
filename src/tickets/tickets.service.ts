import { v4 as uuid } from "uuid";
import { ForbiddenException, Injectable, Logger } from "@nestjs/common";
import { UsersService } from "@/users/users.service";
import { TicketsRepository } from "./tickets.repository";
import { CreateTicketDto } from "./dto/create-ticket.dto";
import { UpdateTicketDto } from "./dto/update-ticket.dto";
import { Ticket } from "./entities/ticket.entity";

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
			messages: []
		});

		return this.ticketsRepository.create(ticket);
	}

	findAll() {
		return this.ticketsRepository.find({});
	}

	async findOne(id: string) {
		const ticket = await this.ticketsRepository.findTicketWithDetails(id);
		return ticket;
	}

	update(id: string, updateTicketDto: UpdateTicketDto) {
		return this.ticketsRepository.findAndUpdate({ id }, updateTicketDto);
	}

	remove(id: string) {
		return this.ticketsRepository.findOneAndDelete({ id });
	}
}
