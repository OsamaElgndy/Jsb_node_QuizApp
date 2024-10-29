import { PartialType } from '@nestjs/mapped-types';
import { CreateInstructorDto } from './create-instructor.dto';
import { IsEmail , IsNotEmpty   } from 'class-validator';
import { Matches } from 'class-validator'
export class UpdateInstructorDto extends PartialType(CreateInstructorDto) {
 @IsEmail()  
 email: string;

 @IsNotEmpty()
 password: string;
 
}

export class ChangePasswordInstructorDto{
 @IsEmail()
 email: string;

 @IsNotEmpty()
 oldpassword: string;
 
 @IsNotEmpty()
 newpassword: string;
 
 @IsNotEmpty()
//  when solftly match with new password
//  @Matches('newpassword', { message: 'password must match' })
 confirmPassword: string;
 // create matchain password with new password

}