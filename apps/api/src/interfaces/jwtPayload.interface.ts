import { UserRole } from "@job-app/shared";

export interface JwtPayload {
  sub: string;
  username: string;
  role: UserRole;
  expiresIn: string;
}