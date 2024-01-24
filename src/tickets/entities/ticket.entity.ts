import {
	Entity,
	Column,
	CreateDateColumn,
	UpdateDateColumn,
	PrimaryGeneratedColumn,
	OneToMany,
	Index,
	JoinTable
} from "typeorm";
import { AbstractEntity } from "@/common";
import { Message } from "@/messages/entities/message.entity";

export enum TicketStatus {
	Open = "open",
	InProgress = "in_progress",
	WaitingForCustomer = "waiting_for_customer",
	Closed = "closed"
}

@Entity()
export class Ticket extends AbstractEntity<Ticket> {
	@Index({ unique: true })
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Column()
	title: string;

	@Column("text")
	description: string;

	@Column({
		type: "enum",
		enum: TicketStatus,
		default: TicketStatus.Open
	})
	status: TicketStatus;

	@Column()
	creatorId: string;

	@Column({ nullable: true })
	assignId?: string | null;

	@JoinTable()
	@OneToMany(() => Message, (message) => message.ticket, { cascade: true })
	messages: Message[];

	@CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
	createdAt?: Date;

	@UpdateDateColumn({
		type: "timestamp",
		default: () => "CURRENT_TIMESTAMP(6)",
		onUpdate: "CURRENT_TIMESTAMP(6)"
	})
	updatedAt?: Date;
}
