import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.schema';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

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

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getUserProfile() {
    // This route is protected. Only valid JWTs can access.
    // request.user will be attached with userId, email, etc.
    return { message: 'Your protected profile data goes here' };
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
