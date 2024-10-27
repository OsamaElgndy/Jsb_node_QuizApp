import { PrismaService } from 'src/prisma/prisma.service';
import { Course } from './../entities/course.entity';
export class NotFoundGuard {
  constructor(private readonly resource: string) {}

  
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const id = +request.params.id;

    const Course= await this.PrismaService.Course.findUnique({ where: { id } });    
    
    console.log({id});
    if (!Course) {
        
      throw new NotFoundException('this not resource');{
        cause: 'course not found',
        description:`course with ID ${id} not found`,
      })
    

    return true;
  }
}
