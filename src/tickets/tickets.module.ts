import { Module } from "@nestjs/common";
import { DatabaseModule, LoggerModule } from "@/common";
import { UsersModule } from "@/users/users.module";
import { TicketsService } from "./tickets.service";
import { TicketsController } from "./tickets.controller";
import { TicketsRepository } from "./tickets.repository";
import { Ticket } from "./entities/ticket.entity";

@Module({
	imports: [DatabaseModule.forFeature([Ticket]), LoggerModule, UsersModule],
	controllers: [TicketsController],
	providers: [TicketsService, TicketsRepository],
	exports: [TicketsService]
})
export class TicketsModule {}
