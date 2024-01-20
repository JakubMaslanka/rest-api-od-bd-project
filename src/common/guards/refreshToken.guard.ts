// import { Reflector } from "@nestjs/core";
import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
// import { SHOULD_SKIP_AUTH_KEY } from "@/common/decorators/skipAuth.decorator";

@Injectable()
export class RefreshTokenGuard extends AuthGuard("jwt-refresh") {}
