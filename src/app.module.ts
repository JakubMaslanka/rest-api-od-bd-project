import { Module } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { LoggerModule, DatabaseModule, AccessTokenGuard } from "@/common";
import { AuthModule } from "@/auth/auth.module";
import { UsersModule } from "@/users/users.module";
import { TicketsModule } from "@/tickets/tickets.module";
import { AppController } from "./app.controller";

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
		TicketsModule
	],
	providers: [
		{
			provide: APP_GUARD,
			useClass: AccessTokenGuard
		}
	],
	controllers: [AppController]
})
export class AppModule {}
