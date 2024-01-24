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
import { Roles, RolesGuard } from "@/common";
import { UserRole } from "@/users/entities/user.entity";
import { TicketsService } from "./tickets.service";
import { CreateTicketDto } from "./dto/create-ticket.dto";
import { UpdateTicketDto } from "./dto/update-ticket.dto";
import { CreateMessageDto } from "./dto/create-message.dto";

@Controller("tickets")
@UseGuards(RolesGuard)
export class TicketsController {
	constructor(private readonly ticketsService: TicketsService) {}

	@Get()
	@Roles(UserRole.Admin, UserRole.Consultant)
	findAll() {
		return this.ticketsService.findAll();
	}

	@Get(":id")
	@Roles(UserRole.Admin, UserRole.Consultant, UserRole.User)
	findOne(@Param("id") id: string) {
		return this.ticketsService.findOne(id);
	}

	@Post()
	@Roles(UserRole.Admin, UserRole.Consultant, UserRole.User)
	create(@Req() req: Request, @Body() createTicketDto: CreateTicketDto) {
		const userId: string = req.user["sub"];
		return this.ticketsService.create(createTicketDto, userId);
	}

	@Post(":ticket_id/add_message")
	@Roles(UserRole.Admin, UserRole.Consultant, UserRole.User)
	async createTicketMessage(
		@Req() req: Request,
		@Param("ticket_id") id: string,
		@Body() createMessageDto: CreateMessageDto
	) {
		const userId: string = req.user["sub"];
		return this.ticketsService.createMessage(id, userId, createMessageDto);
	}

	@Patch(":id")
	@Roles(UserRole.Admin, UserRole.Consultant)
	update(@Param("id") id: string, @Body() updateTicketDto: UpdateTicketDto) {
		return this.ticketsService.update(id, updateTicketDto);
	}

	@Patch(":id/status_change")
	@Roles(UserRole.Admin, UserRole.Consultant)
	updateTicketStatus(@Param("id") id: string, @Body() { status }: UpdateTicketDto) {
		return this.ticketsService.update(id, { status });
	}

	@Patch(":id/assignee_change")
	@Roles(UserRole.Admin, UserRole.Consultant)
	updateTicketAssignUser(@Param("id") id: string, @Body() { assignId }: UpdateTicketDto) {
		return this.ticketsService.update(id, { assignId });
	}

	@Delete(":id")
	@Roles(UserRole.Admin)
	async remove(@Param("id") id: string) {
		await this.ticketsService.remove(id);
		return HttpStatus.OK;
	}

	@Delete(":ticket_id/remove_message/:message_id")
	@Roles(UserRole.Admin)
	async removeTicketMessage(
		@Param("ticket_id") ticketId: string,
		@Param("message_id") messageId: string
	) {
		return this.ticketsService.removeMessage(ticketId, messageId);
	}
}
