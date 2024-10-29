<<<<<<< HEAD
import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { PrismaService } from 'src/prisma/prisma.service';

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
    const findCourse = await this.prisma.course.findUnique({ where: { id } });
    if(!findCourse) {
      throw new NotFoundException('Course not found');
    }
    return findCourse
  }



  async remove(id: number , removecourse: number) { {
    const chackCourse = await this.prisma.course.findFirst({ where: { id } })
    if (!chackCourse) {
      throw new NotFoundException('Course not found');
    }
    
    const course = await this.prisma.instructor.findFirst({ where: { id:removecourse },select:{courses:{select:{id:true}}} })
    if (course.courses.length <= 0 ) {
      throw new NotFoundException('you have no courses');
    }

    if(!course.courses.flat().map((i) => i.id).includes(id)){
      throw new ForbiddenException('You have no permission');
    }
    return await this.prisma.course.delete({ where: { id } });
  }
  }

  async create(createCourseDto: CreateCourseDto, instructorId: number) {
    return await this.prisma.course.create({ data: { ...createCourseDto, instructorId: instructorId } });
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

  async getMyCourses(id: number) {

    const idQuize = await this.prisma.course.findMany({ where: { id } , select:{quizzes: true} })

    const courses = await this.prisma.course.findMany({
      where: { instructorId: id }, select: {id: true,
        quizzes: { select: { name: true, id: true } },
        name: true, description: true, image: true,video: true, instructor: {
          select: {
            firstName: true, lastName: true
            , email: true, phone: true,
               id: true,
          },
        }
      },
      
      
    })
    if (!courses) {
      throw new NotFoundException('You have no courses');
    }
    const idQuizeFinaly = idQuize.map((i) => i.quizzes).flat().map((i) => i.id)
    return { idQuize  , idQuizeFinaly , courses };


  }
}
=======
import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { PrismaService } from 'src/prisma/prisma.service';

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
    const findCourse = await this.prisma.course.findUnique({ where: { id } });
    if(!findCourse) {
      throw new NotFoundException('Course not found');
    }
    return findCourse
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
    return await this.prisma.course.create({ data: { ...createCourseDto, instructorId: instructorId } });
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

  async getMyCourses(id: number) {

    const idQuize = await this.prisma.course.findMany({ where: { id } , select:{quizzes: true} })

    const courses = await this.prisma.course.findMany({
      where: { instructorId: id }, select: {
        quizzes: { select: { name: true, id: true } },
        name: true, description: true, imgUrl: true,videoUrl: true, instructor: {
          select: {
            firstName: true, lastName: true
            , email: true, phone: true,
               id: true,
          },
        }
      },
      
      
    })
    if (!courses) {
      throw new NotFoundException('You have no courses');
    }
    const idQuizeFinaly = idQuize.map((i) => i.quizzes).flat().map((i) => i.id)
    return { idQuize  , idQuizeFinaly , courses };


  }
}
>>>>>>> 5eb5d64d1bf1c68b079660488b94ad7beea29206
