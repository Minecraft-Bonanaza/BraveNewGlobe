# Brave New Globe — Mod List

Human-readable list of every mod in the pack (**145 mods** as of 0.8.7;
same count as 0.8.5 / 0.8.6 — **0.8.7** is a Create Core quest rework, no mod
changes), grouped by purpose.

**Conventions**
- Nested bullets marked _(dependency)_ are library/support mods that exist mainly to serve the mod
  they're listed under.
- Libraries used by **many** mods are collected in **[Shared Libraries & APIs](#shared-libraries--apis)**
  instead of being repeated. Where a base mod (e.g. **Create**, **Create Aeronautics**) is a shared
  dependency, its dependents are treated as **add-ons** and listed alongside it — not nested under it.
- Dependency mappings are best-effort based on the known mod ecosystems; the pack itself doesn't store
  explicit dependency metadata.
- Career / specialization grouping for the **FTB Quests** book is in
  **[SPECTRUM.md](SPECTRUM.md)**. The locked 15-line roadmap is **[QUESTS.md](QUESTS.md)**.
  **Create Core** is **12 purpose-driven quests** (0.8.7). **PonderJS is in** (0.8.5; required by Delivery Required).

---

## World Generation & Core
- **Big Globe** _(shallow-608 patched)_ — the pack's core world generator (custom terrain, caves, spawn)
- **Chunky (Forge/NeoForge)** — world pre-generator utility
- **Paxi (NeoForge)** — loads the pack's global datapacks/resourcepacks (Big Globe compat)

## Create & Add-ons
- **Create** — base tech/automation mod
- **Create: Copycats+** — copycat/decoration blocks
- **Create: Enchantment Industry** — automated enchanting
- **Create: Power Chip** — compact power/logic
- **Create: Power Grid** — electrical power network
- **Create: Diesel Generators** — fuel-based power
- **Create: Metallurgy** — metal processing
- **Create: Cotton** — cotton/textiles
- **Create: Storage [Neo/Forge]** — storage expansion
- **Create Factory Logistics** — factory/logistics automation
- **Create: Ratatouille** — cooking/food processing
- **Create: Bits 'n' Bobs** — misc machines/parts
- **Create Cardan Shafts** — drivetrain/shaft additions
- **Create: Linear Bearing** — linear-motion bearing for contraptions _(Modrinth 1.3.5)_
- **Create: Gears n' Kinetics** — kinetic additions
- **Create: Dragons Plus** — dragon-themed content
- **Creating Space** — rocketry / space content
- **Strut Your Stuff (Struts)** — structural strut/beam building blocks

### Create — Trains & Rails
- **Create: Tracks** — track/rail additions
- **Create: Threaded Trains** — multithreaded train performance
- **Create Train Physics Reloaded** — train physics overhaul
- **Create: Signalworks** — advanced rail signaling
- **Trotting Wagons** — horse-drawn wagons
  - **Gabou's Libs** _(dependency)_

### Create Aeronautics (airships & flight)
- **Create Aeronautics** — physics-based aircraft/airships
  - **Sable** _(dependency — physics engine for Aeronautics)_
- **VS / Sable Hose Connectors** — hose/fluid connectors across Sable physics contraptions
- **Create Aeronautics: Compatibility** — cross-mod compat patches
- **Create Aeronautics: Automated Logistics** — cargo/logistics for aircraft
- **Create Aeronautics: Gyro Stabilizers** — flight stabilization
- **Create Aeronautics: Throwable Rope Connector** — rope/connection tool
- **Create Aeronautics: Delivery Required** — delivery contracts & logistics for aircraft contraptions _(requires PonderJS)_
- **Create: Aeroworks** — aeronautics expansion
- **Create: Warnautics** — military/combat aeronautics
- **Create: Better High Seas** — ships / naval content
- **Aeronautics Camera Sync** — smooth camera for contraptions
  - **Azimuth API** _(dependency — camera/keybind library)_
- **Create Aero Radars** — radar for aircraft
- **Create: Radars** — general radar blocks

### Create — Cannons & Ballistics
- **Create Big Cannons** — buildable cannons/artillery
  - **Ritchie's Projectile Library** _(dependency)_
- **Create Big Cannons: Going Ballistic** — CBC expansion
- **CBC Terminal Ballistics** — terminal ballistics/impact mechanics
- **Create: Gunsmithing** — firearms for Create
- **Create: Gunpowder [aspctt]** — gunpowder/explosives production

## Combat & Explosions
- **Better Combat** — animated melee combat overhaul
- **Explosion Overhaul: A new level of destruction** — enhanced explosions
  - **ShatterLib | OctoLib** _(dependency)_

## Dimensions, Structures & Exploration
- **The Aether** — the classic sky dimension
- **The Twilight Forest** — the forest dimension
- **Towns and Towers** — expanded villages/pillager outposts
- **When Dungeons Arise** — large handcrafted structures
- **ChoiceTheorem's Overhauled Village** — village overhaul
- **It Takes a Pillage Continuation** — raids/pillager content
- **Illager Invasion** — new illager variants
- **Fragmentum** — structures/relic loot
- **Aquamirae [Neo/Forge Edition]** — ocean structures & atmosphere
- **Sea Myths** — legendary ocean monsters & bosses

## Mobs & Creatures
- **Mowzie's Mobs** — bosses & unique creatures
- **Mutant Monsters** — mutant vanilla-mob variants
- **Re:Animal** — animal overhaul/additions
- **Hybrid Aquatic** — ocean creatures
- **Social Player Mobs** _(Interactive Player Mobs)_ — player-like mobs
- **Doped Horses** — faster, enchantable, configurable horses
- **Animal Weights** — weight mechanics for animals

## Villagers & NPCs
- **MCA Reborn [Fabric/Forge]** — Minecraft Comes Alive villagers/families
  - **Villager API** _(dependency)_
- **In Control!** — mob spawning rules/control

## Farming, Food & Survival
- **Farmer's Delight** — cooking & farming expansion
- **Brewin' And Chewin'** — food & drink additions
- **Burnt Basic** — cooking/burning mechanics
- **Realistic Farmland** — realistic soil/farming
- **Food Spoilage** — food goes bad over time
- **More Diseases & Treatments** — illness & medicine
- **Serene Seasons** — seasonal cycle affecting crops/biomes
- **Project Atmosphere** — realistic climate & weather
- **Supplementaries** — decorative & functional blocks
- **Bountiful** — bounty board quests
  - **Create: Numismatic Bounties** — pays Bountiful rewards in Numismatics coins

## Economy
- **Create: Numismatics** — Create-styled coin & bank-card currency
  - **Create Numismatics: Villager Currency** — villager trades use Numismatics coins instead of emeralds
  - **Create: Numismatics Utils** — Bank Meter HUD & remote account access
  - **Numismatics Calculator** — client-side coin denomination calculator _(client)_
- **Create: Tradeworks** — physical barter stalls (tablecloths & shelves)
- **Create: Marketplace** — server-wide shop directory (browse only; trade at the vendor block)
- **Create: Stock Market** — Market Terminal for price history, trends & shop discovery
- **Create: Villager Commerce** — Merchant Stalls + Market Ledgers; villagers buy from player shops via Create stock networks (Numismatics coins) _(self-hosted in bundled-jars)_

## Quests
- **FTB Quests (NeoForge)** — guidance quest book (Create Core: 12 purpose-driven quests as of 0.8.7; more lines pending)
  - **FTB Library (NeoForge)** _(dependency)_
  - **FTB Teams (NeoForge)** _(dependency)_

## Utility & Quality of Life
- **Corpse** — recover items from a death corpse
- **Reliable Backpacks** — backpack storage
- **Reliable Requiem** — death/respawn handling
- **Better Respawn** — improved respawn behavior
- **Better Days** — day/night length control
- **Stat Tinkerer** — tweak player/entity stats
- **Too Fast** — server-side movement/speed-limit fixes _(server-only)_

## Performance
- **Sodium** — rendering engine optimization _(client)_
- **Lithium (Fabric/NeoForge)** — game-logic optimization
- **FerriteCore ((Neo)Forge)** — memory-usage optimization
- **ModernFix** — performance & memory fixes
- **ImmediatelyFast** — rendering/text batching optimization _(client)_
- **Vertigo** — vertical chunk loading (loads only chunks near the player vertically, not the full column)

## Client, Visual & Shaders
- **Iris Shaders** — shader loader _(client)_
- **Iris & Oculus Flywheel Compat** — Flywheel-under-Iris compatibility _(client)_
- **Iris/Oculus For Simple Clouds** — shader + Simple Clouds compatibility _(client)_
- **Distant Horizons** — LOD "see forever" rendering
- **Simple Clouds** — cloud visual overhaul
- **Particle Rain** — enhanced precipitation particles _(client)_
- **Puddles & Floods** — puddle/flood weather visuals
- **Xaero's Minimap** — minimap _(client)_
- **Xaero's World Map** — full-screen world map _(client)_
- **Jade** — "what am I looking at" tooltip HUD
- **AppleSkin** — hunger/saturation HUD info
- **Just Enough Items (JEI)** — recipe/item lookup
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
- **Kotlin for Forge** — Kotlin runtime for Kotlin-based mods
- **Kambrik** — Kotlin/Fabric helper library
- **GeckoLib** — entity animation/rendering library
- **Curios API** — accessory/equipment slots
- **Moonlight Lib** _(Selene)_ — library for Supplementaries & related
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
- **LDLib2** — KilaBash rendering/GUI library (CF "LDLib" project ships the `ldlib2-neoforge` jar)
- **oωo (owo-lib)** — library restored in 0.8.4 (removed in 0.7.17 as an Overhaul-only dep; still required)
- **Ponder for KubeJS** — in-world Ponder scenes (slug **`ponder`**, modId `ponderjs` 1.21.1-2.4.0; required by Delivery Required)
  - **KubeJS** _(dependency)_
  - **Rhino** _(dependency — JS engine)_
  - **Better Advanced Tooltips** _(dependency)_

> Some libraries are listed as _(dependency)_ notes under a single parent mod above rather than here:
> **Forgified Fabric API** (Sinytra Connector), **Villager API**
> (MCA Reborn), **Azimuth API** (Aeronautics Camera Sync), **Ritchie's Projectile Library**
> (Create Big Cannons), **ShatterLib | OctoLib** (Explosion Overhaul), **Gabou's Libs**
> (Trotting Wagons), and **FTB Library** / **FTB Teams** (FTB Quests).
