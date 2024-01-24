import { v4 as uuid } from "uuid";
import { ForbiddenException, Injectable, Logger } from "@nestjs/common";
import { UsersService } from "@/users/users.service";
import { TicketsService } from "@/tickets/tickets.service";
import { MessagesRepository } from "./messages.repository";
import { CreateMessageDto } from "./dto/create-message.dto";
import { UpdateMessageDto } from "./dto/update-message.dto";
import { Message } from "./entities/message.entity";

@Injectable()
export class MessagesService {
	protected readonly logger = new Logger(MessagesService.name);

	constructor(
		private readonly messagesRepository: MessagesRepository,
		private readonly usersService: UsersService,
		private readonly ticketsService: TicketsService
	) {}

	async create(createMessageDto: CreateMessageDto, userId: string) {
		const user = await this.usersService.findOne(userId);
		if (!user) {
			throw new ForbiddenException("User not found");
		}

		const message = new Message({ ...createMessageDto, id: uuid(), user: user });
		return this.messagesRepository.create(message);
	}

	findAll() {
		return this.messagesRepository.find({});
	}

	async findOne(id: string) {
		const message = await this.messagesRepository.findOne({ id });
		return message;
	}

	update(id: string, updateMessageDto: UpdateMessageDto) {
		return this.messagesRepository.findAndUpdate({ id }, updateMessageDto);
	}

	remove(id: string) {
		return this.messagesRepository.findOneAndDelete({ id });
	}
}
