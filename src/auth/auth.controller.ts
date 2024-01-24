import { Request } from "express";
import { Controller, Get, Post, Body, Req, UseGuards } from "@nestjs/common";
import { RefreshTokenGuard, RolesGuard, SkipAuth } from "@/common";
import { CreateUserDto } from "@/users/dto/create-user.dto";
import { AuthService } from "./auth.service";
import { AuthDto } from "./dto/auth.dto";

@Controller("auth")
@UseGuards(RolesGuard)
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post("signup")
	@SkipAuth()
	signup(@Body() createUserDto: CreateUserDto) {
		return this.authService.signUp(createUserDto);
	}

	@Post("signin")
	@SkipAuth()
	signin(@Body() data: AuthDto) {
		return this.authService.signIn(data);
	}

	@Get("refresh")
	@UseGuards(RefreshTokenGuard)
	refreshTokens(@Req() req: Request) {
		const userEmail = req.user["email"];
		const refreshToken = req.user["refreshToken"];
		return this.authService.refreshTokens(userEmail, refreshToken);
	}

	@Get("profile")
	getProfile(@Req() req: Request) {
		return req.user;
	}

	@Get("logout")
	logout(@Req() req: Request) {
		this.authService.logout(req.user["sub"]);
	}
}
