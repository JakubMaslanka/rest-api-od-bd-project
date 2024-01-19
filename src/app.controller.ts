import { Controller, Get, Request, UseGuards } from "@nestjs/common";
import { AccessTokenGuard } from "@/common/guards";

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

	@UseGuards(AccessTokenGuard)
	@Get("profile")
	getProfile(@Request() req) {
		return req.user;
	}
}
