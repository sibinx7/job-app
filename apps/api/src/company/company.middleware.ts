import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class CompanyMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    // If User not authenticated, throw error
    if (!req.headers.authorization) {
      throw new UnauthorizedException();
    }
    // If User not company authenticated throw error
    if (req.headers.authorization) {

    }
    // if the role is not company and admin
    next();
  }
}
