import { uuid } from "uuidv4";
import { Injectable, Logger } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UsersRepository } from "./users.repository";
import { UserRole } from "./entities/user.entity";

@Injectable()
export class UsersService {
	protected readonly logger = new Logger(UsersService.name);

	constructor(private readonly usersRepository: UsersRepository) {}

	create(createUserDto: CreateUserDto) {
		return this.usersRepository.create({
			...createUserDto,
			id: uuid(),
			role: UserRole.User
		});
	}

	findAll() {
		return this.usersRepository.find({});
	}

	findOne(id: string) {
		return this.usersRepository.findOne({ id });
	}

	findOneByEmail(email: string) {
		return this.usersRepository.findOne({ email });
	}

	update(id: string, updateUserDto: UpdateUserDto) {
		return this.usersRepository.findAndUpdate({ id }, updateUserDto);
	}

	remove(id: string) {
		return this.usersRepository.findOneAndDelete({ id });
	}
}
