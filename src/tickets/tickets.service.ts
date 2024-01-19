import { Injectable, Logger } from "@nestjs/common";
import { CreateTicketDto } from "./dto/create-ticket.dto";
import { UpdateTicketDto } from "./dto/update-ticket.dto";
import { TicketsRepository } from "./tickets.repository";

@Injectable()
export class TicketsService {
	protected readonly logger = new Logger(TicketsService.name);

	constructor(private readonly ticketsRepository: TicketsRepository) {}

	create(createTicketDto: CreateTicketDto) {
		return "This action adds a new ticket";
	}

	findAll() {
		return this.ticketsRepository.find({});
	}

	findOne(id: number) {
		return `This action returns a #${id} ticket`;
	}

	update(id: number, updateTicketDto: UpdateTicketDto) {
		return `This action updates a #${id} ticket`;
	}

	remove(id: number) {
		return `This action removes a #${id} ticket`;
	}
}
