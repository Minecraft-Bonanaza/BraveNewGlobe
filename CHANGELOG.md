# Changelog

All notable changes to the **Brave New Globe** modpack are documented here.
This file tracks mod additions/removals, mod version updates, and config/pack changes.

## [0.9.0] — 2026-08-31

### Added
Complete FTB Quests book — **15 chapters, 230 quests** (guidance-only; every gate is objective:
item count, mod advancement, or kill/dimension/stat — no self-attest checkmarks). Three-phase arc per
industry line (Awareness → Functional → late-stage Achievement); locate-and-progress for exploration.

- **Create Core** (15) — kinetics, stress, first automation; the shared substrate.
- **Rails & Trains** (15) — track → station → train → schedule → signals; long-train / mass-track / long-travel capstones.
- **Aeronautics** (15) — assemble & fly a real airship (envelope/burner/propeller, Sable physics); reach the sky structures.
- **Cannons & Warfare** (11) — gunpowder → CGS firearm → cast-iron → Steel cannon → autocannon → Nethersteel arsenal.
- **Metalworking & Metallurgy** (17) — foundry/melting/casting/alloys → Steel/Tungsten/Obdurium megafactory.
- **Power & Fuel** (23) — three parallel tracks: Diesel, Steam (base Create), and Power Grid electricity.
- **Logistics & Storage** (16) — base Create package-logistics spine (packager→stock→factory gauge) + Factory Logistics / FXNT / Aero.
- **Industrial Enchanting** (7) — Blaze Enchanter → liquid-XP loop → mass enchanted books.
- **Commerce** (14) — Create: Numismatics (coins/vendors/bank) + Bountiful bounties + villager commerce.
- **Agriculture & Husbandry** (16) — Farmer's Delight / Brewin' & Chewin' / Ratatouille / Animal Weights.
- **Naval & High Seas** (17) — Create-ship building (Sable physics + buoyancy) + Aquamirae + Sea Myths + fishing.
- **Astronautics** (16) — Creating Space rocketry → reach_earth_orbit → foundry / propellant depot.
- **The Twilight Forest** (14) — portal → Naga → Lich → … → Final Castle boss ladder.
- **The Aether** (12) — glowstone portal → Bronze/Silver/Gold dungeon bosses → Phoenix armor.
- **When Dungeons Arise** (22) — structure-discovery ladder: common → sea → sky (Y700-750) → large dungeons → Coliseum.

Currency throughout is **Create: Numismatics** (Spur/Cog/Crown/Sun). Chapters are generated
deterministically from `bigGlobeAero/quest_lines/*.py` via `build_ftbquests.py` (re-runs are
byte-identical and progress-safe). Includes 3 hand-authored loot-crate reward tables.

### Notes
- No new mods — still **145**. Quest/config content only (`pack/config/ftbquests/`).
- **No fresh world** required from 0.7.1 onward.
- **Create Core is a content rewrite** of the 0.8.7 12-quest checkmark chapter (and the 0.8.0 / 0.8.8
  titles). Expect mixed or reset Create Core progress. New chapters start empty. Same-key regenerations
  stay progress-safe; this pass changed keys.
- Gates are objective task types (item count / mod advancement / dimension / stat). Boss “kills” are
  advancement-gated — there are no FTB Quests checkmark or kill task types in the book.

## [0.8.8] — 2026-08-30

### Fixed
- **Quest title formatting** — titles with a bare `&` ("Sheets & Plating", "Rotation & Ore Doubling",
  "Belts & Logistics") tripped FTB Quests' "escape whitespace after & with a \&" error (`&` starts a
  format code). The generator now auto-escapes a bare `&` → `\&` (leaves intentional color codes like
  `&a` untouched), so titles render the literal "&".

## [0.8.7] — 2026-08-30

### Changed — Create Core reworked to purpose-driven quests
- Rebuilt the **Create Core** chapter (15 → **12 quests**) from a "craft the block" walk (Arcane
  Engineering style) to a **purpose/automation model** (CAB style): each quest has you **use a machine to
  produce an output or do a task**, with descriptions that explain what it's for and what's next.
  - Item tasks require signature *outputs* (crushed raw ore, iron sheets, brass, precision mechanism);
    ambiguous steps (fan, saw, deployer, belts, fluids, capstone automation) use player-attested
    **checkmark** tasks ("I did it / automated it"). All output IDs verified against Create 6.0.10.
  - Capstone: build a **passive Andesite Alloy line** — the real Create skill every specialization builds on.
  - Rewards: scaling XP + **bootstrap-kit items** that seed the next step (casings, sheets, brass,
    precision mechanisms). Guidance-only — outputs auto-detect, nothing consumed except the player's choice.
- Generator (`bigGlobeAero/build_ftbquests.py`) gained checkmark tasks, item-count tasks, and item rewards.

## [0.8.6] — 2026-08-30

### Fixed
- **`pack.toml` index hash** — 0.8.5 was committed with a stale `[index]` hash (the PonderJS commit
  updated `index.toml` but not the hash in `pack.toml`), causing packwiz's "index hash file invalid"
  error. Re-refreshed so `pack.toml`'s hash matches `index.toml`. No mod changes.

## [0.8.5] — 2026-08-30

### Fixed — PonderJS (was a missing REQUIRED dependency, would crash on load)
- **Create Aeronautics: Delivery Required** declares `ponderjs` as a **required** dependency
  (`[1.21.1-2.4.0,)`), so the pack couldn't launch without it. PonderJS's 1.21.1 line ships as the
  project **"Ponder for KubeJS"** under the slug **`ponder`** (modId still `ponderjs`) — the old
  `ponderjs` slug has no 1.21.1 build, which is why the first search missed it.
- **Added (CurseForge):** Ponder for KubeJS `ponderjs-neoforge-1.21.1-2.4.0` (modId `ponderjs`, verified),
  plus its dependency chain that was also missing — **KubeJS** `2101.7.2`, **Rhino** `2101.2.8`,
  **Better Advanced Tooltips** `2101.1.0`. Supersedes the 0.8.4 "PonderJS dropped" note.

## [0.8.4] — 2026-08-30

### Added / restored — missing libraries
- **LDLib2** `2.2.37` (CurseForge, NeoForge 1.21.1) — KilaBash rendering/GUI library (CF "LDLib" project
  ships the `ldlib2-neoforge` jar).
- **oωo (owo-lib)** `0.12.15.5-beta.1` restored (CurseForge) — was removed in 0.7.18 as a Numismatic
  Overhaul-only dep, but it's still required by other mods.
- **PonderJS** — requested but **has no 1.21.1 NeoForge build** on CurseForge or Modrinth (upstream
  stalled ~1.20). Not added; pending an upstream release or a self-hosted jar.

## [0.8.3] — 2026-08-30

### Fixed
- **Create: Villager Commerce** self-hosted. CF distribution is disabled and it's not on Modrinth, so the
  jar (`createvillagercommerce-1.0.1.jar`, sha1 verified against CF) is committed to `bundled-jars/` and
  the metafile now points at its raw-GitHub URL (sha256) — anonymously downloadable by packwiz-installer,
  same pattern as the other bundled jars.

## [0.8.2] — 2026-08-30

### Fixed — CurseForge distribution-disabled mods
- **Create: Linear Bearing** re-pointed **CurseForge → Modrinth** (`linear-bearing`, NeoForge 1.21.1,
  1.2.6 → 1.3.5). CF had `allowModDistribution:false`, so packwiz-installer couldn't download it for
  clients; Modrinth CDN is anonymous-downloadable.
- **Create: Villager Commerce** — also CF-distribution-disabled, but **not on Modrinth** (All-Rights-
  Reserved, no source repo). Must be **self-hosted** in `bundled-jars/` (jar obtained manually from CF);
  pending the jar.

## [0.8.1] — 2026-08-30

### Changed — deterministic quest IDs
- Quest generator now derives all FTB Quests IDs (chapter/quest/task/reward) from **stable keys** via
  SHA-1 instead of random hex. Regenerating a chapter yields identical IDs, so re-runs are
  **progress-safe** (FTB Quests keys player progress by ID) and cross-chapter reward references stay
  valid. Create Core's IDs are regenerated once to their stable values.

## [0.8.0] — 2026-08-30

### Added — FTB Quests: Create Core line (guidance quest book begins)
- First quest chapter **Create Core** (`config/ftbquests/quests/chapters/create_core.snbt`) — 15 guidance
  quests: Andesite Alloy → kinetics/power → Andesite Casing & core machines (press, mixer, fan, deployer,
  saw, logistics) → Copper Casing & fluids → Brass → Precision Mechanism → Mechanical Mastery (capstone).
  Item-detection tasks (no consume), soft dependency ordering, XP + small item rewards. Nothing gated
  across lines.
- Quest-line roadmap recorded in `QUESTS.md` (15 flat, guidance-only lines). Structure inspired by public
  Create packs (Arcane Engineering / CAB) — original text + Create 6.0.10-verified item IDs, no copied content.
- Generated by `bigGlobeAero/build_ftbquests.py`; the committed `.snbt` is the **source of truth** —
  regenerate from the script rather than overwriting via in-game edit mode.

## [0.7.19] — 2026-08-30

### Added — FTB Quests (progression scaffolding)
- **FTB Quests** `2101.1.34`, **FTB Library** `2101.1.35`, **FTB Teams** `2101.1.11` (NeoForge 1.21.1,
  CurseForge — the official FTB mods aren't on Modrinth). Architectury already present.
- Foundation for a **guidance-only** quest book: a Create core line + independent specialization lines
  (aero, economy, Aether, Twilight, WDA), none gated by each other. Quest content authored in a later
  pass under `config/ftbquests/`.

## [0.7.18] — 2026-08-26

### Added — Numismatics economy ecosystem
- **Create Numismatics: Villager Currency** `1.2.0` — starter coin faucet via in-person villager trades
  (emerald costs → Numismatics bevels; works with vanilla & modded villagers).
- **Create: Numismatic Bounties** `2.0` — Bountiful bounty payouts in Numismatics coins (pairs with
  **Bountiful**, already in pack).
- **Create: Tradeworks** `1.0.7` — physical barter stalls; integrates with Marketplace & Stock Market.
- **Create: Marketplace** `0.5.0` — server-wide shop directory (no remote purchasing; trade at the block).
  Optional Xaero's waypoint integration — **Xaero's Minimap/World Map already in pack**.
- **Create: Stock Market** `1.1.0` — Market Terminal for shop listings, 24h price history & top sellers.
- **Create: Numismatics Utils** `2.2` — Bank Meter HUD & account QoL.
- **Numismatics Calculator** `1.2.0` _(client)_ — coin math helper.
- No new hard dependencies — **Create**, **Create: Numismatics**, **Bountiful**, and **Villager API**
  (MCA Reborn) were already present.

## [0.7.17] — 2026-08-26

### Changed — economy mod swap
- **Removed Numismatic Overhaul: Neoforged** and **Numismatic Bounties** — the pack's previous
  coin/purse economy (Villager API trade integration via Numismatic Overhaul).
- **Removed oωo (owo-lib)** — was only required by Numismatic Overhaul.
- **Added Create: Numismatics** `1.0.20` (Modrinth) — Create-styled currency (coins, bank cards,
  vendors) required by the new delivery mod.
- **Added Create Aeronautics: Delivery Required** `1.0.2` (Modrinth) — contract-based delivery
  logistics for Aeronautics contraptions; payouts use Numismatics currency.
- Dropped shipped `numismaticoverhaul-*` configs; Numismatics generates its own on first launch.
- **Villager API** stays in the pack — still required by **MCA Reborn**.

## [0.7.16] — 2026-08-25

### Added — Better Combat
- **Better Combat** (ZsoltMolnarrr / "by Daedelus"), NeoForge **2.4.0+1.21.1**. Player-side melee
  overhaul: attack animations, weapon-arc collision hits, combos, dual-wielding. It does **not** modify
  mob/villager AI, so it doesn't affect MCA Reborn villager behavior or add per-entity tick cost.
- Both required libraries were **already in the pack** (playerAnimator, Cloth Config) — no new deps.
  packwiz re-pointed those two from CurseForge to Modrinth at the **same versions** (cloth-config
  15.0.140, playerAnimator 2.0.4) — identical jars, just a more installer-friendly source.
- Gameplay note: arc-hits can strike multiple entities at once, which near a village could anger
  several MCA villagers with one swing (reputation). Tunable in Better Combat's settings.

## [0.7.15] — 2026-08-25

### Fixed
- **nest** frequency corrected **0.0065 → 0.65** (65%, not 0.65%). 0.7.13 read the value too literally
  and made the nest ~19,000 blocks apart (locate-only). At 0.65 on the 96 grid it's **~1,900 blocks
  apart** — a modest ~24% rarer than the grid alone, findable as intended.

## [0.7.14] — 2026-08-25

### Changed
- **common** set: added `exclusion_zone` → `bigglobe_ctov:villages` (**8 chunks**) so the small POIs
  (camps, huts, wells, mines, etc.) don't generate right on top of villages.

## [0.7.13] — 2026-08-25

### Changed — nest rarity + sky density
- **nest** (mechanical_nest): added `frequency` **0.0065** (0.65% roll per grid-selected chunk, stacked
  on the 96 spacing) → **ultra-rare, ~19,000 blocks apart** on average. Also added an `exclusion_zone`
  → `stattinkerer:sky` (12 chunks) so a nest won't generate right next to other sky structures.
- **sky** spacing/separation **48/42 → 32/28** (now matches `common`) — airships/blimps notably more
  common. Sky keeps its existing exclusion vs `large_dungeon`.

## [0.7.12] — 2026-08-25

### Changed — mechanical_nest split into its own set
- **mechanical_nest** moved out of `large_dungeon` into a new **`stattinkerer:nest`** set
  (spacing/separation **96/80**, ~1536 blk, salt sqrt(3)·1e8). It's the aerial nest (flies Y700–750),
  so grouping it with ground dungeons was diluting them: `large_dungeon` now holds only the **3 ground
  dungeons** (infested_temple, keep_kayra, kisegi_sanctuary), which tightens a *specific* one from
  ~9000 blk to ~7800 blk apart. mechanical_nest's frequency is now its own independent knob (spacing
  = frequency, single member).

## [0.7.11] — 2026-08-25

### Changed — spawn frequency
- **sky** set spacing/separation **64/44 → 48/42** (now identical to `sea`) — airships slightly more
  common, on the same grid density as the sea structures.
- **large_dungeon** spacing/separation **64/56 → 280/250** — a **4000-block minimum separation**
  (250 chunks) with a 280-chunk grid (~4480 blk average). Big land dungeons are now rare and guaranteed
  well spread out. Note: with 4 equal-weight members, a *specific* dungeon type averages ~9000 blocks
  apart. Salts and exclusion zones unchanged.

## [0.7.10] — 2026-08-25

### Changed — land dungeons use `bury` to kill steep-terrain gaps
- **infested_temple**, **kisegi_sanctuary**, **keep_kayra**: `terrain_adaptation` beard_box → **`bury`**.
  beard_box only reaches ~12 blocks below the footprint (fixed engine kernel), so on steep slopes the
  downhill side floated. `bury` fills all air inside the bounding box with terrain (structure carves its
  walls/rooms back out) → no gaps on any terrain, at the cost of a terrain embankment on steep downhill
  sides. bury is stock WDA's own choice for infested_temple. Anchor unchanged (start 0 / #bigglobe:land).

## [0.7.9] — 2026-08-25

### Reverted — put the 3 land dungeons back on the proven `start 0` anchor
- **infested_temple**, **kisegi_sanctuary**, **keep_kayra**: `start_height` → **0** (was −15 in 0.7.8),
  keeping `WORLD_SURFACE_WG` + `beard_box` + `#bigglobe:land`. `start 0` is the config from 0.7.0/0.7.1
  (and 0.7.7) under which the structures were set to generate — it puts the biome check right at the
  surface, a **full 16-block margin** above Big Globe's `surface−16` cave threshold, so `#bigglobe:land`
  reliably matches. 0.7.8's −15 left only a 1-block margin (fragile).
- Root cause of the missing temples/sanctuaries: **0.7.2** sank infested/kisegi to −45/−25, pushing the
  biome check into BG's underground zone where `#bigglobe:land` never matches → **zero generation** from
  0.7.2 through 0.7.6. keep_kayra stayed at 0 the whole time, which is why keeps kept appearing.
- NOTE: structures only generate in **newly-generated chunks** — already-explored terrain will not gain
  them retroactively. Test in a new world or unexplored terrain.

## [0.7.8] — 2026-08-25

### Changed — seat the 3 land dungeons 15 blocks into the ground
- **infested_temple**, **kisegi_sanctuary**, **keep_kayra**: `start_height` surface offset → **−15**
  (was 0), keeping `WORLD_SURFACE_WG` + `#bigglobe:land`. −15 sits just **above** Big Globe's
  `surface−16` cave threshold, so the biome check stays in a land biome and they keep generating
  (−16 or deeper would flip to an underground biome and stop them — the 0.7.2 failure mode).
- All three use **`beard_box`** terrain adaptation to build a foundation down to the ground and fill
  any exposed gap under the seated structure. (keep_kayra was `beard_thin` → now `beard_box` too.)

## [0.7.7] — 2026-08-25

### Fixed — infested_temple & kisegi_sanctuary weren't generating (regression from 0.7.2)
- 0.7.2 lowered their anchors (infested −45, kisegi −25) to seat them, but Big Globe switches to
  cave/underground biomes below **surface−16** (`test_cave`), and both are gated to `#bigglobe:land`
  (surface biomes) → biome mismatch → **zero spawns**. Reverted their anchors to **surface (0)** so
  `#bigglobe:land` matches again, and switched `terrain_adaptation` to **`beard_box`** (builds a solid
  foundation down to the ground to fill the float gap, instead of sinking the anchor). A structure
  can't be both *sunk* and *land-gated* in BG — sinking moves the biome check underground.

### Changed
- **foundry** −520 → **−540**.

## [0.7.6] — 2026-08-25

### Changed
- **foundry** −540 → **−520** — more clearance (88 above the −608 floor, 56 above the lava sea at
  −576), still within the core/molten layer (−592..−496).

## [0.7.5] — 2026-08-25

### Changed
- **foundry** −560 → **−540** (floor safety). The −608 world floor sat only 48 blocks below −560
  (= foundry's tallest piece), so a downward build could clip at the floor. −540 clears the floor by
  ~20 blocks even in the worst case, still within the core/molten layer (−592..−496).

## [0.7.4] — 2026-08-25

Underground dungeon depths (all in `common`, all still `#bigglobe:underground`).

### Changed — depths (`bigGlobeAero/patch_wda_compat.py`)
- **scorched_mines** −200 → **−150** and **plague_asylum** −133 → **−300** (both in the cave zone).
- **foundry** −100 → **−560** — seated in the **core/molten rock layer** (core −592..−496; lava sea
  tops at −576, so the forge sits ~16 above the lava). `#bigglobe:underground` includes `the_core`
  and `molten_cave`, so the biome matches at that depth.

## [0.7.3] — 2026-08-25

Structure spacing/exclusion tuning (from post-0.7.2 testing).

### Changed — structure placement (`bigGlobeAero/patch_wda_compat.py`)
- **Villages ↔ large dungeons:** widened the buffer — `large_dungeon`'s exclusion_zone vs
  `bigglobe_ctov:villages` **6 → 12 chunks** (~192 blocks).
- **Sky ↔ large dungeons:** air structures were spawning on/near large dungeons. Added a
  `sky` exclusion_zone vs `stattinkerer:large_dungeon` at **12 chunks** (sky won't place within 12
  chunks of a large dungeon), and widened sky's jitter (`separation 56 → 44`, spacing 64 unchanged)
  for placement variation. A set allows one exclusion_zone, so it lives on sky
  (`sky → large_dungeon → villages`, no cycle).

## [0.7.2] — 2026-08-25

Structure placement tuning (from post-0.7.1 world testing).

### Changed — WDA structure placement (`bigGlobeAero/patch_wda_compat.py`)
- **`infested_temple`** and **`kisegi_sanctuary`** generated **floating above the ground** — their
  jigsaw start-anchor sits above the build's base, so surface-projecting `start_height 0` left an air
  gap. Dropped the anchor to seat them: **infested_temple 0 → −45**, **kisegi_sanctuary 0 → −25**
  (both still `WORLD_SURFACE_WG` + `beard_thin`). `keep_kayra` left at 0 (its anchor≈base, sat fine).
  (On steep slopes a residual gap can remain; `beard_box` is the stronger option if needed.)
- Moved **`heavenly_challenger`** from `large_dungeon` → **`sky`**, so all heavenly/aerial builds live
  in the sky set. `sky` now 5 (Σweight 7), `large_dungeon` now 4.

## [0.7.1] — 2026-08-25

Hotfix: crash on "Create New World" — the BG×WDA compat pack (v1.1, built for an older WDA) ships a
`small_prairie_house` structure def whose `start_pool` was removed/renamed in WDA 2.1.68. Even though
it's in none of our sets, MC loads every structure definition, hits the missing pool → `Unbound
values in registry template_pool` → registry-load crash. Dropped the orphaned def + biome tag from
the compat datapack via `bigGlobeAero/patch_wda_compat.py`.

### Fixed
- `bigglobe_whendungeonsarise.zip` — remove `dungeons_arise:small_prairie_house` structure def and its
  biome tag (missing template_pool in WDA 2.1.68). Verified: no remaining structure def references a
  missing pool.

## [0.7.0] — 2026-08-24

Sky content for airships: raised the world ceiling back to stock and added **When Dungeons Arise**
with its aerial structures re-heighted for airship travel.

### Changed — world height (patched Big Globe jar)
- Ceiling **+896 → +1024** (stock); floor **stays −608**. New overworld bounds **−608 → +1024**
  (height 1632). Restores full sky headroom for airship / skyland / aerial-structure content while
  keeping the deep-floor disk + chunk-loading savings intact. `dimension_type`, `world_preset`
  generator, and BG world-traits (`max_y`) all set in-jar so **Distant Horizons tracks the new
  bounds**: DH anchors to generator `min_y` = −608 (unchanged) and now renders LODs up to +1024 —
  no offset. Underground layers + ore curves unchanged (the floor didn't move). `cloud_height`
  already 1024, so clouds sit at the ceiling.
- Rebuilt via `bigGlobeAero/build_patched_jar.py`; `bundled-jars/bigglobe-5.3.2-mc1.21.1-shallow608.jar`
  sha256 `df683d31…`; `big-globe.pw.toml` hash updated. (No filename change — "608" = the floor.)

### Added (mods / datapacks)
- **When Dungeons Arise** `2.1.68` (Modrinth `8DfbfASn`, NeoForge 1.21.1) — adventure structures
  including aerial airship targets. Only neoforge + minecraft deps (no libraries). `side = both`.
- **Big Globe × When Dungeons Arise compatibility** datapack `1.1` (Modrinth `5obAEsYh`) — makes WDA
  generate in Big Globe terrain (biome `has_structure` tags + per-structure placement). Bundled at
  `pack/datapacks/bigglobe_whendungeonsarise.zip`, **patched** for airship-altitude aerial structures
  + a sky/sea/common/land structure-set split (see below).

### Changed — aerial structure heights (in the compat datapack, via `bigGlobeAero/patch_wda_compat.py`)
- All aerial structures spawn at a **fixed absolute altitude** — `start_height` = uniform **Y 700–750**,
  with **no** heightmap projection — a terrain-independent open-sky layer that needs an airship to
  reach. Fixed-Y can't clip the +1024 ceiling (tops out ~Y 878), and BG land rarely nears Y 700 so
  they won't intersect terrain. Also forced **`terrain_adaptation: none`** (restoring WDA's own
  setting) so these flying builds get **no terrain base** — the compat pack had set `bury` on the
  aerial structures, which at altitude would encase each in a stone blob. (Ground structures keep
  their own adaptation, e.g. `coliseum` → `beard_box`.)
- Aquatic ships (`illager_galley`, `undead_pirate_ship`, `typhon`, `illager_corsair`) left at sea level — they're naval, not aerial.

### Changed — WDA structures split into 4 custom sets (sky / sea / common / large_dungeon)
- WDA ships all structures in two sets (`major`/`minor`) with one shared spacing each, so rarity
  couldn't be tuned per theme/size. Regrouped into four custom sets under the `stattinkerer`
  namespace — **`:sky`** (4), **`:sea`** (4), **`:common`** (11), **`:large_dungeon`**
  (5 — massive dungeons + the flying `heavenly_challenger`, grouped here for rarity but still
  airborne at Y 700–750) — each with its own `placement` (spacing/separation/salt), and **emptied
  WDA's own `major`/`minor` sets** so nothing double-places. common vs large_dungeon was split by
  measured build size. **24 of the 38** WDA standalone structures generate; **14 removed** (in no set):
  illager_windmill, mushroom_village, mushroom_mines, thornborn_towers, coliseum, jungle_tree_house,
  lighthouse, abandoned_temple, greenwood_pub, monastery, illager_fort, bathhouse, bandit_towers,
  shiraz_palace. Weights = WDA originals for now; spacings (sky 64/56, sea
  48/42, common 32/28, large_dungeon 64/56) pending further tuning. Groupings in `bigGlobeAero/patch_wda_compat.py`.

### Fixed — compat pack mismatches with WDA 2.1.68
- The BG×WDA compat (v1.1) targets an older WDA and assumes stock Big Globe. For the structures we
  use: **`foundry`** was placed at **Y 900 in `#bigglobe:nether`** (a floating nether forge) → rebuilt
  as an **overworld underground forge** (Y −100, `#bigglobe:underground`, `bury`); added the missing BG
  biome bridges for **`mining_complex`** (2.1.68 renamed the compat's `mining_system`) and
  **`kisegi_sanctuary`** so they generate at all. **`plague_asylum`**, **`foundry`** + **`mining_complex`**
  moved to `common` (now 11; large_dungeon then 11, later trimmed to 5). All placed structures generate.
- **`scorched_mines`** re-gated from `bigglobe:molten_cave` (only exists ~Y −496+ in this shallow
  world, so it never matched at its Y) to `#bigglobe:underground`, and moved to **Y −200** so it generates.
- **`bandit_village`** re-gated `bigglobe:hot_wasteland` (one biome) → **`#bigglobe:warm`** (whole warm
  band, far less rare). **`ceryneian_hind`** is a surface shrine (per videos), so moved from a buried
  `sandy_cave` @ Y −93 to **on the surface** (`start_height 0`, `beard_thin`), gated to `#bigglobe:warm`.
- **large_dungeon placements**: grounded the 3 giant towers (`keep_kayra` 250-tall, `infested_temple`
  181, `kisegi_sanctuary` 215 — were floating/sunk → `start_height 0` + projection + `beard_thin`);
  flew **`mechanical_nest`** (short 48-tall sprawl, was floating at fixed Y 190) to **Y 700–750**. All
  four re-gated to **`#bigglobe:land`** (spawn in all land biomes).
- **Village buffers (exclusion zones)**: `bigglobe_ctov:pillager_outposts` and `stattinkerer:large_dungeon`
  each get an `exclusion_zone` vs **`bigglobe_ctov:villages`** at **6 chunks** — outposts + big dungeons
  keep clear of villages (villages stay the priority; a set allows only one exclusion_zone, so it's
  applied on the avoiders). Edits `bigglobe_ctov_compat.zip` (via `bigGlobeAero/patch_ctov_compat.py`).
- **`mining_complex`** is a ~197-tall tower → **sunk** so only ~10 blocks peek above the surface:
  surface-projected, `start_height −187`, `terrain_adaptation none` (embeds the buried ~187 in the
  ground). Now in `common`. Exact poke-out to be confirmed on a test world.

### Notes
- The world-bounds change requires a **fresh world** (or regenerating the top) + a DH cache clear so
  the raised ceiling renders cleanly. The floor is unchanged, so existing deep terrain stays aligned.
- WDA's `neoforge.mods.toml` declares minecraft `[1.21,1.21.1)` (its shipped 1.21.1 release) — loads on NeoForge 21.1.x.

## [0.6.11] — 2026-08-24

Two mods added:

- **Corpse** (henkelmax) `neoforge-1.21.1-1.1.13` (CurseForge 316582 / file 7018307) — on death, spawns
  a lootable model of your body at the death spot; right-click to recover items, with a death-history
  list + optional death waypoint. Standalone (Jade/OpenHUD deps optional; Jade already in pack). `side = both`.
- **Create Aeronautics: Throwable Rope Connector** `0.4.3` (CurseForge) — a Create Aeronautics add-on.
  Required deps already satisfied by the pack (Create 6.0.10, `aeronautics_bundled` 1.3.1). `side = both`.

## [0.6.10] — 2026-08-24

Remove **C2ME** — it was causing chunk-loading bugs (the predicted C2ME × Vertigo lighting /
chunk-system mixin overlap). Removing it eliminates the conflict.

### Removed (mods)
- **C2ME** (`c2me`, NeoForge alpha, added in 0.5.7). Leaf mod — nothing depends on it. **Vertigo
  remains** (lower-risk on its own); if chunk-loading issues persist, Vertigo is the next suspect.

### Config / pack
- Removed `pack/mods/c2me.pw.toml`; `pack/index.toml` + `pack/pack.toml` re-indexed. (Any runtime
  `config/c2me.toml` on a player's machine becomes an inert orphan — harmless.)

## [0.6.9] — 2026-08-24

Large Sea Myths creatures: deep-only + rarer. Extends 0.6.8's Leviathan clamp to all three large
`seaeater` mobs and halves their spawn weight.

### Changed — In Control (`config/incontrol/spawn.json`)
- Clamp **kraken, leviathan, sea_eater** to **Y ≤ −50** (deny at Y ≥ −49) — was Leviathan-only.

### Changed — spawn weights (`stattinkerer_bigglobe_compat`)
- Halved natural spawn weight **4 → 2** for `seaeater:kraken`, `seaeater:leviathan`,
  `seaeater:sea_eater` (files renamed `..._4_1_1` → `..._2_1_1`) — rarer big-creature spawns within
  the ocean mob pool.

### Config / pack
- `pack/config/incontrol/spawn.json` + `pack/datapacks/stattinkerer_bigglobe_compat.zip` updated;
  `pack/index.toml` + `pack/pack.toml` re-indexed.

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
