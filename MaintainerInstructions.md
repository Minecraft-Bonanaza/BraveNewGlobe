# Brave New Globe — Maintainer Instructions

How the pack is built and how to make changes. If you just want to *play*, see
[ClientInstallationInstructions.md](ClientInstallationInstructions.md) instead.

The pack is defined by [packwiz](https://packwiz.infra.link/) metadata in [`pack/`](pack/), **not** by
committed jars:

- `pack/pack.toml` — manifest (MC + loader versions, index hash)
- `pack/index.toml` — file index (auto-managed; do not hand-edit)
- `pack/mods/*.pw.toml` — one tiny metadata file per mod (download source + hash). **No jars in git.**
- `pack/config/**`, `pack/resourcepacks/**`, `pack/kubejs/**` — real files shipped as-is
- `pack/datapacks/**` — Paxi-loaded compat packs (install to instance `datapacks/`, **not**
  `config/paxi/datapacks/`). Includes `bigglobe_integratedvillages.zip` and
  `bigglobe_simplyswords_nouniques.zip`.

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

> ⚠️ Always `packwiz refresh` before committing, and commit **the changed files + `index.toml`
> + `pack.toml` together**. 0.8.5 updated the index but left a stale `[index]` hash →
> "index hash file invalid". **0.9.16** had the inverse: `index.toml` was correct but the
> committed `bigglobe_whendungeonsarise.zip` had drifted → "hash invalid" on that one file.
> Every player's launch will fail the hash check if the zip, the index, or `pack.toml` is stale.

## Do not
- Do **not** `packwiz update` **Big Globe** — the pack ships a height-patched jar (floor −608 /
  ceiling +1024). Updating would revert it to the unpatched Modrinth build.
- Do **not** `packwiz curseforge add` **Simply More** (CF `allowModDistribution:false`; use the
  Modrinth `1.3.0_alpha5` pin) or **`ponderjs`** (wrong slug — the 1.21.1 project is **`ponder`**).
- Do **not** fold Simply Swords **named Unique** weapons back into loot (`LOOT.md` /
  `wda_dungeon_loot.js`) — they skip the Runic Tablet awakening minigame.
  `bigglobe_simplyswords_nouniques.zip` + `uniqueLootTableWeight = 0` stay in effect.
  Material-tier types + the curated `JACKPOT_RUNIC` set are the intended LootJS path
  (0.9.17). Native `runicLootTableWeight = 0` still applies to the *native* injector.
- Do **not** re-add `aquamirae:oxygen_tank` (not a real id in Aquamirae 7.2.1). **One unknown
  item id aborts the entire LootJS script** — every combat-dungeon chest silently vanilla.
  Jar-verify every `LootEntry.of(...)` id before committing.
- Do **not** roll **Create: Warnautics** back to `1.0.3` — JACKPOT `cruise_missile` needs `1.0.8`.
- After adding datapacks or KubeJS scripts, `packwiz refresh` so they are indexed.

## Related docs
Combat-dungeon loot: [LOOT.md](LOOT.md). Living pack-state: [Notes.md](Notes.md).
Quest book: [QUESTS.md](QUESTS.md). SIG design: [SPECTRUM.md](SPECTRUM.md).

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
