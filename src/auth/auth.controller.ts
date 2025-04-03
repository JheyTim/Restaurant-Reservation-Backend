import { Controller, Post, Body, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(
    @Body('email') email: string,
    @Body('password') password: string,
    @Body('role') role: string,
  ) {
    return this.authService.register(email, password, role);
  }

  // This endpoint use the 'local guard to validate credentials
  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Req() req: { user: { _id: string; email: string; role: string } }) {
    // If we're here, the LocalAuthGuard succeeded and put user in req.user
    return this.authService.login(req.user);
  }
}
