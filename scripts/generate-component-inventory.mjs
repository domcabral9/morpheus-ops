#!/usr/bin/env node
// Gera reports/component-inventory.md a partir do checkout real de
// morpheus-beta - nunca digitar versão à mão, sempre ler do que está
// realmente resolvido (pnpm list) e configurado (Dockerfiles, compose,
// package.json). Rodar de novo sempre que quiser reavaliar upgrades.
//
// Uso: node scripts/generate-component-inventory.mjs [caminho-do-checkout]
//      (padrão: ../morpheus-beta, sibling deste repo)

import { execSync } from "node:child_process";
import { existsSync, readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoPath = process.argv[2] ? join(process.cwd(), process.argv[2]) : join(__dirname, "..", "..", "morpheus-beta");

if (!existsSync(join(repoPath, "package.json"))) {
  console.error(`Checkout do morpheus-beta não encontrado em: ${repoPath}`);
  console.error("Passe o caminho como argumento: node scripts/generate-component-inventory.mjs <caminho>");
  process.exit(1);
}

function readJson(relPath) {
  return JSON.parse(readFileSync(join(repoPath, relPath), "utf8"));
}

function readText(relPath) {
  return readFileSync(join(repoPath, relPath), "utf8");
}

// --- 1) Dependências resolvidas de cada workspace (versão exata instalada,
// não o range do package.json) via `pnpm -r list`, uma chamada só. ---
function collectWorkspaceDependencies() {
  // `execSync` (comando único, sem args separados) em vez de `execFileSync`:
  // no Windows, `pnpm` é resolvido via shim .CMD, e `execFileSync` sem
  // `shell:true` falha com ENOENT; `execSync` já roda dentro de um shell por
  // padrão. Comando 100% estático (sem interpolação de entrada externa).
  const raw = execSync("pnpm -r list --depth 0 --json", {
    cwd: repoPath,
    encoding: "utf8",
    maxBuffer: 1024 * 1024 * 32,
  });
  const entries = JSON.parse(raw);

  return entries.map((entry) => {
    const deps = Object.entries(entry.dependencies ?? {}).map(([name, info]) => ({
      name,
      version: info.version,
      dev: false,
    }));
    const devDeps = Object.entries(entry.devDependencies ?? {}).map(([name, info]) => ({
      name,
      version: info.version,
      dev: true,
    }));
    return {
      name: entry.name,
      path: entry.path,
      deps: [...deps, ...devDeps]
        .filter((d) => !d.version.startsWith("link:")) // pacotes internos do próprio monorepo
        .sort((a, b) => a.name.localeCompare(b.name)),
    };
  });
}

// --- 2) Imagens base dos Dockerfiles (todas as stages, deduplicadas). ---
function collectDockerBaseImages() {
  const dockerfiles = ["apps/api/Dockerfile", "apps/web/Dockerfile"];
  const images = new Map(); // image -> [dockerfiles que usam]

  for (const relPath of dockerfiles) {
    if (!existsSync(join(repoPath, relPath))) continue;
    const content = readText(relPath);
    for (const match of content.matchAll(/^FROM\s+(\S+)(?:\s+AS\s+\S+)?/gim)) {
      const image = match[1];
      if (!images.has(image)) images.set(image, []);
      images.get(image).push(relPath);
    }
  }
  return images;
}

// --- 3) Serviços do docker-compose (imagens de infra, ex. Postgres). ---
function collectComposeImages() {
  const composeFiles = ["docker-compose.yml", "docker-compose.dev.yml"];
  const services = []; // { file, service, image }

  for (const relPath of composeFiles) {
    if (!existsSync(join(repoPath, relPath))) continue;
    const content = readText(relPath);
    const serviceBlocks = content.split(/^  (\w[\w-]*):\s*$/m).slice(1);
    for (let i = 0; i < serviceBlocks.length; i += 2) {
      const serviceName = serviceBlocks[i];
      const block = serviceBlocks[i + 1] ?? "";
      const imageMatch = block.match(/^\s+image:\s*(\S+)/m);
      if (imageMatch) {
        services.push({ file: relPath, service: serviceName, image: imageMatch[1] });
      }
    }
  }
  return services;
}

// --- 4) Plataforma/runtime (Node, pnpm) fixados no package.json raiz. ---
function collectPlatformVersions(rootPkg) {
  return {
    nodeEngine: rootPkg.engines?.node ?? "(não especificado)",
    pnpmEngine: rootPkg.engines?.pnpm ?? "(não especificado)",
    packageManager: rootPkg.packageManager ?? "(não especificado)",
  };
}

// --- Renderização em Markdown ---
function renderMarkdown({ workspaces, dockerImages, composeServices, platform, generatedAt }) {
  const lines = [];
  lines.push("# Inventário de componentes — Morpheus");
  lines.push("");
  lines.push("> Gerado automaticamente a partir do checkout real de `morpheus-beta` — não editar à");
  lines.push("> mão, rodar `generate-component-inventory.mjs` de novo sempre que precisar reavaliar");
  lines.push("> (upgrade/downgrade, janela de manutenção, checagem de CVE). Repositório público:");
  lines.push("> lista versões exatas em uso, o que facilita a busca por CVEs conhecidas — usar como");
  lines.push("> insumo de decisão, não como segredo.");
  lines.push("");
  lines.push(`Gerado em: ${generatedAt}`);
  lines.push("");

  lines.push("## Plataforma/runtime");
  lines.push("");
  lines.push("| Componente | Versão fixada |");
  lines.push("|---|---|");
  lines.push(`| Node.js (engines) | ${platform.nodeEngine} |`);
  lines.push(`| pnpm (engines) | ${platform.pnpmEngine} |`);
  lines.push(`| pnpm (packageManager) | ${platform.packageManager} |`);
  lines.push("");

  lines.push("## Imagens Docker base");
  lines.push("");
  lines.push("| Imagem | Usada em |");
  lines.push("|---|---|");
  for (const [image, files] of dockerImages) {
    lines.push(`| \`${image}\` | ${[...new Set(files)].join(", ")} |`);
  }
  lines.push("");

  lines.push("## Serviços de infraestrutura (docker-compose)");
  lines.push("");
  lines.push("| Serviço | Imagem | Arquivo |");
  lines.push("|---|---|---|");
  for (const s of composeServices) {
    lines.push(`| ${s.service} | \`${s.image}\` | ${s.file} |`);
  }
  lines.push("");

  for (const ws of workspaces) {
    lines.push(`## Dependências — \`${ws.name}\``);
    lines.push("");
    if (ws.deps.length === 0) {
      lines.push("_Nenhuma dependência externa._");
      lines.push("");
      continue;
    }
    lines.push("| Pacote | Versão resolvida | Tipo |");
    lines.push("|---|---|---|");
    for (const dep of ws.deps) {
      lines.push(`| \`${dep.name}\` | ${dep.version} | ${dep.dev ? "dev" : "prod"} |`);
    }
    lines.push("");
  }

  return lines.join("\n");
}

const rootPkg = readJson("package.json");
const workspaces = collectWorkspaceDependencies();
const dockerImages = collectDockerBaseImages();
const composeServices = collectComposeImages();
const platform = collectPlatformVersions(rootPkg);
const generatedAt = new Date().toISOString();

const markdown = renderMarkdown({ workspaces, dockerImages, composeServices, platform, generatedAt });

const outDir = join(__dirname, "..", "reports");
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "component-inventory.md");
writeFileSync(outPath, markdown, "utf8");

console.log(`Inventário gerado em: ${outPath}`);
