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
		ticketsRepository: Repository<Ticket>,
		entityManager: EntityManager
	) {
		super(ticketsRepository, entityManager);
	}

	async findTicketsWithUsers(): Promise<Ticket[]> {
		return this.repository
			.createQueryBuilder("ticket")
			.leftJoinAndSelect("ticket.creatorId", "creatorId")
			.leftJoinAndSelect("ticket.assignId", "assignId")
			.select([
				"ticket.id",
				"ticket.title",
				"ticket.description",
				"ticket.messages",
				"ticket.status",
				"ticket.createdAt",
				"ticket.updatedAt",
				"creatorId.id",
				"creatorId.email",
				"creatorId.firstName",
				"creatorId.lastName",
				"assignId.id",
				"assignId.email",
				"assignId.firstName",
				"assignId.lastName"
			])
			.getMany();
	}
}
