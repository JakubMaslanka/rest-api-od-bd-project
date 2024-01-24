import { Exclude } from "class-transformer";
import { UserRole } from "../entities/user.entity";
import { Ticket } from "@/tickets/entities/ticket.entity";

export class UserDto {
	id: string;
	firstName: string;
	lastName: string;
	email: string;
	role: UserRole;

	@Exclude()
	password: string;

	@Exclude()
	refreshToken: string;

	createdTickets: Ticket[];
	assignedTickets: Ticket[];

	constructor(partial: Partial<UserDto>) {
		Object.assign(this, partial);
	}
}
