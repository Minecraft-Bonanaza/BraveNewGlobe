# Brave New Globe — Notes

Miscellaneous maintainer/config notes for the pack.

## Derek's Notes
Under config, need to enable hyperspeed generation in Big Globe's config to support DH API usage when
generating LODs. Otherwise DH doesn't recognize the renderer and will memory leak.

## Rendering toggle (Iris / Iris Flywheel Compat / Distant Horizons)
These three optional mods must be enabled or disabled **together** (all ON or all OFF). Running Iris
without Distant Horizons alongside our mandatory rendering mods (Flywheel/Create) results in buggy
rendering. They ship as `optional = true, default = false` in their `pack/mods/*.pw.toml` files.

## Known issue — DH + Simple Clouds artifacting under Iris
With Distant Horizons and Simple Clouds running under Iris rendering, artifacting will sometimes appear
across the boundary between the two render zones (the DH/far zone and the near zone).

Fixes:
- **Permanent:** disable the bottom 3 settings under **Visual** in the Simple Clouds config, **or** let
  the LODs fully load.
- **Temporary:** if artifacting occurs, reload the shaders and it should go away.

## Current pack state (0.9.25)

Living rules. CHANGELOG stays historical.

- **Version / count:** `pack.toml` **0.9.25**, **166** mods. Quest book **17 / 242**.
  Warnautics is **1.0.8** (needed for JACKPOT `cruise_missile`). **Create Aeronautics**
  is **1.3.2** (Modrinth). **0.9.19** removes **Sable: Destructive** (reverted the
  0.9.18 addition per co-curator decision). **0.9.20–0.9.23** (one `pack.toml` bump)
  add AeroPortals + the ComputerCraft stack + Create: Radiologistics. **0.9.24** adds
  Gadgets & Gizmos `1.2.2` and bumps Aeronautics 1.3.1 → 1.3.2. **0.9.25** re-adds
  **Create: Market Maker** `0.5.0`. 0.9.17 is the Simply Swords WDA-scope loot
  rebalance (script-only).
- **No fresh overworld** from 0.7.1 → 0.9.25. New Cataclysm / Bosses'Rise / Born in Chaos /
  Integrated Villages airships / tighter WDA spacings still need **unexplored chunks**.
  Nether added in 0.9.4 — existing Nether chunks stay vanilla until regenerated.
- **World height:** patched Big Globe jar, floor **−608**, ceiling **+1024**. Do not
  `packwiz update` Big Globe. Fresh world is only required from pre-0.6 (floor) or 0.6.x
  (ceiling; or regen the top + clear DH).
- **Datapacks** live in `pack/datapacks/` and packwiz installs them to the instance
  `datapacks/` folder. Paxi `Load from base 'datapacks' directory = true`. They are **not**
  under `config/paxi/datapacks/`. Current BG compat zips include
  `bigglobe_integratedvillages.zip` (airship-only), `bigglobe_simplyswords_nouniques.zip`
  (empty `lootable_uniques` tag), and `bigglobe_whendungeonsarise.zip` (hash re-synced in
  0.9.16 — zip and `index.toml` had drifted apart).

## Villages

- **CTOV** is the only ground village system (vanilla `bigglobe:villages` emptied).
- **Integrated Villages** `1.3.3` + **Integrated API** `1.8.2` (`side = both`): only the
  **airship village** generates (`regular_villages` emptied). Placement
  (`bigglobe_integratedvillages.zip` via `build_iv_compat.py`):
  - biomes `#bigglobe:land`
  - **surface + 300** (`WORLD_SURFACE_WG` + constant offset 300; was fixed Y=300 in 0.9.12)
  - `terrain_adaptation: none` (floats free)
  - `air_villages` spacing **75/59** (~1,200 blocks)
  - `air_village_avoid` → `bigglobe_ctov:villages` (8 chunks)
- Config (`defaultconfigs/integrated_villages-neoforge-1_21.toml`):
  `disableVanillaVillages=false` (keeps CTOV), `activateCreateContraptions=true`
  (airship propellers spin).

## When Dungeons Arise placement (current)

`bigglobe_whendungeonsarise.zip` via `patch_wda_compat.py`. WDA `major`/`minor` emptied.
Five `stattinkerer` sets:

| Set | Count | Spacing / sep | Notes |
|---|---|---|---|
| sky | 5 | **25/22** (~400) | aerial Y 700–750; 12-chunk exclusion vs large_dungeon |
| sea | 4 | 48/42 | ships at sea level |
| common | 11 | 32/28 | 8-chunk exclusion vs villages |
| large_dungeon | 3 | **125/111** (~2,000) | infested / kayra / kisegi; start 0 + `bury`; 12 vs villages |
| nest | 1 | **41/36** (~656) | `mechanical_nest`; frequency removed; 12 vs sky |

Outposts stay 6-chunk vs villages. Underground: scorched_mines **−150**, plague_asylum **−300**,
foundry **−540**. Do not restore `small_prairie_house` or WDA major/minor.

## Combat-dungeon loot

See **[LOOT.md](LOOT.md)**. LootJS is additive over combat/boss dungeon chests only
(WDA / Cataclysm / Bosses'Rise / Aquamirae). Five pools: FILLER ~28% / TREASURE ~35% /
TREASURE_GEAR ~15% (enchant 5–15) / JACKPOT ~38% / **JACKPOT_RUNIC** ~15% (enchant 10–25).
No endgame armor (ingots only). Metallurgy + andesite/zinc filler are **out** of the
wired pools. Currencies halved vs 0.9.12.

**Routing exceptions (0.9.17):** Aquamirae `ship_1` / `ship_2` / `frozen_chest` and
Bosses'Rise `dragon_tower` now also match TREASURE (they have no treasure-keyword in
the id). `NOTREASURE` is unchanged, so they still roll FILLER too. `dragon_tower`
already had JACKPOT — it now gets the full stack.

**One bad item id aborts the entire LootJS script** (every combat-dungeon chest silently
vanilla). The 0.9.15 hotfix dropped `aquamirae:oxygen_tank` — not a real id in Aquamirae
7.2.1. Jar-verify every id before adding. Echo compass stays.

**Create: Warnautics is `1.0.8`** (0.9.16 jar bump). The JACKPOT
`cbc_more_content:cruise_missile` drop needs 1.0.8 — do not roll back to 1.0.3.

**Simply Swords (0.9.17):** LootJS injects material-tier weapons into combat-dungeon
chests (Iron FILLER / Gold TREASURE / Diamond+Netherite TREASURE_GEAR / curated Runic
on `JACKPOT_RUNIC`). The native injector is still **on** globally but does **not**
reliably reach those WDA-scope tables. Named Uniques stay **out** (weight 0 + pity
100000 + empty `lootable_uniques` tag) — they skip the Runic Tablet minigame. Native
`runicLootTableWeight=0` still applies to the *native* injector. The Runic Tablet
left TREASURE_GEAR in 0.9.17 (`tabletHardPity=400` remains a far backstop). Remnants
stay off. Do not re-add `borninchaos_remnant_loot.js`. There is no
`config/simplyswords/general.toml` (removed in 0.9.11 — mob ability chance is not a
spawn/drop switch).

## Sable physics engine

**Sable** `2.0.5` is the physics engine required by **Create: Aeronautics** — it simulates
airships and Create: Better High Seas ships as physics objects. Keep it in the pack.

The **Sable: Destructive** add-on was added in 0.9.18 and **reverted in 0.9.19** (co-curator
decision); do **not** re-add it. Do **not** drop base Sable. Drive-By-Wire With Sable stays
**out**. Valkyrien Skies stays **out**.

## ComputerCraft, radio comms, and AeroPortals (0.9.20–0.9.23)

Jar adds only — no worldgen, datapack, loot, or quest-book change. No configs shipped
(they generate on first launch). Sable's download source is unchanged.

- **Create: AeroPortals** `1.3.3` (CurseForge 1549100 / file 8876165, `side = both`) —
  Sable SubLevels (airships + riding players) transfer through Nether/modded portals.
  Needs Sable **1.0+** (pack has **2.0.5**) and NeoForge **21.1.219+** (pack is **21.1.248**).
  Upstream calls it a proof of concept — watch multiplayer playtests.
- **CC: Tweaked** `1.120.2` (Modrinth `gu7yAYhd` / `1ewzHZYg`, `side = both`) — in-world
  Lua computers, turtles, monitors, modems. Complements KubeJS (author scripts).
- **NeoPeripherals** `1.4.1ve` (Modrinth `EFTMlZ95` / `lZevXXk9`, `side = both`) — Sable
  `neo_radar` peripheral (other SubLevels' position/pose). The broader cannon-mount /
  NFC suite is **not** confirmed in this build; cannon control is **CC:CBC**.
- **CC:CBC** `1.1.1` (Modrinth `zA9Klldw` / `naLCoIB4`, `side = both`) — Create Big Cannons
  `cannon_mount` fire-control. Preferred over **Create Big Cannons: Peripheral** (do not add).
- **Advanced Peripherals** `0.8.1a` (Modrinth `SOw6jD6x` / `1rbqTjbS`, `side = both`) —
  Chat Box, scanners, AR goggles, inventory/energy/redstone. **ME Bridge / RS Bridge**
  need AE2 / Refined Storage, which are **not** in the pack — those two peripherals are
  inert. Do **not** add AE2/RS just to enable them.
- **Create: Radiologistics** `1.1.1` (Modrinth `mtA0MjEn` / `nu9mL1zt`, `side = both`) —
  radio transmitter + stacking antennas (hard cap **3,000** blocks), node Main Computer,
  CBC Wired Inertia Fuze / Radars / Aeronautics integrations. Chosen over **Create:
  Radionautics** and the unverified "Wireless Radio Towers Addon". Parallel to the CC
  Lua stack (Create-native visual nodes), not a replacement.

Do **not** drop **CC: Tweaked** (the three add-ons require it). Do **not** drop **Sable**.

## Gadgets & Gizmos + Aeronautics 1.3.2 (0.9.24)

- **Create Aeronautics: Gadgets & Gizmos** `1.2.2` (CurseForge 1537945 / file 8874329,
  jar `gadgets-and-gizmos-bundled-V1.2.2.jar`, `side = both`) — propulsion boosters
  (Thruster / Mini / Beam / RCS, Fuel Oxidizer, Propulsion Upgrade) for hard climbs
  to the +1024 ceiling, plus flight-control blocks and **CC: Tweaked** peripherals
  (`/rom/thrusters/docs.lua`). `1.2.2` is the dedicated-server hotfix of `1.2.0`.
- **Create Aeronautics** bumped **1.3.1 → 1.3.2** (Modrinth `oWaK0Q19` / `44pLdPGg`)
  as G&G's required dep (JEI/creative-tab + swivel-bearing mass). Keep it on
  **Modrinth** — packwiz briefly flipped it to CurseForge; restore if that happens.
- Do **not** add **Create: Simulated Jet Engines** or **Create Propulsion: Simulated**
  (overlapping thruster systems). Do **not** drop G&G or roll Aeronautics back to 1.3.1.

## Create: Market Maker (0.9.25)

- **Create: Market Maker** `0.5.0` (`marketcoordination-0.5.0.jar`, `side = both`) —
  in-house Create economy mod from GitHub
  `Minecraft-Bonanaza/Create--Market-Maker` `v0.5.0`. First public release.
  Extends **Villager Commerce** stalls: daily villager budgets, cheapest-stall
  selection, demand curve, growth/decay with a floor, Stall Config GUI.
  **Stock Market** (already in pack) is optional — stalls index as shops and the
  Volume tab appears when it is present.
- Required deps already in pack: Create, **Numismatics**, **Villager Commerce**.
  Do **not** drop those. Add/update with `packwiz url add` from the GitHub release
  URL — it is **not** on CurseForge or Modrinth.
- Jar add only. No worldgen/datapack/loot/quest change. No fresh world.

## Server-only mods

**Too Fast** and **YUNG's Better Nether Fortresses** are `side = server`. Default PrismLauncher
`--side client` skips them. Dedicated servers get them.

## packwiz gotchas

- Always `packwiz refresh` and commit **the changed files + `index.toml` + `pack.toml`**
  together. 0.8.5 forgot the `pack.toml` `[index]` hash ("index hash file invalid").
  **0.9.16** had the inverse: `index.toml` was correct but the committed
  `bigglobe_whendungeonsarise.zip` had drifted — clients failed "hash invalid" on that
  one file. Verified all 379 index entries; only that zip was stale.
- Do **not** `packwiz curseforge add` Simply More (Modrinth `1.3.0_alpha5`; CF
  `allowModDistribution:false`) or `ponderjs` (wrong slug — use `ponder`).
- Do **not** `packwiz update` Big Globe (height-patched jar).
- Prefer a future Simply More *release* that matches Simply Tooltips `0.1.5` over staying on alpha.
