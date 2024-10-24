import { PartialType } from '@nestjs/mapped-types';
import { CreateStudentDto } from './create-student.dto';
import { IsEmail , IsNotEmpty   } from 'class-validator';
export class UpdateStudentDto extends PartialType(CreateStudentDto) {
 @IsEmail()
 email: string;

 @IsNotEmpty()
 password: string;
 
}

export class ChangePassworrStudentDto{
 @IsEmail()
 email: string;

 @IsNotEmpty()
 oldpassword: string;
 
 @IsNotEmpty()
 newpassword: string;
 
 @IsNotEmpty()
 // TODO 
//  when solftly match with new password
//  @Matches('newpassword', { message: 'password must match' })
 confirmPassword: string;
 // create matchain password with new password

}