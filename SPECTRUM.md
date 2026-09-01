# Brave New Globe — Spectrum of Special Interest Groups

Framework for designing **FTB Quests** around player specialization.

Brave New Globe is a **reality simulator**: almost everything can be done the simple way, but investing in tools, industry, and knowledge unlocks better yields, safer processes, and larger scale. A **Special Interest Group (SIG)** is a career path shaped like that — not every mod, and not every piece of content.

---

## How to use this document

| Section | Purpose |
|---------|---------|
| **What is a SIG?** | Criteria for including or excluding content |
| **Non-SIG layers** | World, fauna, QoL, libraries — questable as flavor, not careers |
| **SIG catalog** | One block per SIG for quest authors |
| **Quest writing template** | Copy/paste structure per SIG chapter |
| **Cross-SIG map** | Where careers intentionally overlap |

The book shipped in **0.9.0** (15 / 230) and grew in **0.9.10** to **17 chapters / 242 quests**
— see [QUESTS.md](QUESTS.md). When editing or adding FTB Quests:

1. Pick a SIG below (or a shipped exploration line in QUESTS.md).
2. Open with the **baseline** (anyone can do this).
3. Gate later chapters behind **specialized infrastructure** (foundries, farms, hangars, mint-free commerce, etc.).
4. Reward **capability and efficiency**, not exclusive access to the activity.
5. Prefer **physical logistics** over remote / magic shortcuts (see Economy notes).
6. Use **objective** gates only (item / advancement / dimension / stat / kill). No self-attest checkmarks. Kill tasks are for Cataclysm / Bosses' Rise only; Twilight / Aether / WDA stay advancement-gated.

---

## What is a SIG?

A SIG is a **specialization curve**:

```
Baseline (simple, low yield / low scale)
        ↓  player invests in knowledge, machines, sites
Specialized (higher yield, throughput, safety, or reach)
```

**Example — Metalworking:** toss iron ore in a furnace (baseline) → build a Create: Metallurgy foundry chain (specialized) → better yields and alloys.

### Include as a SIG when…

- Players can participate **without** the specialist gear (baseline exists).
- Specialist investment clearly **improves outcomes** (yield, speed, capacity, range, quality).
- The path supports **long-term identity** (“I run the foundry,” “I fly freight”).
- Multiple mods or Create add-ons reinforce the same trade.

### Exclude from SIGs when…

| Pattern | Examples | Why |
|---------|----------|-----|
| **World stage** | Big Globe, Serene Seasons*, Project Atmosphere*, dimensions, structures | Sets the planet; not a job |
| **Fauna / threats** | Re:Animal, Mowzie's Mobs, Sea Myths, Hybrid Aquatic, Mutant Monsters, Born in Chaos, L_Ender's Cataclysm, Bosses'Rise | Populate the world; hunting may appear *inside* a SIG, but the mod is not the SIG |
| **Pure ambiance / client** | Iris, Distant Horizons, Simple Clouds, Particle Rain | Presentation |
| **QoL / recovery** | Corpse, Backpacks, Better Respawn, Too Fast | Convenience |
| **Libraries / APIs** | GeckoLib, Cloth Config, Villager API, … | Plumbing |
| **Decorative-only** | Copycats+ (unless folded into Civil Works) | Building aesthetics without a yield curve |
| **Magic / remote commerce** | Auction mailboxes, teleport shops | Conflicts with grounded logistics |

\*Seasons and climate **constrain** Agriculture and Aviation; they are environmental rules, not SIGs themselves.

### Overlapping mods — split carefully

| Mod | SIG home | Not a SIG because… |
|-----|----------|-------------------|
| **Re:Animal** | — | World fauna overhaul |
| **Animal Weights** | Agriculture & Animal Husbandry | Weight/loadout rules for livestock & transport animals |
| **Doped Horses** | Land Transport *or* Husbandry | Specialized mounts (see Land Transport) |
| **Hybrid Aquatic / Sea Myths / Aquamirae** | — | Ocean content & threats; fishing/boating may reference them |
| **Bountiful** | Commerce (starter faucet) | Quest board tool, not a full career alone |
| **Create** (base) | Shared industrial substrate | Kinetics underpin many SIGs; do not make “Create” itself a SIG |
| **Create: Dragons Plus** | — | Thematic Create content; not a grounded trade |
| **Better Combat** | — | Combat feel overhaul; not a profession tree |
| **Simply Swords / Simply More** | — | Weapon-type variety (0.9.2; Simply More `1.3.0_alpha5` as of 0.9.6). Unique / remnant drops **off** as of 0.9.7. Not a profession tree. |
| **Incendium / YUNG's Better Nether Fortresses** | — | Nether world stage (0.9.4); not a career. Candidate exploration chapter, not a SIG |
| **Born in Chaos** | — | Fauna / threats (0.9.4); overworld structures need `bigglobe_borninchaos.zip` (0.9.5) |
| **L_Ender's Cataclysm / Bosses'Rise** | — | Arena-boss exploration chapters (shipped 0.9.10); not careers. Need `bigglobe_cataclysm.zip` / `bigglobe_bossesrise.zip`. |
| **Explosion Overhaul** | Ordnance (supporting) | World physics for blasts; not a career by itself |
| **MCA Reborn** | Settlement & Civic Life | Social layer; trades feed Commerce via Villager Currency |

---

## Non-SIG layers (do not make these career chapters)

Use these as **prologue / world lore / side notes** in questbooks, not as SIG roots.

### World & climate

- Big Globe, Chunky, Paxi + datapacks  
- Serene Seasons, Project Atmosphere, Puddles & Floods  
- The Aether, The Twilight Forest  
- Incendium, YUNG's Better Nether Fortresses (Nether world stage, 0.9.4)  
- Towns and Towers, When Dungeons Arise, CTOV, Fragmentum, Illager Invasion, It Takes a Pillage  
- Born in Chaos overworld structures (`bigglobe_borninchaos.zip`, 0.9.5)  
- L_Ender's Cataclysm / Bosses'Rise overworld structures (`bigglobe_cataclysm.zip`, `bigglobe_bossesrise.zip`)  

### Fauna, bosses & threats

- Re:Animal, Mowzie's Mobs, Mutant Monsters  
- Hybrid Aquatic, Sea Myths, Aquamirae  
- Born in Chaos (overworld mob spawns still pending BG biome-tag review)  
- L_Ender's Cataclysm, Bosses'Rise (arena / structure bosses; shipped exploration chapters as of 0.9.10)  
- Social Player Mobs, In Control!  

### Shared industrial substrate

- **Create** + Bits 'n' Bobs, Cardan Shafts, Linear Bearing, Gears n' Kinetics, Strut Your Stuff  
- Create: Storage  
- These are **tools every SIG may use**, not a single career.

### Economy plumbing (used by Commerce & Logistics SIGs)

- Create: Numismatics (+ Utils, Calculator, Villager Currency)  
- Tradeworks, Marketplace, Stock Market  
- Numismatic Bounties  

Currency is **earned** (villagers, bounties, deliveries, player trade) — not player-minted. Do not quest “craft coins from ore.”

### QoL / performance / client

- Corpse, Reliable Backpacks/Requiem, Better Respawn, Better Days, Stat Tinkerer, Too Fast  
- Sodium, Lithium, FerriteCore, ModernFix, ImmediatelyFast, Vertigo  
- Iris stack, Distant Horizons, Simple Clouds, maps, Jade, AppleSkin, JEI, Mod Menu  

### Libraries

All Shared Libraries & APIs in [MODLIST.md](MODLIST.md) — never SIG content.
**LootJS** is loot plumbing (WDA chests), not a SIG. **Fzzy Config** / **Simply Tooltips**
are Simply Swords deps. **Lionfish-API** is a Cataclysm dep. Do not make KubeJS scripting a
quest line.

---

## SIG catalog

Each SIG below is written for FTB Quests authors: pitch, baseline → specialized, mods, quest beats, exclusions.

---

### 1. Metalworking & Metallurgy

**Pitch:** Anyone can smelt. Specialists run foundries, alloys, and high-yield metal lines.

| | |
|--|--|
| **Baseline** | Furnace / blast furnace smelting; basic Create crushing & pressing |
| **Specialized** | Create: Metallurgy foundries, casting, bulk melting — higher yields, alloys, industrial throughput |
| **Core mods** | Create: Metallurgy |
| **Shared tools** | Create (crushing wheels, presses, basins) |
| **Adjacent** | Power & Fuel (heat/energy), Ordnance (metal for guns/cannons), Civil Works (structural metal) |

**Suggested quest beats**

1. Smelt your first iron the old-fashioned way.  
2. Automate ore washing / crushing.  
3. Build a Metallurgy foundry / casting line.  
4. Compare furnace vs foundry yield on the same ore.  
5. Produce an alloy or specialty metal product for another SIG (rails, cannons, airframe fittings).

**Exclude from this SIG:** Create: Dragons Plus; raw world ores as “content.”

---

### 2. Agriculture & Animal Husbandry

**Pitch:** Anyone can plant and cook. Specialists manage soil, seasons, spoilage, livestock load, and industrial kitchens.

| | |
|--|--|
| **Baseline** | Vanilla farming, breeding, campfire/furnace cooking |
| **Specialized** | Realistic farmland, seasonal planting windows, spoilage management, Farmer's Delight / Ratatouille kitchens, Brewin' & Chewin', Burnt Basic techniques, **Animal Weights** for livestock logistics |
| **Core mods** | Farmer's Delight, Brewin' And Chewin', Burnt Basic, Realistic Farmland, Food Spoilage, Create: Ratatouille, Animal Weights |
| **Environmental rules (not SIG mods)** | Serene Seasons, Project Atmosphere |
| **Adjacent** | Textiles (cotton/fiber), Medicine (diet & disease), Land Transport (draft animals), Commerce (food markets) |

**Suggested quest beats**

1. Harvest and cook a meal with vanilla tools.  
2. Prepare farmland under Realistic Farmland rules.  
3. Plant for the current season; survive a spoilage event.  
4. Build a Farmer's Delight / Ratatouille processing line.  
5. Raise livestock with Animal Weights in mind (transport & yield).  
6. Supply a contract or market stall with preserved / processed food.

**Explicitly not this SIG:** **Re:Animal** (world animals), Hybrid Aquatic / Sea Myths (ocean fauna). Doped Horses → prefer Land Transport.

---

### 3. Textiles & Fiber

**Pitch:** Cloth is optional flavor until you industrialize fiber into fabric at scale.

| | |
|--|--|
| **Baseline** | Vanilla wool / leather gear |
| **Specialized** | Create: Cotton production and textile machinery |
| **Core mods** | Create: Cotton |
| **Adjacent** | Agriculture (fiber crops), Aeronautics (fabric/control surfaces — if used), Civil Works (decor) |

**Suggested quest beats**

1. Gather baseline cloth materials.  
2. Grow / process cotton.  
3. Automate a textile line.  
4. Supply fabric to another SIG (banners, seats, airship materials if applicable).

---

### 4. Power & Fuel Engineering

**Pitch:** Hand cranks and waterwheels work. Specialists design fuel plants and electrical grids.

| | |
|--|--|
| **Baseline** | Create waterwheels, windmills, hand crank, early steam |
| **Specialized** | Create: Diesel Generators (fuel economy), Create: Power Grid (electrical distribution), Create: Power Chip (compact logic/power) |
| **Core mods** | Create: Diesel Generators, Create: Power Grid, Create: Power Chip |
| **Adjacent** | Metalworking (machines), Kinetics consumers in every industrial SIG, Rockets (energy-hungry) |

**Suggested quest beats**

1. Power a small Create line from renewable kinetics.  
2. Introduce a diesel / fuel generator and measure uptime.  
3. Build a Power Grid segment feeding multiple machines.  
4. Use Power Chips for compact control.  
5. Keep a multi-SIG factory online through fuel logistics (delivery of fuel counts).

---

### 5. Land Transport & Rail

**Pitch:** Walking works. Specialists move tonnage by wagon, horse, and rail network.

| | |
|--|--|
| **Baseline** | Walking, boats, minecarts |
| **Specialized** | Trotting Wagons; Doped Horses; Create train networks with Tracks, Signalworks, Train Physics Reloaded (Threaded Trains = performance support) |
| **Core mods** | Create: Tracks, Create: Signalworks, Create Train Physics Reloaded, Create: Threaded Trains, Trotting Wagons, Doped Horses |
| **Adjacent** | Logistics & Freight, Commerce (station markets), Metalworking (rails), Animal Husbandry (draft animals via Weights) |

**Suggested quest beats**

1. Haul a load on foot / by simple cart.  
2. Outfit a wagon or trained mount.  
3. Lay a working rail segment with signals.  
4. Run a scheduled freight between two sites.  
5. Hand off cargo to air/sea logistics (cross-SIG).

---

### 6. Aeronautics & Aviation

**Pitch:** The sky is open to anyone who builds a contraption. Specialists engineer stable airframes, cargo holds, and flight systems.

| | |
|--|--|
| **Baseline** | Simple Create Aeronautics / Sable craft that flies |
| **Specialized** | Gyro stabilizers, Aeroworks expansion, hose connectors, camera sync, radar-assisted flight, cargo logistics add-ons |
| **Core mods** | Create Aeronautics, Sable, Create: Aeroworks, Gyro Stabilizers, Throwable Rope Connector, VS/Sable Hose Connectors, Aeronautics Camera Sync, Create Aeronautics: Compatibility |
| **Supporting** | Create Aero Radars, Create: Radars |
| **Military branch** | Create: Warnautics (treat as advanced / combat aviation chapter, not a separate SIG unless the modteam wants Ordnance split) |
| **Adjacent** | Logistics & Freight (Delivery Required), Naval (seaplanes / coastal), Power, Metalworking |

**Suggested quest beats**

1. Build and fly a minimal airframe.  
2. Stabilize flight (gyro).  
3. Add cargo capacity and fluid/hose links.  
4. Navigate with radar / instruments.  
5. Complete a Delivery Required contract.  
6. Optional: Warnautics combat sortie.

**Exclude:** Pure camera/QoL as the career goal; radars alone are tools, not the whole SIG.

---

### 7. Naval Architecture & Seamanship

**Pitch:** Rafts and boats exist. Specialists build Create-driven ships for coastal and blue-water work.

| | |
|--|--|
| **Baseline** | Vanilla boats |
| **Specialized** | Create: Better High Seas shipbuilding and naval movement |
| **Core mods** | Create: Better High Seas |
| **Adjacent** | Logistics (sea freight), Aeronautics (coastal hubs), Commerce (ports), Ocean fauna as hazard (not SIG) |

**Suggested quest beats**

1. Cross water by boat.  
2. Construct a Create ship.  
3. Run a coastal freight route.  
4. Dock into a market / delivery zone.

---

### 8. Logistics & Freight Operations

**Pitch:** Anyone can carry a backpack. Specialists move **other people's cargo** through factories, air, and contracts.

| | |
|--|--|
| **Baseline** | Player inventory, chests, simple hoppers |
| **Specialized** | Factory Logistics networks; Aeronautics Automated Logistics; Delivery Required contracts; industrial storage |
| **Core mods** | Create Factory Logistics, Create Aeronautics: Automated Logistics, Create Aeronautics: Delivery Required, Create: Storage |
| **Economy hooks** | Numismatics payouts on delivery; Marketplace / Stock Market as **directory only** (travel still required) |
| **Adjacent** | Aeronautics, Rail, Naval, Commerce, Agriculture (perishables + spoilage) |

**Suggested quest beats**

1. Move a chest of goods between bases by hand.  
2. Automate an internal factory logistics loop.  
3. Load an aircraft / train / ship as a cargo vessel.  
4. Accept and complete a Delivery Required contract.  
5. Use Marketplace/Stock Market only to **find** demand, then fulfill physically.

**Design rule:** Quests must not reward remote item teleportation. Bank cards OK; fulfillment must travel.

---

### 9. Commerce & Markets

**Pitch:** Barter works. Specialists operate stalls, banks, directories, and price-aware trade — still in person.

| | |
|--|--|
| **Baseline** | Direct player trades; emerald villager trades (converted to coins) |
| **Specialized** | Numismatics vendors & bank terminals; Tradeworks stalls; Marketplace listings; Stock Market terminals; Bountiful + Numismatic Bounties as starter income |
| **Core mods** | Create: Numismatics, Villager Currency, Tradeworks, Marketplace, Stock Market, Bountiful, Create: Numismatic Bounties |
| **QoL (not chapters)** | Numismatics Utils, Numismatics Calculator |
| **Adjacent** | Logistics (stock the shelves), Settlement (MCA villagers), Agriculture / Metalworking (goods) |

**Suggested quest beats**

1. Earn first coins via villager trade or bounty (no minting).  
2. Open a bank account / use a bank card at a physical terminal.  
3. Stock a Tradeworks or Numismatics vendor.  
4. Register on Marketplace; require a customer/player to **travel** to buy.  
5. Read Stock Market trends; adjust a physical shop.  
6. Fulfill a delivery-funded sale (cross Logistics).

**Hard exclusions for quests:** CoinCraft / player minting; auction mailbox delivery; remote checkout.

---

### 10. Ordnance & Explosives

**Pitch:** Fists and bows exist. Specialists manufacture powder, guns, and artillery with real ballistics.

| | |
|--|--|
| **Baseline** | Vanilla combat, TNT |
| **Specialized** | Create: Gunpowder production; Create: Gunsmithing; Create Big Cannons + Going Ballistic + Terminal Ballistics; Warnautics for aerial gunnery |
| **Core mods** | Create: Gunpowder [aspctt], Create: Gunsmithing (CGS), Create Big Cannons, Going Ballistic, CBC Terminal Ballistics |
| **Supporting** | Explosion Overhaul (blast behavior), NTGL (gun lib), Warnautics |
| **Adjacent** | Metalworking (barrels, shells), Power (loaders), Aeronautics (air artillery) |

**Suggested quest beats**

1. Craft baseline powder / win a fight with vanilla gear.  
2. Automate gunpowder production.  
3. Build and fire a Create Big Cannon.  
4. Study terminal ballistics / ranging.  
5. Optional: mount ordnance on a contraption or Warnautics craft.

**Not this SIG:** Better Combat (feel), Illager Invasion / raids (threat content).

---

### 11. Medicine & Public Health

**Pitch:** Food and rest heal. Specialists diagnose disease and treat with medicine under survival pressure.

| | |
|--|--|
| **Baseline** | Vanilla healing, golden apples, potions |
| **Specialized** | More Diseases & Treatments care loops |
| **Core mods** | More Diseases & Treatments |
| **Adjacent** | Agriculture (nutrition, spoilage), Settlement (community health), Exploration (expedition risk) |

**Suggested quest beats**

1. Survive a disease event.  
2. Gather / craft treatments.  
3. Stock a clinic chest for a settlement.  
4. Support an expedition SIG with medical kits.

---

### 12. Settlement & Civic Life

**Pitch:** Solo survival works. Specialists build towns, families, and civic quest boards.

| | |
|--|--|
| **Baseline** | Solo base, ignoring villagers |
| **Specialized** | MCA Reborn relationships & village life; Bountiful boards as civic jobs; living near CTOV / Towns structures |
| **Core mods** | MCA Reborn (+ Villager API) |
| **Supporting** | Bountiful (civic quest faucet), Villager Currency (coin economy in town) |
| **World stage (not SIG)** | CTOV, Towns and Towers, Illager content as threats |

**Suggested quest beats**

1. Meet and befriend an MCA villager.  
2. Establish a home in / near a settlement.  
3. Complete civic bounties.  
4. Link town commerce to a physical market stall (Commerce SIG).

---

### 13. Industrial Enchanting *(shipped — 7 quests in 0.9.0)*

**Pitch:** Enchanting tables work. Specialists industrialize enchantment production.

| | |
|--|--|
| **Baseline** | Vanilla enchanting table / anvil |
| **Specialized** | Create: Enchantment Industry automation |
| **Core mods** | Create: Enchantment Industry |
| **Note** | Vanilla magic exists; this SIG is **industrial process**, not a new magic system. Shipped as a short standalone chapter (7 quests). |
| **Adjacent** | Metalworking (gear), Ordnance (weapon quality) |

**Suggested quest beats**

1. Enchant an item by hand.  
2. Build an Enchantment Industry line.  
3. Supply enchanted gear to another SIG.

---

### 14. Astronautics & Space Industry *(shipped late-game — 16 quests in 0.9.0)*

**Pitch:** The world is enough. Specialists leave the atmosphere.

| | |
|--|--|
| **Baseline** | Stay planetary |
| **Specialized** | Creating Space rocketry and space logistics |
| **Core mods** | Creating Space |
| **Adjacent** | Power, Metalworking, Aeronautics (as precursor) |

**Suggested quest beats**

1. Reach high-altitude flight (Aeronautics).  
2. Build rocket infrastructure.  
3. Complete an orbital / space milestone.  
4. Import a space resource into a planetary industry.

**Tone check:** Keep quests engineering-heavy; avoid fantasy “space magic.”

---

### 15. Civil Works & Construction *(soft SIG)*

**Pitch:** Dirt huts work. Specialists build durable, modular infrastructure.

| | |
|--|--|
| **Baseline** | Vanilla building |
| **Specialized** | Strut Your Stuff structural members; Supplementaries functional builds; Copycats+ detailing (aesthetic, optional) |
| **Core mods** | Strut Your Stuff, Supplementaries |
| **Optional** | Create: Copycats+ |
| **Adjacent** | All industrial SIGs (sites & factories), Settlement |

**Suggested quest beats**

1. Build a weatherproof workshop.  
2. Use struts / structural blocks for a large span.  
3. Outfit a public building (market, clinic, hangar).

Treat as **supporting** unless you want a full architect questline.

---

## Quest writing template (per SIG)

Copy this into FTB Quests chapter notes:

```markdown
## SIG: <Name>

### Fantasy
One sentence: who you become.

### Baseline unlock
Quest ID: …
Requirement: …
Reward: acknowledgement only (or tiny starter kit)

### Specialization gate
Quest ID: …
Requirement: place/craft the signature machine or site
Reward: recipe unlock / title / site marker

### Efficiency proof
Quest ID: …
Requirement: produce N items comparing baseline vs specialized method
Reward: …

### Service to the world
Quest ID: …
Requirement: supply another SIG or complete a logistics/commerce contract
Reward: …

### Capstone
Quest ID: …
Requirement: sustained operation (e.g. X deliveries, Y foundry batches, Z market sales)
Reward: cosmetic title / monument block
```

**Reward philosophy**

- Prefer **tools, site kits, and reputation** over exclusive recipes that delete the baseline.  
- Cross-SIG caps should require **physical movement of goods** when Commerce/Logistics are involved.  
- Do not gate basic survival behind a SIG.

---

## Cross-SIG map

```
                 Power & Fuel
                      │
     ┌────────────────┼────────────────┐
     │                │                │
Metalworking ──── Logistics ◄──── Aeronautics
     │                │                │
     │           Land Transport      Naval
     │                │                │
     └──────── Commerce / Markets ─────┘
                      │
         Agriculture ─┴─ Settlement ─ Medicine
                      │
                 Textiles    Ordnance
                      │
              Astronautics (late)
```

**High-value cross quests**

| From → To | Idea |
|-----------|------|
| Metalworking → Rail / Cannons | Supply specialty metal |
| Agriculture → Commerce | Stock a food stall with non-spoiled goods |
| Aeronautics → Logistics | First Delivery Required payout |
| Commerce → Logistics | Buy demand intel (Stock Market), then haul |
| Settlement → Commerce | Town vendor + villager coin trades |
| Ordnance → Aeronautics | Arm a Warnautics craft |
| Power → any factory SIG | Keep specialized line running |

---

## FTB Quests book structure (shipped; 17 chapters as of 0.9.10)

The book is **one volume, 17 flat chapters, 242 quests** — see [QUESTS.md](QUESTS.md) for
counts, files, and regen rules. There is no Prologue / Interlude / Epilogue wrapper; each
industry line carries its own Awareness → Functional → Achievement arc. Exploration lines
(WDA, Twilight, Aether, Cataclysm, Bosses' Rise) are locate-and-progress (Cataclysm / Bosses'
Rise are kill-gated). Nether biome content (Incendium / Born in Chaos / Better Fortresses) is
in the pack as of 0.9.4–0.9.5 but **not** in the book.

**In the book:** Create Core, Rails, Aeronautics, Cannons, Metallurgy, Power & Fuel,
Logistics, Enchanting, Commerce, Agriculture, Naval, Astronautics, Twilight, Aether, WDA,
Cataclysm, Bosses' Rise.

**Not in the book:** Nether (Incendium tour), Settlement & Civic, Medicine, Textiles, Civil
Works (soft SIGs stay here as design notes).

Keep SIG IDs stable so rewards can cross-reference. Do not add self-attest checkmarks.
Currency is Create: Numismatics only.

---

## Mod → SIG quick index

| Mod | SIG / layer |
|-----|-------------|
| Create: Metallurgy | Metalworking |
| Farmer's Delight, Brewin' And Chewin', Burnt Basic, Realistic Farmland, Food Spoilage, Ratatouille, Animal Weights | Agriculture & Husbandry |
| Create: Cotton | Textiles |
| Diesel Generators, Power Grid, Power Chip | Power & Fuel |
| Tracks, Signalworks, Train Physics, Threaded Trains, Trotting Wagons, Doped Horses | Land Transport & Rail |
| Aeronautics stack, Aeroworks, Gyro, Hose Connectors, Camera Sync, Aero Radars, Radars, Warnautics | Aeronautics |
| Better High Seas | Naval |
| Factory Logistics, Automated Logistics, Delivery Required, Create Storage | Logistics & Freight |
| Numismatics (+ bridges), Tradeworks, Marketplace, Stock Market, Bountiful | Commerce |
| Gunpowder, Gunsmithing, Big Cannons (+ expansions) | Ordnance |
| More Diseases & Treatments | Medicine |
| MCA Reborn | Settlement |
| Enchantment Industry | Industrial Enchanting (shipped) |
| Creating Space | Astronautics (shipped, late) |
| Struts, Supplementaries, Copycats+ | Civil Works (soft) |
| Big Globe, seasons, atmosphere, dimensions, structures, Incendium, Better Nether Fortresses, Cataclysm / Bosses'Rise structure datapacks | Non-SIG world |
| Re:Animal, Mowzie's, Mutants, Hybrid Aquatic, Sea Myths, Aquamirae, Born in Chaos, L_Ender's Cataclysm, Bosses'Rise | Non-SIG fauna / arena bosses |
| Better Combat, Explosion Overhaul | Systems / supporting physics |
| Simply Swords, Simply More | Combat weapon variety (not a SIG; unique / remnant drops off as of 0.9.7) |
| LootJS, Fzzy Config, Simply Tooltips, Lionfish-API | Non-SIG libraries / loot plumbing |
| QoL, performance, client, libraries | Non-SIG |

---

## Maintenance

When adding a mod, ask:

1. Does it create a **baseline → specialized** curve?  
2. Which existing SIG owns it?  
3. If none — is it world/fauna/QoL instead?  
4. Update this file and the questbook chapter list together.
5. If it adds loot-worthy items, also update [LOOT.md](LOOT.md) (WDA chest menu).

See also: [QUESTS.md](QUESTS.md) (shipped book), [LOOT.md](LOOT.md) (dungeon loot menu), [MODLIST.md](MODLIST.md), [CHANGELOG.md](CHANGELOG.md), [Notes.md](Notes.md).
