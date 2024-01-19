import { Request } from "express";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(Strategy, "jwt-refresh") {
	constructor(private readonly configService: ConfigService) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			secretOrKey: configService.get<string>("JWT_REFRESH_SECRET"),
			passReqToCallback: true
		});
	}

	async validate(req: Request, payload: any) {
		const refreshToken = req.get("Authorization").replace("Bearer", "").trim();
		return { ...payload, refreshToken };
	}
}