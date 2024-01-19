import { Entity, Column, /* ManyToOne, */ CreateDateColumn, PrimaryGeneratedColumn } from "typeorm";
// import { User } from "src/users/entities/user.entity";
// import { Ticket } from "src/tickets/entities/ticket.entity";

@Entity()
export class Message {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	// @ManyToOne(() => Ticket, (ticket) => ticket.messages)
	// ticket: Ticket;

	// @ManyToOne(() => User, (user) => user.messages)
	// user: User;

	@Column("text")
	message: string;

	@CreateDateColumn()
	createdAt: Date;
}
