import { PartialType } from '@nestjs/mapped-types';
import { CreateQuizDto } from './create-quiz.dto';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateQuizDto extends PartialType(CreateQuizDto) {

 @IsString()
 @IsNotEmpty()
 name: string;

 @IsString()
 @IsNotEmpty()
 description: string;

}
