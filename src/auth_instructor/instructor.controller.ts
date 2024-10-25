import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, UseGuards, MisdirectedException } from '@nestjs/common';
import { InstructorService } from './instructor.service';
import { CreateInstructorDto } from './dto/create-instructor.dto';
import { ChangePasswordInstructorDto, UpdateInstructorDto } from './dto/update-instructor.dto';
import {logger} from "./instructor.middleware"
@Controller('instructor')
export class InstructorController {
  constructor(private readonly instructorService: InstructorService) {}

  @Post("register")
  @UsePipes(new ValidationPipe())
  Register(@Body() createInstructorDto: CreateInstructorDto) {
    return this.instructorService.RegisterInstructor(createInstructorDto);
  }


  @Post("login")
  @UsePipes(new ValidationPipe())
  login(@Body() UpdateInstructorDto: UpdateInstructorDto) {
    return this.instructorService.login(UpdateInstructorDto);
  }

  @Get("verify/:token")
  confirmGmail(@Param() token:string) {
    return this.instructorService.confirmGmail({token});
  }

  @Post('forgetPassword')
  forGetPassword(@Body() email: string) {
    return this.instructorService.forGetPassword({email});
  }

  @Post('changPassword')
  @UsePipes(new ValidationPipe())
  changePassword(@Body() ChangePasswordInstructorDto:ChangePasswordInstructorDto ) {
    return this.instructorService.changePassword(ChangePasswordInstructorDto);
  }



}

