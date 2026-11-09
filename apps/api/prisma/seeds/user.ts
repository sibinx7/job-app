import 'dotenv/config';
import * as bcrypt from 'bcrypt';
import { UserGender, UserRole, UserStatus } from '@job-app/shared/source';
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
  const password_hash_1 = await bcrypt.hash('Password@123', 10)
  const password_hash_2 = await bcrypt.hash('Password@456', 10)
  const password_hash_3 = await bcrypt.hash('Password@789', 10)
  const password_hash_4 = await bcrypt.hash('Password@777', 10)




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
      dob: new Date(),
      gender: UserGender.MALE,
      pincode: '123456',
      state: 'Maharashtra',
      password_hash: password_hash_1
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
      dob: new Date(),
      gender: UserGender.MALE,
      pincode: '123456',
      state: 'Maharashtra',
      password_hash: password_hash_2
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
      dob: new Date(),
      gender: UserGender.MALE,
      pincode: '123456',
      state: 'Maharashtra',
      password_hash: password_hash_3
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
      dob: new Date(),
      gender: UserGender.MALE,
      pincode: '123456',
      state: 'Maharashtra',
      password_hash: password_hash_4
    },
  ];

  for (const user of users) {
    // Generate fresh hash per user so each gets a unique salt and hash string
    const password_hash = user.password_hash;

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
        password_hash,
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