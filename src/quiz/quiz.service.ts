import { ForbiddenException, Injectable, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class QuizService {
  constructor(private readonly prisma: PrismaService) { }

  async findMyQuiz(instructorId: number) {
    const instructorFound = await this.prisma.instructor.findMany({ where: { id: instructorId }, select: { courses: { select: { id: true } } } });
    const idQuizeFinaly = instructorFound.map((i) => i.courses).flat().map((i) => i.id)
   let element =[]
    for (let index = 0; index < idQuizeFinaly.length; index++) {
      //  element.push(idQuizeFinaly[index])
       const quiz = await this .prisma.course.findMany({ where: { id: idQuizeFinaly[index] },   
        select: { name: true, id: true,description: true,  quizzes: { select: { name: true, id: true } } },
                
      });
       
       element.push(quiz.map((i) => i.quizzes)) 
       
      
    }
    return element

  }

  async findAll() {
    return await this.prisma.quiz.findMany({
      select: {
        id: true,
        name: true,
        description: true,
        course: { select: { name: true, id: true, description: true, quizzes: { select: { name: true, id: true } } } }
      }
    });
  }

  async findOne(id: number) {
    const quiz = await this.prisma.quiz.findUnique({ where: { id } });
    if (!quiz) throw new NotFoundException("Quiz not found");
    return quiz
  }

  async create(createQuizDto: CreateQuizDto, instructorId: number, id: number) {
    // // valaidtions in instruoctor includes id course
    // const foundCourse = await this.prisma.course.findFirst({ where: { id } });
    // if (!foundCourse) throw new NotAcceptableException("You have no Courses");

    const instructorFound = await this.prisma.instructor.findMany({ where: { id: instructorId }, select: { courses: { select: { id: true } } } });
    
    const idQuizeFinaly = instructorFound.map((i) => i.courses).flat().map((i) => i.id).includes(id)
    if (!idQuizeFinaly) throw new ForbiddenException("You have no permission");
    return this.prisma.quiz.create({ data: { ...createQuizDto, courseId: id } });
  }
  async update(id: number, updateQuizDto: UpdateQuizDto, instructorId: number) {
    const founsQuiz = await this.prisma.quiz.findUnique({ where: { id } });
    if (!founsQuiz) throw new NotFoundException("Quiz not found");

    const instructorFound = await this.prisma.instructor.findMany({ where: { id: instructorId }, select: { courses: { select: { id: true } } } });
    const idQuizeFinaly = instructorFound.map((i) => i.courses).flat().map((i) => i.id)
    let element =[]
    for (let index = 0; index < idQuizeFinaly.length; index++) {
       element.push( await this.prisma.course.findMany({ where: { id: idQuizeFinaly[index] }, select: { quizzes: { select: { id: true }} } }));
    }
    const includesQuiz = element.flat().map((i) => i.quizzes).flat().map((i) => i.id).includes(id)
     if (!includesQuiz)  throw new ForbiddenException("You have no permission");

    return await this.prisma.quiz.update({
      where: { id }, data: {
        ...updateQuizDto

      }
    });
  }

  async remove(id: number, instructorId: number) {
    const founsQuiz = await this.prisma.quiz.findUnique({ where: { id } });
      if (!founsQuiz) throw new NotFoundException("Quiz not found");

    const instructorFound = await this.prisma.instructor.findMany({ where: { id: instructorId }, select: { courses: { select: { id: true } } } });
    const idQuizeFinaly = instructorFound.map((i) => i.courses).flat().map((i) => i.id)
    let element =[]
    for (let index = 0; index < idQuizeFinaly.length; index++) {
       element.push( await this.prisma.course.findMany({ where: { id: idQuizeFinaly[index] }, select: { quizzes: { select: { id: true }} } }));
    }
    const includesQuiz = element.flat().map((i) => i.quizzes).flat().map((i) => i.id).includes(id)
     if (!includesQuiz)  throw new ForbiddenException("You have no permission");

    return await this.prisma.quiz.delete({ where: { id } });
  }
}
