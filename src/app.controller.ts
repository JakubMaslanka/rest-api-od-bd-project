import { Controller, Get } from "@nestjs/common";

@Controller()
export class AppController {
	constructor() {}

	@Get("/health")
	getStatus() {
		return {
			status: "ok",
			// eslint-disable-next-line @typescript-eslint/no-var-requires
			version: require("../package.json").version
		};
	}
}
