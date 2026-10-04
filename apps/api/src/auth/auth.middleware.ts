import { Injectable, NestMiddleware } from '@nestjs/common';
import { AuthService } from './auth.service.js';

@Injectable()
export class AuthMiddleware implements NestMiddleware {

  constructor(
    private readonly authService: AuthService
  ) { }

  use(req: any, res: any, next: () => void) {
    if (!req.headers.authorization) {
      throw new Error('Unauthorized');
    }
    const user = this.authService.authenticae(req);
    if (!user) {
      throw new Error('Unauthorized');
    }
    req.user = user;
    next();
  }
}
