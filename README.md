# morpheus-ops

Repositório privado para documentação operacional/segurança do [morpheus-beta](https://github.com/domcabral9/morpheus-beta) que não deve viver num repositório público — principalmente o inventário completo de componentes/versões usados para operar o sistema.

## Por quê um repo separado

`morpheus-beta` é público. Um mapeamento detalhado de versões exatas de cada dependência, imagem Docker e serviço de infraestrutura é, na prática, um roteiro pronto para quem procura CVEs conhecidas — não deve ser commitado lá.

## Inventário de componentes

`reports/component-inventory.md` é gerado automaticamente — nunca editado à mão. Cobre:

- Runtime/plataforma (Node, pnpm)
- Imagens Docker base (todas as stages dos Dockerfiles)
- Serviços de infraestrutura do docker-compose (ex. PostgreSQL)
- Dependências de cada workspace (`@morpheus/api`, `@morpheus/web`, `@morpheus/database`, `@morpheus/config`), com a versão **resolvida** (não o range do `package.json`)

### Gerar/atualizar

Requer um checkout local de `morpheus-beta` com `pnpm install` já rodado (o script lê versões resolvidas via `pnpm -r list`).

```bash
# a partir da raiz deste repo — usa ../morpheus-beta por padrão
node scripts/generate-component-inventory.mjs

# ou apontando pra outro caminho
node scripts/generate-component-inventory.mjs /caminho/pro/morpheus-beta
```

Rodar de novo sempre antes de pedir uma avaliação de upgrade/downgrade ou definir uma janela de manutenção — o documento reflete o estado do checkout no momento em que foi gerado, não se atualiza sozinho.

## Uso pretendido

Com o inventário atualizado, é possível pedir uma avaliação (upgrades/downgrades disponíveis, CVEs conhecidas, o que entraria numa janela de manutenção) tendo o documento como contexto. Preparação de terreno para integrar futuramente uma ferramenta de SCA real (ex. Dependabot) e, mais adiante, DAST.
