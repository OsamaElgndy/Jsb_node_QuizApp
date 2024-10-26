import { flatten, Injectable, UnauthorizedException, UnprocessableEntityException, UnsupportedMediaTypeException } from '@nestjs/common';
import { CreateInstructorDto } from './dto/create-instructor.dto';
import { ChangePasswordInstructorDto, UpdateInstructorDto } from './dto/update-instructor.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { SendEmailService } from 'src/common/send_email/send_email.service';
import * as bcrypt from 'bcrypt'


@Injectable()
export class InstructorService {

  constructor(private prisma: PrismaService
    , private jwtService: JwtService,
    private SendEmailService: SendEmailService
  ) { }
  // ---------------register instructor --------------
  async RegisterInstructor(createInstructorDto: CreateInstructorDto) {
    const { email, firstName, lastName, password } = createInstructorDto
    const existingInstructor = await this.prisma.instructor.findFirst({ where: { email } })
    if (existingInstructor) {
      return "email is exisiting already "
    }
    const hashPassword = await bcrypt.hash(password, + process.env.SALT_ROUND)
    const newInstructor =  await this.prisma.instructor.create({ data: { email, firstName, lastName, password: hashPassword } })
    const payload = {
      id: newInstructor.id,
      email: newInstructor.email,
      role: newInstructor.roles,
      firstName: newInstructor.firstName,
      lastName: newInstructor.lastName
    }
    const Token = this.jwtService.sign({ payload })
    try{

      this.SendEmailService.main({ token: Token, code: null })
    }catch(err){

      console.log(err . message)
    }
    return { Token,payload }
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
      // await this.prisma.instructor.update({ where: { id: (await instructor_email).id }, data: { isConfirmed: true } })
      const verify= await this.prisma.instructor.update({ where: { id: (await instructor_email).id }, data: { isConfirmed: true } })
      return `Acount  start in the useing ${verify.isConfirmed} `
    }
    // --------------confirm gmail ----------------

  }

  // --------login instructor --------------

  async login(UpdateInstructorDto: UpdateInstructorDto) {
    const { email, password } = UpdateInstructorDto
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
      id: found_instructor.id,
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
