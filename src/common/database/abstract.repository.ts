import { Logger, NotFoundException } from "@nestjs/common";
import { AbstractEntity } from "./abstract.entity";
import { EntityManager, FindOptionsWhere, Repository } from "typeorm";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";

export abstract class AbstractRepository<T extends AbstractEntity<T>> {
	protected abstract readonly logger: Logger;

	constructor(
		private readonly entityRepository: Repository<T>,
		private readonly entityManager: EntityManager
	) {}

	protected get repository(): Repository<T> {
		return this.entityRepository;
	}

	async create(entity: T): Promise<T> {
		return this.entityManager.save(entity);
	}

	async findOne(where: FindOptionsWhere<T>): Promise<T> {
		const entity = await this.entityRepository.findOneBy(where);

		if (!entity) {
			this.logger.warn(`Entity not found with where ${JSON.stringify(where)}`);
			throw new NotFoundException("Entity was not found.");
		}

		return entity;
	}

	async findAndUpdate(
		where: FindOptionsWhere<T>,
		partialEntity: QueryDeepPartialEntity<T>
	): Promise<T> {
		const updateResult = await this.entityRepository.update(where, partialEntity);

		if (!updateResult.affected) {
			this.logger.warn(`Entity not found with where ${JSON.stringify(where)}`);
			throw new NotFoundException("Entity was not found.");
		}

		return this.findOne(where);
	}

	async find(where: FindOptionsWhere<T>): Promise<T[]> {
		return this.entityRepository.findBy(where);
	}

	async findOneAndDelete(where: FindOptionsWhere<T>) {
		await this.entityRepository.delete(where);
	}
}
