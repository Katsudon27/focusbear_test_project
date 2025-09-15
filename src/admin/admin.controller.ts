import { Controller, Get, UseGuards } from '@nestjs/common';
import { Roles } from '../roles/roles.decorator';
import { RolesGuard } from '../roles/roles.guard';

@Controller('admin')
export class AdminController {
  @Get()
  @Roles('admin')
  @UseGuards(RolesGuard)
  getAdminData() {
    return { message: 'Welcome, Admin! You have access.' };
  }
}
