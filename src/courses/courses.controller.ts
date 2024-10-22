import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, UsePipes, ValidationPipe } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Roles } from 'src/Auth/roles.decorator';
import { Role } from 'src/enum';
import { RolesGuard } from 'src/Auth/roles.guard';
import { JwtAuthGuard } from './jwt-auth.guard';
import { Request } from 'express';
import { User } from '@ngneat/falso';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}
  @Get()
  findAll() {
    return this.coursesService.findAll();
  }


  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.coursesService.findOne(+id);
  }

  
  @Post()
  @UsePipes(new ValidationPipe())
  @Roles( Role.Admin,Role.instructor)
  @UseGuards( JwtAuthGuard,RolesGuard )
  create( @Req() req: Request,@Body() createCourseDto: CreateCourseDto) {
    const instructor = (req.user as User).id
    console.log(instructor, "this is instructor");
    return this.coursesService.create(createCourseDto ,+instructor);
  }

  
  @Delete(':id')
@Roles( Role.Admin,Role.instructor)
  @UseGuards( JwtAuthGuard,RolesGuard )
  remove(@Req() req: Request, @Param('id')    id: number) {
     const removecourse = (req.user as User).id
    return this.coursesService.remove(+id , +removecourse);
  }
  





  @Patch(':id')
  @UsePipes(new ValidationPipe())
  @Roles( Role.Admin,Role.instructor)
  @UseGuards( JwtAuthGuard,RolesGuard )
  update(@Param('id') id: string,@Req() req: Request, @Body() updateCourseDto: UpdateCourseDto) {
    const editCourses = (req.user as User).id
    return this.coursesService.update(+id, updateCourseDto , +editCourses);
  }


}
