# Brave New Globe — Maintainer Instructions

How the pack is built and how to make changes. If you just want to *play*, see
[ClientInstallationInstructions.md](ClientInstallationInstructions.md) instead.

The pack is defined by [packwiz](https://packwiz.infra.link/) metadata in [`pack/`](pack/), **not** by
committed jars:

- `pack/pack.toml` — manifest (MC + loader versions, index hash)
- `pack/index.toml` — file index (auto-managed; do not hand-edit)
- `pack/mods/*.pw.toml` — one tiny metadata file per mod (download source + hash). **No jars in git.**
- `pack/config/**` — real config files shipped as-is
- `pack/datapacks/**` — zip datapacks shipped as-is (Big Globe compat, recipe packs, etc.). packwiz
  installs them into the instance `datapacks/` folder. **Paxi** is set to force-load that folder
  (`Load from base 'datapacks' directory = true` in `pack/config/paxi-neoforge-1_21.toml`). Do **not**
  put them under `config/paxi/datapacks/`.

Village and glacier behavior for the current pack is documented in [Notes.md](Notes.md). After
editing a zip under `pack/datapacks/`, run `packwiz refresh` before committing.

## Common operations (run from `pack/`)
```bash
# add / update a mod
packwiz modrinth add <slug-or-url>                              # from Modrinth
packwiz curseforge add "<name>"                                 # from CurseForge
packwiz url add <name> <direct-download-url>                    # from any direct URL

# after dropping local files (datapacks / config) into the tree
packwiz refresh          # re-index — ALWAYS run before committing

# publish
git add -A && git commit -m "update: ..." && git push
```

> ⚠️ Always `packwiz refresh` before committing, or `index.toml` won't match the tree and every player's
> launch will fail the hash check.

## Optional / client-side mods
Mods can be marked optional with an `[option]` block in their `pack/mods/*.pw.toml` file:

```toml
[option]
optional = true
default = false
description = "Shown to players in the packwiz installer selection screen."
```

The rendering trio — **Iris Shaders**, **Iris & Oculus Flywheel Compat**, and **Distant Horizons** —
must be toggled together (all ON or all OFF). See the comments in those `.pw.toml` files and
[Notes.md](Notes.md) for why.
