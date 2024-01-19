import { Module } from "@nestjs/common";
import { DatabaseModule, LoggerModule } from "@/common";
import { TicketsService } from "./tickets.service";
import { TicketsController } from "./tickets.controller";
import { TicketsRepository } from "./tickets.repository";
import { Ticket } from "./entities/ticket.entity";

@Module({
	imports: [DatabaseModule.forFeature([Ticket]), LoggerModule],
	controllers: [TicketsController],
	providers: [TicketsService, TicketsRepository]
})
export class TicketsModule {}
