import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!requiredRoles || requiredRoles.length === 0){ 
      console.log("does not have roles")
      return true;}

    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) { 
      console.log("does not start with bearer")
      return false;}

    const token = authHeader.split(' ')[1];
    if (!token) { 
      console.log("cannot be split")
      return false;}

    let payload: any;
    try {
      payload = jwt.decode(token);
      console.log('Decoded payload:', payload);
      if (!payload) {
        console.log("payload is null or undefined");
        return false;
      }
    } catch (err) {
      console.log("cannot be decoded", err);
      return false;
    }

    const roles = payload['https://focusbear.com/roles'];
    if (!Array.isArray(roles)) {
      console.log("roles claim missing or not array", roles);
      return false;
    }

    return true;
  }
}