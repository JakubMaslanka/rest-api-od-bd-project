import { Request } from "express";
import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	Req,
	UseGuards,
	HttpStatus
} from "@nestjs/common";
import { AccessTokenGuard } from "@/common";
import { TicketsService } from "./tickets.service";
import { CreateTicketDto } from "./dto/create-ticket.dto";
import { UpdateTicketDto } from "./dto/update-ticket.dto";

@Controller("tickets")
export class TicketsController {
	constructor(private readonly ticketsService: TicketsService) {}

	@Post()
	@UseGuards(AccessTokenGuard)
	create(@Req() req: Request, @Body() createTicketDto: CreateTicketDto) {
		const userId: string = req.user["sub"];
		return this.ticketsService.create(createTicketDto, userId);
	}

	@Get()
	findAll() {
		return this.ticketsService.findAll();
	}

	@Get(":id")
	findOne(@Param("id") id: string) {
		return this.ticketsService.findOne(id);
	}

	@Patch(":id")
	update(@Param("id") id: string, @Body() updateTicketDto: UpdateTicketDto) {
		return this.ticketsService.update(id, updateTicketDto);
	}

	@Delete(":id")
	async remove(@Param("id") id: string) {
		await this.ticketsService.remove(id);
		return HttpStatus.OK;
	}
}
