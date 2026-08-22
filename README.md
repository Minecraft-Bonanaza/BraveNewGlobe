# Brave New Globe

A [Big Globe](https://modrinth.com/mod/big-globe) NeoForge modpack for **Minecraft 1.21.1** —
Create-ecosystem tech, cannons, aeronautics, and hand-authored Big Globe world/spawn compat.

- **Loader:** NeoForge `21.1.248` (runs Fabric mods via Sinytra Connector + Forgified Fabric API)
- **Distribution:** [packwiz](https://packwiz.infra.link/) — the pack lives in [`pack/`](pack/); users
  auto-sync it on every launch via PrismLauncher's pre-launch hook.

## Players — install / auto-update

See **[INSTALL.md](INSTALL.md)**. One-time setup, then every launch pulls the latest mods automatically.

## Maintainers — how the pack is built

The pack is defined by packwiz metadata, **not** committed jars:

- `pack/pack.toml` — pack manifest (MC + loader versions, index hash)
- `pack/index.toml` — file index (auto-managed; do not hand-edit)
- `pack/mods/*.pw.toml` — one tiny metadata file per mod (download URL + hash). **No jars in git.**
- `pack/config/**`, `pack/resourcepacks/**` — real files shipped as-is (e.g. Paxi compat datapacks)

### Common operations (run from `pack/`)

```bash
# add / update a mod to an exact version
packwiz modrinth add --project-id <id> --version-id <id> -y     # exact pin
packwiz modrinth add <slug-or-url>                              # interactive latest

# add a mod not on Modrinth
packwiz curseforge add <slug>
packwiz url add <name> <direct-download-url>

# after dropping local files (datapacks/config) into the tree
packwiz refresh          # re-index; ALWAYS run before committing

# publish
git add -A && git commit -m "update: ..." && git push
```

> ⚠️ Always `packwiz refresh` before committing, or `index.toml` won't match the tree and clients
> will fail the hash check.
