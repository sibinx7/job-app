import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service.js';
import { JwtPayload } from '../interfaces/jwtPayload.interface.js';
import { User } from '../entity/user.entity.js';
import { UserRole, UserStatus } from '@job-app/shared';
import * as bcrypt from 'bcrypt';
import { Request } from 'express';

@Injectable()
export class AuthService {

  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService
  ) {

  }

  /**
   * @description Authenticate user
   * @param req 
   * @returns 
   */
  async authenticae(req: Request) {
    const token = this.extractToken(req);
    const payload = await this.verifyToken(token);
    const user = await this.findUser(payload.sub);
    if (!user) {
      throw new UnauthorizedException(
        'Invalid user'
      )
    }
    if (user.role !== payload.role) {
      throw new UnauthorizedException(
        'Invalid role'
      )
    }
    if (user.status !== UserStatus.ACTIVE) {
      throw new UnauthorizedException(
        'Invalid status'
      )
    }

    return user;
  }


  /**
   * @description Login a user
   * @param username 
   * @param password 
   * @param role 
   * @returns 
   */
  async login(username: string, password: string, role: UserRoles = UserRole.JOB_SEEKER) {
    const user = await this.userService.findByUsername(username);
    if (!user) {
      throw new UnauthorizedException('Invalid username')
    }
    const passwordValid = await bcrypt.compare(password, user.password_hash || '');
    if (!passwordValid) {
      throw new UnauthorizedException('Invalid password')
    }
    if (user?.status !== UserStatus.ACTIVE) {
      throw new UnauthorizedException('Invalid status')
    }
    if (user?.role !== role) {
      throw new UnauthorizedException('Invalid role')
    }
    const payload: JwtPayload = {
      sub: user.id,
      username: user.email,
      role: user.role as UserRole,
      expiresIn: 60 * 60 * 24 * 7 // 1 week
    };
    return {
      access_token: this.jwtService.sign(payload)
    }
  }


  /**
   * @description Extract token
   * @param req 
   * @returns 
   */
  private extractToken(req: any): string {
    const authorization = req?.headers?.authorization as string;
    if (!authorization) {
      throw new UnauthorizedException(
        'Authorization token missing'
      )
    }
    const [type, token] = authorization?.split(' ');
    if (type !== 'Bearer' || !token) {
      throw new UnauthorizedException(
        'Invalid authorization header'
      )
    }
    return token;
  }

  /**
   * @description Verify token
   * @param token 
   * @returns 
   */
  private async verifyToken(token: string): Promise<JwtPayload> {
    try {
      const payload = await this.jwtService.verifyAsync(token) as JwtPayload;
      const user = await this.userService.findById(Number(payload?.sub));
      if (!user) {
        throw new UnauthorizedException(
          'Invalid token'
        )
      }
      return payload;
    } catch (error) {
      throw new UnauthorizedException(
        'Invalid token'
      )
    }
  }


  /**
   * @description 
   * @param userId 
   * @returns 
   */
  private async findUser(userId: number): Promise<User | null> {
    return this.userService.findById(userId)
  }
}
