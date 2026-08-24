# Changelog

All notable changes to the **Brave New Globe** modpack are documented here.
This file tracks mod additions/removals, mod version updates, and config/pack changes.

## [0.6.8] — 2026-08-24

Deep-water Leviathan. Sea Myths' Leviathan was spawning at the surface (Big Globe's spawn format has
no Y field, so biome was the only prior lever). Added **In Control!** to hard-clamp its spawn height.

### Added (mods)
- **In Control!** `10.2.7` (CurseForge, NeoForge 1.21) — spawn-rule engine. No McJtyLib dependency in
  this build (only an optional Lost Cities dep, absent). Governs BG-world spawns because Big Globe
  uses vanilla `SpawnHelper`, so the NeoForge spawn events In Control hooks still fire.

### Config / pack
- `pack/config/incontrol/spawn.json` — deny `seaeater:leviathan` at Y ≥ −49, so it only spawns at
  **Y ≤ −50** (deep). Ocean floor is the natural lower bound; no hard −100 floor (that would exclude
  the deepest trenches). All other mobs unaffected.
- Added `pack/mods/in-control.pw.toml`; `pack/index.toml` + `pack/pack.toml` re-indexed.

## [0.6.7] — 2026-08-24

Glaciers: nudge the temperature bar colder for a few fewer glacier oceans — `unmixLinear(-0.35, -0.6)`
→ **`unmixLinear(-0.4, -0.65)`** (glacier now only where temp < −0.40). Size (C=0.4) and the solid-sheet
look unchanged.

## [0.6.6] — 2026-08-24

Glaciers: **fewer + smaller.** Two independent dials, plus keeping the biome and ice footprints matched.
- **Frequency (rarer glacier oceans)** — `glacier_crack_threshold.json` temperature bar
  `unmixLinear(-0.25, -0.5, temp)` → **`unmixLinear(-0.35, -0.6, temp)`** (glacier only where colder).
- **Size (smaller glaciers)** — cutoff **C = 0.4** applied to *both*:
  - feature `glaciers.json`: `1.4 × (crack_threshold − 0.4)` (solid sheet, no cap)
  - biome `shallow_ocean_test_glacier.json`: `hard_distance < 1.4 × (crack_threshold − 0.4)`
  So the glacier **biome** and the **ice** shrink together — and since Aquamirae is keyed to the glacier
  biome, its cracked ice / arcs / spirals shrink to the same smaller footprint.
- Kept: de-grid (variation 40), solid-sheet look (0.6.5).

Tuning: temp bar colder → rarer; C higher → smaller (they compound, so nudge gently). ⚠️ The biome
file is a decision-tree override — if the *biome* doesn't shrink in-game (only the ice does), it needs
to move into the patched jar; the temp bar + ice size will apply via datapack regardless.

## [0.6.5] — 2026-08-24

Glacier: reverted to the **solid-sheet** look (v2). Dropped the `0.75` fill cap and the `0.6` footprint
cutoff, back to `1.4 × (glacier_crack_threshold − 0.25)` (no cap) so deep/cold cells merge into a
continuous sheet again (preferred over the broken-floe look). Size to be reduced via the **biome**
next, not the feature cap.

## [0.6.4] — 2026-08-24

Glacier tuning: shrink the glacier's **footprint** (v3's cap broke it into floes but it still covered
the whole cold ocean). Raised the coverage cutoff so BG ice only forms over the **deep/cold core**.
- `glaciers.json`: `min(1.4×(crack_threshold − 0.25), 0.75)` → `min(1.4×(crack_threshold − 0.60), 0.75)`.
- **The `0.60` cutoff is the glacier-size dial:** higher → smaller footprint (deeper core only); lower
  (toward 0.25) → larger, back toward continent-sized; ~1.0+ → essentially off (like v1).
- Cap stays `0.75` (broken floes, not one seamless sheet).

## [0.6.3] — 2026-08-24

Glacier tuning: shrink the main ice sheet. Capped the per-cell fill so cells can't fully merge into
one seamless mega-sheet — the big mass breaks into large floes while the small satellites (below the
cap) are untouched.
- `glaciers.json` fill: `1.4 × (crack_threshold − 0.25)` → `min(1.4 × (crack_threshold − 0.25), 0.75)`.
- Knob: the `0.75` cap = max sheet size (lower → smaller / more-broken main sheet).

## [0.6.2] — 2026-08-24

Glacier rework **v2** — fixes 0.6.1 producing **no ice at all**. The v1 `glacier_field` noise loaded
fine (no log error) but its value range never cleared the `0.5` cutoff, so the fill term was ≤ 0
everywhere → zero ice (biome still showed, since biome ≠ feature).

### Changed — `bigglobe_less_glacier`
- **Dropped the `glacier_field` noise** and drive ice off the **existing, proven `glacier_crack_threshold`**
  (the field the pre-0.6 datapack already used to place ice — no unknown noise range, guaranteed to
  generate). New fill: `hard_distance <= 1.4 × (glacier_crack_threshold − 0.25)`.
  - threshold ≤ 0.25 → open water · rising threshold → floes grow · deep/cold cores (threshold ≈ 1) →
    cells fully fill → **sheet**. Concentration + thinning + partial coverage come from
    `crack_threshold`'s natural cold/depth gradient (dense over deep cold water, fading toward shallows).
- Kept Voronoi `variation 40` (de-grid).

### Tunable
- Coverage: the `0.25` cutoff (raise → less ice).
- Sheet size: the `1.4` multiplier (raise → bigger sheets).

Datapack-only; affects newly generated cold-ocean chunks. Note: this is a "dense core → thinning to
shallows" look rather than discrete islands; if you want discrete sheets we can re-introduce a
peak-noise modulation now that we know the column value loads (v1 confirmed it registers).

## [0.6.1] — 2026-08-24

Ocean-glacier rework (**v1 — experimental, needs an in-game look**). Replaces the uniform grid of
identical ice floes with sparse ice **sheets that thin out into satellite floes and fade to open
water**, so a glacier ocean covers only part of its surface.

### Changed — `bigglobe_less_glacier`
- **New `glacier_field` noise** (`bigglobe_column_value/overworld/glacier_field.json`) — large-scale
  smooth field (scales 256 + 128) with sparse peaks. Drives where ice concentrates.
- **`glaciers.json` dispatcher** — ice now fills each Voronoi cell out to `2.0 × (glacier_field − 0.5)`
  instead of `0.4 × glacier_crack_threshold`. At a field peak cells fully fill and merge into **one
  sheet**; around it fill shrinks into **satellite floes**; past the peak (field ≤ 0.5) it's **open
  water**. Still gated to cold, deep, non-river ocean.
- **`glacier_cell.json`** — Voronoi `variation` 24 → **40** to break the grid so floes scatter
  organically.

### Tunable knobs (for iteration)
- Coverage: the `0.5` cutoff in `glaciers.json` (raise → less ice).
- Sheet size / falloff radius: `glacier_field` scales (smaller scale → tighter peaks / smaller radius)
  and the `2.0` fill multiplier (higher → bigger sheets).

### ⚠️ Caveats
- **Unverified worldgen scripting** — authored against BG's script/noise DSL but not compile-tested.
  On first load, watch the log for `bigglobe` column-value/script errors; if the glacier feature errors
  or `glacier_field` doesn't resolve, revert this datapack and ping for a fix.
- Only affects **newly generated** cold-ocean chunks. This is a **datapack** change (no jar/world reset
  needed) — but explore fresh ocean to see it.

## [0.6] — 2026-08-24

**Release** — the performance + shallow-world overhaul the earlier `0.6-beta` aimed at, now done
properly. Consolidates the 0.5.6–0.5.9 work (detailed entries below). Highlights:

- **Shallow overworld via a height-patched Big Globe jar** — floor −1024 → **−608**, ceiling +896;
  core/molten 96-thick + a 32-block stone cap above the deep dark; full 128 deep dark; deep-ore
  curves rescaled to fit. **DH-compatible** (the earlier offset is gone — the height now lives inside
  BG's own jar, the only place it reads it from). **~41% less** underground storage/gen.
- **Chunk-streaming performance** — **C2ME** (parallel chunk gen/load/IO, native NeoForge) + **Vertigo**
  (vertical chunk-section sync). Jar/mixin deep-dive found no hard conflicts; watch the Vertigo↔C2ME
  lighting overlap on first run.
- **Log-spam fixes** — Project Atmosphere temperatures for all 52 Big Globe biomes; CTOV
  integration-pool fallbacks (Waystones/Vampirism/bounty).

⚠️ **Fresh world required** (Big Globe's height changed). Verify F3 floor = −608 and DH LODs align.
Big Globe jar modified for personal-server use (CC BY-NC 4.0); served via public raw-GitHub — move to
a no-login host before making the repo private.

---

## [0.5.9] — 2026-08-24

Deeper, better-balanced shallow world. Moves the floor −464 → **−608** (more room), restores the
deep tiers toward full size, adds a stone buffer above the deep dark, and **rescales the deep-ore
curves** so diamonds/gold/redstone actually reach their intended richness in the shallower stone.
Supersedes the 0.5.8 −464 patch. Still a single height-patched Big Globe jar (the only mechanism
BG respects — it reads its generator + terrain scripts from its own jar every load).

### Changed — Big Globe patched jar (`bigglobe-5.3.2-mc1.21.1-shallow608.jar`)
New overworld layout (sea 0, ceiling +896, floor **−608**):

| Layer | Y range | Thickness |
|---|---|---|
| Cave zone | surface → −320 | (caves held 32 above the deep dark) |
| **Stone cap** | −352 → −320 | 32 (buffer, no caves/sculk) |
| Deep Dark | −480 → −352 | 128 (full) |
| Gap | −496 → −480 | 16 |
| Core / Molten | −592 → −496 | **96** (75% of default 128) |
| Lava Sea | −592 → −576 | ~16 |
| Base stone | −608 → −592 | 16 |

- **Core/molten → 96-thick** (75% of default); the freed 32 becomes a **solid-stone cap** between the
  deep dark and the cave zone (caves no longer open straight into the sculk). Implemented by holding
  cave depth 32 above `deep_dark_max_y` (`easy/medium/hard_depth.json`).
- **Ore curves rescaled ~×0.63** (new core-top −496 vs default −784) so ores keep their distribution
  but fit the shorter stone column: diamond ramp `256→512` → **`160→320`**, gold/redstone `128→256` →
  **`80→160`**, iron/copper exp `delay 512` → **320**, emerald `/−192` → **`/−128`**; lapis (surface→
  sea-level) and coal (uniform) unchanged. Net: diamonds now reach ~full richness above the core on
  all terrain (previously the molten core cut off the deep, richest band).
- **~41% less** underground storage/gen vs default (−608 keeps more than the −464 build's ~55%, in
  exchange for full-thickness tiers + full diamonds).
- 14 files edited in-jar by `build_patched_jar.py` (5 layout + 3 cave-depth + 6 ore); metafile pinned
  (no `[update]`). Big Globe by builderb0y (CC BY-NC 4.0), modified for personal-server use.

### Requirements / caveats
- **Fresh world required** (bounds changed again). Verify F3 floor = −608 and DH LODs align.
- **Repo-privacy caveat still applies:** jar served via public `raw.githubusercontent.com`; making the
  repo private breaks packwiz's anonymous download — move to a no-login host first.
- Re-patch on any Big Globe update (`build_patched_jar.py` asserts all 14 strings still exist).

### Config / pack
- Replaced `bundled-jars/bigglobe-…-shallow464.jar` → `…-shallow608.jar`; repointed
  `pack/mods/big-globe.pw.toml` (new filename/URL/sha256). `pack/index.toml` + `pack/pack.toml`
  re-indexed; version → 0.5.9.

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
