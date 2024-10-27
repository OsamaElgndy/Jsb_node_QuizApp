import { IsEnum ,IsNotEmpty} from 'class-validator';

export class CreateExamDto {

    @IsNotEmpty()
    @IsEnum(ExamType)
    type: ExamType

 
}