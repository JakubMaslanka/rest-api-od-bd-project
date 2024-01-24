import {
	Entity,
	Column,
	ManyToOne,
	CreateDateColumn,
	PrimaryGeneratedColumn,
	Index
} from "typeorm";
import { AbstractEntity } from "@/common";
import { Ticket } from "@/tickets/entities/ticket.entity";
import { User } from "@/users/entities/user.entity";

@Entity()
export class Message extends AbstractEntity<Message> {
	@Index({ unique: true })
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@ManyToOne(() => Ticket, (ticket) => ticket.messages)
	ticket: Ticket;

	@ManyToOne(() => User, (user) => user.messages)
	user: User;

	@Column("text")
	message: string;

	@CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
	createdAt?: Date;
}
