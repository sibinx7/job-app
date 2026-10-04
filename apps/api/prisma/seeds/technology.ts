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

interface SeedTechnology {
  language: string;
  description: string;
  frameworks: {
    name: string;
    description: string;
  }[];
}

const technologiesData: SeedTechnology[] = [
  {
    language: 'TypeScript',
    description: 'Typed superset of JavaScript that compiles to plain JavaScript.',
    frameworks: [
      { name: 'NestJS', description: 'Progressive Node.js framework for scalable server-side apps' },
      { name: 'Next.js (TS)', description: 'React production framework with TypeScript support' },
      { name: 'Angular', description: 'Enterprise-scale web application platform' },
      { name: 'Remix', description: 'Full-stack web framework focused on web standards and modern UX' },
      { name: 'Hono', description: 'Ultrafast web framework for Cloudflare Workers, Deno, Bun, and Node' },
    ],
  },
  {
    language: 'JavaScript',
    description: 'Dynamic scripting language for web and server applications.',
    frameworks: [
      { name: 'React', description: 'Library for web and native user interfaces' },
      { name: 'Vue.js', description: 'Progressive framework for building user interfaces' },
      { name: 'Express.js', description: 'Fast, unopinionated, minimalist web framework for Node.js' },
      { name: 'Next.js', description: 'The React Framework for the Web' },
      { name: 'Svelte', description: 'Cybernetically enhanced web apps' },
      { name: 'Fastify', description: 'Fast and low overhead web framework for Node.js' },
    ],
  },
  {
    language: 'Python',
    description: 'High-level programming language known for readability and vast ecosystem.',
    frameworks: [
      { name: 'Django', description: 'High-level Python web framework that encourages rapid development' },
      { name: 'FastAPI', description: 'Modern, high-performance web framework for building APIs' },
      { name: 'Flask', description: 'Lightweight WSGI web application framework' },
      { name: 'Tornado', description: 'Asynchronous networking library and web framework' },
      { name: 'Pyramid', description: 'Small, fast, down-to-earth Python web framework' },
    ],
  },
  {
    language: 'Java',
    description: 'Class-based, object-oriented programming language designed for portability.',
    frameworks: [
      { name: 'Spring Boot', description: 'Opinionated framework for building production-ready Spring applications' },
      { name: 'Spring Cloud', description: 'Tools for developers to quickly build distributed systems' },
      { name: 'Quarkus', description: 'Kubernetes Native Java stack tailored for OpenJDK and GraalVM' },
      { name: 'Micronaut', description: 'Modern, JVM-based, full-stack framework for modular microservices' },
      { name: 'Hibernate', description: 'Object/Relational Mapping (ORM) solution for Java' },
    ],
  },
  {
    language: 'C#',
    description: 'Modern, innovative, open-source, cross-platform programming language by Microsoft.',
    frameworks: [
      { name: 'ASP.NET Core', description: 'Cross-platform, high-performance framework for modern cloud apps' },
      { name: '.NET MAUI', description: 'Cross-platform UI framework for Android, iOS, macOS, and Windows' },
      { name: 'Blazor', description: 'Build interactive web UIs using C# instead of JavaScript' },
      { name: 'Entity Framework Core', description: 'Lightweight, extensible, open source ORM for .NET' },
    ],
  },
  {
    language: 'Go',
    description: 'Open source programming language supported by Google that makes it easy to build simple, reliable, and efficient software.',
    frameworks: [
      { name: 'Gin', description: 'HTTP web framework written in Go with Martini-like API and fast performance' },
      { name: 'Echo', description: 'High performance, extensible, minimalist Go web framework' },
      { name: 'Fiber', description: 'Express-inspired web framework written on top of Fasthttp' },
      { name: 'Chi', description: 'Lightweight, idiomatic and composable router for Go' },
    ],
  },
  {
    language: 'PHP',
    description: 'Popular general-purpose scripting language that is especially suited to web development.',
    frameworks: [
      { name: 'Laravel', description: 'Web application framework with expressive, elegant syntax' },
      { name: 'Symfony', description: 'Set of reusable PHP components and a web application framework' },
      { name: 'CodeIgniter', description: 'Powerful PHP framework with a very small footprint' },
    ],
  },
  {
    language: 'Ruby',
    description: 'Dynamic, open source programming language with a focus on simplicity and productivity.',
    frameworks: [
      { name: 'Ruby on Rails', description: 'Server-side web application framework written in Ruby' },
      { name: 'Sinatra', description: 'DSL for quickly creating web applications in Ruby with minimal effort' },
    ],
  },
  {
    language: 'Rust',
    description: 'Empowering everyone to build reliable and efficient software with memory safety.',
    frameworks: [
      { name: 'Axum', description: 'Ergonomic and modular web framework built with Tokio, Tower, and Hyper' },
      { name: 'Actix Web', description: 'Powerful, pragmatic, and extremely fast web framework for Rust' },
      { name: 'Rocket', description: 'Simple, fast, type-safe web framework for Rust' },
      { name: 'Tauri', description: 'Framework for building tiny, blazingly fast binaries for major desktop platforms' },
    ],
  },
  {
    language: 'Kotlin',
    description: 'Modern concise and safe programming language by JetBrains, standard for Android.',
    frameworks: [
      { name: 'Ktor', description: 'Asynchronous framework for creating microservices and web applications' },
      { name: 'Android Jetpack', description: 'Suite of libraries to help developers follow best practices on Android' },
    ],
  },
  {
    language: 'Swift',
    description: 'Powerful and intuitive programming language for iOS, iPadOS, macOS, tvOS, and watchOS.',
    frameworks: [
      { name: 'SwiftUI', description: 'Innovative way to build user interfaces across all Apple platforms' },
      { name: 'UIKit', description: 'Core framework for building graphical event-driven user interfaces in iOS' },
      { name: 'Vapor', description: 'Server-side Swift web framework' },
    ],
  },
  {
    language: 'Dart',
    description: 'Client-optimized language for fast apps on any platform.',
    frameworks: [
      { name: 'Flutter', description: 'Multi-platform UI toolkit from Google' },
    ],
  },
];

async function main() {
  console.log('Seeding programming languages and frameworks...');

  for (const tech of technologiesData) {
    const language = await prisma.programingLanguage.upsert({
      where: { name: tech.language },
      update: {
        description: tech.description,
      },
      create: {
        name: tech.language,
        description: tech.description,
      },
    });

    for (const framework of tech.frameworks) {
      await prisma.programingFramework.upsert({
        where: { name: framework.name },
        update: {
          description: framework.description,
          programming_language_id: language.id,
        },
        create: {
          name: framework.name,
          description: framework.description,
          programming_language_id: language.id,
        },
      });
    }
  }

  console.log('Technology seeds completed successfully.');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
