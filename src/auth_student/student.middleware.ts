import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { PrismaService } from 'src/prisma/prisma.service';
@Injectable()
export class logger implements NestMiddleware {
  constructor(private prisma: PrismaService){}
  async use(req: Request, res: Response, next: NextFunction) {
    console.log('Request...');
       const { email } = req.body      
    const check =  await this.prisma.instructor.findFirst({ where: { email } })
    if (!check) {
      return res.status(404).json({ message: 'User not found' });
    } 
    if (!check.isConfirmed) {
      return res.status(401).json({ message: 'Please confirm your email' });
    }
    next();
  }
}
