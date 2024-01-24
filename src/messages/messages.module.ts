import { Module } from "@nestjs/common";
import { DatabaseModule, LoggerModule } from "@/common";
import { UsersModule } from "@/users/users.module";
import { TicketsModule } from "@/tickets/tickets.module";
import { MessagesService } from "./messages.service";
import { MessagesController } from "./messages.controller";
import { MessagesRepository } from "./messages.repository";
import { Message } from "./entities/message.entity";

@Module({
	imports: [DatabaseModule.forFeature([Message]), LoggerModule, UsersModule, TicketsModule],
	controllers: [MessagesController],
	providers: [MessagesService, MessagesRepository]
})
export class MessagesModule {}
