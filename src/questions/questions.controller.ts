import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards, Req } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { Roles } from 'src/Auth/roles.decorator';
import { Role } from 'src/enum';
import { JwtAuthGuard } from 'src/courses/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { User } from '@ngneat/falso';
import { Request } from 'express';

@Controller('questions')
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}
  @Get()
  findAll() {
    return this.questionsService.findAll();
  }

  
  @Get(':id')
  findOne(@Param('id' , ParseIntPipe) id: number,) {
    return this.questionsService.findOne(+id);
  }

  @Post(':id')
  @Roles( Role.Admin,Role.instructor)
  @UseGuards( JwtAuthGuard,RolesGuard )
  create( @Param('id' , ParseIntPipe) id: number,@Req() req: Request  ,@Body() createQuestionDto: CreateQuestionDto) {
    const instructorId = (req.user as User).id
    return this.questionsService.create(createQuestionDto , +id , +instructorId);
  }


  @Patch(':id')
  @Roles( Role.Admin,Role.instructor)
  @UseGuards( JwtAuthGuard,RolesGuard )
  update(@Param('id' , ParseIntPipe) id: number, @Req() req: Request,@Body() updateQuestionDto: UpdateQuestionDto) {
    const instructorId = (req.user as User).id
    return this.questionsService.update(+id, updateQuestionDto , +instructorId);
  }

  @Delete(':id')
  @Roles( Role.Admin,Role.instructor)
  @UseGuards( JwtAuthGuard,RolesGuard )
  remove(@Param('id' ,ParseIntPipe) id: number ,@Req() req: Request   ) {
    const instructorId = (req.user as User).id
    return this.questionsService.remove(+id , +instructorId );
  }
}
