import 'dotenv/config';
import * as bcrypt from 'bcrypt';
import { UserRole, UserStatus } from '@job-app/shared';
import { PrismaMssql } from '@prisma/adapter-mssql';
import { PrismaClient } from '../generated/prisma/client.js';

const adapter = new PrismaMssql({
  server: process.env.DATABASE_SERVER!,
  port: +process.env.DATABASE_PORT!,
  database: process.env.DATABASE_NAME!,
  user: process.env.DATABASE_USERNAME!,
  password: process.env.DATABASE_PASSWORD!,
  options: {
    trustServerCertificate: true,
  },
});

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  const password_hash = await bcrypt.hash('password@ABC123', 10);
  const users = [
    {
      first_name: 'Super',
      last_name: 'Admin',
      phone: '0123456789',
      country_code: 91,
      country: 'India',
      email: 'superadmin@example.com',
      password_hash,
      role: UserRole.SUPER_ADMIN,
      status: UserStatus.ACTIVE,
    },
    {
      first_name: 'Normal',
      last_name: 'Admin',
      email: 'normaladmin@example.com',
      role: UserRole.ADMIN,
      password_hash,
      phone: '0987654321',
      country: 'India',
      country_code: 91,
      status: UserStatus.ACTIVE,
    },
    {
      first_name: 'Company',
      last_name: 'Staff',
      email: 'companystaff@example.com',
      role: UserRole.COMPANY_STAFF,
      password_hash,
      phone: '7987654321',
      country: 'India',
      country_code: 91,
      status: UserStatus.ACTIVE,
    },
    {
      first_name: 'Job',
      last_name: 'Seeker',
      email: 'jobseeker@example.com',
      role: UserRole.JOB_SEEKER,
      password_hash,
      phone: '8943648198',
      country: 'India',
      country_code: 91,
      status: UserStatus.ACTIVE,
    },
  ];

  for (const user of users) {
    await prisma.user.upsert({
      where: {
        email: user.email,
        phone: user.phone
      },
      update: {},
      create: user,
    });
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());