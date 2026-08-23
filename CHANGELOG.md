# Changelog

All notable changes to the **Brave New Globe** modpack are documented here.
This file tracks mod additions/removals, mod version updates, and config/pack changes.

## [0.6-beta] — 2026-08-23

Performance beta: shrink Big Globe's oversized overworld and add vertical-section syncing,
targeting on-disk world size and slow chunk streaming ahead of the player (gaps between
loaded chunks and Distant Horizons).

### Added (mods)
- **Vertigo** `1.2.4` (Modrinth `4LzgJp1j`) — "vertical chunk section syncing"; skips sending
  empty vertical sections, complementing the shallower world for tall-world chunk streaming.
  Fabric mod running via the pack's **Sinytra Connector + Forgified Fabric API** (its only
  dependency, Fabric API, is covered by FFAPI). **Beta: needs in-game verification** that
  Connector applies its networking mixins cleanly alongside Distant Horizons.

### Added (datapacks — Big Globe worldgen)
- **`bigglobe_shallow_overworld.zip`** — *(authored)* compresses the overworld's vertical extent
  to cut ~55% of underground storage and per-chunk gen work. Overworld floor `-1024 → -464`,
  ceiling `+1024 → +896` (sea level unchanged at 0). Deep tiers kept but compacted: core 128 →
  **80** thick (`-448…-368`), deep dark 128 → **64** (`-352…-288`), lava sea at `-432`, base stone
  trimmed 112 → 16. Surface, caves, ores (all surface-relative) and biomes unchanged. Overrides 5
  BG files (`dimension_type`, `world_preset` generator height, overworld `world_trait_impl` tier
  constants, `the_core` molten gradient, `test_core` biome interface), verified against BG 5.3.2.
  **FRESH WORLD REQUIRED** (dimension bounds change).

### Config / pack
- Added `pack/mods/vertigo.pw.toml` and `pack/datapacks/bigglobe_shallow_overworld.zip`.
- Pack version → **0.6-beta**.
- `pack/index.toml` + `pack/pack.toml` re-indexed (`packwiz refresh`).

### Documentation
- **Notes** — living shallow-overworld bounds / compacted deep tiers; Vertigo is Fabric via
  Connector, `side = "both"`, and still needs Connector networking-mixin + DH verification.
- **README / client install** — pack is **0.6-beta**; existing worlds from before this version
  cannot be reused (dimension bounds change). Vertigo installs on clients and dedicated servers.
- **Maintainer** — `bigglobe_shallow_overworld.zip` is a dimension-bounds datapack; do not expect
  old worlds to load correctly after it is applied.

## [0.5.6] — 2026-08-23

Added **Too Fast**. The author commit (`added too fast mod`) did not give this its own
version number; documented here as 0.5.6.

**Too Fast** (`toofast-1.21.0-0.4.3.5.jar`, Modrinth `w6JSkKSH` / version `pDkjMI8q`)
removes the server-side player speed cap that produces `moved too quickly` console
warnings and rubber-banding. It is the pack's first `side = "server"` mod: packwiz
installs it on dedicated-server syncs and skips it on the default PrismLauncher
client install (`--side client`). The integrated singleplayer server only gets the
fix if the jar is actually present.

### Added (mods)
- **Too Fast** `0.4.3.5` — `pack/mods/too-fast.pw.toml`, `side = "server"`.

### Config / pack
- `pack/index.toml` + `pack/pack.toml` re-indexed.

## [0.5.5] — 2026-08-23

Removed **MapStitch**. The author commit (`Removed MapStitch`) did not give this its own
version number; documented here as 0.5.5.

MapStitch (`mapstitch-1.0.12+1.21.1-neoforge.jar`, CurseForge project 1595069 / file 8501263)
is no longer in the pack. It had been `side = "both"` as of 0.5.4. **Xaero's Minimap** and
**Xaero's World Map** stay. packwiz will delete the MapStitch jar on the next player launch.

### Removed (mods)
- **MapStitch** `1.0.12+1.21.1` — deleted `pack/mods/mapstitch.pw.toml`.

### Leftover (unused)
- `pack/config/mapstitch.json` and `pack/config/mapstitch_state` are still shipped and
  indexed; they do nothing without the mod. JEI's `ingredient-list-mod-sort-order.ini`
  still lists MapStitch.

### Config / pack
- `pack/index.toml` + `pack/pack.toml` re-indexed.

## [0.5.4] — 2026-08-23

Moved **MapStitch** back to packwiz `side = "both"`. 0.5.2 had marked it client-only
with the other client-only mods; MapStitch should install on dedicated servers as well
as clients (same reason as JEI in 0.5.3).

Also includes the immediately preceding **Fix packwiz file hashes** commit (author did
not give it its own version number). Git was rewriting line endings (CRLF ↔ LF) on
checkout, which changed file bytes under `pack/` so `index.toml` hashes no longer
matched. Players then failed the packwiz installer hash check on launch. No mods,
configs, or datapack *content* changed in that hash-fix commit.

### Changed
- **MapStitch** `side = "client"` → `side = "both"`.

### Changed — packwiz hashes / Git line endings
- Added `.gitattributes` with `* -text` so Git stores and checks out every file as-is
  (no end-of-line conversion). Do not remove this; it is what keeps packwiz hashes stable.

### Config / pack
- `pack/mods/mapstitch.pw.toml`; `pack/index.toml` + `pack/pack.toml` re-indexed.

## [0.5.3] — 2026-08-23

Moved **Just Enough Items (JEI)** back to packwiz `side = "both"`. 0.5.2 had marked it client-only
with the other client-only mods; JEI should install on dedicated servers as well as clients.

### Changed
- **JEI** `side = "client"` → `side = "both"`.

### Config / pack
- `pack/mods/jei.pw.toml`; `pack/index.toml` + `pack/pack.toml` re-indexed.

## [0.5.2] — 2026-08-23

Sorted client-side-only mods: packwiz `side = "client"` so dedicated servers skip them. Player
(PrismLauncher) installs are unchanged.

### Changed — packwiz side (client-only)
- **ImmediatelyFast**, **Iris Shaders**, **Iris & Oculus Flywheel Compat**,
  **Iris/Oculus For Simple Clouds**, **MapStitch**, **Mod Menu**, **Particle Rain**, **Sodium**,
  and (briefly) **JEI**: `side = "both"` → `side = "client"`.
- JEI was reverted in **0.5.3**. MapStitch was reverted in **0.5.4**.

### Config / pack
- Updated the listed `pack/mods/*.pw.toml`; `pack/index.toml` + `pack/pack.toml` re-indexed.

## [0.5.1] — 2026-08-23

Hotfix: restore **Villager API**. In 0.5 it was removed as an assumed Better-Village-only dependency,
but **Numismatic Overhaul (Numismatic Bounties) also requires it** — its absence crashed mod loading
(`Mod numismaticoverhaul requires villagerapi 1.0 or above ... not installed`). Better Village stays removed.

### Added (mods)
- **Villager API** (`villagerapi`, CurseForge project 1396381 / file 7533486) — re-added; required by
  Numismatic Overhaul (and previously by the now-removed Better Village).

### Config / pack
- Restored `pack/mods/villagerapi.pw.toml`. `pack/index.toml` + `pack/pack.toml` re-indexed.

### Documentation
- **Notes** — Villager API stays in the pack (Numismatic Overhaul dependency); Better Village stays
  removed. Village weights/biomes and `bigglobe_less_glacier` rules recorded as living notes.
- **README** — CTOV is the sole village system; glacier ice is noted as smaller/sparser.
- **Maintainer + client install** — datapacks live in `pack/datapacks/` → instance `datapacks/`
  (Paxi loads that folder); not `config/paxi/datapacks/`.

## [0.5] — 2026-08-23

Village overhaul + glacier tuning. CTOV becomes the sole village system (biased toward large walled
villages, walls extended across more biomes; vanilla villages and Better Village removed), and glacier
ice is made smaller and sparser.

### Removed (mods)
- **Better Villages** + its dependency **Villager API** — Better Village only reskins *vanilla*
  village jigsaw pools, which are now disabled (below), so it produced nothing under Big Globe.
  *(Villager API restored in 0.5.1 — Numismatic Overhaul still needs it.)*

### Changed — CTOV village generation (`bigglobe_ctov_compat`)
- **Vanilla villages disabled** — `bigglobe:villages` structure_set emptied (placement kept as an
  override so Big Globe's built-in 5-village default doesn't resurrect). CTOV is now the only village
  system, and denser since it no longer shares the placement grid with vanilla.
- **Small villages removed** — dropped the 21 `small/*` entries from `bigglobe_ctov:villages`.
- **Size/style weight ladder** — per-cell lottery weights: large-fortified **8**, medium-fortified
  **5**, large **3**, medium **2**. Large walled villages are the most common outcome (~72% of
  villages walled in fortified-capable biomes; large-walled the single likeliest result).
- **Fortified (walled) villages extended to more biomes** — each fortified structure given its own
  broadened biome list:
  - `plains_fortified` → + warm_plains, warm light/dense forest
  - `mesa_fortified` → + hot_plains, beaches (beach + overgrown_beach)
  - `taiga_fortified` → + glacier

### Changed — Big Globe worldgen (glacier)
- **Rivers no longer get glacier ice** — added an `!in_river` guard to the glacier feature dispatcher
  (`glaciers.json`), aligning the feature with the biome (which already excludes rivers). Fixes the
  "mini glacier spots dotted through rivers."
- **Ocean glacier ice made small & sparse** — feature-only `0.4×` fill scale applied inside the
  dispatcher (so the glacier *biome* extent is untouched), plus `glacier_cell` Voronoi `distance`
  32 → 48 (fewer, more-spaced patches).
- Glacier *biome* extent and **Aquamirae's Sea-of-Shivers are unaffected** — the scale is feature-only;
  no `glacier_crack_threshold` override.

### Config / pack
- Removed `pack/mods/better-village.pw.toml`, `pack/mods/villagerapi.pw.toml`; rebuilt
  `pack/datapacks/bigglobe_ctov_compat.zip`.
- Added `pack/datapacks/bigglobe_less_glacier.zip`.
- `pack/index.toml` + `pack/pack.toml` re-indexed.

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
