import { flatten, Injectable, UnauthorizedException, UnprocessableEntityException, UnsupportedMediaTypeException } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { ChangePasswordInstructorDto, UpdateStudentDto } from './dto/update-student.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { SendEmailService } from 'src/send_email/send_email.service';
import * as bcrypt from 'bcrypt'


@Injectable()
export class StudentService {

  constructor(private prisma: PrismaService
    , private jwtService: JwtService,
    private SendEmailService: SendEmailService
  ) { }
  // ---------------register instructor --------------
  async RegisterInstructor(CreateStudentDto: CreateStudentDto) {
    const { email, firstName, lastName, password } = CreateStudentDto
    const existingInstructor = await this.prisma.instructor.findFirst({ where: { email } })
    if (existingInstructor) {
      return "email is exisiting already "
    }
    const hashPassword = await bcrypt.hash(password, + process.env.SALT_ROUND)
     await this.prisma.instructor.create({ data: { email, firstName, lastName, password: hashPassword } })
    const payload = {
      sub: existingInstructor.id,
      email: existingInstructor.email,
      role: existingInstructor.roles,
      firstName: existingInstructor.firstName,
      lastName: existingInstructor.lastName
    }
    const Token = this.jwtService.sign({ payload })
    this.SendEmailService.main({ token: Token, code: null })
    return { payload }
  }
  // ---------------register instructor --------------



  // --------------confirm gmail ----------------
  async confirmGmail({ token }) {
    const decode = this.jwtService.decode(token.token)
    if (!decode) {
      return `in-vaild register `
    }
    const { email } = decode
    const instructor_email = this.prisma.instructor.findFirst({ where: { email } })
    if ((await instructor_email).isConfirmed) {
      return " gmail is confirme"
    } else {
      await this.prisma.instructor.update({ where: { id: (await instructor_email).id }, data: { isConfirmed: true } })
      return "Acount  start in the useing "
    }
    // --------------confirm gmail ----------------

  }

  // --------login instructor --------------

  async login(UpdateStudentDto: UpdateStudentDto) {
    const { email, password } = UpdateStudentDto
    const found_instructor = await this.prisma.instructor.findFirst({ where: { email } })
    if (!found_instructor.isConfirmed) {
      return "pleace check email in gmail from , confirm email "
    }
    if (!found_instructor) {
      return " invaild email or password !,"
    }
    const isMatch = await bcrypt.compare(password, found_instructor.password);
    if (!isMatch) {
      return " invaild email or password !,"
    }
    const payload = {
      sub: found_instructor.id,
      email: found_instructor.email,
      role: found_instructor.roles,
      firstName: found_instructor.firstName,
      lastName: found_instructor.lastName
    }
    const Token = this.jwtService.sign(payload)

    return { Token, payload }
  }
  // --------------------login instructor --------------


  //  ---------------------forget password ----------------
  async forGetPassword({ email }) {
    const instructor_email = await this.prisma.instructor.findFirst({ where: { email: email.email } })
    // chack in-valid email
    if (!instructor_email.isConfirmed) {
      return "pleace check email in gmail from , confirm email "
    }
    if (!instructor_email) {
      return `in-vaild email `
    }
    // create  OTP
    const code = Math.random().toString(36).slice(-5)
    //  hash code
    const Password = await bcrypt.hash(code, +process.env.SALT_ROUND)
    console.log(code, "this is code");

    // send code by send email 
    this.SendEmailService.main({ token: null, code: code })
    // update code 
    const newCode = await this.prisma.instructor.update({ where: { id: (await instructor_email).id }, data: { isConfirmed: false, PasswordCode: Password } })
    return `instructor , ${instructor_email.firstName}  ${instructor_email.lastName} go to login page`;

  }
  //  ---------------------forget password ----------------


  //  ---------------change password ---------------
  async changePassword(ChangePasswordInstructorDto: ChangePasswordInstructorDto) {
    const { email, newpassword, oldpassword, confirmPassword } = ChangePasswordInstructorDto
    if (newpassword !== confirmPassword) {
      return new UnauthorizedException('password must match')
    }
    const instructor_email = await this.prisma.instructor.findFirst({ where: { email } })
    const Password = await bcrypt.compare(oldpassword, instructor_email.PasswordCode)
    console.log(Password, oldpassword);

    if (!Password) {
      return new UnauthorizedException('invalid old_password')
    }
    const hashNewPassword = await bcrypt.hash(newpassword, + process.env.SALT_ROUND)
    const newCode = await this.prisma.instructor.update({ where: { id: (await instructor_email).id }, data: { isConfirmed: true, password: hashNewPassword } })
    console.log(newCode, "this is code");
    return `Reset Password is successfuly User , ${newCode.firstName}`
  }
  //  ---------------change password ---------------

}