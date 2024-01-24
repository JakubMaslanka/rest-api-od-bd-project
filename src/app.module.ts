import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppController } from "./app.controller";
import { LoggerModule } from "@/common/logger/logger.module";
import { DatabaseModule } from "@/common/database/database.module";
import { AuthModule } from "@/auth/auth.module";
import { UsersModule } from "@/users/users.module";
import { TicketsModule } from "@/tickets/tickets.module";
import { MessagesModule } from "@/messages/messages.module";

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true
		}),
		TypeOrmModule,
		LoggerModule,
		DatabaseModule,
		UsersModule,
		AuthModule,
		TicketsModule,
		MessagesModule
	],
	controllers: [AppController]
})
export class AppModule {}
