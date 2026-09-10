# Job App

A modern full-stack Job Search application built as a monorepo using **Angular**, **NestJS**, **TypeScript**, **npm Workspaces**, and **Turborepo**.

The project is intended both as a practical job-search application and as a learning project for modern full-stack architecture.

---

## 🚀 Tech Stack

### Frontend

* Angular
* TypeScript
* RxJS
* Angular Router
* SCSS

### Backend

* NestJS
* TypeScript
* REST API

### Monorepo

* Git
* npm Workspaces
* Turborepo

### Shared

* TypeScript types
* Enums
* Constants
* Utility functions
* Shared validation schemas where appropriate

---

## 📁 Project Structure

```text
job-app/
│
├── apps/
│   ├── web/                    # Angular frontend
│   │   ├── src/
│   │   ├── angular.json
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   └── api/                    # NestJS backend
│       ├── src/
│       ├── nest-cli.json
│       ├── package.json
│       └── tsconfig.json
│
├── packages/
│   └── shared/                 # Shared TypeScript code
│       ├── src/
│       │   ├── types/
│       │   ├── enums/
│       │   ├── constants/
│       │   ├── utils/
│       │   └── index.ts
│       └── package.json
│
├── .gitignore
├── package.json
├── package-lock.json
├── turbo.json
└── README.md
```

---

## 🏗️ Architecture

The project follows a simple monorepo architecture:

```text
                    Job App
                       │
          ┌────────────┴────────────┐
          │                         │
       Frontend                  Backend
       Angular                   NestJS
       apps/web                  apps/api
          │                         │
          └───────────┬─────────────┘
                      │
                 packages/shared
                      │
             Shared TypeScript code
```

The Angular application communicates with the NestJS REST API.

The `shared` package contains framework-independent code that can safely be used by both applications.

---

# 📦 npm Workspaces

The project uses **npm Workspaces** to manage multiple packages from a single repository.

Example root `package.json`:

```json
{
  "name": "job-app",
  "private": true,
  "workspaces": [
    "apps/*",
    "packages/*"
  ]
}
```

This allows npm to recognize:

```text
apps/web
apps/api
packages/shared
```

as workspace packages.

### Install dependencies

From the root:

```bash
npm install
```

npm manages dependencies for the complete monorepo.

---

# ⚡ Turborepo

Turborepo is used as the **task orchestrator** for the monorepo.

It is not required to create a monorepo. Git + npm Workspaces are enough for that.

Turbo provides additional capabilities such as:

* Task orchestration
* Parallel task execution
* Dependency-aware task execution
* Build caching
* Task filtering
* CI optimization

---

## Turbo Configuration

The root `turbo.json` contains the task configuration.

Example:

```json
{
  "$schema": "https://turborepo.dev/schema.json",
  "tasks": {
    "dev": {
      "cache": false,
      "persistent": true
    },
    "build": {
      "dependsOn": ["^build"]
    },
    "test": {},
    "lint": {}
  }
}
```

### Why `dev` has `cache: false`

Development servers are long-running processes.

For example:

```text
Angular
ng serve
   │
   └── localhost:4200

NestJS
nest start --watch
   │
   └── localhost:3000
```

There is nothing useful to cache from a continuously running development server.

Therefore:

```json
"dev": {
  "cache": false,
  "persistent": true
}
```

---

# ▶️ Running the Applications

Each application defines its own `dev` script.

### Angular

`apps/web/package.json`

```json
{
  "scripts": {
    "dev": "ng serve",
    "build": "ng build",
    "test": "ng test",
    "lint": "ng lint"
  }
}
```

### NestJS

`apps/api/package.json`

```json
{
  "scripts": {
    "dev": "nest start --watch",
    "build": "nest build",
    "test": "jest",
    "lint": "eslint \"{src,test}/**/*.ts\""
  }
}
```

The root package exposes the Turbo commands:

```json
{
  "scripts": {
    "dev": "turbo dev",
    "build": "turbo build",
    "test": "turbo test",
    "lint": "turbo lint"
  }
}
```

---

## Development

Run both Angular and NestJS:

```bash
npm run dev
```

This executes:

```text
npm run dev
       │
       ▼
   turbo dev
       │
       ├── @job-app/web
       │      └── ng serve
       │
       └── @job-app/api
              └── nest start --watch
```

Typical development URLs:

```text
Angular → http://localhost:4200
NestJS  → http://localhost:3000
```

---

# 🔨 Build

Build all packages/apps:

```bash
npm run build
```

Turbo can understand package dependencies.

For example:

```text
shared
  │
  ├── web
  │
  └── api
```

If `web` and `api` depend on `shared`, Turbo can build the dependency first.

The configuration:

```json
{
  "build": {
    "dependsOn": ["^build"]
  }
}
```

tells Turbo to respect the dependency graph.

---

# 🧪 Testing

Run tests across the workspace:

```bash
npm run test
```

Turbo executes the `test` task for packages that define it.

You can also target a specific workspace.

For example:

```bash
turbo test --filter=@job-app/web
```

or:

```bash
turbo test --filter=@job-app/api
```

---

# 🔍 Linting

Run linting across the repository:

```bash
npm run lint
```

Or only for the frontend:

```bash
turbo lint --filter=@job-app/web
```

---

# 🎯 Turbo Filtering

One of the useful features of Turbo is the ability to run tasks for specific packages.

### Build only Angular

```bash
turbo build --filter=@job-app/web
```

### Build only NestJS

```bash
turbo build --filter=@job-app/api
```

### Test only the API

```bash
turbo test --filter=@job-app/api
```

This becomes increasingly useful as the monorepo grows.

---

# 🚀 Why Turborepo?

For a small project containing only:

```text
Angular
NestJS
Shared package
```

Turborepo is not strictly necessary.

npm Workspaces + `concurrently` could already run both applications.

For example:

```text
Angular ──┐
          ├── concurrently
NestJS ───┘
```

The reason for using Turbo is its additional capabilities.

### Without Turbo

```text
Git
 │
 └── npm Workspaces
       │
       ├── Angular
       └── NestJS
```

### With Turbo

```text
Git
 │
 └── npm Workspaces
       │
       └── Turborepo
             │
             ├── Task graph
             ├── Parallel execution
             ├── Caching
             ├── Filtering
             └── CI optimization
```

As the project grows, these capabilities become more useful.

---

# 📚 Shared Package

The `packages/shared` package contains framework-independent code.

Example:

```text
packages/shared/
└── src/
    ├── types/
    ├── enums/
    ├── constants/
    ├── utils/
    └── index.ts
```

Example type:

```typescript
export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  salary?: number;
}
```

Example enum:

```typescript
export enum JobStatus {
  ACTIVE = 'ACTIVE',
  CLOSED = 'CLOSED',
  DRAFT = 'DRAFT'
}
```

These can be shared between Angular and NestJS.

---

# ⚠️ Shared Code Guidelines

The shared package should remain **framework independent**.

Good candidates:

```text
Types
Enums
Interfaces
Constants
Pure utility functions
Validation schemas
API contracts
```

Avoid putting Angular or NestJS framework-specific services inside `shared`.

For example:

```text
❌ Angular @Injectable service
❌ NestJS @Injectable service
❌ Angular components
❌ NestJS controllers
❌ NestJS modules
```

Instead:

```text
apps/web/
└── Angular services

apps/api/
└── NestJS services

packages/shared/
└── Framework-independent code
```

---

# 🔐 Environment Variables

Environment configuration belongs to the application that uses it.

```text
apps/
├── web/
│   ├── .env
│   └── .env.example
│
└── api/
    ├── .env
    └── .env.example
```

Example backend environment:

```env
PORT=3000
DATABASE_URL=
JWT_SECRET=
```

Example frontend environment:

```env
API_URL=http://localhost:3000/api
```

Environment files containing secrets should **not** be committed.

Example:

```text
.env              ❌
.env.development  ❌

.env.example      ✅
```

The root `.gitignore` handles environment files across the monorepo.

> Frontend environment variables must never contain real secrets. Anything included in a browser application can ultimately be inspected by the user.

---

# 🌳 Git Strategy

The entire project uses a **single Git repository**.

```text
job-app/.git
```

There should not be separate Git repositories inside:

```text
apps/web/.git       ❌
apps/api/.git       ❌
packages/shared/.git ❌
```

All applications and packages are versioned together.

---

# 🛠️ Useful Commands

### Install dependencies

```bash
npm install
```

### Start development

```bash
npm run dev
```

### Build

```bash
npm run build
```

### Test

```bash
npm run test
```

### Lint

```bash
npm run lint
```

### Run a specific workspace

```bash
npm run dev --workspace=@job-app/web
```

```bash
npm run dev --workspace=@job-app/api
```

### Turbo filter

```bash
turbo build --filter=@job-app/web
```

```bash
turbo test --filter=@job-app/api
```

---

# 📈 Future Architecture

The project can gradually grow into:

```text
apps/
├── web/                 # Angular job search application
├── api/                 # NestJS API
├── admin/               # Admin application
└── worker/              # Background jobs

packages/
├── shared/              # Shared types/utilities
├── validation/          # Shared validation schemas
├── api-client/          # API contracts/client
├── ui/                  # Shared UI components if needed
└── config/              # Shared tooling configuration
```

The architecture should grow based on actual requirements rather than creating packages prematurely.

---

## 🎯 Goals

This project is being developed to explore and implement:

* Modern Angular
* NestJS
* TypeScript
* REST API architecture
* Authentication and authorization
* Database design
* Shared API contracts
* Validation
* Events
* Queues and background jobs
* Caching
* Testing
* CI/CD
* Monorepo architecture
* Turborepo
* Scalable application architecture

---

## 📄 License

This project is for learning and development purposes.
