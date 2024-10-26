import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UsePipes, ValidationPipe, UseGuards, ParseIntPipe } from '@nestjs/common';
import { QuizService } from './quiz.service';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';
import { Request } from 'express';
import { User } from '@ngneat/falso';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { JwtAuthGuard } from 'src/courses/jwt-auth.guard';
import { Roles } from 'src/common/guards/roles.decorator';
import { Role } from '@prisma/client';
@Controller('quiz')
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  @Get('myQuize')
  @UseGuards( JwtAuthGuard,RolesGuard )
 findMyQuiz(@Req() req: Request) {
   const instructorId = (req.user as User).id
   return this.quizService.findMyQuiz(+instructorId);
 }
  @Post(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  // @UsePipes(ValidationPipe)
  create(  @Param('id' , ParseIntPipe) id: number,@Req() req: Request,@Body() createQuizDto: CreateQuizDto) {
    const instructorId = (req.user as User).id
    console.log(instructorId, "this is instructorId");
    return this.quizService.create(createQuizDto , +instructorId , +id);
  }

  @Get()
  findAll() {
    return this.quizService.findAll();
  }

  @Get(':id' )
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.quizService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @UsePipes(ValidationPipe)
  update(@Param('id' , ParseIntPipe) id:number, @Req() req: Request , @Body() updateQuizDto: UpdateQuizDto) {
    const instructorId = (req.user as User).id
    return this.quizService.update(+id, updateQuizDto , +instructorId);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @UsePipes(ValidationPipe)
  remove(@Param('id' , ParseIntPipe) id: number ,  @Req() req: Request) {
    const instructorId = (req.user as User).id
    return this.quizService.remove(+id , +instructorId);
  }
}
