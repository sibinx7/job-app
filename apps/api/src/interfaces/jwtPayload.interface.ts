import { UserRole } from "@job-app/shared";

export interface JwtPayload {
  sub: number;
  username: string;
  role: UserRole;
  expiresIn: number;
}