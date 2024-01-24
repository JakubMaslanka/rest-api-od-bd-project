import { Request } from "express";
import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from "@nestjs/common";
import { MessagesService } from "./messages.service";
import { CreateMessageDto } from "./dto/create-message.dto";
import { UpdateMessageDto } from "./dto/update-message.dto";
import { AccessTokenGuard } from "@/common";

@Controller("messages")
export class MessagesController {
	constructor(private readonly messagesService: MessagesService) {}

	@Post()
	@UseGuards(AccessTokenGuard)
	create(@Req() req: Request, @Body() createMessageDto: CreateMessageDto) {
		const userId: string = req.user["sub"];
		return this.messagesService.create(createMessageDto, userId);
	}

	@Get()
	findAll() {
		return this.messagesService.findAll();
	}

	@Get(":id")
	findOne(@Param("id") id: string) {
		return this.messagesService.findOne(id);
	}

	@Patch(":id")
	update(@Param("id") id: string, @Body() updateMessageDto: UpdateMessageDto) {
		return this.messagesService.update(id, updateMessageDto);
	}

	@Delete(":id")
	remove(@Param("id") id: string) {
		return this.messagesService.remove(id);
	}
}
