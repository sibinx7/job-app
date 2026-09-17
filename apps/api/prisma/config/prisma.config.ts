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