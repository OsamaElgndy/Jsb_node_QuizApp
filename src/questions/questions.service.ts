import { ForbiddenException, Injectable, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class QuestionsService {
  constructor(private readonly prisma: PrismaService) { }
  async create(createQuestionDto: CreateQuestionDto, id: number, instructorId: number) {
    const course = await this.prisma.instructor.findFirst({ where: { id: instructorId }, select: { courses: { select: { id: true } } } })
    if (course.courses.length <= 0) throw new NotFoundException('you have no courses');
    const [idCkeckQuiz] = course.courses
    const foundQuiz = await this.prisma.course.findFirst({ where: { id: idCkeckQuiz.id }, select: { quizzes: { select: { id: true } } } })
    if (foundQuiz.quizzes.length <= 0) throw new NotFoundException('you not have any quiz');
    const checkQuiz = await this.prisma.quiz.findFirst({ where: { id } });
    if (!checkQuiz) throw new NotAcceptableException('quiz not found');
    const cheackFoundCourse = foundQuiz.quizzes.map((i) => i.id).includes(id)
    if (!cheackFoundCourse) throw new ForbiddenException('You have no permission');
    return await this.prisma.question.create({ data: { ...createQuestionDto, quizId: id } });
  }

  async findAll() {
    return await this.prisma.question.findMany({
      select: {
        id: true, question: true, answer: true, quiz:
        {
          select: {
            name: true, description: true, id: true, course: {
              select: { name: true, id: true, instructor: { select: { firstName: true, id: true } } }
            }
          }
        }
      }
    });
  }

  async findOne(id: number) {
    const question = await this.prisma.question.findUnique({ where: { id } });
    if (!question) throw new NotFoundException('id not found');
    return question
  }


  async update(id: number, updateQuestionDto: UpdateQuestionDto, instructorId: number) {
    const course = await this.prisma.instructor.findFirst({ where: { id: instructorId }, select: { courses: { select: { id: true } } } })
    if (course.courses.length <= 0) throw new NotFoundException('you have no courses');
    const [idCkeckQuiz] = course.courses
    const foundQuiz = await this.prisma.course.findFirst({ where: { id: idCkeckQuiz.id }, select: { quizzes: { select: { id: true } } } })
    if (foundQuiz.quizzes.length <= 0) throw new NotFoundException('you not have any quiz');
    const checkQuiz = await this.prisma.quiz.findFirst({ where: { id } });
    if (!checkQuiz) throw new NotAcceptableException('quiz not found');
    const cheackFoundCourse = foundQuiz.quizzes.map((i) => i.id).includes(id)
    if (!cheackFoundCourse) throw new ForbiddenException('You have no permission');
    return this.prisma.question.update({ where: { id }, data: { ...updateQuestionDto } });
  }

  async remove(id: number, instructorId: number) {
    const course = await this.prisma.instructor.findFirst({ where: { id: instructorId }, select: { courses: { select: { id: true } } } })
    if (course.courses.length <= 0) throw new NotFoundException('you have no courses');
    const [idCkeckQuiz] = course.courses
    const foundQuiz = await this.prisma.course.findFirst({ where: { id: idCkeckQuiz.id }, select: { quizzes: { select: { id: true } } } })
    if (foundQuiz.quizzes.length <= 0) throw new NotFoundException('you not have any quiz');
    const checkQuiz = await this.prisma.quiz.findFirst({ where: { id } });
    if (!checkQuiz) throw new NotAcceptableException('quiz not found');
    const cheackFoundCourse = foundQuiz.quizzes.map((i) => i.id).includes(id)
    if (!cheackFoundCourse) throw new ForbiddenException('You have no permission');
    return this.prisma.question.delete({ where: { id } });
  }
}
