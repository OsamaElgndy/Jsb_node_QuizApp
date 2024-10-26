import {  IsEmail, isNotEmpty, IsNotEmpty } from "class-validator";
export class CreateStudentDto {
 @IsEmail()
 email: string;

 
 @IsNotEmpty()
 password: string;

 @IsNotEmpty()
 firstName: string

 @IsNotEmpty()
 lastName: string
}
