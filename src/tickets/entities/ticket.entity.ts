import {
	Entity,
	Column,
	CreateDateColumn,
	UpdateDateColumn,
	PrimaryGeneratedColumn,
	Index,
	ManyToOne
} from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { AbstractEntity } from "@/common";
import { User } from "@/users/entities/user.entity";

export enum TicketStatus {
	Open = "open",
	InProgress = "in_progress",
	WaitingForCustomer = "waiting_for_customer",
	Closed = "closed"
}

export interface Message {
	id: string;
	content: string;
	senderUserId: User["id"];
	isDeleted: boolean;
	createdAt?: Date;
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

	@Column({ type: "json", nullable: true })
	@ApiProperty({
		isArray: true
	})
	messages?: Message[];

	@ManyToOne(() => User, (user) => user.createdTickets, { onDelete: "SET NULL" })
	creatorId: User["id"] | null;

	@ManyToOne(() => User, (user) => user.assignedTickets, { onDelete: "SET NULL" })
	assignId: User["id"] | null;

	@CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
	createdAt?: Date;

	@UpdateDateColumn({
		type: "timestamp",
		default: () => "CURRENT_TIMESTAMP(6)",
		onUpdate: "CURRENT_TIMESTAMP(6)"
	})
	updatedAt?: Date;
}
