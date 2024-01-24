import { EntityManager, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Injectable, Logger } from "@nestjs/common";
import { AbstractRepository } from "@/common";
import { Message } from "./entities/message.entity";

@Injectable()
export class MessagesRepository extends AbstractRepository<Message> {
	protected readonly logger = new Logger(MessagesRepository.name);

	constructor(
		@InjectRepository(Message)
		messagesRepository: Repository<Message>,
		entityManager: EntityManager
	) {
		super(messagesRepository, entityManager);
	}
}
