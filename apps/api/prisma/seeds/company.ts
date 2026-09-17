import 'dotenv/config';
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

interface CompanyTechStack {
  language: string;
  frameworks: string[];
}

interface SeedCompany {
  name: string;
  company_code: string;
  registration_number: string;
  email: string;
  phone: string;
  country_code: number;
  country: string;
  pincode: string;
  state: string;
  employee_count: number;
  website: string;
  description: string;
  address: string;
  address_line_1: string;
  address_line_2: string;
  locations: {
    address: string;
    address_line_1: string;
    address_line_2?: string;
    country_code: number;
    country: string;
    pincode: string;
    state: string;
  }[];
  tech_stack: CompanyTechStack[];
}

const companies: SeedCompany[] = [
  {
    name: 'TechNova Solutions Pvt Ltd',
    company_code: 'TECHNOVA',
    registration_number: 'CIN-U72200KA2020PTC134567',
    email: 'careers@technova.io',
    phone: '9876543210',
    country_code: 91,
    country: 'India',
    state: 'Karnataka',
    pincode: '560100',
    employee_count: 250,
    website: 'https://technova.io',
    description: 'A fast-growing product engineering and cloud solutions company delivering scalable enterprise applications.',
    address: 'Electronic City Phase 1, Bengaluru, Karnataka',
    address_line_1: 'Plot No. 42, Electronics City Phase 1',
    address_line_2: 'Hosur Road',
    locations: [
      {
        address: 'HQ - Electronic City, Bengaluru',
        address_line_1: 'Plot No. 42, Electronics City Phase 1',
        address_line_2: 'Hosur Road',
        country_code: 91,
        country: 'India',
        state: 'Karnataka',
        pincode: '560100',
      },
      {
        address: 'Hyderabad Branch - Hitec City',
        address_line_1: 'Level 4, Cyber Towers',
        address_line_2: 'Hitec City, Madhapur',
        country_code: 91,
        country: 'India',
        state: 'Telangana',
        pincode: '500081',
      },
    ],
    tech_stack: [
      { language: 'TypeScript', frameworks: ['NestJS', 'Angular', 'Next.js (TS)'] },
      { language: 'JavaScript', frameworks: ['React', 'Express.js'] },
      { language: 'Go', frameworks: ['Gin', 'Fiber'] },
    ],
  },
  {
    name: 'InnoWave Labs Inc.',
    company_code: 'INNOWAVE',
    registration_number: 'CIN-U72900MH2018PTC245678',
    email: 'talent@innowavelabs.com',
    phone: '9812345678',
    country_code: 91,
    country: 'India',
    state: 'Maharashtra',
    pincode: '400051',
    employee_count: 85,
    website: 'https://innowavelabs.com',
    description: 'Next-gen AI and Fintech innovation laboratory creating high-scale real-time payment solutions.',
    address: 'Bandra Kurla Complex, Mumbai, Maharashtra',
    address_line_1: 'Floor 8, Tower B, Godrej BKC',
    address_line_2: 'G Block, Bandra Kurla Complex',
    locations: [
      {
        address: 'Mumbai HQ - BKC',
        address_line_1: 'Floor 8, Tower B, Godrej BKC',
        address_line_2: 'G Block, Bandra Kurla Complex',
        country_code: 91,
        country: 'India',
        state: 'Maharashtra',
        pincode: '400051',
      },
      {
        address: 'Pune R&D Center - Hinjewadi',
        address_line_1: 'Phase 1, Rajiv Gandhi Infotech Park',
        address_line_2: 'Hinjewadi',
        country_code: 91,
        country: 'India',
        state: 'Maharashtra',
        pincode: '411057',
      },
    ],
    tech_stack: [
      { language: 'Python', frameworks: ['FastAPI', 'Django'] },
      { language: 'TypeScript', frameworks: ['Next.js (TS)', 'NestJS'] },
      { language: 'Rust', frameworks: ['Axum', 'Actix Web'] },
    ],
  },
  {
    name: 'CloudScale Systems',
    company_code: 'CLOUDSCALE',
    registration_number: 'CIN-U74999DL2019PTC312456',
    email: 'recruitment@cloudscalesystems.com',
    phone: '9898989898',
    country_code: 91,
    country: 'India',
    state: 'Delhi',
    pincode: '110001',
    employee_count: 500,
    website: 'https://cloudscalesystems.com',
    description: 'Enterprise cloud infrastructure and DevOps consulting firm delivering global digital transformation.',
    address: 'Barakhamba Road, Connaught Place, New Delhi',
    address_line_1: 'Statesman House, 6th Floor',
    address_line_2: 'Barakhamba Road, Connaught Place',
    locations: [
      {
        address: 'New Delhi Corporate Office',
        address_line_1: 'Statesman House, 6th Floor',
        address_line_2: 'Barakhamba Road, Connaught Place',
        country_code: 91,
        country: 'India',
        state: 'Delhi',
        pincode: '110001',
      },
      {
        address: 'Gurugram Tech Hub - Cyber City',
        address_line_1: 'Building 10, DLF Cyber City',
        address_line_2: 'DLF Phase 2',
        country_code: 91,
        country: 'India',
        state: 'Haryana',
        pincode: '122002',
      },
    ],
    tech_stack: [
      { language: 'Java', frameworks: ['Spring Boot', 'Spring Cloud', 'Quarkus'] },
      { language: 'C#', frameworks: ['ASP.NET Core', 'Entity Framework Core'] },
      { language: 'Go', frameworks: ['Echo', 'Chi'] },
    ],
  },
];

async function main() {
  console.log('Seeding companies and relations...');

  // Find existing staff user from seeds/user.ts if available
  const staffUser = await prisma.user.findUnique({
    where: { email: 'companystaff@example.com' },
  });

  for (let i = 0; i < companies.length; i++) {
    const { locations, tech_stack, ...companyData } = companies[i];

    const company = await prisma.company.upsert({
      where: {
        email: companyData.email,
      },
      update: {
        ...companyData,
      },
      create: {
        ...companyData,
      },
    });

    // Seed company locations / addresses
    for (const location of locations) {
      const existingAddress = await prisma.companyAddress.findFirst({
        where: {
          company_id: company.id,
          address_line_1: location.address_line_1,
          pincode: location.pincode,
        },
      });

      if (!existingAddress) {
        await prisma.companyAddress.create({
          data: {
            company_id: company.id,
            ...location,
          },
        });
      }
    }

    // Find or create company technology container
    let companyTechnology = await prisma.companyTechnology.findFirst({
      where: { company_id: company.id },
    });

    if (!companyTechnology) {
      companyTechnology = await prisma.companyTechnology.create({
        data: {
          company_id: company.id,
        },
      });
    }

    // Seed company technology programming languages & frameworks
    for (const stack of tech_stack) {
      const language = await prisma.programingLanguage.findUnique({
        where: { name: stack.language },
      });

      if (!language) {
        console.warn(`Language "${stack.language}" not found. Please run technology seed first.`);
        continue;
      }

      // Upsert CompanyTechnologyProgramingLanguage
      await prisma.companyTechnologyProgramingLanguage.upsert({
        where: {
          company_technology_id_programming_language_id: {
            company_technology_id: companyTechnology.id,
            programming_language_id: language.id,
          },
        },
        update: {},
        create: {
          company_technology_id: companyTechnology.id,
          programming_language_id: language.id,
        },
      });

      // Upsert CompanyTechnologyFramework
      for (const frameworkName of stack.frameworks) {
        const framework = await prisma.programingFramework.findUnique({
          where: { name: frameworkName },
        });

        if (!framework) {
          console.warn(`Framework "${frameworkName}" not found. Please run technology seed first.`);
          continue;
        }

        await prisma.companyTechnologyFramework.upsert({
          where: {
            company_technology_id_programming_framework_id: {
              company_technology_id: companyTechnology.id,
              programming_framework_id: framework.id,
            },
          },
          update: {},
          create: {
            company_technology_id: companyTechnology.id,
            programming_framework_id: framework.id,
          },
        });
      }
    }

    // Link first company to the seeded company staff user if present
    if (i === 0 && staffUser) {
      await prisma.companyStaff.upsert({
        where: {
          company_id: company.id,
        },
        update: {
          user_id: staffUser.id,
          role: 'ADMIN',
        },
        create: {
          company_id: company.id,
          user_id: staffUser.id,
          role: 'ADMIN',
        },
      });
    }
  }

  console.log('Company seeds completed successfully.');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
