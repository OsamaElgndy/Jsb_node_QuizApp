
import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { InstructorService } from './instructor.service';
import { InstructorController } from './instructor.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { SendEmailService } from 'src/common/send_email/send_email.service';
import { logger } from './instructor.middleware';

@Module({
  imports: [
  ],
  controllers: [InstructorController],
  providers: [InstructorService , PrismaService , SendEmailService    ],
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
