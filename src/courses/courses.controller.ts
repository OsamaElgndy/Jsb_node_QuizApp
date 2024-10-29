import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, ParseIntPipe,  } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Roles } from 'src/common/guards/roles.decorator';
import { Role } from 'src/common/enum/enum';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { JwtAuthGuard } from './jwt-auth.guard';
import { Request } from 'express';
import { User } from '@ngneat/falso';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}
  @Get('/myCourses')
  @Roles( Role.instructor)
  @UseGuards( JwtAuthGuard,RolesGuard )
  getMyCourses( @Req() req: Request) {
    const instructorId = (req.user as User).id
    return this.coursesService.getMyCourses(+instructorId);
  }  @Get()
  findAll() {
    return this.coursesService.findAll();
  }


  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.coursesService.findOne(+id);
  }

  
  @Post()
  @Roles( Role.Admin,Role.instructor)
  @UseGuards( JwtAuthGuard,RolesGuard )
  create( @Req() req: Request,@Body() createCourseDto: CreateCourseDto) {
    const instructor = (req.user as User).id
    
    return this.coursesService.create(createCourseDto ,+instructor);
  }

  
  @Delete(':id')
@Roles( Role.instructor)
  @UseGuards( JwtAuthGuard,RolesGuard )
  remove(@Req() req: Request, @Param('id', ParseIntPipe) id: number) {
     const removecourse = (req.user as User).id
     
    return this.coursesService.remove(+id , +removecourse);
  }
  





  @Patch(':id')
  @Roles( Role.Admin,Role.instructor)
  @UseGuards( JwtAuthGuard,RolesGuard )
  update(@Param('id', ParseIntPipe) id: number ,@Req() req: Request, @Body() updateCourseDto: UpdateCourseDto) {
    const editCourses = (req.user as User).id
    return this.coursesService.update(+id, updateCourseDto , +editCourses);
  }


}
