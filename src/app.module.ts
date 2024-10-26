import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { InstructorModule } from './Auth/auth_instructor/instructor.module';
import { JwtModule } from '@nestjs/jwt';
import {logger} from "./Auth/auth_instructor/instructor.middleware"
import { InstructorController } from './Auth/auth_instructor/instructor.controller';
import { SendEmailService } from './common/send_email/send_email.service';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './courses/jwt.strategy';
import { CoursesModule } from './courses/courses.module';
import { StudentModule } from './Auth/auth_student/student.module';
import { QuizModule } from './quiz/quiz.module';
@Module({
  imports: [    
    InstructorModule,StudentModule,PassportModule,    
     JwtModule.register({
      global: true,
      secret:process.env.SECRIT_KEY,
  }), CoursesModule , QuizModule,
],
  controllers: [AppController ,],
  providers: [AppService, SendEmailService,JwtStrategy],
})
export class AppModule {
 }
