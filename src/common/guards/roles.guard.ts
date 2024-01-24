import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { UserRole } from "@/users/entities/user.entity";
import { ROLES_KEY } from "../decorators/roles.decorator";

@Injectable()
export class RolesGuard implements CanActivate {
	constructor(private reflector: Reflector) {}

	canActivate(context: ExecutionContext): boolean {
		const requiredRoles = this.reflector.get<UserRole[]>(ROLES_KEY, context.getHandler());
		if (!requiredRoles) {
			return true;
		}

		const request = context.switchToHttp().getRequest();
		const user = request.user;

		return requiredRoles.some((role) => user.role?.includes(role));
	}
}
