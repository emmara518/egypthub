import {
  Controller,
  Get,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { UserService } from '../services/user.service';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../../common/guards/roles.guard';
import { Roles, CurrentUser } from '../../../common/decorators';
import { UserRole } from '../../../common/constants';

import { UpdateProfileDto } from '../dto/update-profile.dto';
import { ChangePasswordDto } from '../dto/change-password.dto';
import { UserResponseDto } from '../dto/user-response.dto';
import { PaginationDto, ApiResponseDto } from '../../../common/dto';

@ApiTags('Users')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UserService) {}

  @Get('me')
  @ApiOperation({ summary: 'Get current user profile' })
  async getProfile(@CurrentUser('userId') userId: string): Promise<UserResponseDto> {
    return this.userService.getUserProfile(userId);
  }

  @Patch('me')
  @ApiOperation({ summary: 'Update current user profile' })
  async updateProfile(
    @CurrentUser('userId') userId: string,
    @Body() dto: UpdateProfileDto,
  ): Promise<UserResponseDto> {
    return this.userService.updateProfile(userId, dto);
  }

  @Delete('me')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete current user account (soft delete)' })
  async deleteAccount(@CurrentUser('userId') userId: string): Promise<void> {
    return this.userService.softDeleteUser(userId);
  }

  @Get(':id')
  @UseGuards(RolesGuard)
  @Roles(UserRole.CONTENT_ADMIN, UserRole.SUPER_ADMIN)
  @ApiOperation({ summary: 'Get user by ID (admin only)' })
  async getUserById(@Param('id') id: string): Promise<UserResponseDto> {
    return this.userService.getUserProfile(id);
  }

  @Get()
  @UseGuards(RolesGuard)
  @Roles(UserRole.CONTENT_ADMIN, UserRole.SUPER_ADMIN)
  @ApiOperation({ summary: 'List all users (admin only)' })
  async listUsers(@Query() query: PaginationDto) {
    const result = await this.userService.listUsers(query.page, query.limit);
    return ApiResponseDto.ok(result.data, {
      total: result.total,
      page: result.page,
      limit: result.limit,
    });
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(RolesGuard)
  @Roles(UserRole.SUPER_ADMIN)
  @ApiOperation({ summary: 'Soft delete user (super admin only)' })
  async deleteUser(@Param('id') id: string): Promise<void> {
    return this.userService.softDeleteUser(id);
  }
}
