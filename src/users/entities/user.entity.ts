import {
	Entity,
	Column,
	CreateDateColumn,
	UpdateDateColumn,
	PrimaryGeneratedColumn,
	Index,
	OneToMany
} from "typeorm";
import { AbstractEntity } from "@/common";
import { Ticket } from "@/tickets/entities/ticket.entity";

export enum UserRole {
	User = "user",
	Consultant = "consultant",
	Admin = "admin"
}

@Entity()
export class User extends AbstractEntity<User> {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Column()
	firstName: string;

	@Column()
	lastName: string;

	@Index({ unique: true })
	@Column({ unique: true })
	email: string;

	@Column()
	password: string;

	@Column({
		type: "enum",
		enum: UserRole,
		default: UserRole.User
	})
	role: UserRole;

	@Column({ type: "text", unique: true, nullable: true })
	refreshToken: string | null;

	@CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
	createdAt?: Date;

	@UpdateDateColumn({
		type: "timestamp",
		default: () => "CURRENT_TIMESTAMP(6)",
		onUpdate: "CURRENT_TIMESTAMP(6)"
	})
	updatedAt?: Date;

	@OneToMany(() => Ticket, (ticket) => ticket.creatorId)
	createdTickets: Ticket[];

	@OneToMany(() => Ticket, (ticket) => ticket.assignId)
	assignedTickets: Ticket[];
}
