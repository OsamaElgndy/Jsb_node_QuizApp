import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { template } from './template';

// function by email . com 
@Injectable()
export class SendEmailService {

 private transporter: nodemailer.Transporter;

 constructor() {
  this.transporter = nodemailer.createTransport({
   service: "gmail",
   secure: true,
   auth: {
    user: process.env.EMAIL_ACCOUNT,
    pass: process.env.PASSWORD_EMAIL,
   },
  });
 }
 
    async  main({token , code}:{token : string|null , code : string | null}) {
 // send mail with defined transport object
 Server: "email"
 const link = `https://localhost:3000/instructor/${token}`
 const info = await this.transporter.sendMail({
  from: process.env.EMAIL_ACCOUNT, // sender address
  to: "osamaproud01@gmail.com", // list of receivers
  subject: "Hello ✔", // Subject line
  text: "Hello world?", // plain text body

  html:template(link,code),  // html body
 });

 console.log("Message sent:%s", info.messageId);
 // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
}

}

