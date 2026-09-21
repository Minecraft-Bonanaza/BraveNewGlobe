# Brave New Globe — Mod List

Human-readable list of every mod in the pack (**219 mods**), grouped by purpose. Current pack **1.1.13**.

**Conventions**
- Nested bullets marked _(dependency)_ are library/support mods that exist mainly to serve the mod
  they're listed under.
- Libraries used by **many** mods are collected in **[Shared Libraries & APIs](#shared-libraries--apis)**
  instead of being repeated. Where a base mod (e.g. **Create**, **Create Aeronautics**) is a shared
  dependency, its dependents are treated as **add-ons** and listed alongside it — not nested under it.
- Dependency mappings are best-effort based on the known mod ecosystems; the pack itself doesn't store
  explicit dependency metadata.

---

## World Generation & Core
- **Big Globe** _(shallow-608 patched)_ — the pack's core world generator (custom terrain, caves, spawn)
- **BlueMap** `5.7` — 3D web world map on port **8100** _(server-only)_
- **Paxi (NeoForge)** — loads the pack's global datapacks/resourcepacks (Big Globe compat)

## Create & Add-ons
- **Create** — base tech/automation mod
- **Create: Copycats+** — copycat/decoration blocks
- **Create: Enchantment Industry** — automated enchanting
- **Create: Power Chip** — compact power/logic
- **Create: Power Grid** `0.6.1` — electrical power network
- **Create: Diesel Generators** — fuel-based power
- **Create: Metallurgy** — metal processing
- **Create: Cotton** — cotton/textiles
- **Cotton to Wool** `1.0.0` — Create: Cotton / cotton balls / thread → vanilla string (GitHub)
- **Create: Storage [Neo/Forge]** — storage expansion
- **Create Factory Logistics** — factory/logistics automation
- **Create: Ratatouille** — cooking/food processing
- **Create: Central Kitchen** `2.6.1` — Create arms on Farmer's Delight / Brewin' cookware
- **Create: Integrated Farming** `1.4.2` — vacuum harvester, fishing nets, FD crop arms
- **Create Slice & Dice** `4.3.3` — slicer + sprinklers (water / fertilizer / potions; Sable contraptions)
- **Sprinkler Farmland** `1.0.0` — S&D water sprinklers snap Realistic Farmland moisture to 7 (GitHub); KubeJS player-tick hydrator also ships
- **Create: Bits 'n' Bobs** `2.3.5` — misc machines/parts (Azimuth API 1.4.8, Struts 1.3.1)
- **Create Cardan Shafts** — drivetrain/shaft additions
- **Create: Gears n' Kinetics** — kinetic additions
- **Petrol's Parts** `1.3.7` — coaxial/bevel/corner kinetics, differentials, horse mill
  - **Petrolpark's Library** `1.5.11` _(dependency)_
- **Create: Dragons Plus** `1.11.9` — dragon-themed content (Central Kitchen / Integrated Farming)
- **Creating Space** — rocketry / space content
- **Strut Your Stuff (Struts)** — structural strut/beam building blocks

### Create — Trains & Rails
- **Create: Tracks+** — track/rail additions (Aeronautics-compatible fork; replaces Create: Tracks)
- **Create: Threaded Trains** — multithreaded train performance
- **Create Train Physics Reloaded** — train physics overhaul
- **Create: Signalworks** — advanced rail signaling
- **Trotting Wagons** — horse-drawn wagons
  - **Gabou's Libs** _(dependency)_

### Create Aeronautics (airships & flight)
- **Create Aeronautics** `1.3.2` — physics-based aircraft/airships (Modrinth pin)
  - **Sable** _(dependency — physics engine for Aeronautics)_
- **Create Aeronautics: Gadgets & Gizmos** `V1.2.2` — propulsion thrusters (Thruster, Mini
  Thruster, Beam Thruster, Fuel Oxidizer) + flight controls (controller, joystick, bearings,
  gearbox, transmission) + bundled CC: Tweaked Lua docs. Covers hard climbs to the world
  ceiling; **no** Simulated Jet Engines / Create Propulsion: Simulated.
- **Create: AeroPortals** `1.3.3` — Sable airship SubLevels travel through Nether/modded
  portals (upstream flags it as a proof of concept)
- **VS / Sable Hose Connectors** — hose/fluid connectors across Sable physics contraptions
- **Create Aeronautics: Compatibility** — cross-mod compat patches
- **Create Aeronautics: Automated Logistics** — cargo/logistics for aircraft
- **Create Aeronautics: Gyro Stabilizers** — flight stabilization
- **Create Aeronautics: Throwable Rope Connector** — rope/connection tool (places connectors)
- **Climbable Ropes for Create Aeronautics** `2.1.3` — empty-hand climb on Simulated ropes / plunger
  lines. Pinned to Aeronautics **1.3.2** (older pair crashed).
- **Create: WarHorn** `1.0.1` — kinetic long-range horn (stationary or Aeronautics airships)
- **Create Aeronautics: Delivery Required** — delivery contracts & logistics for aircraft contraptions
- **Create: Aeroworks** `1.5.0` — cockpit Control Stand / modules / Drive-By-Sable wiring
- **Create: Warnautics** `1.0.8` — military/combat aeronautics (cruise missile; needed by the
  0.9.15 JACKPOT pool). Do not roll back to 1.0.3.
- **Create: Better High Seas** — ships / naval content
- **Create Deep Seas** `2.2.4` — Sable/Aeronautics submarines (bundles Abyss dimension)
  - **Create: Deep Seas - Lava Fix** `1.0.1` — no fire/lava damage inside sealed lava-submerged subs
- **Aeronautics Camera Sync** — smooth camera for contraptions
  - **Azimuth API** _(dependency — camera/keybind library)_
- **Create Aero Radars** — radar for aircraft
- **Create: Radars** — general radar blocks
- **Contraption Lights** `1.5.1` — lanterns on Create/Sable builds light the world
  _(optional, default on; toggle with LambDynamicLights)_
  - **LambDynamicLights** `4.8.11` — LAMB dynamic-light backend _(client, optional, default on)_
- **Create: Radiologistics** `1.1.1` — tower/antenna wireless comms (3,000-block cap) +
  node computer; native CBC / Radars / Aeronautics hooks. Prefer this over Radionautics.

### Create — Cannons & Ballistics
- **Create Big Cannons** — buildable cannons/artillery
  - **Ritchie's Projectile Library** _(dependency)_
- **Create Big Cannons: Going Ballistic** `0.3.1` — CBC expansion (Terminal Ballistics compat)
- **CBC Terminal Ballistics** — terminal ballistics/impact mechanics
- **Create: Gunsmithing** — firearms for Create
- **Create: Gunpowder [aspctt]** — gunpowder/explosives production
- **CC:CBC** — CC: Tweaked ↔ Create Big Cannons peripheral (`cannon_mount`): programmable fire
  control — target angles, assemble/fire, full aim/speed telemetry

### ComputerCraft & programmable control
In-world Lua computers plus Create-native comms. Complements KubeJS (author scripts). Not a
standalone career — the ship's/gun's brain for Aeronautics and Ordnance.
- **CC: Tweaked** `1.120.2` — computers, turtles, monitors, modems, speakers
- **NeoPeripherals** `1.4.1ve` — CC ↔ Sable radar peripheral (`neo_radar`)
- **CC:CBC** `1.1.1` — CC ↔ Create Big Cannons fire-control (`cannon_mount`). Prefer this
  over Create Big Cannons: Peripheral.
- **Advanced Peripherals** `0.8.1a` — Chat Box, detectors, scanners, inventory/energy,
  AR goggles. **ME Bridge / RS Bridge** are inert (no AE2 / Refined Storage in the pack).
- **CC : My Peripheral Extender** `1.1.4` — CC ↔ Aeronautics/Sable extender, monitors, sensors

## Combat & Explosions
- **Better Combat** — animated melee combat overhaul
- **Combat Traces** `1.0.3` — pixel-art Better Combat weapon trails + hit flashes
  _(optional, default on; cosmetic)_
- **Simply Swords** — runic/standard weapon types (Better Combat optional dep). Uniques
  disabled (they skip the Runic Tablet minigame). LootJS injects material-tier weapons
  into combat-dungeon chests (native injector is on but does not reliably reach those
  tables); curated Runic on flagship via `JACKPOT_RUNIC`.
  - **Simply More** — extra weapon types. Pinned **Modrinth `1.3.0_alpha5`** (release `1.2.3`
    crashes on Simply Tooltips `0.1.5`).
  - **Fzzy Config** _(dependency)_
  - **Simply Tooltips** _(dependency)_
- **L_Ender's Cataclysm** — summoned/structure arena bosses (never random-spawn).
  - **Lionfish-API** _(dependency)_
- **Bosses'Rise** — 5 arena/structure bosses (`block_factorys_bosses`).
- **Born in Chaos** — nightmarish hostile mobs (overworld + Nether).
- **Explosion Overhaul: A new level of destruction** — enhanced explosions
  (world-block blasts)
  - **ShatterLib | OctoLib** _(dependency)_

## Dimensions, Structures & Exploration
- **The Aether** — the classic sky dimension
- **The Twilight Forest** — the forest dimension
- **Towns and Towers** — expanded villages/pillager outposts
- **When Dungeons Arise** — large handcrafted structures (sky/sea/common/large_dungeon/nest sets)
- **Integrated Villages** — **airship village only** (ground IV villages emptied; floats surface+300)
  - **Integrated API** _(dependency)_
- **Incendium Legacy** — Nether biome/structure overhaul + Nether Sovereign
- **YUNG's Better Nether Fortresses** — fortress overhaul _(server-only)_
- **ChoiceTheorem's Overhauled Village** — village overhaul (ground villages; large-only, ~800 blk)
- **Epic Structures: Villages Standalone Edition** `1.0.0` — second ground-village theme on its own grid (~800 blk, 16-chunk exclusion vs CTOV)
- **It Takes a Pillage Continuation** — raids/pillager content
- **Illager Invasion** — new illager variants
- **Fragmentum** — structures/relic loot
- **Aquamirae [Neo/Forge Edition]** — ocean structures & atmosphere
  - **MCG's Guidebook: Aquamirae** `1.2.0` — in-game Aquamirae pages _(client)_
    - **MCG Core** `1.1.0` _(dependency — client, H-key book)_
- **Sea Myths** — legendary ocean monsters & bosses

## Mobs & Creatures
- **Mowzie's Mobs** — bosses & unique creatures
- **Mutant Monsters** — mutant vanilla-mob variants
- **Re:Animal** — animal overhaul/additions
- **Hybrid Aquatic** — ocean creatures
- **Social Player Mobs** _(Interactive Player Mobs)_ — player-like mobs
- **Doped Horses** — faster, enchantable, configurable horses
- **Animal Weights** — weight mechanics for animals
  - **Animal Weights Scaling** `1.0.1` — visual skinny/plump scale from weight 0–8 (GitHub)

## Villagers & NPCs
- **MCA Reborn [Fabric/Forge]** — Minecraft Comes Alive villagers/families
  - **Villager API** _(dependency)_
- **In Control!** — mob spawning rules/control

## Farming, Food & Survival
- **Farmer's Delight** `1.3.4` — cooking & farming expansion
- **Provisioner's Delight** `0.9.31` — canned/bottled expedition food
  - **Patchouli** `1.21.1-93` _(dependency)_
- **Storage Delight** `26.09.17` — kitchen drawers and cabinets
- **Brewin' And Chewin'** — food & drink additions
- **Burnt Basic** — cooking/burning mechanics
- **Realistic Farmland** — realistic soil/farming
- **Food Spoilage** — food goes bad over time
- **More Diseases & Treatments** — illness & medicine
- **Serene Seasons** — seasonal cycle affecting crops/biomes
- **Project Atmosphere** — realistic climate & weather
- **Supplementaries** `3.9.9` — decorative & functional blocks
- **Amendments** `1.21-2.1.10` — vanilla cauldron / lantern / jukebox tweaks (Moonlight)
- **Comforts** `9.0.5` — sleeping bags & hammocks (do not set spawn by default)
- **Bountiful** — bounty board quests
  - **Create: Numismatic Bounties** — pays Bountiful rewards in Numismatics coins

## Economy
- **Create: Market Maker** `V0.5.0` — **in-house** Create economy addon (`marketcoordination`).
  GitHub releases (`Minecraft-Bonanaza/Create--Market-Maker`), not CurseForge/Modrinth.
- **Create: Numismatics** `1.1.0` — Create-styled coin & bank-card currency (Sable packet fix; no `/payall`)
  - **Create Numismatics: Villager Currency** — villager trades use Numismatics coins instead of emeralds
  - **Create: Numismatics Utils** `2.3` — Bank Meter HUD & remote account access
  - **Numismatics Calculator** — client-side coin denomination calculator _(client)_
- **Create: Tradeworks** — physical barter stalls (tablecloths & shelves)
- **Create: Marketplace** — server-wide shop directory (browse only; trade at the vendor block)
- **Create: Stock Market** — Market Terminal for price history, trends & shop discovery
- **Create: Villager Commerce** — villagers buy from player shops via Create stock networks
  (self-hosted jar; CF distribution disabled)
- **Create: Market Maker** — the team's own custom Create economy addon (in-house, hosted on the
  org's GitHub releases, not CurseForge/Modrinth; maintained in its own project repo)

## Utility & Quality of Life
- **Accents** `2.0.2` — dyeable hats and back items with small bonuses
- **ParCool!** `3.4.3.3-NF` — vault / wall-run / cling parkour
  - **ParCool+ Compatibility++** `1.2.1` _(Better Combat, playerAnimator, Sable)_
- **Simplest Paxels** `1.0.6` — vanilla-tier pick+axe+shovel
- **Beautified Chat [Server]** `3.2` — server-wide chat style _(server-only)_
  - **Collective** `8.40` _(dependency — Serilum)_
- **Corpse** — recover items from a death corpse
- **Reliable Backpacks** — backpack storage
- **Reliable Requiem** — death/respawn handling
- **Better Respawn** — improved respawn behavior
- **Polymorph** `1.2.0+1.21.1` — choose among colliding crafting recipes
- **Visual Workbench** `21.1.2` — items stay on the crafting table
- **Simple Voice Chat** `2.6.22` — proximity voice (dedicated server: UDP 24454)
- **Better Party** `1.1.7` — server-authoritative parties, XP share, locator HUD
- **Better Party X Simple Voice** `1.0.2` — party ↔ SVC group bridge
- **Better Banners** `1.4.0` — high-res banner/shield/painting studio
- **Ping Wheel** `1.12.2` — mark a location/entity (Sable / DH / SVC group pings)
- **Better Days** — day/night length control
- **Stat Tinkerer** — tweak player/entity stats
- **Too Fast** — server-side movement/speed-limit fixes _(server-only)_
- **FTB Quests** — guidance-only quest book (17 chapters / 246 quests)
  - **FTB Library** _(dependency)_
  - **FTB Teams** _(dependency)_
- **LootJS: KubeJS Addon** — combat-dungeon chest injection (`wda_dungeon_loot.js`)
  - **KubeJS** _(dependency)_
  - **Rhino** _(dependency)_
  - **Ponder for KubeJS** (`ponderjs`) — required by Delivery Required
  - **Better Advanced Tooltips** _(dependency)_

## Performance
- **Sodium** `0.8.13` — rendering engine optimization _(client; also used by Contraption Lights / LambDynamicLights)_
- **Lithium (Fabric/NeoForge)** — game-logic optimization
- **FerriteCore ((Neo)Forge)** — memory-usage optimization
- **ModernFix** — performance & memory fixes
- **ImmediatelyFast** — rendering/text batching optimization _(client)_
- **Dynamic FPS** `3.11.4` — lowers FPS when unfocused/idle _(client, optional, default on)_
- **Vertigo** — vertical chunk loading (loads only chunks near the player vertically, not the full column)

## Client, Visual & Shaders
- **Iris Shaders** — shader loader _(client)_
- **Iris & Oculus Flywheel Compat** — Flywheel-under-Iris compatibility _(client)_
- **Iris/Oculus For Simple Clouds** — shader + Simple Clouds compatibility _(client)_
- **Distant Horizons** `3.2.0-b` — LOD "see forever" rendering _(optional, default off)_
- **Simple Clouds** — cloud visual overhaul _(both; Project Atmosphere dependency — not optional)_
- **Particle Rain** — enhanced precipitation particles _(client)_
- **Puddles & Floods** — puddle/flood weather visuals
- **Xaero's Minimap** — minimap _(client)_
- **Xaero's World Map** — full-screen world map _(client)_
- **Jade** — "what am I looking at" tooltip HUD
  - **Jade Addons (Neo/Forge)** `6.1.1` — Create / Aether / Supplementaries extras
- **AppleSkin** — hunger/saturation HUD info
- **Just Enough Items (JEI)** `19.56.0.441` — recipe/item lookup
- **Way Better Title Bar** `1.0.0` — Windows dark title bar / FPS / XYZ _(client, optional, default off)_
- **Animated Inventory** `1.0.6` — items slide between slots _(client, optional, default on)_
- **Traveler's Titles** `5.1.3` — biome/dimension title cards; Big Globe names/colors via Paxi `bng_titles.zip` _(client, optional, default on)_
- **Sound Physics Remastered** `1.21.1-1.5.1` — occlusion and reverb _(client, optional, default off)_
- **Presence Footsteps (NeoForge)** `1.21.1-1.12.0-beta.1` — material-specific footsteps _(client, optional, default off)_
- **Continuity** `3.0.0+1.21.neoforge` — OptiFine-style connected textures _(client, optional, default on; Connector + Forgified Fabric API)_
- **Mouse Tweaks** `2.26.1` — drag / scroll-wheel inventory moves _(client, optional, default on)_
- **Controlling** `19.0.5` — searchable keybinds _(client, optional, default on)_
  - **Searchables** `1.0.2` _(dependency — client, optional, default on; toggle with Controlling)_
- **Crash Assistant** `1.11.12` — post-crash log GUI _(client, optional, default on)_
- **Chat Heads** `0.15.7` — player faces in chat _(client, optional, default on)_
- **Obscure Tooltips** `4.2.4` — styled item tooltips and 3D gear preview _(client)_
- **Healight** `1.0.1` — green flash when an entity heals _(client)_
- **Obscuria's Tools** — vanilla tool textures via Paxi `obscurias-tools.zip` _(client resource pack)_
- **Counter** `0.5-1.21.1` — world-day HUD (disable coords/FPS/time overlays; Xaero covers those)
- **Pick Up Notifier** `21.1.1` — toast when picking up items _(client, optional, default on)_
- **Mod Menu** — mod list/config screen _(client)_

> **Rendering note:** Iris, Iris & Oculus Flywheel Compat, and Distant Horizons should be toggled
> together (all ON or all OFF). See [Notes.md](Notes.md).

---

## Shared Libraries & APIs
Core/support mods depended on by multiple mods above.

- **Sinytra Connector** — runs Fabric mods on NeoForge _(pack core)_
  - **Forgified Fabric API** _(dependency — Fabric API for the loaded Fabric mods)_
- **Architectury API** — cross-loader API
- **Cloth Config API** — config screens
- **Collective** `8.40` — also listed under Beautified Chat Server
- **Kotlin for Forge** — Kotlin runtime for Kotlin-based mods
- **Kambrik** — Kotlin/Fabric helper library
- **GeckoLib** — entity animation/rendering library
- **Curios API** — accessory/equipment slots
- **Moonlight Lib** _(Selene)_ `3.6.5` — library for Supplementaries & related
- **Patchouli** — also listed under Provisioner's Delight
- **Petrolpark's Library** — also listed under Petrol's Parts
- **Puzzles Lib** — library for Fuzs mods (Illager Invasion, etc.)
- **Resourceful Lib** — shared config/registry helpers
- **Cristel Lib** — structure/config library (Aquamirae, etc.)
- **YUNG's API (NeoForge)** — structure library (Towns and Towers, etc.)
- **Library Ferret** — NeoForge helper library
- **MidnightLib** — config library (Particle Rain, etc.)
- **GlitchCore** — biome/worldgen support library
- **Biolith** — biome injection API
- **Lithostitched** — worldgen structure/modifier library
- **playerAnimator** — player animation library (Better Combat, MCA, etc.)
- **[NTGL] NukaTeam's Gun Lib** — firearm content library
- **LDLib2** — KilaBash rendering/GUI library (FTB / KubeJS stack)
- **oωo (owo-lib)** — library (required; do not drop)
- **Integrated API** — also listed under Integrated Villages
- **Lionfish-API** — also listed under Cataclysm
- **Fzzy Config** / **Simply Tooltips** — also listed under Simply Swords

> Some libraries are listed as _(dependency)_ notes under a single parent mod above rather than here:
> **Forgified Fabric API** (Sinytra Connector), **Villager API**
> (MCA Reborn), **Azimuth API** (Aeronautics Camera Sync), **Ritchie's Projectile Library**
> (Create Big Cannons), **ShatterLib | OctoLib** (Explosion Overhaul), and **Gabou's Libs**
> (Trotting Wagons).
