# Changelog

All notable changes to the **Brave New Globe** modpack are documented here.
This file tracks mod additions/removals, mod version updates, and config/pack changes.

## [1.1.21.1] — 2026-09-23

### Fixed
- Dedicated server first-tick crash from `aether_ship_fall.js`. Rhino could not choose between `MinecraftServer.getLevel(ResourceKey)` and `getLevel(ResourceLocation)`, so the Server thread died and the watchdog reported a 60-million-second hang. The script now calls the `ResourceKey` overload through reflection. A later tick error is logged instead of taking the server down.

### Notes
- **No fresh world.** Restart so the script loads. `/reload` is not enough if NativeEvents already registered the old handler.

## [1.1.21] — 2026-09-23

### Changed
- An airship that falls through the Aether floor comes home the way a player does: same X/Z, just under the Overworld ceiling, still falling, riders included. AeroPortals was catching that fall and setting the ship back down inside the Aether, so it could not be retrieved. Script: `pack/kubejs/server_scripts/aether_ship_fall.js`.

### Notes
- **No fresh world.** Restart so the script loads. `/reload` reloads KubeJS server scripts.

## [1.1.20] — 2026-09-23

### Changed
- Sable air pressure for every dimension that was still on the default curve. That curve stays nearly flat, then drops to vacuum in a short cliff, so a ship only has a thin band of altitude it can hold. **Aether** now thins from the islands (about Y 64) through the sky and hits vacuum at Y 245. Twilight Forest, the Nether, the End, and the Abyss get the same kind of slope across their real height. Creating Space orbits are vacuum. The Moon is thin, Mars is medium, Venus is thick. Overworld curve is unchanged. Source: `tools/datapacks/bng_sable_pressure/`.

### Notes
- **No fresh world.** `/reload` is enough for the datapack. Restart if the client keeps the old curve.

## [1.1.19] — 2026-09-22

### Added
- **Create: Mechanical Companion** `1.9` (Modrinth `6ZRWru4y`). Curios-summoned Mechanical Wolf (head slot) with Create modules. Illager Workshop in pillager-outpost biomes (spacing 40). Accents hats share that one head slot. Create **6.0.10** and Curios **9.5.1** already cover deps. 221 mods.

### Notes
- **No fresh world.** Restart instance and server. Existing chunks will not grow a workshop; new gen / explorer maps will. No Field Guide or quest node this cut.

## [1.1.18] — 2026-09-22

### Added
- **Create: Bionics** `2.5.0` (Modrinth). Five craftable robots: Anole, Matchbox, Seeker, Oxhauler, Replete. Fuel is coal, charcoal, or blaze cake. Required on client and server. The Seeker removes the ore block it finds. No worldgen. Create range matches **6.0.10**. 220 mods.
- Quest chapter **Robot Companions** (5) and a Field Guide section for the same five. Quest book is **18 chapters / 251 quests**.
- Blaze burners and blaze powder no longer need a blaze. Cobblestone and lava mix into netherrack. Eight netherrack and a bucket of lava mix into the first magma block; a heated basin then turns stone and lava into magma. An assembly line (cinder flour, magma, lava, press) turns an empty burner into a captured one. Heated cinder flour and magma make blaze powder.

### Notes
- **No fresh world.** Restart so the incomplete burner item registers. Create Nuclear stays out until its reactor simulates on Sable sublevels.

## [1.1.17] — 2026-09-21

### Fixed
- **Healight** is required on **client and dedicated server**. It injects `DATA_HEAL_TIME` (int) into every `LivingEntity`. Shipping it `side = client` / optional meant the server never defined that field, so player metadata shifted: field 16 was absorption (float 0.0) on the client and score (int) on the host — `Invalid entity data item type for field 16`. Do **not** mark it client-only or optional again.

### Notes
- **No fresh world.** Restart the **dedicated server** so it pulls the Healight jar. Clients already have it.

## [1.1.16] — 2026-09-21

### Changed
- **Wheat** grows in every season (`wheat_year_round.js`). Serene Seasons only listed it in summer and autumn; it is now on `#sereneseasons:year_round_crops`.

### Notes
- **No fresh world.** `/reload` is enough.

## [1.1.15] — 2026-09-21

### Changed
- Self-host **MCG Core** + **Aquamirae guidebook** (CurseForge `allowModDistribution:false`; not on Modrinth).

## [1.1.14] — 2026-09-21

### Added
- **Field Guide** tab in the H-key book (Paxi `bng_field_guide`). Herds, Hybrid Aquatic shoals, Mowzie's wilds, Mutant Monsters, and the Born in Chaos night. The Deep names the Kraken and the Bloop. The other five sea-myths are rumor pages, with no true names.

## [1.1.13.1] — 2026-09-21

### Changed
- Client option flags on the 1.1.13 additions. **Obscure Tooltips** is optional and **off** unless selected (animated frames, particles, 3D previews). **Healight** and the **MCG** book pair are optional and **on** (cheap; turn the two MCG jars off together). **Accents** stays required on client and server. **Obscuria's Tools** stays an always-on Paxi texture swap.

## [1.1.13] — 2026-09-21

### Added
- **MCG Core** `1.1.0` + **MCG's Guidebook: Aquamirae** `1.2.0` — client H-key book with an Aquamirae tab. Press H. 7.x pages (Maelstrom, Shipbreaker) are still marked WIP by the author.
- **Obscure Tooltips** `4.2.4` — client tooltip frames and 3D gear preview. Not 4.2.5 (that jar requires Fragmentum 5).
- **Accents** `2.0.2` — dyeable hats and back items with small bonuses. Not 2.0.3 (Fragmentum 5). On client and server.
- **Healight** `1.0.1` — client green flash when an entity heals.
- **Obscuria's Tools** — Paxi resource pack `obscurias-tools.zip`. Vanilla wood-through-netherite tool textures. Modded tools keep their own art.

### Notes
- **No fresh world.** Restart instance and server. 219 mods. Fragmentum stays **2.4.4**.

## [1.1.12] — 2026-09-21

### Added
- **ParCool!** `3.4.3.3-NF` (Modrinth `Fsvx2bdR`) plus **ParCool+ Compatibility++** `1.2.1` (`YpPfINZw`) — parkour (vault, wall-run, cling). Compat is required here for Better Combat, playerAnimator, and Sable. Not ParCool 4.x (still alpha; addon handlers are 3.4.3.3).
- **Counter** `0.5-1.21.1` (Modrinth `u43pMIKj`) — day / death HUD. Turn off coords, time, FPS, ping overlays in its config; Xaero already covers those.
- **Beautified Chat [Server]** `3.2` + **Collective** `8.40` (Serilum) — server-wide chat style. **Client** jar not shipped (would double-format; still on 2.7).
- **Simplest Paxels** `1.0.6` — vanilla-tier pick+axe+shovel. Not TS: Multi Tools.

### Notes
- **No fresh world.** Restart instance and server. 214 mods.

## [1.1.10] — 2026-09-20

### Removed
- **Chunky** `1.4.23` — world pre-generator. DH / Big Globe handle distance; leftover `chunky` jar and `config/chunky` can be deleted if the installer leaves them.

### Changed
- **Distant Horizons** `3.3.1` → **`3.2.0-b`** (Modrinth `ZpKb4kZp`). 3.3.x is a suspect for the server LOD pipeline issues (alongside Big Globe Hyperspeed, already off). DH in-game auto-updater is off so the pin is not overwritten in-session.

### Notes
- **No fresh world.** Restart instance and server. Delete leftover `Chunky` / `3.3.1` jars if the installer leaves them. Existing LOD databases may still need a regen if they were written by 3.3.x.

## [1.1.9.1] — 2026-09-20

### Changed
- Big Globe **Hyperspeed Generation** is off. It was writing LODs through the DH API and
  overriding the dedicated server's generation plan, so high-quality LODs (sometimes any
  LODs) never loaded.

### Fixed
- **Broken legs** (`more_diseases_and_treatments:fracture`) only apply on falls **taller
  than 10 blocks** (`fracture_fall_threshold.js`). KubeJS const names do not collide with
  the bleeding script.

### Notes
- **No fresh world.** Restart instance and server (startup KubeJS + Big Globe config).

## [1.1.9] — 2026-09-18

### Removed
- **SAnnounce** `1.0.2` — NeoForge jar wants **21.1.250+**; pack stays on **21.1.248**. Queued again in CANDIDATES.

### Notes
- **No fresh world.** Restart instance and server. Delete leftover `sannounce` jar / config if the installer leaves them.

## [1.1.8] — 2026-09-18

### Added
- **Provisioner's Delight** `0.9.31` (Modrinth) — canned/bottled expedition food; **Patchouli** `1.21.1-93`.
- **Petrol's Parts** `1.3.7` + **Petrolpark's Library** `1.5.11` (Modrinth).
- **Storage Delight** `26.09.17` (Modrinth) — Farmer's Delight kitchen furniture.
- **Better Party** `1.1.7` (Modrinth) + **Better Party X Simple Voice** `1.0.2` (CurseForge).
- **CC : My Peripheral Extender** `1.1.4` (CurseForge) — CC ↔ Aeronautics/Sable cockpit peripherals.
- **SAnnounce** `1.0.2` NeoForge (CurseForge) — server announcements; `side = server`.
- **Create: Central Kitchen** `2.6.1` + **Create: Integrated Farming** `1.4.2` (Modrinth).
- **Better Banners** `1.4.0` (CurseForge).
- **Way Better Title Bar** `1.0.0` (CurseForge) — Windows chrome; client optional, default off.

### Changed
- **Create: Dragons Plus** `1.11.7b` → `1.11.9` (Central Kitchen floor).
- **Supplementaries** `3.9.1` → `3.9.9` (Integrated Farming floor); **Moonlight Lib** `3.4.1` → `3.6.5`.
- **JEI** `19.52.0.422` → `19.56.0.441` (Petrolpark wants `19.53.0.426`–`19.56.x`).

### Notes
- **No fresh world.** Restart the instance and dedicated server so the new jars load.

## [1.1.7] — 2026-09-18

### Fixed
- Restored the 1.1.4 KubeJS sprinkler hydrator (`sprinkler_hydrate_farmland.js`, player tick).
  The Java **Sprinkler Farmland** jar stays, but the dedicated server still let plots dry;
  the singleplayer world that had been running that script stayed wet. Both paths now ship.

### Notes
- **No fresh world.** `/reload` is enough for the script; restart if the jar is new.

## [1.1.6] — 2026-09-18

### Added
- **BlueMap** `5.7-neoforge` (Modrinth `swbUV1cr`, last NeoForge build that lists **1.21.1**;
  later 5.8+ are 1.21.6 / 26.x). **Server-only** — clients do not download the jar. Web map
  defaults to port **8100** (`http://<server>:8100/`). No pack config shipped, so an existing
  host `config/bluemap` (already on 8100) is left alone.

### Notes
- **No fresh world.** Restart the **server**. First map render is a background job (`/bluemap`).

## [1.1.5] — 2026-09-18

### Changed
- Slice & Dice water sprinklers now hydrate Realistic Farmland via **Sprinkler Farmland**
  `1.0.0` (GitHub `Minecraft-Bonanaza/Slice-and-Dice-Farmland`, Java mixin + sprinkler
  scan). RF stays: source-block drinking and moisture spread are unchanged. The KubeJS
  hydrator (`sprinkler_hydrate_farmland.js`) is gone.

### Notes
- **No fresh world.** Restart the instance or server (not `/reload`) so the new jar
  loads. Stand near the farm; moisture snaps to wet while a water sprinkler is spraying.

## [1.1.4] — 2026-09-18

### Fixed
- Slice & Dice sprinklers actually wet Realistic Farmland. 1.1.3 hooked
  `BlockEvents.randomTick` on farmland, but RF **wraps** that method and never
  calls the original, so KubeJS never ran. Hydration now uses `PlayerEvents.tick`
  (same path as bleeding/splint). Plots in the sprinkle box wet if the column
  **between** farmland and sprinkler is air or crops (ceiling beside an offset
  head is not a blocker).

### Notes
- **No fresh world.** `/reload` or next launch. Stand near the farm; moisture
  snaps within about a second. `latest.log` should show
  `[BNG] sprinkler farmland hydration` on load, then one `wetted` line.

## [1.1.3] — 2026-09-18

### Fixed
- Slice & Dice sprinklers wet farmland when **Realistic Farmland recalculates moisture**
  (`BlockEvents.randomTick` on `minecraft:farmland`, one tick after RF). A plot hydrates
  if a sprinkler is in the sprinkle radius (default ±2, ≤7 above / ≤3 below for floor)
  and the vertical column on that plot is only **air, crops, or the sprinkler**.

### Notes
- **No fresh world.** `/reload` or next launch.

## [1.1.2] — 2026-09-18

### Fixed
- Slice & Dice sprinkler farmland script no longer `Java.loadClass`es `FarmlandBlock` /
  `Blocks` (KubeJS Rhino: "Class could not be found"). Moisture is set by walking the
  blockstate `moisture` property on `minecraft:farmland`.

### Notes
- **No fresh world.** `/reload` or next launch.

## [1.1.1] — 2026-09-18

### Added
- **Animal Weights Scaling** `1.0.1` (GitHub `Minecraft-Bonanaza/Animal-Weights-Scaling`) —
  scales farm animals from **Animal Weights** 0–8 (skinny → plump). `animalweights` is already
  in the pack. GitHub release; NeoForge `[21.1.248,)` (loads on pack pin **21.1.248**).

### Changed — survival layer
- **More Diseases & Treatments** splint (`splinteffect`) lasts **2 minutes** instead of
  infinite. The mod applies duration `-1` (HUD ∞) plus a hidden `splinttimer` of 96000
  ticks (~80 minutes). KubeJS recasts the effect to 2400 ticks and clamps the timer.

### Changed — farming
- **Slice & Dice** water sprinklers hydrate **Realistic Farmland**. RF does not add a new
  soil block — it mixins vanilla `minecraft:farmland` (`moisture` 0–7). Sprinklers only
  fake Atmosphere local rain; RF's rain path adds **+1** moisture while crops spend **1**,
  so beds stayed dry (SliceAndDice#268). KubeJS `sprinkler_hydrate_farmland.js` sets
  moisture to **7** in the sprinkle AABB while a water sprinkler is running (vanilla rain
  snap). Fertilizer / potion / lava sprinklers are unchanged.

### Notes
- **No fresh world.** `/reload` or next launch. Already-applied infinite splints get
  capped to 2 minutes remaining. Sprinkler farmland hydration is `/reload`.

## [1.1.0] — 2026-09-18

### Added
- **Create Slice & Dice** `4.3.3` (Modrinth `N67LJgrN`) — slicer plus **sprinklers** (water / liquid
  fertilizer / potions / lava; floor variant; works on Sable physics contraptions). Create
  `[6.0.9,7.0.0)` fits the 6.0.10 pin. Kotlin for Forge 5.12.0 already covers `[5.8,)`. Atmosphere
  `1.0.17` is jar-in-jar (not a separate packwiz mod). Farmer's Delight stays optional-compat; already
  in the pack. Create Enchantment Industry liquid-XP sprinkler compat is already in.
- **Create Deep Seas** `2.2.4` (Modrinth `UcXaPVeD`) — Sable/Aeronautics submarines. Fits Create 6.0.10,
  Aeronautics 1.3.2 (`aeronautics` `[1.1.3,)`), Sable 2.0.5 (`[1.2,)`), NeoForge `[21.1,)`. Dedicated-server
  mixin/render crash fixes in this cut. Bundles **Create Abyss** (dimension, same jar). Stub
  `create_high_seas` is a different modid from **Better High Seas** (`highseas`) — both stay.
  Sodium incompatibility is only exact `0.6.13`; pack is `0.8.13`.
- **Create: Deep Seas - Lava Fix** `1.0.1` (Modrinth `9LUKMhCi`, `submarinefix`) — sealed lava-submerged
  subs no longer apply fire/lava damage or the fire overlay. Optional on `create_submarine` `[2.0,)`.
- **Cotton to Wool** `1.0.0` (GitHub `Minecraft-Bonanaza/Cotton-to-Wool`, `cotton_to_string`) — craft or
  mill Create: Cotton, cotton balls, and thread into vanilla string. NeoForge `[21.1.248,)`, MC
  `[1.21.1]`. `createcotton` / `create` are optional in the jar; Create: Cotton is already in the pack.

### Changed — survival layer
- Disabled **More Diseases & Treatments** `bleeding` ("Moderate bleeding") and `severebleeding`
  ("Severe bleeding"). The mod has no per-disease config; KubeJS denies both in
  `MobEffectEvent.Applicable` (startup) and strips them from anyone who already has them (server).

### Changed — Power Grid first generator (no brass / no blaze)
- Crafting-table recipes for the **basic commutator**, **induction rotor**, and **basin heater**
  so a first generator / first heat does not need Mechanical Crafters (brass). Commutator is the
  mechanical 4-row squeezed to 3×3 with pins left and right of andesite casing
  (`coal / copper plate / coal`, `pin / casing / pin`, `alloy / shaft / alloy`). Rotor is the
  mechanical 3×3 minus the two wing coils (top and bottom coils only). Basin heater is the
  mechanical 5-wide squeezed to 3×3, dropping the two wing resistive coils
  (`resistive coil ×3` / `copper plate · empty · copper plate` /
  `copper plate / conductive casing / copper plate`). Mechanical-crafting recipes are unchanged.

### Changed — Born in Chaos
- Stopped **Lifestealer** natural spawns (`born_in_chaos_v1:lifestealer` and true form) via
  In Control `spawn.json`. Spawn eggs / `/summon` still work.

### Notes
- Left pinned: Big Globe (patched jar), Create 6.0.10, Sable, Aeronautics 1.3.2 + Climbable Ropes
  2.1.3, Sodium/Iris trio, Connector, Tracks+, Simply More, Ping Wheel 1.12.2, Market Maker.
- **No fresh world.**

## [1.0.11] — 2026-09-17

### Fixed — dedicated-server hang on start (FTB loot crates)
- Stripped `loot_crate` from the three Create reward tables (Basics / Workshop / Precision).
  CC: Tweaked rebuilds creative tabs on `ServerStarted`; FTB Quests then inserts
  `ftbquests:lootcrate` once per table; NeoForge treats the un-NBTed stacks as duplicates and
  throws `IllegalArgumentException`. Architectury turns that into a `ModLoadingException`, the
  Server thread dies, and the watchdog dump a minute later looks like a hang (no Server thread,
  `W: 0` chunks). Quest table rolls themselves are unchanged — only the creative-tab crate
  items are gone.
- Also bumped **FTB Quests** `2101.1.34` → `2101.1.36` and **FTB Library** `2101.1.35` → `2101.1.36`.
- **No fresh world.** Hosts: delete leftover `config/ftbquests/quests/reward_tables/*.snbt.OLD`
  if those files exist (failed migrations were stacking extra tables).

### Changed — jar bumps (1.21.1 NeoForge, no lockstep pins)
- **Distant Horizons** `3.2.0-b` → **`3.3.1`** (Modrinth `IcOcoekl`; CurseForge was still on 3.2.0-b).
  3.3.0 adds faster surface gen, Iris shadow/depth fixes, ~50% less disk *work*, and better
  Chunky/C2ME database queuing; 3.3.1 is the NeoForge config-lang follow-up. Still optional,
  `default = false`. Dedicated servers that packwiz-install headless still get it (`side = both`)
  unless the start script deletes the jar after pull.
- **Burnt Basic** `1.10.4.2` → `1.10.5`.
- **Forgified Fabric API** `0.116.15+2.3.4` → `0.116.15+2.3.5`.
- **Simple Voice Chat** `2.6.22` → `2.6.23`.
- **ModernFix** `5.27.20` → `5.27.24`.
- **Xaero's Minimap** `26.4.2` → `26.5.0` and **World Map** `1.45.0` → `1.46.0` (paired).

### Notes
- Left pinned: Big Globe (patched jar), Create 6.0.10, Sable, Aeronautics 1.3.2 + Climbable Ropes
  2.1.3, Sodium/Iris trio, Connector, Tracks+, Simply More, Ping Wheel 1.12.2, Market Maker.
- **No fresh world.**

## [1.0.10] — 2026-09-17

### Changed
- **Create Aeronautics: Gadgets & Gizmos** `1.2.2-HOTFIX` → `1.2.3` (CurseForge file-id 8899907).
  Fixes: dedicated-server pickaxe bug, `Physics Gantry` server hang on chunk load, skipped nodes
  in the `Advanced Contraption Controller`, plus GUI fixes and RCS Thruster CC:Tweaked control.
  Verified CurseForge/Modrinth builds byte-identical (same sha1, filesize) before repinning.
  Dependencies unchanged (NeoForge ≥21.1.225, MC 1.21.1 — both satisfied).

## [1.0.9] — 2026-09-17

### Fixed — missing bedrock at the world floor (patched Big Globe jar)
- `bedrock.json`'s `full_y`/`empty_y` are absolute Y coordinates, not derived from `min_y` —
  unpatched they were `-1024`/`-1008` (the *original* floor). When the floor was raised to
  `-608`, that whole band ended up below the new world bottom, so `BedrockFeature`'s own min-Y
  clamp made the placement range empty and **no bedrock generated at all**. Rebased to
  `-608`/`-592` — same 16-block full→empty taper, now aligned to the base-stone band
  (`-608..-592`) instead of dead space.
- Rebuilt via `bigGlobeAero/build_patched_jar.py` (now 15 files edited); `bundled-jars/bigglobe-5.3.2-mc1.21.1-shallow608.jar`
  sha256 `74af74e2…`; `big-globe.pw.toml` hash updated.

### Notes
- **Only affects newly-generated chunks at the floor.** Existing chunks near `-608` that already
  generated without bedrock will stay bedrock-less until regenerated (Big Globe worldgen doesn't
  retroactively backfill placed features). New chunks pick it up immediately — no fresh world
  needed pack-wide.

## [1.0.8] — 2026-09-17

### Fixed
- **JEI** `19.44.0.403` → `19.52.0.422` (CurseForge file-id 8801091). Polymorph `1.2.0+1.21.1`
  moved off its old mixin-based JEI hook to JEI's new recipe-transfer-listener API, which only
  exists from JEI `19.52.0.421` onward — the 1.0.x pin predated that API, so Polymorph's
  recipe-conflict picker (crafting/smelting/smithing) was silently broken since Polymorph 1.2.0
  landed. Verified the CurseForge and Modrinth builds of this JEI version are byte-identical
  (same sha1/sha512) before repinning.

## [1.0.7] — 2026-09-16

### Added — Sable overworld air pressure
- `datapacks/bng_sable_pressure.zip` — overrides Sable's vanilla overworld curve (0% at Y 320). Cruise band **Y 300–400**, conventional balloons/propellers can push **~Y 500**, then a steep drop. **Y 800** is a sliver of air (Gadgets & Gizmos thrusters). Vacuum by **Y 920**. Source: `tools/datapacks/bng_sable_pressure/`.

### Notes
- **No fresh world.** `/reload` or next launch. Does not change Nether/End.
- Pack is **1.0.7** / **190** mods.

## [1.0.6] — 2026-09-16

### Added — co-creator village grid (already on origin, kept as-is)
- **Epic Structures: Villages Standalone Edition** `1.0.0` (Modrinth `3PvUBn3u`, `side = both`) — own `epic:villages` grid, not CTOV's.
- Paxi `datapacks/bigglobe_epicvillages.zip` — Big Globe climate biomes in Epic's five biome tags; `epic:villages` spacing **50 / sep 20** (~800 blocks) with `exclusion_zone` vs `minecraft:villages` (`chunk_count` 16, vanilla max).
- `bigglobe_tags.zip` — populate vanilla `has_structure/village_{plains,savanna,desert,snowy,taiga}` (and ruined-portal swamp / woodland mansion) so those families and pillager outposts can spawn on Big Globe biomes.
- `ctov-common.toml` — large villages only (`generatesmallVillage` / `generatemediumVillage` = false).
- Cristel Lib `minecraft:villages` spacing **50 / sep 20** (~800 blocks). Epic mod blacklisted from Cristel auto-config so it cannot strip the Epic spacing/exclusion.

### Removed
- **3D Skin Layers** — extra 3D geometry on player (and nearby) skins in dense villages.

### Notes
- **Continuity** stays `side = client`, **optional default on** (already tagged in 1.0.3).
- Village / tag / Epic datapack changes need **unexplored chunks** (or a fresh overworld). QoL jars do not.
- Pack is **1.0.6** / **190** mods.

## [1.0.5] — 2026-09-16

### Added — crafting table, loot toasts, pings
- **Visual Workbench** `21.1.2` (Modrinth `kfqD1JRw`, `side = both`) — items stay on the crafting table. Uses **Puzzles Lib** already in the pack.
- **Pick Up Notifier** `21.1.1` (Modrinth `ZX66K16c`, `side = client`, **optional default on**) — toast when picking up items.
- **Ping Wheel** `1.12.2` (Modrinth `QQXAdCzh`, `side = both`) — mark a location/entity. **1.12.2** is a beta pin for **Sable** compat (also has DH / FTB Teams / SVC group pings).

### Notes
- **No fresh world.** Ping Wheel must be on the dedicated server for pings to sync.
- Pack is **1.0.5** / **190** mods.

## [1.0.4] — 2026-09-16

### Added — QoL, voice, crash GUI
- **Polymorph** `1.2.0+1.21.1` (Modrinth `tagwiZkJ`, `side = both`) — pick a result when multiple crafting recipes collide (Farmer's Delight / Ratatouille / Brewin' / Supplementaries). Pin is a **beta** for JEI 19.44's recipe-transfer API.
- **Amendments** `1.21-2.1.10` (Modrinth `6iTJugQR`, `side = both`) — vanilla tweaks (cauldrons, lanterns, jukebox). Uses **Moonlight Lib** already in the pack.
- **Comforts** `9.0.5+1.21.1` (Modrinth `SaCpeal4`, `side = both`) — sleeping bags and hammocks. **Do not set spawn** by default, so a hangar bed stays the Better Respawn home (`respawn_block_range` 512).
- **Jade Addons (Neo/Forge)** `6.1.1` (Modrinth `xuDOzCLy`, `side = both`) — Create / Aether / Supplementaries Jade extras (RPM/SU, etc.).
- **Crash Assistant** `1.11.12` (Modrinth `ix1qq8Ux`, `side = client`, **optional default on**) — post-crash GUI with logs.
- **Simple Voice Chat** `2.6.22` (Modrinth `9eGKb6K1`, `side = both`) — proximity voice. Dedicated server needs **UDP 24454** (default) open. Orthogonal to Radiologistics.
- **Chat Heads** `0.15.7` (Modrinth `Wb5oqrBJ`, `side = client`, **optional default on**) — player faces in chat.

### Notes
- **No fresh world.** Comforts / Amendments / Polymorph / SVC apply on next launch.
- Pack is **1.0.4** / **187** mods.

## [1.0.3] — 2026-09-16

### Added — optional client QoL / connected textures
- **Dynamic FPS** `3.11.4` (Modrinth `LQ3K71Q1`, `side = client`, **optional default on**) — drops FPS when the window is unfocused or idle. No in-game visual change.
- **Mouse Tweaks** `2.26.1` (Modrinth `aC3cM3Vq`, `side = client`, **optional default on**) — RMB/LMB drag and scroll-wheel item moves. Client inventory only.
- **Controlling** `19.0.5` (Modrinth `xv94TkTM`, `side = client`, **optional default on**) — searchable keybinds. Requires **Searchables** `1.0.2` (Modrinth `fuuu3xnx`, also `side = client`, optional default on; toggle together).
- **Continuity** `3.0.0+1.21.neoforge` (Modrinth `1IjD5062`, `side = client`, **optional default on**) — OptiFine-style connected textures. Fabric jar with NeoForge metadata; **Sinytra Connector** + **Forgified Fabric API** already in the pack. Ships a built-in glass/sandstone/bookshelf pack; extra CTM resource packs are optional.

### Changed — Better Respawn
- **Bed / respawn-anchor snap-back** `256 → 512` blocks (`respawn_block_range`). Die inside that radius and you still wake at the bed; farther deaths stay in the 128–256 ring around the corpse.

### Notes
- All five jars are **client-only**. Dedicated servers skip them. **No fresh world.**
- **Simple Clouds stays mandatory** (`side = both`) — Project Atmosphere depends on it. Do not mark it optional.
- Pack is **1.0.3** / **180** mods.

## [1.0.2] — 2026-09-16

### Added — Traveler's Titles Big Globe names
- Paxi resource pack `config/paxi/resourcepacks/bng_titles.zip` — `travelerstitles.biome.bigglobe.*`
  titles and climate-band colors for all **52** Big Globe biomes (plus Hyperspace). Jade still
  uses Big Globe's own `biome.bigglobe.*` names. Also fills **Dragon's Nest**, which 5.3.2's
  lang file omits.

### Notes
- **No fresh world.** Client resource pack. Applies on next launch (F3+T if already in-game).
- Pack is **1.0.2** / **175** mods.

## [1.0.1] — 2026-09-16

### Added — optional client audio / HUD
- **Sound Physics Remastered** `1.21.1-1.5.1` (Modrinth `qyVF9oeo`, `side = client`, **optional default off**) — occlusion and reverb. CPU cost around large ships / Big Globe terrain, so default off.
- **Presence Footsteps (NeoForge)** `1.21.1-1.12.0-beta.1` (Modrinth `JIEwmDVI`, unofficial NeoForge port; `side = client`, **optional default off**) — material-specific footsteps. Pairs with Sound Physics. Official Presence Footsteps is Fabric/Forge.
- **3D Skin Layers** `1.11.2` (Modrinth `zV5r3pPn`, `side = client`, **optional default on**) — 3D outer-skin layers on player models.
- **Traveler's Titles** `5.1.3` (Modrinth `JtifUr64`, `side = client`, **optional default on**) — biome/dimension title cards. Uses **YUNG's API** already in the pack. Big Globe biomes may show raw ids until a lang overlay exists; vanilla / Incendium / Twilight Forest still title.

### Changed — CTOV village spawn (co-creator, after 1.0.0)
- **Hilliness / slope gate off** for large CTOV villages; biome eligibility broadened to climate-band land. Medium/small dropped from the grid and spillover overriders (large-only). Slope-probe overriders keep spawn-log biome vs slope denials readable.
- **Towns & Towers `towns`** exclusion vs `bigglobe_ctov:villages` **8 → 4** chunks.
- **Cataclysm** empty-set salts for burning_arena / cursed_pyramid / frosted_prison clamped to valid int32.
- Big Globe **Log structure spawn attempts** filtered to villages (diagnose CTOV natural-spawn).

### Notes
- Optional client jars apply on next launch (**no fresh world**).
- Village / salt datapack changes need **unexplored chunks** (or a fresh overworld) to retile the grid.
- Pack is now **1.0.1** / **175** mods.
- Not added: **Nvidium** (Sodium mesh-shader backend; disables under Iris; does not generate chunks). GPU worldgen is **Terrain Diffusion**, which would replace Big Globe — not a Nvidium feature.

## [1.0.0] — 2026-09-16

### Added
- **[CHARTER.md](CHARTER.md)** — in-universe founding charter (player-facing).

### Notes
- **First production release.** Content stack, quest book (**17 / 246**), and in-house
  **Create: Market Maker** (`0.5.1`) are in. `0.9.27`–`0.9.37` were the precursor cuts.
- Pack is **1.0.0** / **171** mods. No jar or datapack change vs `0.9.37`.
- **No fresh world.**

## [0.9.37] — 2026-09-16

### Changed — village pool trims
- **CTOV villages:** removed all `medium/` size variants, keeping only `large/` (42 → 21 structures).
  Every CTOV village that spawns is now a large one; spawn frequency (spacing ~1000 blk) is unchanged.
- **Towns & Towers `towns`:** exclusion vs `bigglobe_ctov:villages` lowered 16 → 8 chunks (~256 → ~128 blk),
  so T&T villages may sit closer to CTOV villages.

## [0.9.36] — 2026-09-16

### Changed — replaced Create: Tracks with Create: Tracks+ (fixes incompatibility)
- Removed **Create: Tracks** (`create-tracks`, 1.0.1 — its only release) and added **Create: Tracks+**
  (`create-tracks+`, `tracks_plus-1.0.6b6.jar`, from Modrinth). Create: Tracks+ is a fork of Create: Tracks
  styled after Create: Trackwork and is **explicitly incompatible with the original** ("Please replace
  it"), which is what triggered the incompatibility error. Tracks+ is the variant the newer Create:
  Aeronautics expects. 1.0.6b6 is its latest (beta) build; nothing higher exists.

## [0.9.35] — 2026-09-15

### Added — Aeronautics boarding / signaling
- **Climbable Ropes for Create Aeronautics 2.1.3** (CurseForge 1528764, file 8769644) — empty-hand
  climb on Simulated rope strands and plunger lines (W/S, sneak drop, space mantle; wrench zipline
  on plunger ropes). Complements Throwable Rope Connector (that one *places* connectors). **Pinned
  to 2.1.3** because it is compiled against Aeronautics **1.3.2** / Simulated `[1.3.0,1.4.0)`. Older
  Climbable Ropes + Aeronautics 1.2.1 / Simulated 1.2.1 crashed (`ownedServerStrand` NPE). Do not
  `packwiz update` this without bumping Aeronautics in lockstep.
- **Create: WarHorn 1.0.1** (CurseForge 1685437, file 8834274) — kinetic-charged long-range horn;
  works stationary and on Aeronautics airships (not trains).

### Changed — jar bumps
- **Going Ballistic** `0.3.0` → `0.3.1` — Terminal Ballistics compat (we already ship TB 2.3.0).
- **Sodium** `0.8.13-beta.2` → `0.8.13` release (still `side = client`).
- **Create: Aeroworks** `1.4.2` → `1.5.0` — Control Stand, copper/dyed modules, Drive-By-Sable cockpit
  wiring (not the Stay-out Drive-By-Wire *mod*).
- **Create: Numismatics** `1.0.20` → `1.1.0` and **Numismatics Utils** `2.2` → `2.3` (must pair).
  Sable packet fix (#158), CC vendor/depositor/bank compat, sub-accounts, salepoints. Do **not** use
  `/payall`. Leave any first-open bank gift at 0 (SPECTRUM: no player minting).
- **Farmer's Delight** `1.3.3` → `1.3.4`.
- **Create: Power Grid** `0.6.0.1` → `0.6.1`.
- **Create: Bits 'n' Bobs** `2.2.7` → `2.3.5` with paired **Azimuth API** `1.4.7` → `1.4.8` and
  **Strut Your Stuff** `1.3.0` → `1.3.1` (BnB 2.3.5 declared deps).

### Notes
- **No fresh world.** Jar adds + bumps. Applies on next launch.
- Pack is now **0.9.35** / **171** mods (`create-aeronautics-climbable-ropes.pw.toml`,
  `create-warhorn.pw.toml`). Remote already used 0.9.33/0.9.34 for datapack work, so this
  jar cut is **0.9.35**.
- Not added: **Create: Server Optimizer** (Create tick-spreading mixins vs Sable/Aeronautics).

## [0.9.34] — 2026-09-15

### Fixed — world creation crash from 0.9.29/0.9.33 datapacks
Two datapack validation errors introduced by the spacing/loot pass crashed world creation
(datapacks validate on load, before worldgen):
- **Empty loot pools** — the Cataclysm gear-strip (`bigglobe_cataclysm_nogear.zip`) removed the
  only entry from 19 pools, leaving `entries: []`, which fails loot-table validation. Rebuilt to
  **drop** now-empty pools instead of emptying them (17 tables, 19 pools removed); bosses whose only
  drop was a stripped item now drop nothing or just their music disc.
- **exclusion_zone chunk_count > 16** — Minecraft caps `exclusion_zone.chunk_count` at **16** (codec
  range `[1,16]`). The session had set 20/25/30/40 on 13 structure sets (WDA common/sky/nest/
  large_dungeon/rare, CTOV pillager_outposts, T&T towns/towers, Illager fort/firecaller/illusioner/
  labyrinth, It Takes a Pillage). All clamped to **16** (~256 blk, the engine max).

## [0.9.33] — 2026-09-15

### Added — thornborn_towers restored into the large_dungeon set
- `dungeons_arise:thornborn_towers` added to `stattinkerer:large_dungeon` (now 4 structures:
  infested_temple, keep_kayra, kisegi_sanctuary, thornborn_towers; spacing 219 / ~3,504 blk).
  Its biome tag was broadened `#bigglobe:forest` → **`#bigglobe:land`** to match the other three
  flagships (all-land eligibility) instead of forest-only.
- Fixed its Y placement to match the other flagships: `start_height` absolute 119 → **0**,
  projection none → **WORLD_SURFACE_WG**, step underground → **surface_structures** (terrain bury kept),
  so the tower grounds at the surface instead of anchoring at a fixed Y (would bury/float in BG terrain).

## [0.9.32] — 2026-09-15

### Fixed — infested_temple identical-chest bug (baked LootTableSeed)
WDA's `infested_temple` shipped chests with hardcoded `LootTableSeed` values baked into the structure
NBT, which freezes each chest's loot (no per-world randomness) and made `level_2`/`level_3` — sharing the
same seed on the same `infested_temple_room_normal` table — permanent clones. New
`bigglobe_wda_chestseed_fix.zip` overrides the 5 infested_temple `.nbt` pieces with all `LootTableSeed`
values zeroed → chests are now unseeded and roll fresh loot per world/per chest. (keep_kayra and
kisegi_sanctuary were already unseeded.) A jar-wide scan found the same baked-seed pattern in many other
mods (CTOV villages/outposts, Towns & Towers, Illager Invasion fort/labyrinth, Incendium, Cataclysm,
Aquamirae, etc.) — deferred pending scope decision.

### Changed — Cataclysm powerful gear made unobtainable
Cataclysm gates its endgame weapons/armor behind boss-dropped **signature materials** crafted at a
`mechanical_fusion_anvil` (plus one finished drop, `gauntlet_of_guard`). Removed the whole chain at the
source so the powerful items can no longer be obtained:
- **New `bigglobe_cataclysm_nogear.zip`** strips the signature materials/finished gear from **15 boss
  loot tables** (ignitium_ingot←Ignis, cursium_ingot←Maledictus, witherite_block←Harbinger,
  monstrous_horn/infernal_forge/lava_power_cell←Netherite Monstrosity, essence_of_the_storm←Scylla,
  void_core←Ender Golem, void_jaw←Endermaptera, gauntlet_of_guard←Ender Guardian, tidal_claws←Leviathan,
  ancient_metal_ingot/nugget/block←Kobolediator/Koboleton/Wadjet/Ancient Remnant, athame←Deeplings,
  sandstorm_in_a_bottle←Ancient Remnant) — plus `chests/desert_treasure` (ancient_metal_ingot).
  Boss-**summon** items (`netherite_effigy`, `abyssal_egg`) and cosmetic music discs are deliberately
  KEPT so bosses remain fightable.
- **`wda_dungeon_loot.js` JACKPOT pool** no longer injects the Cataclysm endgame mats
  (ignitium/witherite/enderite/cursium/ancient_metal) into combat-dungeon chests.

### Changed — structure spacing pass to reduce cross-mod clustering
Investigated why 4–6 structures from different mods bunch together: it is not a salt
collision (salts are clean once the phantom Terralith reference jar is excluded) but the
cumulative overlap of ~25 independent surface structure grids with no engine-level global
spacing. First spacing pass widening the densest surface grids:

- **`stattinkerer:large_dungeon`** (infested_temple/keep_kayra/kisegi_sanctuary) spacing 156→219
  (~2,500→~3,500 blk), separation 139→195.
- **`stattinkerer:common`** (WDA surface POIs) spacing 32→63 (~512→~1000 blk), separation 28→55;
  exclusion vs `bigglobe_ctov:villages` raised 8→25 chunks (~400 blk). `mining_complex`, `plague_asylum`,
  `foundry` split out of common into a new group.
- **New `stattinkerer:rare` group** (spc 94 / ~1500 blk, salt 141592653): mining_complex, plague_asylum,
  foundry. Avoids `stattinkerer:large_dungeon` @30 chunks. `mining_complex` Y placement moved back to surface (start_height −187 → absolute 0,
  WORLD_SURFACE_WG projection, terrain_adaptation none → beard_thin) so it generates at ground level
  instead of buried.
- **`stattinkerer:nest`** (mechanical_nest) spacing 41→125 (~656→~2000 blk), separation 36→110;
  exclusion vs `stattinkerer:sky` raised 12→40 chunks.
- **`stattinkerer:large_dungeon`** exclusion vs `bigglobe_ctov:villages` raised 12→40 chunks.
- **`stattinkerer:sea`** (WDA pirate ships) spacing 48→75 (~768→~1200 blk), separation 42→66.
- **`stattinkerer:sky`** (WDA aerial ships) spacing 25→94 (~400→~1500 blk), separation 22→82;
  exclusion_zone swapped from `stattinkerer:large_dungeon` @12 to `bigglobe_ctov:villages` @30
  (single exclusion slot; the large_dungeon exclusion was low-impact since sky is aerial Y700-750).
- **Villages:** `bigglobe_ctov:villages` + `bigglobe:villages` 30→88 (~480→~1400 blk; shared salt, moved
  together), separation 12→35; `integrated_villages:regular_villages` 26→50 (~800 blk), separation 19→37.
- **CTOV `pillager_outposts`** 30→88 (~480→~1400 blk), separation 12→35; village exclusion 6→20 chunks.
  (Air villages left at ~1200 blk; pillager outposts unchanged.)
- **Mowzie's Mobs ~800 blk** (new `bigglobe_mowziesmobs_spacing.zip`): monasteries / umvuthana_groves /
  frostmaw_spawns 25→50, separation 8→16.
- **Cataclysm** (new `bigglobe_cataclysm_spacing.zip`), tiered:
  - **Boss arenas merged into ONE shared grid** (`bigglobe_cataclysm:boss_arenas`, spc 63 / ~1000 blk):
    all 8 boss structures (acropolis, burning_arena, cursed_pyramid, frosted_prison, sunken_city,
    ancient_factory, ruined_citadel, soul_black_smith) now compete for a single grid cell, so at most
    ONE boss arena per ~1000-block cell — this spaces the *different* bosses apart from each other, not
    just each from its own kind. Their 8 original per-type structure_sets are emptied so they no longer
    place on independent grids. Per-cell boss choice is biome-gated by each structure's own definition.
  - **Biome restriction removed** on `burning_arena`, `ruined_citadel`, `soul_black_smith` (structure-def
    overrides → `#minecraft:is_overworld`). These were Nether/End bosses whose vanilla biome IDs
    (`nether_wastes`, `end_highlands`, `crimson_forest`, …) do not exist in a Big Globe world, so they
    could never spawn; they now place across the overworld with the other merged bosses.
  - **Explorable ruin clusters → ~1500 blk (spc 94):** abandoned_structures, desert_structures,
    amethyst_nest — kept more common than the boss arenas.
- **Illager Invasion** (new `bigglobe_illagerinvasion_spacing.zip`): sorcerer_hut 18→44 (~700 blk, no
  exclusion); firecaller_hut / illusioner_tower / illager_fort / labyrinth → spc 81 (~1300 blk) each
  with exclusion → `bigglobe_ctov:villages` @20 chunks. `illager_fort`'s `frequency: 0.2` skip-roll
  removed so it places on every grid cell like the others. Separations scaled proportionally.

- **Born in Chaos** (new `bigglobe_borninchaos_spacing.zip`): `infernal_pumpkin` 36→94 (~576→~1500 blk),
  `mound_of_hounds` 50→94 (~800→~1500 blk) — the two tightest non-grave BiC grids. The 19 grave
  tombstones (all ≥960 blk, cosmetic flavor) left as-is per decision.

- **Towns & Towers** (new `bigglobe_towns_and_towers_spacing.zip`): all three grids → ~1000 blk (spc 63):
  towns 816→1008, towers 768→1008, other 512→1008. Re-pointed `towns` exclusion_zone from the empty
  `minecraft:villages` to the active `bigglobe_ctov:villages` and raised both `towns` and `towers`
  exclusions to 20 chunks (~320 blk), so T&T villages keep real distance from CTOV villages and T&T
  towers from T&T towns.
- **Bosses'Rise** (new `bigglobe_bossesrise_spacing.zip`): yeti_hideout 480→720 blk,
  sandworm_nest 720→1504, kraken_ship 832→1504, dragon_tower 1536→1808. Kept as separate grids.
  `underworld_arena` left as-is (Nether boss whose vanilla `nether_wastes`/`soul_sand_valley` biomes
  don't exist in BG's scripted Nether, so it does not spawn — deferred).

- **It Takes a Pillage** (new `bigglobe_takespillage_spacing.zip`): `pillager_structure` 512→1008 blk
  (spc 63); exclusion re-pointed from empty `minecraft:villages` to `bigglobe_ctov:villages` @20 chunks.

These per-mod spacing/exclusion overrides live in their jars (our BG compat packs only fix biome
gating), so they are new dedicated `structure_set` override datapacks (pack_format 48).
## [0.9.31] — 2026-09-15

### Fixed — Market Coordination dedicated-server crash (0.5.0 → 0.5.1)
- **Create: Market Maker / Market Coordination** bumped **0.5.0 → 0.5.1**. The 0.5.0 jar crashed
  the dedicated server during `RegisterPayloadHandlersEvent` (`MarketNetworking.java:24`):
  `Attempted to load class net/minecraft/client/gui/screens/Screen for invalid dist DEDICATED_SERVER`
  (crash log 04.59.22). Play-to-client handlers were bound from common code via
  `MarketClientNetworking::handleSummary`, which loaded the client-only summary GUI.
- 0.5.1 registers those handlers only on the physical client; the server still registers the
  matching payload types with no-op handlers so the protocol stays in sync. Linear Bearing is
  unrelated (already removed in 0.9.30).
- Jar is bundled in-repo (`bundled-jars/marketcoordination-0.5.1.jar`) so the next server build
  does not depend on a GitHub Release existing yet.

### Notes
- **No fresh world.** Jar bump only. Applies on next launch.
- Pack is now **0.9.31**.

## [0.9.30] — 2026-09-15

### Removed — Create: Linear Bearing (unfixable dedicated-server crash)
- **Removed Create: Linear Bearing entirely** (`linear-bearing.pw.toml` deleted, index + pack hashes
  refreshed). The 0.9.29 downgrade to 1.3.3 **did not help** — 1.3.3 throws the identical
  `BakedModel for invalid dist DEDICATED_SERVER` at `LinearBearing.<init>(LinearBearing.java:66)`
  (crash log 04.37.36). The unguarded client-model reference in the mod's main constructor is
  **inherent to the mod**, not a 1.3.5 regression, so no available version loads on a dedicated server.
- Server-side there is **no fix short of removal** (can't be client-only: it registers functional
  Create blocks). Removed to unblock the server build.
- **Lost content:** Linear Bearing, Torsional Anchor, and the Magnetic Port "quantum bridge"
  (cross–Sable-sublevel rotation transfer). If that capability is needed later, look for a
  server-safe alternative or a patched build.

### Notes
- **No fresh world.** Jar removal only. Any existing Linear Bearing placements will drop as
  unknown blocks on next load; the server had never successfully started with them, so impact is nil.
- Pack drops one mod. `pack.toml` is **0.9.30**.

## [0.9.29] — 2026-09-15

### Fixed — Linear Bearing dedicated-server crash (downgrade 1.3.5 → 1.3.3)
- **Create: Linear Bearing** rolled back **1.3.5 → 1.3.3** (Modrinth `ZTwCjE7O` version `Ph1Arc6B`).
- **Why:** `linearbearing-1.3.5.jar` crashed the **dedicated server** during mod construction —
  `RuntimeException: Attempted to load class net/minecraft/client/resources/model/BakedModel for
  invalid dist DEDICATED_SERVER` at `LinearBearing.<init>(LinearBearing.java:67)`. The mod's main
  constructor references a **client-only** rendering class without a dist guard, so NeoForge's
  RuntimeDistCleaner aborts mod loading on a server (crash logs 04.17.33 and 03.57.26).
- 1.3.5 was the latest release (no upstream fix available); its changelog added the **Bubble Gum
  Block**, the likely source of the unguarded client-model reference. 1.3.3 predates that.
- ⚠️ **Not guaranteed** — if 1.3.3 still trips the same dist bug on the next server build, the
  fallback is to remove Linear Bearing entirely (per curator direction). Reindexing cannot fix this
  class of bug; it lives inside the jar.

### Notes
- **No fresh world.** Jar version rollback only — no worldgen/datapack/loot change. Applies on next
  server launch. Same block IDs, so existing Linear Bearing placements are unaffected.
- Pack is now **0.9.29**.

## [0.9.28] — 2026-09-15

### Changed — large dungeon spacing bumped to ~2,500 blocks
`stattinkerer:large_dungeon` (infested_temple/keep_kayra/kisegi_sanctuary) retuned from spacing
125/separation 111 (~2,000 blk) to spacing 156/separation 139 (~2,496 blk), keeping the same
~0.89 jitter ratio. Regenerated via `bigGlobeAero/patch_wda_compat.py` (also fixed a stale
`.meshclaw` path in that script's `SRC`/`OUT`/`JAR` constants, same class of bug as the earlier
`_common.py` `OUT_DIR` fix) and re-synced the packwiz hash chain.

### Merged
Reconciled with `origin/main`'s independent 0.9.26 (Contraption Lights, Combat Traces, Animated
Inventory) — both branches had bumped past 0.9.25 with different content, so this branch's two
entries were renumbered 0.9.26→0.9.27 (quest coverage, below) and 0.9.27→0.9.28 (this entry) to
land after the already-published 0.9.26. Mod count carries origin's **170** forward unchanged by
this branch's work; quest count carries this branch's **246** forward unchanged by origin's.

## [0.9.27] — 2026-09-15

### Added — quest coverage for the 0.9.20–0.9.25 mod batch (4 new quests, 242 → 246)
`MODLIST.md` had drifted to "158 mods / 0.9.19" while the pack was actually 166 mods / 0.9.25 —
Create: AeroPortals, CC: Tweaked, NeoPeripherals, Create: Radiologistics, CC:CBC, Advanced
Peripherals, Create Aeronautics: Gadgets & Gizmos, and Create: Market Maker had never been added
to it. Fixed the doc, then went through each of those 8 mods against the quest book's own rules
(guidance-only, no self-attest checkmarks) to decide what needed a quest:
- **Aeronautics chapter (+3):** added real, item-gated nodes for **Create Aeronautics: Gadgets &
  Gizmos** (`thrusters` — Thruster + Fuel Oxidizer + Sable Contraption Controller, gated behind
  `gyro`) and **Create: Radiologistics** (`radio_towers` — Radio Transmitter + 3 Antennas + Main
  Computer, gated behind `nav_radar`). Registry ids jar-verified (G&G's actual content mod is the
  bundled `createthrusters` namespace, not `gadgetsngizmos`, which is just its shared library).
  Also added a light informational node for **Create: AeroPortals** (`portal_hop` — completes on
  entering the Nether, since the mod has no craftable items of its own) pointing players at the
  feature; flagged as upstream proof-of-concept in the description.
- **Commerce chapter (+1):** added an informational node for **Create: Market Maker**
  (`market_coordination`, gated behind the existing `stall` quest) — checked the mod's own source
  and confirmed it registers zero items/blocks/advancements (it's a server-side economy layer over
  the existing Villager Commerce stalls), so there's nothing to gate on; the node just tells
  players the system exists and reuses the same `merchant_stall` ownership check as `stall`.
- **CC: Tweaked, NeoPeripherals, CC:CBC, Advanced Peripherals — deliberately skipped.** All four
  are Lua-scripting power-user tools with no clean objectively-detectable "wrote a working script"
  task; same treatment as JEI/Sodium/ModernFix, which also carry no quest presence.
- Fixed `bigGlobeAero/quest_lines/_common.py`'s `OUT_DIR`, which was hardcoded to a stale
  `~/.meshclaw/workspace/...` path from an old session instead of this repo. Regenerated all 17
  chapters via `build_ftbquests.py` and diffed: only `aeronautics.snbt` and `commerce.snbt`
  changed, both pure additions — the other 15 chapters are byte-identical, so no existing player
  progress is affected.

### Notes
- **No fresh world needed.** Quest-book-only change (new nodes, no key renames) — progress-safe
  regen. Quest book is now **17 chapters / 246 quests** (was 242).
- `MODLIST.md`, `QUESTS.md`, `README.md`, and `Notes.md`'s headline pack version/count also
  brought current (0.9.19/158 → 0.9.25/166 for the modlist backfill, then this entry's 0.9.27).

## [0.9.26] — 2026-09-14

### Added — optional combat/inventory visuals
- **Combat Traces 1.0.3** (CurseForge 1688598, `side = both`, **optional default on**) — pixel-art
  Better Combat weapon trails + hit flashes. Cosmetic. Pack already has Better Combat 2.4.0,
  Simply Swords 1.70.2, Player Animator (the versions the author tested).
- **Animated Inventory 1.0.6** (CurseForge 1688531, `side = client`, **optional default on**) —
  items slide between slots. Presentation only. Dedicated adapters are for Sophisticated / BNS,
  not Reliable Backpacks / Create; those screens fall back to static rendering.

### Added — Contraption Lights (Sable / Create dynamic lighting)
- **Contraption Lights 1.5.1** (CurseForge 1599108, `side = both`, **optional default on**) —
  lanterns/glowstone on Create contraptions and Sable ships light the world (and the other way
  around). Copycats+ interiors count. Coloured light stays at upstream default **off**.
- **LambDynamicLights 4.8.11** (CurseForge 393442, `side = client`, **optional default on**) —
  LAMB backend (Iris-safe). Native Fabric+NeoForge jar; **Forgified Fabric API** already covers
  the Fabric API dep — do not add stock Fabric API. Toggle with Contraption Lights (both ON or
  both OFF).
- **Not added:** Veil (VEIL mode / experimental shadows; disables under Iris) or **Sable
  Ragdolls** (held-light while limp only).

### Removed — leftover Thirst Was Taken configs
- Deleted `pack/config/thirst/` (client/common/container/item_settings/keyword). The TWT jar was
  already gone; these files were dead weight.

### Notes
- **No fresh world.** Jar adds + config delete. Applies on next launch.
- Pack is now **0.9.26** / **170** mods (`combat-traces.pw.toml`, `animated-inventory.pw.toml`,
  `contraption-lights.pw.toml`, `lambdynamiclights.pw.toml`).
- **Needs, Not Necessities** / **Panels Not Screens** were evaluated as a TWT thirst replacement
  and dropped — meal-driven thirst without idle drain/purity/kettle did not fit the survival layer.
- Also evaluated and skipped: **Tessellate** (parallel region ticking vs Sable/Create), **Create:
  Crystal Industry** (infinite budding ores + ore-spyglass).

## [0.9.25] — 2026-09-14

### Added — Create: Market Maker (custom in-house Create economy mod)
- **Create: Market Maker V0.5.0** (`marketcoordination-0.5.0.jar`, `side = both`) — the team's own custom
  Create addon, hosted on the org's GitHub releases
  (`Minecraft-Bonanaza/Create--Market-Maker` `v0.5.0`), not CurseForge/Modrinth. Re-added to the pack
  (it had previously been dropped from tracking after the Aug 23 `0.4` build).
- Custom/in-house mod — maintained in its own project repo; this pack just consumes the released jar.

### Notes
- **No fresh world.** Jar add only — no worldgen/datapack/loot change. Applies on next launch.
- Pack is now **0.9.25** / **166** mods (`marketcoordination.pw.toml`).
- Living docs brought current to **0.9.25** / **166** (`README.md`, `Notes.md`, `MODLIST.md`,
  `SPECTRUM.md`, `QUESTS.md`, `LOOT.md`, `MaintainerInstructions.md`). The initial production
  build is nearing completion; remaining work is fine-tuning the survival experience.

## [0.9.24] — 2026-09-13

### Added — Create Aeronautics: Gadgets & Gizmos (propulsion + flight controls + CC integration)
- **Create Aeronautics: Gadgets & Gizmos V1.2.2** (CurseForge `create-aeronautics-gadgets-and-gizmos`,
  project 1537945, NeoForge 1.21.1, `side = both`) — the de-facto Aeronautics control/propulsion addon.
  Adds **propulsion boosters** (Thruster, Mini Thruster, Beam Thruster, Fuel Oxidizer, Propulsion Upgrade)
  for hard vertical climbs to the world ceiling, plus a full flight-control layer (Contraption Controller,
  Industrial Motor/Alternator, Smart Gearbox, Variable Transmission, Vector/Servo/Aileron Bearings,
  Analogue Joystick, Physics Gantry, Powered Zipline, Entity Launcher, Claw, Shipping Manifest, Advanced
  Data Link, Andesite Cable).
- 🎯 Ships **CC: Tweaked integration for everything** (thrusters, bearings, gearbox, joystick, controller)
  with a bundled in-game Lua docs browser (`/rom/thrusters/docs.lua`) + example scripts — pairs directly
  with the ComputerCraft stack added in 0.9.21/0.9.23 for scripted flight/attitude control.
- **No jet engines** (Create: Simulated Jet Engines deliberately excluded); G&G thrusters cover the
  altitude/boost need. Chosen over Create Propulsion: Simulated to avoid overlapping thruster systems.

### Changed — Create Aeronautics 1.3.1 → 1.3.2 (dependency of Gadgets & Gizmos)
- Adding G&G V1.2.2 pulled its required **Create Aeronautics** dependency up to **1.3.2** (a minor patch
  bump from the pack's 1.3.1: JEI/creative-tab compat fixes + swivel-bearing mass fix). Kept on the pack's
  original **Modrinth** source per curator decision (packwiz's resolver had transiently flipped it to
  CurseForge; restored to Modrinth `oWaK0Q19` version `44pLdPGg`). Same bundled jar either way.

### Notes
- **No fresh world.** Jar add + minor dep bump — no worldgen/datapack/loot change. Applies on next launch.
  Quest book still **17 / 242**.
- Pack is now **0.9.24** / **165** mods (`create-aeronautics-gadgets-and-gizmos.pw.toml`).

## [0.9.23] — 2026-09-13

### Added — CC:CBC + Advanced Peripherals (cannon fire-control + general CC automation)
Completes the ComputerCraft content pillar started in 0.9.21.
- **CC:CBC 1.1.1** (Modrinth `zA9Klldw`, NeoForge 1.21.1, `side = both`) — the dedicated CC: Tweaked ↔
  **Create Big Cannons** peripheral (`cannon_mount`). Proper programmable fire-control: `setComputerControl`
  (takes over from shaft-driven aiming), `setTargetAngles(yaw,pitch)` / `setTargetYaw` / `setTargetPitch`,
  `assemble()`, `fire()`, and full telemetry via `getInfo()` (assembled state, current vs target yaw/pitch,
  yaw/pitch shaft speeds, mount x/y/z). This is the reliable gunnery brain (NeoPeripherals 1.4.1ve ships
  mainly the Sable radar). Deps CC: Tweaked + CBC — both present.
- **Advanced Peripherals 0.8.1a** (Modrinth `advancedperipherals`, `side = both`) — general CC automation
  kit: Chat Box, Player Detector, Environment Detector, Geo Scanner, Block Reader, Inventory Manager,
  NBT Storage, Redstone Integrator, Energy Detector, AR Goggles/Controller (custom HUD overlays). Dep
  CC: Tweaked — present.

### Notes
- **No fresh world.** Jar adds only — no worldgen/datapack/loot change. Applies on next launch.
  Quest book still **17 / 242**.
- Pack is now **0.9.23** / **164** mods (adds `cc-cbc.pw.toml`, `advancedperipherals.pw.toml`).
- Advanced Peripherals' **ME Bridge / RS Bridge** peripherals need Applied Energistics 2 / Refined Storage,
  which are **not** in the pack — those two peripherals are inert here; the rest are fully usable.
- With this, the CC line is: **CC: Tweaked** (core) + **NeoPeripherals** (Sable radar) + **CC:CBC**
  (cannon control) + **Advanced Peripherals** (world sensing/HUD). **Create Big Cannons: Peripheral**
  was dropped in favor of CC:CBC.

## [0.9.22] — 2026-09-13

### Added — Create: Radiologistics (tower-based wireless comms + node computer)
- **Create: Radiologistics 1.1.1** (Modrinth `mtA0MjEn`, NeoForge 1.21.1, `side = both`) — a Create-native
  wireless communication + computation system. Fills the "radio tower / long-range comms" role: a Radio
  Transmitter plus **vertically-stacking Antennas** (each segment adds range, hard cap **3,000 blocks**),
  a node-based **Main Computer** (visual math/logic/variable programming), Redstone Link Module, Memory
  Module, Gyroscope Sensor (pitch/yaw/world coords), Jammer (blocks channels/Redstone Links in 150-block
  radius), Audio Module, and a Pilot helmet.
- **Every optional integration is already satisfied by this pack:**
  - **Create Big Cannons** → Wired Inertia Fuze for remote-controlled cannon launcher rigs.
  - **Create Radars** → extract/track radar coordinates inside algorithms (pack has Create: Radars + Aero Radars).
  - **Create Aeronautics** → coordinate projection for moving Sable sub-level grids.
- Dependency: **Create** (mandatory) — already present. Nothing else needed.

### Notes
- **No fresh world.** Jar add only — no worldgen/datapack/loot change. Applies on next launch.
  Quest book still **17 / 242**.
- Pack is now **0.9.22** / **162** mods (`create-radiologistics.pw.toml`).
- Chosen over **Create: Radionautics** (simple infinite-range Create radio links) for its tower/antenna
  gameplay and native CBC/Radars/Aeronautics integration. Note it is a **Create-native** comms/compute
  layer (visual node programming), parallel to the CC: Tweaked (Lua) stack added in 0.9.21 — both coexist.
- The original "Wireless Radio Towers Addon" was **not** used: no verified CurseForge/Modrinth source
  (only a reposting site). Radiologistics fills the tower/comms role from a trusted source instead.

## [0.9.21] — 2026-09-13

### Added — ComputerCraft (CC: Tweaked) stack: programmable computers + Sable/CBC peripherals
Begins the "programmable warship" content pillar for the aeronautics/naval + Big Cannons stack.
- **CC: Tweaked 1.120.2** (Modrinth `cc-tweaked`, NeoForge 1.21.1, `side = both`) — the ComputerCraft
  foundation: in-world Lua computers, turtles, monitors, modems, speakers. Complements KubeJS (author
  scripts) with player-built in-world automation. No dependencies.
- **NeoPeripherals 1.4.1ve** (Modrinth `neoperipherals`, `side = both`) — a CC: Tweaked ↔ **Sable**
  bridge. Adds a radar peripheral (`neo_radar`) that scans Sable physics SubLevels (other airships/ships)
  for position/pose — the basis for targeting and autopilot scripts. Requires Sable (already in pack, 2.0.5).

### Notes
- **No fresh world.** Jar adds only — no worldgen/datapack/loot change. Applies on next launch.
  Quest book still **17 / 242**.
- Pack is now **0.9.21** / **161** mods (adds `cc-tweaked.pw.toml`, `neoperipherals.pw.toml`).
- ⚠️ **NeoPeripherals feature scope:** the installed **1.4.1ve** release exposes the Sable **radar**
  peripheral; the broader cannon-mount / NFC / entity-radar / Sable-engine suite described in some listings
  is not confirmed present in this build — verify in-game. Dedicated CBC cannon control is being evaluated
  separately (**CC:CBC**).
- **Follow-ups:** dedicated cannon peripheral **CC:CBC** and general-automation **Advanced Peripherals**
  were added in 0.9.23; the tower/comms role was filled by **Create: Radiologistics** in 0.9.22 (the CC-only
  "Wireless Radio Towers" addon had no verified source). **Create Big Cannons: Peripheral** was dropped from
  consideration in favor of CC:CBC.

## [0.9.20] — 2026-09-13

### Added — Create: AeroPortals (Sable airships travel through portals)
- Added **Create: AeroPortals 1.3.3** (CurseForge `create-aeroportals`, project 1549100, NeoForge 1.21.1),
  a bridge between Create: Aeronautics airships (Sable physics SubLevels) and Minecraft's portal system:
  when a ship's bounding box overlaps a Nether/modded portal, the whole SubLevel — plus riding players,
  passengers, and decorations — is serialized and transferred to the destination dimension (respecting
  dimension coordinate scale), with a per-ship cooldown to prevent bounce-back. Installed `side = "both"`.
- **No missing dependencies.** Requires Sable 1.0+ (pack has **2.0.5**) and NeoForge 21.1.219+ (pack is
  **21.1.248**); Create 6.0+ (optional, already present). Nothing else needed to be added.

### Notes
- **No fresh world.** Jar add only — no worldgen, no datapack, no loot-script change. Applies on next
  launch. Quest book still **17 / 242**.
- Pack is now **0.9.20** / **159** mods (`create-aeroportals.pw.toml`).
- Upstream flags the mod as a **proof of concept** (cross-dimension transfer + rider rebinding implemented,
  not yet fully battle-tested in multiplayer) — worth watching in playtests.

## [0.9.19] — 2026-09-13

### Removed — Sable: Destructive (reverted 0.9.18 addition)
- After discussion with the co-curator, the team decided **against** adding Sable: Destructive.
  Removed `sabledestructive-2.2.0.jar` via `packwiz remove sable-destructive` (`sable-destructive.pw.toml`
  deleted, `index.toml` + `pack.toml` `[index]` hash refreshed). Pack is back to **158** mods.
- Base **Sable 2.0.5** stays — it is still required by **Create: Aeronautics** and is unaffected by this
  revert. Only the *Destructive* add-on jar is gone; airships and Create ships no longer break on heavy impact.

### Notes
- **No fresh world.** Jar removal only — no worldgen, no datapack, no loot-script change.
  Applies on next launch. Quest book still **17 / 242**.
- Pack is now **0.9.19** / **158** mods.

## [0.9.18] — 2026-09-13

### Added — Sable: Destructive (collision/explosion destruction for Sable physics)
- Added **Sable: Destructive 2.2.0** (Modrinth `s8kSCCgD`, NeoForge 1.21.1), an add-on to the base
  **Sable** physics engine already in the pack (2.0.5). Sable simulates Create: Aeronautics physics
  structures; Destructive makes those physics blocks *actually break* on heavy impact — real kinetic-energy
  collision damage, inertial penetration, density-aware self-damage, flying debris, and radial shockwaves/
  craters. Crashes now have consequences.
- Requirements satisfied: needs Sable 2.0.3+ (have 2.0.5) and NeoForge 21.1.235+ (pack is on 21.1.248).
  Installed `side = "both"`.

### Notes
- **No fresh world.** Jar add only — no worldgen, no datapack, no loot-script change.
  Applies on next launch. Quest book still **17 / 242**.
- Pack is now **0.9.18** / **159** mods (`sable-destructive.pw.toml`).
- **Sable: Destructive** `2.2.0` (Modrinth `s8kSCCgD` / version `OdjEhksA`,
  `side = both`). Needs Sable **2.0.3+** (pack has **2.0.5**) and NeoForge
  **21.1.235+** (pack is **21.1.248**).
- Makes Sable physics blocks *break* on heavy impact (kinetic-energy collision
  damage, inertial penetration, density-aware self-damage, flying debris,
  radial shockwaves/craters). Distinct from **Explosion Overhaul** (world-block
  blasts). Covers Create Aeronautics airships and Create: Better High Seas ships.
- Do **not** drop **Sable** (required by Aeronautics + Destructive). Drive-By-Wire
  With Sable stays **out**. Valkyrien Skies stays **out**.
- Living docs: `Notes.md`, `MODLIST.md`, `SPECTRUM.md`. Folds the unmerged
  0.9.17 living-docs run (`cursor/docs-0.9.17-simply-swords-loot`) plus #40 / #41 / #42.

## [0.9.17] — 2026-09-14

### Changed — Simply Swords loot in WDA-scope dungeons rebalanced
- `wda_dungeon_loot.js`'s comment claimed Simply Swords weapons were injected by "that mod's own
  injector" — false. Checked every `lootintegrations_*.jar` in the pack; none targets Simply Swords.
  The mod's own native injector (`pack/config/simplyswords/loot.toml`) *is* enabled and correctly
  keyed, but in practice its drops aren't showing up in WDA-scope chests, so weapons are injected
  directly in this script instead.
- Extracted the mod's real item registry from `assets/simplyswords/lang/en_us.json` to separate its
  15 weapon *types* × 5 material *tiers* (`<tier>_<type>`, e.g. `runic_warglaive`) from its ~50
  named/lore "Unique" weapons (Mjolnir, Stormbringer, The Devourer, Livyatan, Frostfall, etc.), which
  are gated behind the mod's own Runic Tablet awakening minigame.
- Removed all named Unique weapons from the loot pools — they undercut that minigame as a shortcut.
- Expanded weapon-type coverage from 2 types to 13 of the mod's 15 types across the Iron (Filler) and
  Gold (Treasure) tiers, all 13 at Diamond and a curated 7-type subset at Netherite (both enchanted,
  Treasure-Gear pool), and added a new `JACKPOT_RUNIC` pool with a curated, equal-weight 5-type Runic
  selection (strongly enchanted) on flagship/boss chests only.
- Fixed two tier-routing coverage gaps found while auditing all four combat-dungeon mods' native loot
  tables: Aquamirae's `ship_1`/`ship_2`/`frozen_chest` chests and Bosses'Rise's `dragon_tower` boss
  chest contain no `TREASURE`-routing keyword in their ids, so they were falling through to
  Filler-only loot. Added exact-name alternations to the `TREASURE` regex so they now also get the
  Treasure + Treasure-Gear pools (`dragon_tower` already had Jackpot via the `FLAGSHIP` regex, so it
  now gets the full tier stack, matching its status as the mod's boss chest).

### Notes
- **No fresh world.** Script-only (`wda_dungeon_loot.js`). Already-opened chests keep
  their contents; unopened combat/boss dungeon chests roll the new pools on next
  launch. No new mods — pack stays **158**. `pack.toml` is **0.9.17**.
  Current pack is **0.9.26** / **170**.
- **Named Unique weapons stay out.** They skip the mod's Runic Tablet awakening
  minigame. The 0.9.15 denylist still holds (`uniqueLootTableWeight = 0` + pity
  100000 + empty `lootable_uniques` in `bigglobe_simplyswords_nouniques.zip`).
  Do **not** fold Uniques into `LOOT.md` or this script.
- **LootJS now injects material-tier Simply Swords weapons** into combat-dungeon
  chests. The native injector (`enableLootDrops = true`, global `*:chests/*`) is
  still on, but it does not reliably reach WDA / Cataclysm / Bosses'Rise /
  Aquamirae tables — that is why the script lists them. Native `runicLootTableWeight
  = 0` still applies to the *native* injector; LootJS `JACKPOT_RUNIC` is a separate
  curated flagship path.
- **Tiers:** Iron × 13 types in FILLER (unenchanted); Gold × 13 in TREASURE
  (unenchanted); Diamond × 13 + Netherite × 7 in TREASURE_GEAR (enchant 5–15);
  Runic × 5 (`katana` / `warglaive` / `glaive` / `greataxe` / `scythe`) in
  `JACKPOT_RUNIC` (enchant 10–25, ~15%). Types omitted from the material ladder:
  `chakram`, `scythe` (`scythe` is Runic-only).
- **Runic Tablet left TREASURE_GEAR** (it was a 0.9.15 rare drop). Native
  `tabletHardPity = 400` remains a far backstop; Runic weapons stay craftable at
  the Runic Forge. Do **not** re-add named Uniques as a "tablet shortcut."
- **Routing exceptions** (no treasure-keyword in the chest id, so they used to
  miss TREASURE): `aquamirae:chests/ship_1|ship_2|frozen_chest` and
  `block_factorys_bosses:chests/dragon_tower`. `NOTREASURE` is unchanged, so those
  chests still roll FILLER as well. `dragon_tower` already had JACKPOT via
  FLAGSHIP — it now gets the full stack.
- Living menu: `LOOT.md`. Folds the unmerged 0.9.16 living-docs run (#42) plus
  #40 / #41.

## [0.9.16] — 2026-09-13

### Fixed — packwiz "hash invalid" on bigglobe_whendungeonsarise.zip
- The committed datapack zip and its `index.toml` hash had drifted apart in an earlier commit
  (the hash recorded did not match the zip actually committed), so any client validating the
  pack against the repo failed with a hash mismatch on this file. Committing the on-disk zip
  (already hash-verified against the current `index.toml` entry) resolves it. Verified all 379
  files in `index.toml` against their actual sha256 -- zero other mismatches.

### Notes
- **No fresh world.** Hash-only / zip-resync. No gameplay change. After sync, the WDA compat
  zip validates again.
- Same class of failure as **0.8.6** (stale `pack.toml` `[index]` hash), but this time the
  **zip** was the stale file — `index.toml` already had the correct sha256. Always
  `packwiz refresh` after touching a datapack zip, and commit **the zip + `index.toml` +
  `pack.toml` together**. Do not assume a zip "looks current."
- `pack.toml` was **0.9.16** at this commit. Current pack is **0.9.26** / **170** mods.
  Warnautics **1.0.8** and the LootJS oxygen-tank hotfix stay.
  0.9.17 is script-only (Simply Swords WDA-scope rebalance).

## [0.9.15] — 2026-09-13

### Fixed — LootJS injection aborting on an invalid item id
- Removed `aquamirae:oxygen_tank` from `wda_dungeon_loot.js` — the item does not exist in
  Aquamirae 7.2.1, and one bad id makes LootJS abort the ENTIRE script, so all WDA/Cataclysm/
  Aquamirae chests were silently falling back to vanilla loot. Modded loot should now inject.

### Notes
- **No fresh world.** Script-only. Already-opened chests keep their contents; unopened
  combat/boss dungeon chests now roll the 0.9.15 pools.
- `aquamirae:oxygen_tank` is **not a real id** in Aquamirae 7.2.1 (the survey catalog listed
  "oxygen tank/oxyhelium"; the wired TREASURE drop was wrong). Echo compass stays. Do **not**
  re-add this id — one unknown item aborts the **entire** LootJS script (every combat-dungeon
  chest silently vanilla).
- This commit rolled the version string back to **0.9.15**; the later hash-invalid fix
  re-bumped `pack.toml` to **0.9.16**. The **Create: Warnautics 1.0.8** jar from the earlier
  [0.9.16] stays. Pack still **158** mods. Living menu: `LOOT.md`.

## [0.9.16] — 2026-09-13

### Fixed — update Create: Warnautics 1.0.3 → 1.0.8 (cruise missile was missing)
- The 0.9.15 flagship loot pool references `cbc_more_content:cruise_missile`, but the installed
  Create: Warnautics **1.0.3** predates that item — it doesn't exist in-game, so the loot entry was
  dead. Updated to **1.0.8** (latest), which registers the Cruise Missile (item + block + recipe),
  making the flagship drop resolve. Verified the item's assets/recipe are present in the 1.0.8 jar.

### Notes
- **No new mods** (count stays **158**). No worldgen. Applies on next launch.
- `cbc_more_content:cruise_missile` is the Warnautics namespace. Do **not** roll Warnautics
  back to 1.0.3 or the JACKPOT cruise-missile drop dies again.
- The later [0.9.15] LootJS hotfix rolled `pack.toml` back to **0.9.15**; the subsequent
  hash-invalid [0.9.16] re-bumped the version string. This jar bump remains.

## [0.9.15] — 2026-09-13

### Changed — combat-dungeon loot overhaul + Simply Swords native loot config
Two linked changes to how modded loot reaches dungeon chests.

**Simply Swords loot** (`config/simplyswords/loot.toml` + new `datapacks/bigglobe_simplyswords_nouniques.zip`):
- Re-enabled the mod's **native loot injector** (`enableLootDrops = true`): material + rare
  weapon *types* now spawn in loot tables globally (all `*:chests/*` tables), pity-paced.
- **Runic weapons never drop** (`runicLootTableWeight = 0`); the **Runic Tablet** ("shard") is
  instead a rare weighted drop in our combat-dungeon pool, with native tablet pity pushed to a
  far backstop (`tabletHardPity = 400`). Runic weapons stay craftable at the Runic Forge.
- **Uniques fully disabled** — weight 0 + soft/hard pity maxed (100000) + a datapack that empties
  the `lootable_uniques` tag (all 40 legendaries denylisted). Uniques are loot-only with no recipe,
  so this removes them from the pack entirely, as intended.

**WDA LootJS loot rebuilt + broadened** (`kubejs/server_scripts/wda_dungeon_loot.js`):
- Scope extended from WDA-only to the **combat/boss dungeon mods**: `dungeons_arise`, `cataclysm`,
  `block_factorys_bosses` (Bosses'Rise), `aquamirae`. Vanilla, villages, Towns&Towers, CTOV untouched.
- **Removed** Create: Metallurgy items entirely (per feedback) and andesite/zinc from filler; **halved**
  all Numismatics currency weights.
- **Added** a much wider curated menu across ~15 mods: Create: Gunsmithing guns/ammo/attachments
  (flintlock/revolver/shotgun in treasure, gatling/blazegun/ballistazooka in flagship), Creating Space
  + CBC alloys, Twilight Forest (ironwood/torchberries — no boss mats/charms), Born in Chaos mats+elixirs,
  Re:Animal foods, Reliable Backpacks, Dragons Plus smithing template, Aquamirae/Hybrid aquatic gear,
  medical consumables, and the Runic Tablet.
- Four pools: **Filler** (~28%), **Treasure** (~35%) + **Treasure-Gear** (enchanted `5–15`, ~15%,
  revolver/shotgun/tablet live here), **Jackpot** (flagship, ~38%). No endgame armor anywhere (ingots
  only); enchants capped at 15; Sun a 1% capstone. Reviewed item-by-item before wiring.

### Notes
- **No fresh world.** LootJS + the pinned `loot.toml` + `bigglobe_simplyswords_nouniques.zip` apply
  on next launch. Already-opened chests keep their contents; unopened chests roll the new pools.
- The native Simply Swords injector is **global** (`*:chests/*`). LootJS stays **combat-dungeon only**
  (`dungeons_arise` / `cataclysm` / `block_factorys_bosses` / `aquamirae`). Vanilla, villages,
  Towns&Towers, and CTOV are untouched.
- Pack is now **0.9.16 / 158 mods** (Integrated Villages + Integrated API landed in 0.9.12; no new
  jars here). **Uniques are gone** (not craftable, not lootable). Remnants stay off. Runic weapons
  stay craftable at the Runic Forge. Do **not** re-add `borninchaos_remnant_loot.js` or fold uniques
  into `LOOT.md`. Living menu: `LOOT.md`.
- Follow-ups in the headings above: Warnautics **1.0.8** so `cruise_missile` resolves ([0.9.16]);
  `aquamirae:oxygen_tank` removed so the script actually loads (hotfix [0.9.15]); WDA compat zip
  re-synced to its `index.toml` hash (later [0.9.16]).
- **Superseded in 0.9.17** for WDA-scope chests: LootJS now injects material-tier
  Simply Swords weapons directly (native injector does not reliably reach those
  tables); named Uniques stay out of the script; Runic Tablet left TREASURE_GEAR;
  curated `JACKPOT_RUNIC` on flagship; Aquamirae ship/frozen + Bosses'Rise
  `dragon_tower` now also match TREASURE.

## [0.9.14] — 2026-09-13

### Changed — airship villages now float 300 ABOVE the surface (was fixed Y=300)
- `airship_village`: restored `project_start_to_heightmap: WORLD_SURFACE_WG` with a
  constant offset of 300 -> generates at **surface + 300**, tracking terrain instead of a
  fixed absolute altitude. `terrain_adaptation: none` keeps it floating free. Via `build_iv_compat.py`.

### Notes
- Datapack-only (`bigglobe_integratedvillages.zip`). Already-generated chunks keep the old fixed
  **Y=300** airships; **new land chunks** get surface+300. No fresh overworld required.

## [0.9.13] — 2026-09-13

### Changed — airship villages a touch more frequent
- `air_villages` spacing `115/90 → 75/59` via `bigGlobeAero/build_iv_compat.py`:
  ~1,840 → **~1,200 blocks** average between floating airship villages. salt and the
  `air_village_avoid` (8-chunk CTOV/vanilla-village) exclusion unchanged.

### Notes
- Datapack-only. Spacing change is **new chunks only**. salt + 8-chunk CTOV avoid unchanged.
  No fresh overworld required.

## [0.9.12] — 2026-09-13

_Consolidated entry — collapses the prior 0.9.12–0.9.17 dungeon/loot iterations and adds Integrated Villages into one squashed release, to end the version sprawl._

### Added — Integrated Villages (airship-only) + Big Globe compat
- Add **Integrated Villages 1.3.3** + **Integrated API 1.8.2** (Modrinth, NeoForge 1.21.1).
- `bigglobe_integratedvillages.zip` (from `bigGlobeAero/build_iv_compat.py`): only the **airship village**
  generates (`regular_villages` set emptied), placed at fixed sky **Y=300** (`terrain_adaptation: none`,
  no heightmap projection), biomes re-keyed to `#bigglobe:land`.
- `air_village_avoid` tag merges `bigglobe_ctov:villages` so airships never generate over a CTOV town.
- Config `disableVanillaVillages=false` (keeps CTOV/vanilla villages) + `activateCreateContraptions=true`
  (airship Create propellers spin).

### Changed — WDA dungeon spacing (`patch_wda_compat.py`)
- `stattinkerer:large_dungeon` `280→125` (~4,480 → **~2,000 blocks** apart).
- `stattinkerer:sky` `→25/22` (**~400 blocks**); `mechanical_nest` `→41/36` (**~656**, frequency removed).

### Changed — WDA modded loot via LootJS (`wda_dungeon_loot.js`)
- Additive tiered injection over `dungeons_arise:chests/*` — WDA-native empty-weight pools, 3 coherent tiers.
- Reward backbone = **Numismatics coin ladder + Create/mod crafting materials**; **no endgame armor as loot**
  (enchanted ignitium/gravitite sets stay boss-craft-locked; chests drop only the crafting ingots).
- Jackpot currency kept genuinely rare (Sun ~1%); `create:netherite_backtank` retained (enables Create air tech).

### Notes
- Squashed onto the `0.9.10` baseline as one commit, consolidating the `.meshclaw` and `.kiro/crew` working
  copies. Kirocrew (`~/.kiro/crew/workspace`) is the canonical clone going forward.
- Adds **Integrated Villages** `1.3.3` + **Integrated API** `1.8.2` (`side = both`) → pack **158** mods.
  No fresh overworld. New airship villages and the tighter WDA spacings need **unexplored chunks**.
- 0.9.12 loot was WDA-only (superseded by the 0.9.15 combat-dungeon rebuild). 0.9.12 airships were
  fixed **Y=300** (superseded by 0.9.14 surface+300).

## [0.9.11] — 2026-09-01

### Fixed — correct the Simply Swords "no unique drops" config
- Deep-dived Simply Swords' own config descriptions: **`loot.enableLootDrops = false`** is the authoritative
  switch (*"prevent Simply Swords from generating loot in chests"*) and chest loot is the only way finished
  uniques enter the world (villages / ruined portal / ender-dragon table; pity-guarantee is downstream). With
  `loot.enableContainedRemnants = false`, the remnant→tablet path is off too. `loot.toml` fully covers it.
- Removed `config/simplyswords/general.toml` (`nonPlayerWeaponAbilityChance = 0.0`): per the mod it only
  controls whether a mob *uses* a held weapon's ability — **not** spawning/dropping — so it was irrelevant to
  the goal and its comment was misleading. There is no "mobs spawn equipped with uniques" mechanic to disable.

## [0.9.10] — 2026-09-01

### Added — Bosses'Rise + boss quest lines (Cataclysm & Bosses'Rise)
- **Bosses'Rise** `2.1.2` (Modrinth, `block_factorys_bosses`) — 5 arena/structure bosses (Sirok the Sandworm,
  Skor the Yeti, Nerakyss the Kraken, Helvar the Underworld Knight, Ashlord the Infernal Dragon). Dep
  **GeckoLib** already in pack.
- New compat datapack `datapacks/bigglobe_bossesrise.zip` (Paxi) — its structures gate on bare vanilla
  biomes BG lacks; re-keyed to BG-populated tags (sandworm_nest→badlands/savanna/plains, dragon_tower→
  plains/jungle/savanna/forest, yeti_hideout→mountain, kraken_ship→deep_ocean). underworld_arena (nether)
  needs none.
- **Two FTB Quests chapters** (generated, kill-gated, guidance-only — no self-attest):
  - **L_Ender's Cataclysm** (7) — Wadjet → Maledictus / Leviathan → Netherite Monstrosity → Ignis /
    Harbinger → Ender Guardian. Each quest points at Create cannons / airships over 1v1 melee.
  - **Bosses' Rise** (5) — Sandworm → Yeti / Kraken → Underworld Knight → Infernal Dragon capstone.
  - Rewards scale in Numismatics coin (cog → crown → sun) + boss materials; generated from
    `bigGlobeAero/quest_lines/{cataclysm,bossesrise}.py`. Pack now has 17 chapters / 242 quests.

## [0.9.9] — 2026-09-01

### Changed — widen Cataclysm Cursed Pyramid biomes
- `bigglobe_cataclysm.zip`: `cursed_pyramid_biomes` widened from `#minecraft:is_badlands` alone to
  `#minecraft:is_badlands` + `#minecraft:is_savanna` + `#minecraft:is_plains` (warm/dry open land) so the
  Pharaoh isn't confined to rare BG badlands. (Biome tag `values` accept a list of tags.)

## [0.9.8] — 2026-09-01

### Added — L_Ender's Cataclysm (arena/summon bosses) + BG compat
- **L_Ender's Cataclysm** `3.33` (Modrinth) — ~8 big bosses that are **summoned via items or fixed in
  structures** (never random-spawn, never despawn), with high HP + anti-melee AOE → rewards tech/artillery/
  airships over 1v1 gear. New dep **Lionfish-API** `3.1` (Curios already in pack).
- New datapack `datapacks/bigglobe_cataclysm.zip` (Paxi-loaded) — Cataclysm gates each structure via its own
  `#cataclysm:has_structure/*_biomes` tags, and the **overworld** ones point at bare vanilla biomes Big Globe
  never uses, so they'd never generate. This overrides those tags to BG-populated ones (`bigglobe_tags.zip`):
  - `cursed_pyramid_biomes` → `#minecraft:is_badlands` (Pharaoh)
  - `acropolis_biomes` → `#minecraft:is_ocean`
  - `frosted_prison_biomes` → `#minecraft:is_mountain` (Maledictus)
  - `sunken_city_biomes` → `#minecraft:is_deep_ocean` (Leviathan)
  - `ancient_factory_biomes` → `#minecraft:is_overworld` (Netherite Monstrosity; broad to guarantee gen)
  - Nether/End structures (burning_arena, soul_black_smith, ruined_citadel) need no override — BG doesn't
    touch those dimensions. Biome picks are thematic and tunable.

## [0.9.7] — 2026-09-01

### Changed — Simply Swords: keep weapon variety, drop the unique/remnant loot layer
- Reverted the LootJS Simply Swords loot injection (the Born in Chaos remnant script + WDA chest
  materials from the previous attempt) — `wda_dungeon_loot.js` is back to its no-op scaffold.
- Shipped a pinned Simply Swords config (`config/simplyswords/`) that disables all "unique sword drops"
  so only the crafted weapon variety remains:
  - `loot.toml`: `enableLootDrops = false`, `enableContainedRemnants = false`
  - `general.toml`: `nonPlayerWeaponAbilityChance = 0.0`
  Partial TOML overrides — Fzzy Config's safe deserializer merges the rest. Consequence: with remnants
  off, uniques are also effectively uncraftable (no remnant source), leaving just the weapon-type flavor.
- **Verify in-game** (can't launch from here): after sync, uniques/remnants should no longer drop from
  chests or mobs. If they still do, toggle the same fields via Mod Menu → Simply Swords and send me the
  generated `.toml` to bake in.

## [0.9.6] — 2026-09-01

### Fixed — Simply More crash on tooltip render
- Bumped **Simply More** `1.2.3` → **`1.3.0_alpha5`** (Modrinth). The `1.2.3` release (2026-06-10) was
  built against an older Simply Tooltips; its `TooltipRendererMixin` `@ModifyReturnValue` targets a method
  `borderStyleFor` that **Simply Tooltips `0.1.5`** (2026-08-23, pulled by Simply Swords `1.70.2`) renamed,
  so a `MixinApplyError` crashed the client whenever a Simply Swords/Simply More item tooltip rendered
  (e.g. opening the Simply Swords creative tab). `1.3.0_alpha5` (2026-08-26) is the Simply More build
  compiled against the current Simply Tooltips/Simply Swords API. Alpha channel, but the only compatible pairing.

## [0.9.5] — 2026-09-01

### Added — Big Globe × Born in Chaos structure compat
- New datapack `datapacks/bigglobe_borninchaos.zip` (Paxi-loaded). Born in Chaos ships ~30 structures;
  its tag-gated ones (`#is_forest`/`#is_taiga`/`#is_savanna`) already generate because `bigglobe_tags.zip`
  populates those tags, but 6 **gameplay** structures were gated on bare vanilla biome IDs (`plains`,
  `desert`, …) that Big Globe never uses, so they never generated. This override re-keys their `biomes`
  to BG-populated `#minecraft:is_*` tags (all other fields — jigsaw pool, `beard_thin`, surface anchor —
  unchanged):
  - `observation_tower_plains`, `dark_tower_plain`, `clown_caravan_plains`, `farm` → `#minecraft:is_plains`
  - `mound_of_hounds` → `#minecraft:is_badlands`
  - `infernal_pumpkin` → `#minecraft:is_forest`
- The ~20 cosmetic `grave_*` memorial structures were intentionally left un-compatted (flavor only).

## [0.9.4] — 2026-09-01

### Added — Nether content (make it interesting & dangerous)
- **Incendium** `5.4.4` (Modrinth) — Nether biome/structure overhaul + the Nether Sovereign boss & mobs.
  Uses datapack biome modifiers; injects into the vanilla Nether biome source (no extra lib).
- **YUNG's Better Nether Fortresses** `3.1.5` (Modrinth) — overhauls fortresses into large dangerous
  complexes. Dep **YUNG's API** already in pack.
- **Born in Chaos** `1.7.6` (Modrinth) — nightmarish hostile mobs (undead + Nether). Dep **GeckoLib**
  already in pack.
- All sourced from Modrinth (auto-install); no new libraries. Nether is vanilla worldgen in this pack
  (Big Globe only overhauls the overworld), so these need **no BG worldgen compat datapack**. Born in
  Chaos's *overworld* mob spawns are pending review against Big Globe's biome tags (see below).

## [0.9.3] — 2026-09-01

### Fixed
- **Simply More** re-pointed from CurseForge → **Modrinth** (`simplymore`, version `bVBS14OK`). CF has
  `allowModDistribution:false` on this project, so the CurseForge API refuses to serve the download and
  clients can't auto-install it. Modrinth serves the identical jar (`simplymore-forge-1.2.3.jar`, release
  channel) via a direct CDN URL, so auto-install works. No version change (still `1.2.3`).

## [0.9.2] — 2026-08-31

### Added — Simply Swords + Simply More (combat loot)
- **Simply Swords** `1.70.2-1.21.1` (NeoForge, CurseForge) — runic/unique weapon set; integrates with
  the pack's existing Better Combat (listed by Simply Swords as an optional dep).
- **Simply More** `1.2.3` (NeoForge, CurseForge, file 8228544 — release channel) — addon to Simply Swords
  adding more weapon types & unique weapons. Pinned to the release NeoForge build (newer `1.3.0_alphaN`
  builds skipped).
- New required deps auto-pulled: **Fzzy Config** `0.7.6`, **Simply Tooltips** `0.1.5` (Architectury,
  Kotlin for Forge, Better Combat already present).
- No BG compat datapack needed — item/weapon mods, no worldgen/biome-gated content. Candidates to fold
  into the `LOOT.md` Uncommon/Rare WDA dungeon tiers later.

## [0.9.1] — 2026-08-31

### Added — LootJS (dungeon-loot infrastructure)
- **LootJS: KubeJS Addon** `3.7.0` (NeoForge 1.21.1, CurseForge) — deps (KubeJS/Rhino/Architectury) already present.
- Scaffold `kubejs/server_scripts/wda_dungeon_loot.js` for injecting **tiered modpack loot** into When
  Dungeons Arise chest tables (`dungeons_arise:chests/*`), which are otherwise 100% vanilla. Loot content
  authored after a modpack-wide item survey.

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
