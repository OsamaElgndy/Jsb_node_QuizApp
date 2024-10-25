import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { StudentService } from './student.service';
import { InstructorController } from './student.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { SendEmailService } from 'src/send_email/send_email.service';
import { logger } from './student.middleware';
import { log } from 'console';
// import randomstring from "randomstring"


@Module({
  imports: [
  ],
  controllers: [InstructorController],
  providers: [StudentService , PrismaService , SendEmailService    ],
})
export class InstructorModule {
  
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(logger)
      .forRoutes(
        { path: 'instructor/login', method: RequestMethod.POST },
      );
  }
}