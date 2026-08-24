# Changelog

All notable changes to the **Brave New Globe** modpack are documented here.
This file tracks mod additions/removals, mod version updates, and config/pack changes.

## [0.5.8] — 2026-08-24

Shallow overworld, done properly — via a height-patched Big Globe jar. This revives the parked
shallow-world work in a way that's actually **Distant Horizons-compatible** (no more vertical
"wall of chunks" offset).

### Why a patched jar (and not a datapack)
Big Globe reads its world-preset generator — including `height` — **directly from its own jar on
every load** (the `reload_dimension` feature; it logs *"Reading … chunk generator from mod jar"*),
ignoring both datapack overrides and the value baked into `level.dat`. Its DH LOD integration
anchors to that same `generator.height.min_y`. So a datapack/companion mod **cannot** change the
generator height — the only thing that works is editing the files **inside** BG's jar. That's why
the earlier datapack approach produced DH LODs offset by exactly 560 blocks (−1024 vs −464).

### Changed (mods)
- **Big Globe** → **height-patched 5.3.2 jar** (`bigglobe-5.3.2-mc1.21.1-shallow464.jar`, self-hosted
  in `bundled-jars/`). Overworld floor −1024 → **−464**, ceiling +1024 → **+896**; deep tiers
  compacted (core 80-thick, deep dark 64-thick, lava sea, base trimmed). ~55% less underground
  storage/gen. Built from the official jar by `bigGlobeAero/build_patched_jar.py` (5 files swapped:
  dimension_type, world_preset generator height, world_trait_impl tiers, the_core gradient,
  test_core threshold). Metafile pinned (no `[update]` block) so `packwiz update` can't revert it to
  the unpatched Modrinth jar. The separate `bigglobe_shallow_overworld` datapack is now **obsolete**
  (the jar does everything natively).
  - Big Globe by builderb0y (CC BY-NC 4.0); modified for **personal-server use**.

### Requirements / caveats
- **Fresh world required** (dimension bounds change).
- Now that BG's generator + dimension + DH all agree at −464, DH LODs align — no offset.
- **Repo-privacy caveat:** the jar is served via a public `raw.githubusercontent.com` URL. If the
  repo is made private, that URL (and the pack manifest itself) will 403 for packwiz-installer
  (anonymous download) and break syncing — switch to a no-login host before going private.
- Re-patch on any future Big Globe update (`build_patched_jar.py` asserts the 5 paths still exist).

### Config / pack
- Added `bundled-jars/bigglobe-5.3.2-mc1.21.1-shallow464.jar`; repointed `pack/mods/big-globe.pw.toml`
  (Modrinth → raw-GitHub, sha256, no update block). `pack/index.toml` + `pack/pack.toml` re-indexed;
  version → 0.5.8.

## [0.5.7] — 2026-08-24

Chunk-performance mods. Adds **C2ME** (parallel chunk gen/load/IO) and re-adds **Vertigo** (vertical
chunk-section network sync), targeting the tall Big Globe world's chunk-streaming cost. Both are
performance-only and independently removable.

### Added (mods)
- **Concurrent Chunk Management Engine (C2ME)** `0.4.0-alpha.0.120+1.21.1` (Modrinth `COlSi5iR`,
  **native NeoForge**, no deps). Multi-threads chunk generation/loading + optimizes chunk I/O.
  Modular (20 submodules incl. `rewrites-chunk-system`, `threading-lighting`, worldgen-threading).
  `server: required`, `client: optional` (shipped `both`). **Alpha** (C2ME's normal state on 1.21.1).
- **Vertigo** `1.2.4` (Modrinth `4LzgJp1j`, Fabric via Sinytra Connector + FFAPI). Strips empty
  vertical sections from the ChunkData packet. Was in the reverted 0.6-beta; re-added here **without**
  the shallow-world datapack (that datapack, not Vertigo, caused the 0.6-beta DH offset).

### Compatibility — deep-dive (jar + mixin analysis)
- **No hard/declared incompatibilities.** Neither declares `breaks`/`conflicts`; C2ME only discourages
  `dynview` + `betterchunkloading` (both **absent**). C2ME bundles **MixinSquared** (mixin-coexistence
  lib); pack already runs Lithium/Sodium/ModernFix/FerriteCore, which C2ME coexists with by design.
- **C2ME × Big Globe — low.** C2ME's worldgen opts target vanilla `NoiseChunkGenerator`/density
  functions, which BG's custom `bigglobe:scripted` generator **bypasses** → those modules are largely
  inert (little benefit, little conflict). C2ME's generic chunk-system rewrite still wraps BG's
  generator with threaded scheduling; BG has its own thread pool, so watch for worldgen races/hangs.
  Lever: disable worldgen-threading / chunk-system in `config/c2me.toml`.
- **Vertigo × C2ME — real overlaps, TEST before relying.** Both mixin `ChunkDataSender`, `ChunkHolder`,
  `WorldChunk`. Highest-risk overlap is **lighting**: Vertigo syncs skylight (`WorldChunk_SyncSkylight`,
  `ChunkSkyLight_Accessors`) while C2ME's `threading-lighting` threads `ServerLightingProvider`/
  `LightStorage` → possible lighting glitches / races. First lever if it misbehaves: disable C2ME
  `threading-lighting`.
- **× Distant Horizons.** Both touch chunk gen / view distance; C2ME is Sodium/VD-aware. The earlier
  "600-block" DH glitch was the shallow-world floor mismatch, **not** these mods.

### Config / pack
- Added `pack/mods/c2me.pw.toml` + `pack/mods/vertigo.pw.toml`. `pack/index.toml` + `pack/pack.toml`
  re-indexed; version → 0.5.7.

## [0.5.6] — 2026-08-24

Log-noise / console-spam fixes. Two systems were flooding the server log every tick / during
worldgen (wasting CPU + disk I/O and bloating `latest.log`): Project Atmosphere had no temperature
data for Big Globe biomes, and CTOV referenced village integration pools for mods that aren't installed.

### Fixed
- **Project Atmosphere biome temperatures** — `config/projectatmosphere/biome_temps.json` only defined
  `minecraft:plains`, so PA's per-tick `WeatherMgr` warned *"No temperature range defined for biome
  bigglobe:…"* for the entire (all-BG-biome) overworld, endlessly. Added Celsius ranges for all **52**
  BG biomes: seasonal (spring/summer/autumn/winter) for surface biomes by climate tier
  (hot/warm/temperate/cold/frozen/swamp), and stable `all` ranges for oceans, caves, nether, end, and
  special biomes.
- **CTOV missing template-pool spam** — CTOV 3.6.3 buildings reference optional cross-mod integration
  pools (Waystones, Vampirism, bounty board) that aren't installed, so Lithostitched logged *"Couldn't
  find template pool reference"* for every village piece during generation. Added
  `pack/datapacks/ctov_integration_fallbacks.zip` defining the 7 referenced pools
  (`ctov:village/` `waystone/{sand,normal,mossy}`, `vampirism/totem`, `bounty/{bounty_board,plains,swamp}`)
  as empty pools so they resolve silently. Villages generate identically. **Remove this datapack if
  Waystones/Vampirism/a bounty mod is ever added**, or the empty pools would shadow theirs.

### Known / open
- `ItemStack: Tried to load invalid item: 'No key id in MapLike[{}]'` (near 51, 228, -4860) — a
  malformed empty item during load; non-fatal (MC drops it and continues). Source not yet identified.

### Config / pack
- Modified `pack/config/projectatmosphere/biome_temps.json`; added
  `pack/datapacks/ctov_integration_fallbacks.zip`. `pack/index.toml` + `pack/pack.toml` re-indexed;
  version → 0.5.6.

### Note — changelog gap
- Versions 0.5.2–0.5.5 were never recorded here. Per commit history, `main` since 0.5.1 also received:
  MapStitch removed, **Too Fast** and **Creating Space** added, and the **0.6-beta** work (Vertigo +
  shallow-overworld datapack) reverted and parked on the `0.6-beta` branch.

## [0.5.1] — 2026-08-23

Hotfix: restore **Villager API**. In 0.5 it was removed as an assumed Better-Village-only dependency,
but **Numismatic Overhaul (Numismatic Bounties) also requires it** — its absence crashed mod loading
(`Mod numismaticoverhaul requires villagerapi 1.0 or above ... not installed`). Better Village stays removed.

### Added (mods)
- **Villager API** (`villagerapi`, CurseForge project 1396381 / file 7533486) — re-added; required by
  Numismatic Overhaul (and previously by the now-removed Better Village).

### Config / pack
- Restored `pack/mods/villagerapi.pw.toml`. `pack/index.toml` + `pack/pack.toml` re-indexed.

## [0.5] — 2026-08-23

Village overhaul + glacier tuning. CTOV becomes the sole village system (biased toward large walled
villages, walls extended across more biomes; vanilla villages and Better Village removed), and glacier
ice is made smaller and sparser.

### Removed (mods)
- **Better Villages** + its dependency **Villager API** — Better Village only reskins *vanilla*
  village jigsaw pools, which are now disabled (below), so it produced nothing under Big Globe.

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
