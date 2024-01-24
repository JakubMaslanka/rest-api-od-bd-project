import { plainToInstance } from "class-transformer";
import { EntityManager, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Injectable, Logger } from "@nestjs/common";
import { AbstractRepository } from "@/common";
import { UserDto } from "./dto/user.dto";
import { User } from "./entities/user.entity";

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

	async findUsersWithTickets(): Promise<User[]> {
		const users = await this.repository.find({
			relations: ["createdTickets", "assignedTickets"]
		});

		return users.map((user) => plainToInstance(UserDto, user));
	}
}
