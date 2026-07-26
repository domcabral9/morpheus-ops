# Inventário de componentes — Morpheus

> Gerado automaticamente a partir do checkout real de `morpheus-beta` — não editar à
> mão, rodar `generate-component-inventory.mjs` de novo sempre que precisar reavaliar
> (upgrade/downgrade, janela de manutenção, checagem de CVE). Repositório público:
> lista versões exatas em uso, o que facilita a busca por CVEs conhecidas — usar como
> insumo de decisão, não como segredo.

Gerado em: 2026-07-26T18:36:14.798Z

## Plataforma/runtime

| Componente | Versão fixada |
|---|---|
| Node.js (engines) | >=20.0.0 |
| pnpm (engines) | >=9.0.0 |
| pnpm (packageManager) | pnpm@11.15.1 |

## Imagens Docker base

| Imagem | Usada em |
|---|---|
| `node:22-alpine` | apps/api/Dockerfile, apps/web/Dockerfile |

## Serviços de infraestrutura (docker-compose)

| Serviço | Imagem | Arquivo |
|---|---|---|
| postgres | `postgres:16-alpine` | docker-compose.yml |
| postgres | `postgres:16-alpine` | docker-compose.dev.yml |

## Dependências — `morpheus-beta`

| Pacote | Versão resolvida | Tipo |
|---|---|---|
| `turbo` | 2.10.6 | dev |
| `typescript` | 5.9.3 | dev |

## Dependências — `@morpheus/api`

| Pacote | Versão resolvida | Tipo |
|---|---|---|
| `@eslint/js` | 9.39.5 | dev |
| `@nestjs/cli` | 11.0.24 | dev |
| `@nestjs/common` | 11.1.28 | prod |
| `@nestjs/config` | 4.0.4 | prod |
| `@nestjs/core` | 11.1.28 | prod |
| `@nestjs/jwt` | 11.0.2 | prod |
| `@nestjs/passport` | 11.0.5 | prod |
| `@nestjs/platform-express` | 11.1.28 | prod |
| `@nestjs/schedule` | 6.1.3 | prod |
| `@nestjs/schematics` | 11.1.0 | dev |
| `@nestjs/swagger` | 11.4.6 | prod |
| `@nestjs/terminus` | 11.1.1 | prod |
| `@nestjs/testing` | 11.1.28 | dev |
| `@nestjs/throttler` | 6.5.0 | prod |
| `@node-saml/passport-saml` | 5.1.0 | prod |
| `@opentelemetry/api` | 1.9.1 | prod |
| `@opentelemetry/auto-instrumentations-node` | 0.79.0 | prod |
| `@opentelemetry/exporter-trace-otlp-http` | 0.221.0 | prod |
| `@opentelemetry/resources` | 2.10.0 | prod |
| `@opentelemetry/sdk-node` | 0.221.0 | prod |
| `@opentelemetry/sdk-trace-base` | 2.10.0 | prod |
| `@opentelemetry/sdk-trace-node` | 2.10.0 | prod |
| `@opentelemetry/semantic-conventions` | 1.43.0 | prod |
| `@prisma/adapter-pg` | 7.9.0 | prod |
| `@types/bcrypt` | 6.0.0 | dev |
| `@types/cookie-parser` | 1.4.10 | dev |
| `@types/express` | 5.0.6 | dev |
| `@types/jest` | 30.0.0 | dev |
| `@types/multer` | 2.2.0 | dev |
| `@types/node` | 22.20.1 | dev |
| `@types/nodemailer` | 8.0.1 | dev |
| `@types/passport-jwt` | 4.0.1 | dev |
| `@types/passport-local` | 1.0.38 | dev |
| `@types/pdfkit` | 0.17.6 | dev |
| `@types/pg` | 8.20.0 | dev |
| `@types/qrcode` | 1.5.6 | dev |
| `@types/supertest` | 7.2.1 | dev |
| `@willsoto/nestjs-prometheus` | 6.1.0 | prod |
| `bcrypt` | 6.0.0 | prod |
| `class-transformer` | 0.5.1 | prod |
| `class-validator` | 0.15.1 | prod |
| `cookie-parser` | 1.4.7 | prod |
| `eslint` | 9.39.5 | dev |
| `eslint-config-prettier` | 9.1.2 | dev |
| `eslint-plugin-prettier` | 5.5.6 | dev |
| `globals` | 15.15.0 | dev |
| `helmet` | 8.3.0 | prod |
| `jest` | 30.4.2 | dev |
| `nestjs-pino` | 4.6.1 | prod |
| `nodemailer` | 9.0.3 | prod |
| `passport` | 0.7.0 | prod |
| `passport-jwt` | 4.0.1 | prod |
| `passport-local` | 1.0.0 | prod |
| `pdfkit` | 0.19.1 | prod |
| `pg` | 8.22.0 | prod |
| `pino-http` | 11.0.0 | prod |
| `pino-pretty` | 13.1.3 | dev |
| `prettier` | 3.9.6 | dev |
| `prom-client` | 15.1.3 | prod |
| `qrcode` | 1.5.4 | prod |
| `reflect-metadata` | 0.2.2 | prod |
| `rxjs` | 7.8.2 | prod |
| `source-map-support` | 0.5.21 | dev |
| `supertest` | 7.2.2 | dev |
| `ts-jest` | 29.4.12 | dev |
| `ts-loader` | 9.6.2 | dev |
| `ts-node` | 10.9.2 | dev |
| `tsconfig-paths` | 4.2.0 | dev |
| `typescript` | 5.9.3 | dev |
| `typescript-eslint` | 8.65.0 | dev |
| `zod` | 3.25.76 | prod |

## Dependências — `@morpheus/web`

| Pacote | Versão resolvida | Tipo |
|---|---|---|
| `@hookform/resolvers` | 5.4.0 | prod |
| `@playwright/test` | 1.61.1 | dev |
| `@radix-ui/react-alert-dialog` | 1.1.22 | prod |
| `@radix-ui/react-checkbox` | 1.3.10 | prod |
| `@radix-ui/react-dialog` | 1.1.22 | prod |
| `@radix-ui/react-dropdown-menu` | 2.1.23 | prod |
| `@radix-ui/react-radio-group` | 1.4.6 | prod |
| `@radix-ui/react-select` | 2.3.6 | prod |
| `@radix-ui/react-separator` | 1.1.14 | prod |
| `@radix-ui/react-slot` | 1.3.2 | prod |
| `@radix-ui/react-tabs` | 1.1.20 | prod |
| `@tailwindcss/postcss` | 4.3.3 | dev |
| `@types/node` | 20.19.43 | dev |
| `@types/react` | 19.2.17 | dev |
| `@types/react-dom` | 19.2.3 | dev |
| `class-variance-authority` | 0.7.1 | prod |
| `clsx` | 2.1.1 | prod |
| `cmdk` | 1.1.1 | prod |
| `eslint` | 9.39.5 | dev |
| `eslint-config-next` | 16.2.11 | dev |
| `lucide-react` | 1.26.0 | prod |
| `next` | 16.2.11 | prod |
| `next-intl` | 4.13.4 | prod |
| `radix-ui` | 1.6.6 | prod |
| `react` | 19.2.8 | prod |
| `react-dom` | 19.2.8 | prod |
| `react-hook-form` | 7.82.0 | prod |
| `recharts` | 3.10.0 | prod |
| `sonner` | 2.0.7 | prod |
| `tailwind-merge` | 3.6.0 | prod |
| `tailwindcss` | 4.3.3 | dev |
| `tw-animate-css` | 1.4.0 | prod |
| `typescript` | 5.9.3 | dev |
| `zod` | 4.0.17 | prod |

## Dependências — `@morpheus/config`

_Nenhuma dependência externa._

## Dependências — `@morpheus/database`

| Pacote | Versão resolvida | Tipo |
|---|---|---|
| `@prisma/adapter-pg` | 7.9.0 | prod |
| `@prisma/client` | 7.9.0 | prod |
| `@prisma/client-runtime-utils` | 7.9.0 | prod |
| `@types/bcrypt` | 6.0.0 | dev |
| `bcrypt` | 6.0.0 | prod |
| `dotenv` | 17.4.2 | dev |
| `prisma` | 7.9.0 | dev |
| `tsx` | 4.23.1 | dev |
| `typescript` | 5.9.3 | dev |
