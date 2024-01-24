import { EntityManager, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Injectable, Logger } from "@nestjs/common";
import { AbstractRepository } from "@/common";
import { Ticket } from "./entities/ticket.entity";

@Injectable()
export class TicketsRepository extends AbstractRepository<Ticket> {
	protected readonly logger = new Logger(TicketsRepository.name);

	constructor(
		@InjectRepository(Ticket)
		readonly ticketsRepository: Repository<Ticket>,
		entityManager: EntityManager
	) {
		super(ticketsRepository, entityManager);
	}

	async findTicketWithDetails(ticketId: string): Promise<Ticket | undefined> {
		return this.ticketsRepository
			.createQueryBuilder("ticket")
			.leftJoinAndSelect("ticket.messages", "message")
			.where("ticket.id = :ticketId", { ticketId })
			.getOne();
	}
}
