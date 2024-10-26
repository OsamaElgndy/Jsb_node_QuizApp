import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY  } from './roles.decorator';
import { Role } from '@prisma/client';
import { use } from 'passport';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles  = this.reflector.getAllAndOverride<any | Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    
    if (!requiredRoles) {
      return true;
    }
    console.log(requiredRoles, "this is required roles");
    
    const { user } = context.switchToHttp().getRequest();
     console.log(user.roles, "this is user");
     console.log(user, "this is user");
     
   const includes = (requiredRoles as Role[]).includes(user.roles);
   
    if (!includes) {
      throw new UnauthorizedException('You have no permission');
    }
    return includes;
  }
}