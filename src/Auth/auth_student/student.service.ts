import { flatten, Injectable, UnauthorizedException, UnprocessableEntityException, UnsupportedMediaTypeException } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { ChangePassworrStudentDto, UpdateStudentDto } from './dto/update-student.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { SendEmailService } from 'src/common/send_email/send_email.service';
import * as bcrypt from 'bcrypt'


@Injectable()
export class StudentService {

  constructor(private prisma: PrismaService
    , private jwtService: JwtService,
    private SendEmailService: SendEmailService
  ) { }
  // ---------------register student --------------
  async RegisterStudent(CreateStudentDto: CreateStudentDto) {
    const { email, firstName, lastName, password } = CreateStudentDto
    const existingstudent = await this.prisma.student.findFirst({ where: { email } })
    if (existingstudent) {
      return "email is exisiting already "
    }
    const hashPassword = await bcrypt.hash(password, + process.env.SALT_ROUND)
     const newStudent = await this.prisma.student.create({ data: { email, firstName, lastName, password: hashPassword } })
    const payload = {
      id: newStudent.id,
      email: newStudent.email,
      firstName: newStudent.firstName,
      lastName: newStudent.lastName
    }
    const Token = this.jwtService.sign({ payload })
    this.SendEmailService.main({ token: Token, code: null })
    return { Token,payload }
  }
  // ---------------register student --------------



  // --------------confirm gmail ----------------
  async confirmGmail({ token }) {
    const decode = this.jwtService.decode(token.token)
    if (!decode) {
      return `in-vaild register `
    }
    const { email } = decode
    const student_email = this.prisma.student.findFirst({ where: { email } })
    if ((await student_email).isConfirmed) {
      return " gmail is confirme"
    } else {
      await this.prisma.student.update({ where: { id: (await student_email).id }, data: { isConfirmed: true } })
      return "Acount  start in the useing "
    }
    // --------------confirm gmail ----------------

  }

  // --------login student --------------

  async login(UpdateStudentDto: UpdateStudentDto) {
    const { email, password } = UpdateStudentDto
    const found_student = await this.prisma.student.findFirst({ where: { email } })
    if (!found_student.isConfirmed) {
      return "pleace check email in gmail from , confirm email "
    }
    if (!found_student) {
      return " invaild email or password !,"
    }
    const isMatch = await bcrypt.compare(password, found_student.password);
    if (!isMatch) {
      return " invaild email or password !,"
    }
    const payload = {
      id: found_student.id,
      email: found_student.email,
      firstName: found_student.firstName,
      role : found_student.roles,
      lastName: found_student.lastName
    }
    const Token = this.jwtService.sign(payload)

    return { Token, payload }
  }
  // --------------------login student --------------


  //  ---------------------forget password ----------------
  async forGetPassword({ email }) {
    const student_email = await this.prisma.student.findFirst({ where: { email: email.email } })
    // chack in-valid email
    if (!student_email.isConfirmed) {
      return "pleace check email in gmail from , confirm email "
    }
    if (!student_email) {
      return `in-vaild email `
    }
    // create  OTP
    const code = Math.random().toString(36).slice(-5)
    //  hash code
    const Password = await bcrypt.hash(code, +process.env.SALT_ROUND)

    // send code by send email 
    this.SendEmailService.main({ token: null, code: code })
    // update code 
    const newCode = await this.prisma.student.update({ where: { id: (await student_email).id }, data: { isConfirmed: false, PasswordCode: Password } })
    return `student , ${student_email.firstName}  ${student_email.lastName} go to login page`;

  }
  //  ---------------------forget password ----------------


  //  ---------------change password ---------------
  async changePassword(ChangePasswordstudentDto: ChangePassworrStudentDto) {
    const { email, newpassword, oldpassword, confirmPassword } = ChangePasswordstudentDto
    if (newpassword !== confirmPassword) {
      return new UnauthorizedException('password must match')
    }
    const student_email = await this.prisma.student.findFirst({ where: { email } })
    const Password = await bcrypt.compare(oldpassword, student_email.PasswordCode)

    if (!Password) {
      return new UnauthorizedException('invalid old_password')
    }
    const hashNewPassword = await bcrypt.hash(newpassword, + process.env.SALT_ROUND)
    const newCode = await this.prisma.student.update({ where: { id: (await student_email).id }, data: { isConfirmed: true, password: hashNewPassword } })
    return `Reset Password is successfuly User , ${newCode.firstName}`
  }
  //  ---------------change password ---------------

}
