import { IsString, IsNotEmpty, IsEnum } from '  class-validator';
import { Question } from 'src/question/entities/question.entity/question.entity';

export class CreateQuestionDto {
    @IsString()
    @IsEnum(['multiple choice', 'true or false', 'short answer'])
    level: QuestionLevel;

    @IsNotEmpty()
    quizId: number;


    @IsNotEmpty(  )
    @IsArray()
    @validateNested({each: true})

    @type(()=>CreateQuestionDto)
    choices: CreateQuestionDto[];
    title: string;

}
