import { Controller, Get } from "@nestjs/common";
import { SkipAuth } from "@/common";

@Controller()
export class AppController {
	constructor() {}

	@Get("/health")
	@SkipAuth()
	getStatus() {
		return {
			status: "ok",
			// eslint-disable-next-line @typescript-eslint/no-var-requires
			version: require("../package.json").version
		};
	}
}
