import { course } from './../../node_modules/.prisma/client/index.d';
import { Instructor } from './../Auth/auth_instructor/entities/instructor.entity';
import { ForbiddenException, Injectable, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Course } from './entities/course.entity';

@Injectable()
export class CoursesService {
  constructor(private prisma: PrismaService) { }
  async findAll() {
    return await this.prisma.course.findMany({
      select: {
        id: true, description: true, name: true, instructor:
          { select: { firstName: true, id: true } }

      }
    });
  }

  async findOne(id: number) {
    return await this.prisma.course.findUnique({ where: { id } });
  }



  async remove(id: number , removecourse: number) { {
    const course = await this.prisma.course.findFirst({ where: { id } })
    if (!course) {
      throw new NotFoundException('Course not found');
    }
        
    if(course.id != removecourse){
      throw new ForbiddenException('You have no permission');
    }
    return await this.prisma.course.delete({ where: { id } });
  }

  }

  async create(createCourseDto: CreateCourseDto, instructorId: number) {
    
    return await this.prisma.course.create({ data: { ...createCourseDto, instructorId } });
  }





  async update(id: number, updateCourseDto: UpdateCourseDto , editCourses: number) {
    const course = await this.prisma.course.findFirst({ where: { id } })
     if (!course) {
        throw new  NotFoundException('Course not found');
     }

     if(course.id != editCourses){
      throw new ForbiddenException('You have no permission');
     }

    return await this.prisma.course.update({ where: { id }, data: updateCourseDto });
  }


}
