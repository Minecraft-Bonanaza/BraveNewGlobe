# Changelog

All notable changes to the **Brave New Globe** modpack are documented here.
This file tracks mod additions/removals, mod version updates, and config/pack changes.

## [0.4] — 2026-08-23

Fix: 15 mods failed to auto-install ("excluded from the CurseForge API" — the authors'
`allowModDistribution:false` flag). Re-sourced them so packwiz auto-install works again.

### Changed — source moved CurseForge → Modrinth (11)
- Better Villages, Burnt Basic, Create Aeronautics, Create Aeronautics: Gyroscope Stabilizers,
  Create: Cotton, Create Factory Logistics, Create: Storage [Neo/Forge], Create: Gears n' Kinetics,
  Library Ferret, More Diseases & Treatments, Numismatic Bounties.

### Changed — source moved CurseForge → self-hosted in-repo (4)
- No compatible Modrinth release exists, so these are bundled in `bundled-jars/` and referenced by
  raw-GitHub URL (sha256-pinned) in packwiz: Create: Better High Seas, Food Spoilage,
  Realistic Farmland (NeoForge build), Sea Myths (`seaeater` jar).

### Config / pack
- Added `bundled-jars/` (4 jars). `pack/index.toml` + `pack/pack.toml` re-indexed.

## [0.3] — 2026-08-23

Village overhaul, two new dimensions, new mobs, and Big Globe worldgen-compatibility datapacks.

### Added (mods)
- **ChoiceTheorem's Overhauled Village (CTOV)** `3.6.3` — village overhaul (23 village + 14 outpost variants)
- **Lithostitched** `1.8.0+beta4` (library — CTOV dependency)
- **The Aether** `1.5.10` — sky dimension
- **Aquamirae** `7.2.1` (+ **Fragmentum** `2.4.4` dependency) — frozen "Sea of Shivers" content
- **Mowzie's Mobs** `1.8.2` — mini-bosses + structures (Frostmaw, Ferrous Wroughtnaut, Umvuthi)
- **Mutant Monsters** `21.1.1`
- **The Twilight Forest** `4.8.3345` — dimension
- **Xaero's Minimap** `26.4.2`
- **Xaero's World Map** `1.45.0`

### Added (datapacks — Big Globe compatibility)
- **`bigglobe_ctov_compat.zip`** — integrates CTOV villages/outposts into Big Globe terrain (based on
  Spooner's *Big Globe – CTOV Compat* 1.1.1; verified against BG 5.3.2 + CTOV 3.6.3). All village/outpost
  `structure_set` spacings set to **30**; `bigglobe:villages` and `bigglobe_ctov:villages` share salt +
  separation for coordinated placement. Underground village variant left disabled; stray `.bak` files removed.
- **`bigglobe_aquamirae.zip`** — *(authored)* adds `bigglobe:glacier` to `#aquamirae:ice_maze`, activating
  Aquamirae's ice-maze mobs, structures, and the Shipbreaker under Big Globe.
- **`bigglobe_mowziesmobs.zip`** — *(authored)* adds 22 Big Globe land biomes to
  `#mowziesmobs:has_structure/has_mowzie_structure` so Mowzie's structures (and their mobs) generate.
- **`bigglobe_remove_obelisk.zip`** — empties `#bigglobe:has_structure/obelisk` to stop Big Globe obelisks generating.

### Reverted
- **Big Globe** `6.1.2` → `5.3.2` — the `6.1.2-MC26.1.2` entry was an erroneous version bump (not a valid
  MC 1.21.1 build); restored the correct 5.3.2 release.

### Config / pack
- `pack/index.toml` and `pack/pack.toml` re-indexed (`packwiz refresh`).

## [0.2] — 2026-08-22

Changes relative to the last commit (`52d1af5`, merge of `Modpack-Recompile`).

### Added (mods)
- **Aeronautics Camera Sync** `1.3.6`
- **Azimuth API** `1.4.7` (library)
- **Create Aeronautics: Gyroscope Stabilizers**
- **Create: Bits 'n' Bobs** `2.2.7`
- **Create Cardan Shafts** `0.1.6`
- **Create: Tracks** `1.0.1` (`tracks-neoforge`, project `1519765`)
- **Strut Your Stuff (Struts)** `1.3.0`

### Removed (mods)
- **Create:Tracks+** `1.0.6b` (`tracks_plus`, project `1548863`) — effectively replaced by the new
  **Create: Tracks** mod above (different project).

### Updated (mods)
- **Create: Copycats+** `3.0.4` → `3.0.7`
- **Create: Enchantment Industry** `2.5.2` → `2.5.3`
- **Create: Power Chip** `2.0.3` → `2.0.5`
- **Create: Warnautics** `1.0.2` → `1.0.3`
- **Gabou's Libs** `1.8.2` → `1.8.3`
- **Social Player Mobs** (Interactive Player Mobs) `0.86.0` → `0.89.0`
- **More Diseases & Treatments** `1.0.0` → `1.0.1`
- **Moonlight Lib** (Selene) `3.3.4` → `3.4.1`
- **Supplementaries** `3.8.10` → `3.9.1`
- **YUNG's API (NeoForge)** `5.1.6` → `5.1.8`

### Config / pack
- `pack/index.toml` and `pack/pack.toml` re-indexed (`packwiz refresh`) to reflect the mod changes above.
- No `pack/config/**` files changed in this revision.

### Documentation
- Split the README into dedicated docs: added **`ClientInstallationInstructions.md`**,
  **`MaintainerInstructions.md`**, and **`Notes.md`**; **`README.md`** trimmed to general pack info
  with links to those docs.
- Added rendering notes to `Notes.md`: the Iris / Iris Flywheel Compat / Distant Horizons all-on/all-off
  toggle rule, and the DH + Simple Clouds artifacting known issue and workarounds.
