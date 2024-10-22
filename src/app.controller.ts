import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Roles } from './Auth/roles.decorator';
import { Role } from './enum';
import { RolesGuard } from './Auth/roles.guard';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './courses/jwt-auth.guard';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Get()
@Roles(Role.Admin)
@UseGuards( JwtAuthGuard,RolesGuard)
  getHello(): string {
    return this.appService.getHello();
  }
}
