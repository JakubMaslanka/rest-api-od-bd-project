import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./app.module";

const swaggerOptions = {
	title: "AHE OBDB Project",
	description: "Specyfikacja techniczna opisująca punkty końcowe aplikacji",
	// eslint-disable-next-line @typescript-eslint/no-var-requires
	version: require("../package.json").version
};

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.setGlobalPrefix("api/");

	app.useGlobalPipes(
		new ValidationPipe({
			whitelist: true,
			forbidNonWhitelisted: true,
			transform: true,
			transformOptions: {
				enableImplicitConversion: true
			}
		})
	);

	const options = new DocumentBuilder()
		.setTitle(swaggerOptions.title)
		.setDescription(swaggerOptions.description)
		.setVersion(swaggerOptions.version)
		.build();

	const document = SwaggerModule.createDocument(app, options);
	SwaggerModule.setup("docs", app, document);

	await app.listen(3000);
}
bootstrap();
