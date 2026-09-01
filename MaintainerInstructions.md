# Brave New Globe — Maintainer Instructions

How the pack is built and how to make changes. If you just want to *play*, see
[ClientInstallationInstructions.md](ClientInstallationInstructions.md) instead.

The pack is defined by [packwiz](https://packwiz.infra.link/) metadata in [`pack/`](pack/), **not** by
committed jars:

- `pack/pack.toml` — manifest (MC + loader versions, index hash)
- `pack/index.toml` — file index (auto-managed; do not hand-edit)
- `pack/mods/*.pw.toml` — one tiny metadata file per mod (download source + hash). Most mods are
  **not** committed as jars. Exceptions live in `bundled-jars/` (height-patched Big Globe, Create:
  Villager Commerce, and other CF-distribution-disabled jars) and are referenced by raw-GitHub URL.
- `pack/config/**` — real files shipped as-is, including the FTB Quests book under
  `pack/config/ftbquests/`.
- `pack/kubejs/**` — server scripts (LootJS dungeon-loot scaffold). After editing, `packwiz refresh`.
- `pack/datapacks/**` — packwiz installs these to the instance `datapacks/` folder. Paxi is set to
  **Load from base 'datapacks' directory = true**. They are **not** under `config/paxi/datapacks/`.

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

> ⚠️ Always `packwiz refresh` before committing, and commit **both** `index.toml` and `pack.toml`.
> 0.8.5 updated the index but left a stale `[index]` hash in `pack.toml` → packwiz
> **"index hash file invalid"** (fixed in 0.8.6).

## Current pack
**0.9.2** / **150** mods. Do not `packwiz update` Big Globe (pinned patched jar, no `[update]`
block). Keep Simply More on release **`1.2.3`** (skip `1.3.0_alphaN`). LootJS / Simply Swords /
Simply More / Fzzy Config / Simply Tooltips are `side = "both"`.

## FTB Quests
The shipped book is **15 chapters / 230 quests** (0.9.0; unchanged through 0.9.2). Design rules:
[SPECTRUM.md](SPECTRUM.md). Line list and counts: [QUESTS.md](QUESTS.md).

- Committed `pack/config/ftbquests/**/*.snbt` is the **source of truth**.
- Author chapters in `bigGlobeAero/quest_lines/*.py` and regenerate with
  `bigGlobeAero/build_ftbquests.py`. IDs are SHA-1 of stable keys — re-runs with the same keys
  are progress-safe. Changing keys rewrites player progress.
- **Do not** hand-edit `.snbt` in-game (edit mode) or reintroduce checkmark / self-attest tasks.
- After regenerating quests, `packwiz refresh` and commit the chapter files + both index files.
- Escape bare `&` in titles as `\&` (0.8.8); the generator does this automatically.

## Dungeon loot (LootJS)
- Living menu: [LOOT.md](LOOT.md). Script: `pack/kubejs/server_scripts/wda_dungeon_loot.js`
  (0.9.1 scaffold — still a no-op).
- Do not restore WDA `major`/`minor` structures just to complete quests or fill chests.
- Simply Swords / Simply More are loot *candidates* (0.9.2); add them to LOOT.md before wiring.

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
