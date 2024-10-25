import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, UseGuards, MisdirectedException } from '@nestjs/common';
import { StudentService } from './student.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { ChangePasswordInstructorDto, UpdateStudentDto } from './dto/update-student.dto';
@Controller('student')
export class InstructorController {
  constructor(private readonly StudentService: StudentService) {}

  @Post("register")
  @UsePipes(new ValidationPipe())
  Register(@Body() CreateStudentDto: CreateStudentDto) {
    return this.StudentService.RegisterInstructor(CreateStudentDto);
  }


  @Post("login")
  @UsePipes(new ValidationPipe())
  login(@Body() UpdateStudentDto: UpdateStudentDto) {
    return this.StudentService.login(UpdateStudentDto);
  }

  @Get("verify/:token")
  confirmGmail(@Param() token:string) {
    return this.StudentService.confirmGmail({token});
  }

  @Post('forgetPassword')
  forGetPassword(@Body() email: string) {
    return this.StudentService.forGetPassword({email});
  }

  @Post('changPassword')
  @UsePipes(new ValidationPipe())
  changePassword(@Body() ChangePasswordInstructorDto:ChangePasswordInstructorDto ) {
    return this.StudentService.changePassword(ChangePasswordInstructorDto);
  }



}

