import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { EntityClassOrSchema } from "@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type";

@Module({
	imports: [
		TypeOrmModule.forRootAsync({
			imports: [ConfigModule],
			useFactory: (configService: ConfigService) => ({
				type: "postgres",
				host: configService.getOrThrow<string>("DB_HOST"),
				port: configService.getOrThrow<number>("DB_PORT"),
				database: configService.getOrThrow<string>("DB_NAME"),
				username: configService.getOrThrow<string>("DB_USERNAME"),
				password: configService.getOrThrow<string>("DB_PASSWORD"),
				synchronize: process.env.NODE_ENV !== "production",
				autoLoadEntities: true,
				logging: process.env.NODE_ENV !== "production" && process.env.NODE_ENV !== "test"
			}),
			inject: [ConfigService]
		})
	]
})
export class DatabaseModule {
	static forFeature(models: EntityClassOrSchema[]) {
		return TypeOrmModule.forFeature(models);
	}
}
