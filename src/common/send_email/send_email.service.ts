<<<<<<< HEAD
import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { template } from './template';

// function by email . com 
@Injectable()
export class SendEmailService {

 private transporter: nodemailer.Transporter;

 constructor() {
  if (!process.env.EMAIL_ACCOUNT || !process.env.PASSWORD_EMAIL) {
    throw new Error('EMAIL_ACCOUNT and PASSWORD_EMAIL must be defined');
  }
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
 Server: "email"
 const link = `https://localhost:3000/instructor/${token}`
 const info = await this.transporter.sendMail({
  from: process.env.EMAIL_ACCOUNT, // sender address
  to: "osamaproud01@gmail.com", // list of receivers
  subject: "Hello ✔", // Subject line
  text: "Hello world?", // plain text body

  html:template(link,code),  // html body
 });

 console.log("Now send email to your email", info.messageId);
 // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
}

}

=======
import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { template } from './template';

// function by email . com 
@Injectable()
export class SendEmailService {

 private transporter: nodemailer.Transporter;

 constructor() {
//   if (!process.env.EMAIL_ACCOUNT || !process.env.PASSWORD_EMAIL) {
//     throw new Error('EMAIL_ACCOUNT and PASSWORD_EMAIL must be defined');
//   }
  console.log(process.env.EMAIL_ACCOUNT,process.env.PASSWORD_EMAIL , "this is email and password");
  

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

>>>>>>> 5eb5d64d1bf1c68b079660488b94ad7beea29206
