import { Module } from "@nestjs/common";
import { DatabaseModule, LoggerModule } from "@/common";
import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";
import { UsersRepository } from "./users.repository";
import { User } from "./entities/user.entity";

@Module({
	imports: [DatabaseModule.forFeature([User]), LoggerModule],
	controllers: [UsersController],
	providers: [UsersService, UsersRepository],
	exports: [UsersService]
})
export class UsersModule {}
