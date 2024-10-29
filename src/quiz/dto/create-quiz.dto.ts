import { IsNotEmpty, IsString } from "class-validator";

export class CreateQuizDto {
 @IsString()
 @IsNotEmpty()
 name: string;

 @IsString()
 @IsNotEmpty()
 description: string;

}
