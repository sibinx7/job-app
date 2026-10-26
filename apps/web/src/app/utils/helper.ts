import { UserRole } from "@job-app/shared";

export const RoleLabel = {
  [UserRole.JOB_SEEKER]: 'Job Seeker',
  [UserRole.COMPANY_STAFF]: 'Company Staff',
  [UserRole.ADMIN]: 'Admin',
} as const;