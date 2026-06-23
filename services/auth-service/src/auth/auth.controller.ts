import { Controller, Post, Get, Body, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Authentication')
@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('send-otp')
  @ApiOperation({ summary: 'ابعت كود التفعيل للموبايل' })
  async sendOtp(@Body('phone') phone: string) {
    return this.authService.sendOtp(phone);
  }

  @Post('verify-otp')
  @ApiOperation({ summary: 'تأكيد كود التفعيل وتسجيل الدخول' })
  async verifyOtp(@Body('phone') phone: string, @Body('code') code: string) {
    return this.authService.verifyOtp(phone, code);
  }

  @Post('login')
  @ApiOperation({ summary: 'تسجيل دخول بكلمة السر' })
  async login(@Body('phone') phone: string, @Body('password') password: string) {
    return this.authService.loginWithPassword(phone, password);
  }

  @Get('profile')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'جلب البروفايل بتاع المستخدم' })
  async getProfile(@Req() req: any) {
    return this.authService.getProfile(req.user.id);
  }
}
