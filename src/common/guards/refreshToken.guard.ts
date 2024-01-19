import { Reflector } from "@nestjs/core";
import { ExecutionContext, Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { SHOULD_SKIP_AUTH_KEY } from "@/common/decorators/skipAuth.decorator";

@Injectable()
export class RefreshTokenGuard extends AuthGuard("jwt-refresh") {
	constructor(private reflector: Reflector) {
		super();
	}

	canActivate(context: ExecutionContext) {
		const shouldSkipAuth = this.reflector.getAllAndOverride<boolean>(SHOULD_SKIP_AUTH_KEY, [
			context.getHandler(),
			context.getClass()
		]);
		if (shouldSkipAuth) {
			return true;
		}
		return super.canActivate(context);
	}
}
