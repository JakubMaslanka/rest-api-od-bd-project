import { Injectable, Logger } from "@nestjs/common";
import { AbstractRepository } from "@/common";
import { User } from "./entities/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { EntityManager, Repository } from "typeorm";

@Injectable()
export class UsersRepository extends AbstractRepository<User> {
	protected readonly logger = new Logger(UsersRepository.name);

	constructor(
		@InjectRepository(User)
		usersRepository: Repository<User>,
		entityManager: EntityManager
	) {
		super(usersRepository, entityManager);
	}
}
