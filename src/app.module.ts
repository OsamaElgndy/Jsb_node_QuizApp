import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { InstructorModule } from './auth_instructor/instructor.module';
import { JwtModule } from '@nestjs/jwt';
import {logger} from "./auth_instructor/instructor.middleware"
import { InstructorController } from './auth_instructor/instructor.controller';
import { SendEmailService } from './send_email/send_email.service';
@Module({
  imports: [InstructorModule, JwtModule.register({
    global: true,
    secret: process.env.SECRIT_KEY,
    // signOptions: { expiresIn: '60s' z},
  })],
  controllers: [AppController],
  providers: [AppService, SendEmailService],
})
export class AppModule {
 }
