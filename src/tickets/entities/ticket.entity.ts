import {
	Entity,
	Column,
	CreateDateColumn,
	UpdateDateColumn,
	PrimaryGeneratedColumn
	// ManyToOne,
	// OneToMany,
} from "typeorm";
// import { User } from "src/users/entities/user.entity";
// import { Message } from "src/messages/entities/message.entity";

export enum TicketStatus {
	Open = "open",
	InProgress = "in_progress",
	WaitingForCustomer = "waiting_for_customer",
	Closed = "closed"
}

@Entity()
export class Ticket {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Column()
	title: string;

	@Column("text")
	description: string;

	// @ManyToOne(() => User, (user) => user.tickets)
	// user: User;

	@Column({
		type: "enum",
		enum: TicketStatus,
		default: TicketStatus.Open
	})
	status: TicketStatus;

	// @OneToMany(() => Message, (message) => message.ticket)
	// messages: Message[];

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;
}
