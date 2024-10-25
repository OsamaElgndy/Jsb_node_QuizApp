import {  IsEmail, isNotEmpty, IsNotEmpty } from "class-validator";

// ? validations
export class CreateInstructorDto {
 @IsEmail()
 email: string;

 
 @IsNotEmpty()
 password: string;

 @IsNotEmpty()
 firstName: string

 @IsNotEmpty()
 lastName: string
}
