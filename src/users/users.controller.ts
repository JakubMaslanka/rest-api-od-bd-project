import { Controller, Get, Body, Patch, Param, Delete, UseGuards } from "@nestjs/common";
import { RolesGuard, Roles } from "@/common";
import { UsersService } from "./users.service";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UserRole } from "./entities/user.entity";

@Controller("users")
@UseGuards(RolesGuard)
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Get()
	@Roles(UserRole.Admin)
	findAll() {
		return this.usersService.findAll();
	}

	@Get(":id")
	@Roles(UserRole.Admin, UserRole.Consultant)
	findOne(@Param("id") id: string) {
		return this.usersService.findOne(id);
	}

	@Patch(":id")
	@Roles(UserRole.Admin)
	update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
		return this.usersService.update(id, updateUserDto);
	}

	@Patch(":id/update_role")
	@Roles(UserRole.Admin)
	updateRole(@Param("id") id: string, @Body() { role }: UpdateUserDto) {
		return this.usersService.update(id, { role });
	}

	@Delete(":id")
	@Roles(UserRole.Admin)
	remove(@Param("id") id: string) {
		return this.usersService.remove(id);
	}
}
