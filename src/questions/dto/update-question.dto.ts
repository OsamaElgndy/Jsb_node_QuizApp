import { questionsLeven } from "@prisma/client";
import { IsEnum, IsNotEmpty, IsString } from "class-validator";

export class UpdateQuestionDto {

 @IsNotEmpty()
 @IsString()
 @IsEnum( questionsLeven  ) 
 leven : questionsLeven 

 @IsNotEmpty()
 @IsString()
 question : string

 @IsNotEmpty()
 @IsString()
 answer : string

 


}
