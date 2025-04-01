import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.schema';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // CREATE
  @Post()
  async createUser(
    @Body('email') email: string,
    @Body('password') password: string,
    @Body('role') role: string,
  ) {
    return this.usersService.createUser(email, password, role);
  }

  // READ ALL
  @Get()
  async getAllUsers() {
    return this.usersService.getAllUsers();
  }

  // READ ONE
  @Get(':id')
  async getUserById(@Param('id') id: string) {
    return this.usersService.getUserById(id);
  }

  // UPDATE
  @Patch(':id')
  async updateUser(@Param('id') id: string, @Body() updates: Partial<User>) {
    return this.usersService.updateUser(id, updates);
  }

  // DELETE
  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    return this.usersService.deleteUser(id);
  }
}
