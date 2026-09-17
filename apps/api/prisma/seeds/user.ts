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
  const users = [
    {
      first_name: 'Super',
      last_name: 'Admin',
      phone: '0123456789',
      country_code: 91,
      country: 'India',
      email: 'superadmin@example.com',
      role: UserRole.SUPER_ADMIN,
      status: UserStatus.ACTIVE,
    },
    {
      first_name: 'Normal',
      last_name: 'Admin',
      email: 'normaladmin@example.com',
      role: UserRole.ADMIN,
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
      phone: '8943648198',
      country: 'India',
      country_code: 91,
      status: UserStatus.ACTIVE,
    },
  ];

  for (const user of users) {
    // Generate fresh hash per user so each gets a unique salt and hash string
    const password_hash = await bcrypt.hash('password@ABC123', 10);

    await prisma.user.upsert({
      where: {
        email: user.email,
      },
      update: {
        first_name: user.first_name,
        last_name: user.last_name,
        phone: user.phone,
        country_code: user.country_code,
        country: user.country,
        role: user.role,
        status: user.status,
      },
      create: {
        ...user,
        password_hash,
      },
    });
  }

  console.log('User seeds completed successfully.');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());