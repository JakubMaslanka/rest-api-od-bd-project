import { Injectable, Logger } from "@nestjs/common";
import { AbstractRepository } from "src/common/database/abstract.repository";
import { Ticket } from "./entities/ticket.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { EntityManager, Repository } from "typeorm";

@Injectable()
export class TicketsRepository extends AbstractRepository<Ticket> {
	protected readonly logger = new Logger(TicketsRepository.name);

	constructor(
		@InjectRepository(Ticket)
		ticketsRepository: Repository<Ticket>,
		entityManager: EntityManager
	) {
		super(ticketsRepository, entityManager);
	}
}
