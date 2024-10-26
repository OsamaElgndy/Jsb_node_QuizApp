import { ForbiddenException, Injectable, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class QuizService {
  constructor(private readonly prisma: PrismaService) { }

  async findMyQuiz(id: number) {
    const quiz = await this.prisma.quiz.findMany({ where: { courseId: id } })
    if (!quiz) throw new NotFoundException("Quiz not found");
    return quiz
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

  async create(createQuizDto: CreateQuizDto, instructorId: number) {
    const foundCourse = await this.prisma.course.findUnique({ where: { id: instructorId } }

    )
    if (!foundCourse) throw new NotAcceptableException("You have no Courses");
    return this.prisma.quiz.create({ data: { ...createQuizDto, courseId: foundCourse.id } });
  }
  async update(id: number, updateQuizDto: UpdateQuizDto, instructorId: number) {
    const founsQuiz = await this.prisma.quiz.findUnique({ where: { id } });

    if (!founsQuiz) throw new NotFoundException("Quiz not found");

    const includesQuiz = await this.prisma.course.findMany({
      where: { id: instructorId },
      select: { quizzes: { select: { id: true } }, },
    });

    const resualts = includesQuiz.map((i) => i.quizzes).flat().map((i) => i.id).includes(id)

    if (!resualts) throw new ForbiddenException("You have no permission");

    return await this.prisma.quiz.update({
      where: { id }, data: {
        ...updateQuizDto

      }
    });
  }

  async remove(id: number, instructorId: number) {


    const founsQuiz = await this.prisma.quiz.findUnique({ where: { id } });

    if (!founsQuiz) throw new NotFoundException("Quiz not found");

    const includesQuiz = await this.prisma.course.findMany({
      where: { id: instructorId },
      select: { quizzes: { select: { id: true } }, },
    });

    const resualts = includesQuiz.map((i) => i.quizzes).flat().map((i) => i.id).includes(id)

    if (!resualts) throw new ForbiddenException("You have no permission");

    return await this.prisma.quiz.delete({ where: { id } });
  }
}
