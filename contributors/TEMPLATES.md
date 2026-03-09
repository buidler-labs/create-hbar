# Templates folder (dev-only)

The `templates/` directory at the repo root is the **development-time source of truth** for Hedera-specific scaffolding. It is not the runtime delivery mechanism for end users.

## Role

- **Dev workflow**: With `--dev`, the CLI uses the local `templates/` directory directly (e.g. symlinks). This lets contributors iterate on templates without pushing to a remote repo.
- **Authoring**: All Hedera overlay content lives here: `.template.mjs` / `.args.mjs` files, Solidity contracts, Foundry/Hardhat configs, etc.
- **Production**: When the CLI runs without `--dev`, it fetches the base layer from the remote repository (`DEFAULT_TEMPLATE_REPO` in `src/utils/consts.ts`, e.g. `buidler-labs/scaffold-eth-2#dev`) into a temp directory. The local `templates/` folder is not used.

## Sync requirement

The contents of `templates/` (or their published equivalent) must stay in sync with what is available at `DEFAULT_TEMPLATE_REPO`. Before releasing or when changing scaffolding, ensure the remote repo reflects the intended base and Hedera overlays. Consider documenting or enforcing this via CI (e.g. a check or a release step that updates the remote from `templates/`).

## See also

- [TEMPLATE-FILES.md](./TEMPLATE-FILES.md) — how `.template.mjs` and `.args.mjs` work
- [TEMPLATING.md](./TEMPLATING.md) — templating system overview
- `src/utils/get-template-directory.ts` — how template directory is resolved (dev vs production)
