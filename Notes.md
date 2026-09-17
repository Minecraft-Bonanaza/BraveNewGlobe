# Brave New Globe — Notes

Miscellaneous maintainer/config notes for the pack.

## Derek's Notes
Under config, need to enable hyperspeed generation in Big Globe's config to support DH API usage when
generating LODs. Otherwise DH doesn't recognize the renderer and will memory leak.

## Rendering toggle (Iris / Iris Flywheel Compat / Distant Horizons)
These three optional mods must be enabled or disabled **together** (all ON or all OFF). Running Iris
without Distant Horizons alongside our mandatory rendering mods (Flywheel/Create) results in buggy
rendering. They ship as `optional = true, default = false` in their `pack/mods/*.pw.toml` files.

## Lighting toggle (Contraption Lights / LambDynamicLights)
These two optional mods must be enabled or disabled **together** (all ON or all OFF). They ship as
`optional = true, default = true`. Contraption Lights without LambDynamicLights has no LAMB backend
(Iris-safe ship/contraption lights). Do **not** add **Veil** or **Sable Ragdolls** for this pair.

## Known issue — DH + Simple Clouds artifacting under Iris
With Distant Horizons and Simple Clouds running under Iris rendering, artifacting will sometimes appear
across the boundary between the two render zones (the DH/far zone and the near zone).

Fixes:
- **Permanent:** disable the bottom 3 settings under **Visual** in the Simple Clouds config, **or** let
  the LODs fully load.
- **Temporary:** if artifacting occurs, reload the shaders and it should go away.

## Current pack state (1.0.7)

Living rules. CHANGELOG stays historical.

- **Version / count:** `pack.toml` **1.0.7**, **190** mods. Quest book **17 / 246**
  (0.9.27 added 4 nodes for the Aeronautics/Radiologistics/AeroPortals/Market Maker batch).
  Warnautics is **1.0.8** (needed for JACKPOT `cruise_missile`). Create Aeronautics is
  **1.3.2** (Modrinth pin; pulled up with Gadgets & Gizmos in 0.9.24). **0.9.19** removed
  **Sable: Destructive** (reverted the 0.9.18 addition per co-curator decision).
- **Phase:** **1.0.0 is the first production release.** The custom in-house
  **Create: Market Maker V0.5.1** is in (`marketcoordination`, GitHub releases — not
  CurseForge/Modrinth). Survival-layer polish (seasons, diseases, farming/food, climate)
  may continue in `1.0.x`.
- **1.0.7:** Sable overworld air pressure datapack (`bng_sable_pressure.zip`).
  Cruise **Y 300–400**, conventional balloons/props **~Y 500**, steep drop after that,
  **Y 800** needs Gadgets & Gizmos thrusters (sliver of air, vacuum at **Y 920**).
  `/reload` or next launch; no fresh world. Rebuild from
  `tools/datapacks/bng_sable_pressure/`.
- **1.0.6:** dropped **3D Skin Layers** (dense villages). **Continuity** stays
  client optional, default on. Co-creator village work kept as-is: **Epic Villages
  Standalone** on its own ~800-block grid (exclusion 16 vs CTOV), vanilla
  `has_structure/village_*` tags filled for Big Globe, CTOV large-only via
  `ctov-common.toml`, Cristel `minecraft:villages` 50/20. Village grid needs
  **unexplored chunks**.
- **1.0.5:** **Visual Workbench** (`side = both`), **Pick Up Notifier** (client, optional
  default on), **Ping Wheel** `1.12.2` (`side = both`, Sable-compat beta). BetterF3 is
  **not** in the pack (vanilla F3 / Jade only).
- **1.0.4:** **Polymorph**, **Amendments**, **Comforts** (`side = both`); **Jade Addons**
  (`side = both`); **Simple Voice Chat** (`side = both`, UDP **24454**); **Crash Assistant**
  + **Chat Heads** (client, optional default on). Comforts sleeping bags/hammocks do **not**
  set spawn by default (hangar bed stays Better Respawn home at 512).
- **1.0.3:** optional client QoL — **Dynamic FPS**, **Mouse Tweaks**, **Controlling** +
  **Searchables**, **Continuity** (all `side = client`, default on). Continuity rides
  Connector + Forgified Fabric API already in the pack. **Simple Clouds stays
  mandatory** (`side = both`) — Project Atmosphere depends on it.
- **1.0.2:** Traveler's Titles Big Globe overlay (`config/paxi/resourcepacks/bng_titles.zip`) —
  titles + climate-band colors for all BG biomes. Jade still uses BG's own biome lang.
- **1.0.1:** optional client jars — **Sound Physics Remastered** + **Presence Footsteps**
  (default off), **Traveler's Titles** (default on; **3D Skin Layers** added here, dropped
  in 1.0.6). CTOV villages
  retuned (slope/hilliness gate off, climate-band land, large-only; T&T exclusion 8→4).
  Village grid needs **unexplored chunks**. Do **not** add **Nvidium** (Iris disables it;
  it is a Sodium terrain renderer, not GPU worldgen). **Terrain Diffusion** would replace
  Big Globe; do not add it.
- **1.0.0:** in-universe **[CHARTER.md](CHARTER.md)**. No jar or datapack change vs 0.9.37.
- **0.9.35:** **Climbable Ropes 2.1.3** (pinned to Aeronautics 1.3.2 / Simulated 1.3.x —
  older Climbable Ropes + Aeronautics 1.2.1 crashed) and **Create: WarHorn 1.0.1**. Jar
  bumps: Going Ballistic 0.3.1, Sodium 0.8.13, Aeroworks 1.5.0, Numismatics 1.1.0 + Utils
  2.3, Farmer's Delight 1.3.4, Power Grid 0.6.1, Bits 'n' Bobs 2.3.5 (+ Azimuth 1.4.8,
  Struts 1.3.1). Do **not** use Numismatics `/payall`. Do **not** add **Create: Server
  Optimizer**.
- **0.9.26:** optional **Combat Traces 1.0.3** (Better Combat trails, both, default on),
  **Animated Inventory 1.0.6** (client, default on), and **Contraption Lights 1.5.1** +
  **LambDynamicLights 4.8.11** (linked, default on). Dead TWT `pack/config/thirst/` is gone.
  **Needs, Not Necessities** was evaluated as a thirst replacement and **dropped** (gimmicky
  meal-driven thirst, not TWT). Do **not** re-add it or **Panels Not Screens**.
- **0.9.28:** `stattinkerer:large_dungeon` spacing retuned **2,000 → 2,496 blocks** (spacing
  125→156 / separation 111→139, same ~0.89 jitter ratio). Datapack-only; no fresh world needed.
- **Content landed 0.9.20–0.9.25 (all no-fresh-world jar adds):**
  - **0.9.20** Create: AeroPortals 1.3.3 — Sable airships through portals (upstream flags
    it as a proof of concept).
  - **0.9.21–0.9.23** ComputerCraft stack: **CC: Tweaked 1.120.2**, **NeoPeripherals 1.4.1ve**
    (Sable radar), **Create: Radiologistics 1.1.1** (tower/antenna comms, 3,000-block cap),
    **CC:CBC 1.1.1** (Big Cannons fire-control), **Advanced Peripherals 0.8.1a** (ME/RS
    bridges inert — AE2/RS are not in the pack).
  - **0.9.24** **Create Aeronautics: Gadgets & Gizmos V1.2.2** — propulsion thrusters +
    flight controls + CC integration. Create Aeronautics **1.3.1 → 1.3.2**.
  - **0.9.25** **Create: Market Maker V0.5.0** — in-house Create economy addon.
- **Stay out:** **Sable: Destructive** (added 0.9.18, reverted 0.9.19). Drive-By-Wire With
  Sable. Valkyrien Skies. Create: Simulated Jet Engines / Create Propulsion: Simulated
  (G&G thrusters cover the altitude/boost need). Create Big Cannons: Peripheral (CC:CBC
  is the gunnery brain). Create: Radionautics (Radiologistics fills the tower/comms role).
  **Needs, Not Necessities** / **Panels Not Screens** (evaluated 0.9.26, dropped). **Veil** /
  **Sable Ragdolls** (Contraption Lights uses LambDynamicLights, not those). **Tessellate**
  and **Create: Crystal Industry** (evaluated 0.9.26, skipped). **AMBUSH** / **Create:
  Manned Cannons** (evaluated 0.9.26, skipped). **ITOWT** jar stays out (speculation
  bookmark only — see Later expansion bookmarks). **Create: Server Optimizer** (Create
  tick-spreading mixins vs Sable/Aeronautics). Do **not** `packwiz update` **Climbable
  Ropes** without bumping Aeronautics in lockstep. **Nvidium** / **Acedium** (Iris
  disables the mesh-shader backend; it does not generate chunks). **Terrain Diffusion**
  (would replace Big Globe).
- **No fresh overworld** from 0.7.1 → 1.0.7. New Cataclysm / Bosses'Rise / Born in Chaos /
  Integrated Villages airships / tighter WDA spacings still need **unexplored chunks**.
  Nether added in 0.9.4 — existing Nether chunks stay vanilla until regenerated.
- **World height:** patched Big Globe jar, floor **−608**, ceiling **+1024**. Do not
  `packwiz update` Big Globe. Fresh world is only required from pre-0.6 (floor) or 0.6.x
  (ceiling; or regen the top + clear DH).
- **Datapacks** live in `pack/datapacks/` and packwiz installs them to the instance
  `datapacks/` folder. Paxi `Load from base 'datapacks' directory = true`. They are **not**
  under `config/paxi/datapacks/`. Current BG compat zips include
  `bigglobe_integratedvillages.zip` (airship-only), `bigglobe_epicvillages.zip` (Epic
  biome tags + spacing/exclusion), `bng_sable_pressure.zip` (Sable overworld air
  curve), `bigglobe_simplyswords_nouniques.zip`
  (empty `lootable_uniques` tag), and `bigglobe_whendungeonsarise.zip` (hash re-synced in
  0.9.16 — zip and `index.toml` had drifted apart).

## Sable overworld air pressure (1.0.7)

Sable's built-in overworld curve hits **0% at Y 320** (vanilla build limit). BNG overrides it
with `datapacks/bng_sable_pressure.zip` (`data/bng/dimension_physics/overworld.json`,
priority 1000). Balloon lift and propeller thrust scale with this number; Gadgets & Gizmos
thrusters do not.

| Y | Pressure | Intent |
|---|---|---|
| 63 | 1.00 | sea level |
| 300 | 0.82 | cruise band |
| 400 | 0.62 | cruise band |
| 500 | 0.30 | conventional balloons/props can still push here |
| 620 | 0.06 | steep drop |
| 800 | 0.022 | sliver; thrusters |
| 920 | 0 | vacuum |

Nether / End are unchanged. Source lives in `tools/datapacks/bng_sable_pressure/` (not
shipped). Rebuild the zip with **forward-slash** entry paths, then `packwiz refresh`.

## Villages

- **CTOV** and **Epic Villages Standalone** are the ground village systems (vanilla
  `bigglobe:villages` emptied; CTOV injects into `minecraft:villages`). Separate grids,
  both ~800 blocks (spacing 50 / sep 20). Epic excludes CTOV by 16 chunks. CTOV is
  large-only (`ctov-common.toml`). Do **not** remove Epic from Cristel
  `blacklistedMods` or Cristel will regenerate `epic:villages` and drop the exclusion.
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

Aeronautics extras that **are** in (0.9.20–0.9.24): **AeroPortals** (cross-dimension SubLevel
transfer; upstream PoC), **Gadgets & Gizmos** (thrusters + flight controls + CC),
**Radiologistics** (tower/antenna comms). Do **not** add Simulated Jet Engines or Create
Propulsion: Simulated — G&G covers the boost/altitude need.

## ComputerCraft stack

In-world Lua computers plus Create-native comms. Complements KubeJS (author scripts).

- **CC: Tweaked 1.120.2** — computers, turtles, monitors, modems.
- **NeoPeripherals 1.4.1ve** — Sable `neo_radar` peripheral (airship targeting/autopilot).
- **CC:CBC 1.1.1** — Create Big Cannons `cannon_mount` fire-control. Prefer this over
  **Create Big Cannons: Peripheral** (stay out).
- **Advanced Peripherals 0.8.1a** — Chat Box, detectors, scanners, AR goggles. **ME Bridge /
  RS Bridge** are inert here (no AE2 / Refined Storage).
- **Create: Radiologistics 1.1.1** — Create-native radio towers (antenna stack, 3,000-block
  cap) + node computer. Parallel to CC Lua, not a replacement. Prefer this over
  **Create: Radionautics**.

## Create: Market Maker (in-house)

**Create: Market Maker V0.5.1** (`marketcoordination-0.5.1.jar`) is the team's own Create
economy addon. Hosted on GitHub releases (`Minecraft-Bonanaza/Create--Market-Maker`),
**not** CurseForge/Modrinth. Add/update with `packwiz url add` against the release jar.
Do **not** `packwiz curseforge add` / `packwiz modrinth add` it. The pack just consumes
the released jar; the mod is maintained in its own repo.

## Later expansion bookmarks

Not in the pack. Do not `packwiz add` these until the production cut is done and the note
says what to keep vs strip.

### ITOWT speculation (keep the idea, not the jar)
- **Source:** [ITOWT – I'm The One Who Trade](https://www.curseforge.com/minecraft/mc-mods/itowt-im-the-one-who-trade)
  `itowt-im-the-one-who-trade`, NeoForge 1.21.1 **2.1.0** (targets NeoForge `21.1.248`).
- **Wanted later:** the **Exchange** — candlestick chart per item, long/short with leverage,
  margin/liquidation. **Bets do not move the price; only real trades do.** That is the
  speculation layer to fold into **Create: Market Maker** / **Create: Stock Market** on
  **Numismatics**, at a physical terminal, after hauling still happens.
- **Do not take from ITOWT:** its own `coins` currency (fights Numismatics), `/shop` GUI,
  **mailbox delivery**, auction house, server shop (server as buyer / daily farm cap),
  `/pay` remote checkout. Those are SPECTRUM Commerce hard exclusions (mailbox, remote
  checkout, player-side minting).

### Ambush / Manned Cannons (evaluated 0.9.26, skipped)
- **AMBUSH** (`ambush`, TiyunSol) — datapack encounter engine; optional Aeronautics/CBC
  ship raids. Author warns explosive shells; latest **1.1.6** is beta. Needs authored
  datapacks, fights **In Control!**, and lists **Simulated** beside Aeronautics/Sable.
  Illager Invasion / It Takes a Pillage already cover raid PvE.
- **Create: Manned Cannons** (`create-manned-cannons-an-ambush-addon`) **0.1.3** — villager
  (incl. **MCA**) gun crew with real CBC ballistics, built for Ambush raider targeting.
  **CC:CBC** stays the pack gunnery brain. Revisit only as a pair with a curated Ambush
  datapack, or as MCA-only gun crews with Ambush spawn **off**.

## Optional visuals (0.9.26 / 1.0.1 / 1.0.3 / 1.0.4 / 1.0.6)

**Combat Traces** (Better Combat trails, `side = both`, optional default on) and
**Animated Inventory** (client, optional default on). **1.0.1** adds **Traveler's Titles**
(client, optional default on) plus **Sound Physics Remastered** and **Presence Footsteps**
(client, optional default off). **3D Skin Layers** was added in 1.0.1 and dropped in 1.0.6
(dense villages). **1.0.3** adds **Dynamic FPS**, **Mouse Tweaks**, **Controlling** +
**Searchables**, and **Continuity** (all client, optional default on). Controlling and
Searchables must be toggled together. **1.0.4** adds **Crash Assistant** and **Chat Heads**
(client, optional default on).
**Simple Clouds is not optional** — Project Atmosphere requires it on both sides.
Do **not** re-add **Needs, Not Necessities** or **Panels Not Screens** — evaluated as a TWT replacement and dropped.
Do **not** re-add `pack/config/thirst/` (dead TWT configs, removed in 0.9.26).

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
