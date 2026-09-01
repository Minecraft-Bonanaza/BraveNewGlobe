# Brave New Globe — Dungeon Loot Tiers (running doc)

Living tracker for the tiered loot injected into When Dungeons Arise chests via **LootJS**
(`kubejs/server_scripts/wda_dungeon_loot.js`). Tiers → dungeon size:
**Common** = small POIs · **Uncommon** = sea/sky & mid dungeons · **Rare** = large dungeons · **Epic** = vaults/boss rooms.

Status: **v2 — exhaustive pass** (all content-mod `en_us.json` lang files scanned; ids jar-verified unless marked ⚠).
Pack **0.9.2** added **Simply Swords** + **Simply More** after this survey — not listed in the tiers yet.
Pack **0.9.4** added **Incendium** + **Born in Chaos** (also after this survey).
Families collapsed with a note (e.g. "16 dye colors", "6 boss scale sets"); every distinct *loot-worthy* item is represented.
Excluded everywhere: crafting intermediates (nuggets/casts/`incomplete_*`/`unbored_*`/dusts/molten buckets/raw ores),
creative-only items, spawn eggs, and pure decor. Per-mod full id dumps live in the survey transcripts.

Mods that add **no unique loot**: WDA, Towns&Towers, CTOV, Fragmentum, Biolith, Better High Seas, Re-Animal,
Bountiful (bounty-board mechanic only), Numismatics Calculator (client), Realistic Farmland, Food Spoilage, Betterdays, Copycats, Strut Your Stuff.
Dropped as inert (no recipe uses them in Create 6.0.10): `refined_radiance`, `shadow_steel`, `chromatic_compound`.

---

## 🟩 COMMON — filler / scatter widely
- **Create:** andesite alloy, zinc ingot, cogwheel, andesite casing, sand paper, minecart coupling, list/attribute filters, cardboard sword+armor (novelty), builder's tea + sweet foods.
- **Numismatics:** `numismatics:spur` (1), `numismatics:bevel` (8), banking guide.
- **Metallurgy:** coke, graphite. **Cotton:** cotton/ball/seeds, 16-color fabric & thread. **Power Grid:** capacitor/diode/resistor/relay/coil/bulb electronics, punch card. **Power Chip:** pin chips (4–24). **Signalworks:** pulsers/randomizers.
- **Big Globe:** ash, ball of string, chorus spore, sulfur, torch arrow. **Creating Space:** aluminum/nickel ingot, moon/mars regolith & stone, space food.
- **CBC/CGS/Gunpowder:** gunpowder pinch, lead balls, paper cartridge/shot, niter/sulfur, carbon/mineral/volatile/flint dust, tracer tip.
- **Aether:** ambrosium shard, skyroot & holystone tool sets, swet ball, gummy swets, book of lore, berries/foods, leather gloves, 6 music discs.
- **Twilight:** ironwood gear, jerkies/meef/venison foods, oreberries (copper/iron/gold), stale bread, boats, 9 music discs.
- **Adventure fillers:** Mowzie's sand rake / music disc; Hybrid Aquatic ~60 fish + crab claws + seafood; Supplementaries key/wrench/candy/soap/bubble-blower/altimeter, antique ink, flax, lumisene; Ratatouille sausage/salt/compost tea; Animal Weight magnifying glass.
- **Food (bulk):** Farmer's Delight ~50 prepared meals & produce, FD flint/iron/golden knife; Brewin' beer/mead/rice-wine/vodka + fermented foods, tankard.
- **MDT:** alcohol, fabric, disinfected fabric. **Doped Horses:** iron horseshoes + nails. **Trotting Wagons:** wheel.

## 🟦 UNCOMMON — solid mid finds
- **Create:** brass ingot/sheet/casing, rose quartz (+polished), electron tube, sturdy sheet, blaze cake, **goggles**, wrench, linked controller, schematic&quill, super glue, crafting blueprint, copper backtank, copper diving helm/boots, brass hand, experience nugget, 16-color toolbox.
- **Numismatics:** `numismatics:sprocket` (16), `numismatics:cog` (64), 16-color debit/ID cards, bank terminal, vendor, depositors, bank meter.
- **Metallurgy:** steel ingot/block, tungsten sheet/wire, transfer ladle, sturdy whisk, graphite molds. **Diesel:** oil scanner, lighter, hammer, track-layer's bag, engine parts, diesel/gasoline/biofuel buckets. **Power Grid:** portable drill/saw, multimeter, magnet, portable battery, transistors/tubes, battery/solar-panel blocks, electrical gizmo, growth lamp. **Storage (fxnt):** iron/copper/brass/andesite backpacks, backpack upgrades (magnet/pickup/feeder/crafting/refill/tool-swap/fall-damage), storage boxes & controllers. **Factory Logistics:** fluid mechanism, copper jar, composite package. **Bits'n'Bobs:** gigantic cogwheel, flywheel bearing, chain pulley, headlamp. **Enchantment Industry:** cake/slice o' enchanting, enchanting/affix templates, experience lantern, brass bookshelf. **Cardan/Linear/Tracks:** cardan connector, linear bearing set, vehicle suspension/track parts.
- **Aeronautics:** 16-color envelope + burner, wooden/andesite/smart propeller, aviator's goggles, cloud-skipper disc; Offroad tires/wheel mount; Simulated symmetric sails, engine assembly, sensors, steering/throttle, springs, glue. **Aero Logistics:** stations/transponders. **Radar:** binoculars, filters.
- **CBC:** solid shot, shot balls/grapeshot, powder charge, all fuzes (impact/timed/proximity/inertia/wired), guncotton, gas mask, bronze/cast-iron cannon barrels & breeches, cannon mount/carriage, ram/worm tools. **Warnautics:** small bomb, small/large mine. **CGS:** revolver, shotgun, flintlock, spear, bayonet, frag grenade, rounds/shells, barrels & attachments (scope/stock/drums), steel ingot/sheet, lead. **Space:** copper oxygen backtank, base+small rocket engine, rocket casing/controls, combustion chamber, nozzles, engine blisks/turbines/injectors (iron/copper/andesite/brass tiers), nickel-sulfate crystals.
- **Big Globe:** 11-color bottled aura, spelunking rope + anchor, percussive hammer, slingshot, waypoints, quartz cluster/buds.
- **Aether:** zanite gear+armor, obsidian armor, sentry boots, golden feather, healing/regeneration stone, rings & pendants (iron/gold/ice/zanite), capes/gloves, dart shooters, black/white moa eggs, zanite gemstone, golden amber, lightning knife, pig slayer.
- **Twilight:** steeleaf gear, moonworm queen, peacock feather fan, crumble horn, charm of keeping I–III, traveller's set (gliding wings), magic/maze/ore maps, ore meter/magnet, moon dial, tower key, boss banner patterns, gold minotaur axe.
- **Mowzie's:** blowgun+dart, spear, naga fang, bluff rod, luminous jelly, foliaath seed, captured grottol. **Mutant:** creeper minion tracker, mutant skeleton parts. **Aquamirae:** salvager set, echo compass, oxygen tank/oxyhelium, shell horn, lore items, materials (niveis tear, angler fang). **Hybrid Aquatic:** diving/coral/seashell tool sets, diving armor + upgrade template, turtle chestplate, prismarine rod, fishing hooks, scarves, fishing net, shark tooth/materials. **Illager Invasion:** horn of sight, magical fire charge, lost candle, illusionary/unusual dust.
- **Supplementaries:** quiver, slingshot, bomb/blue bomb, rope arrow, tipped spikes, flute, lunch basket, cartographer's quill, blast-armor-trim template, dragon banner pattern. **MDT:** penicillin, tinctures, meadowsweet tea, splint, fabric mask. **Ratatouille:** chef hat (+goggles variant). **Doped:** gold/diamond horseshoes. **Trotting Wagons:** armored/royal/conestoga wagon, horse whip. **Sea Myths:** bloop & sea-eater scale sets (sword+armor), bloop saddle.

## 🟧 RARE — dungeon-key gear
- **Create:** **precision mechanism**, extendo grip, potato cannon, wand of symmetry, netherite backtank, netherite diving helm/boots. **Metallurgy:** tungsten ingot/block, **obdurium ingot/sheet/block**, rare transfer ladle. **Diesel:** chemical sprayer (+flamethrower). **Power Grid:** electro-baton, **electro-zapper**, integrated circuit. **Storage:** hardened backpack, jetpack-flight upgrade, mechanical-heart (health) upgrade. **Enchantment Industry:** bucket/cake o' enchanting, printer templates (super/apotheotic), infused dragon-breath/crystal/apotheotic-essence buckets. **Dragons+:** blaze-upgrade smithing template, dragon's-breath bucket.
- **Numismatics:** `numismatics:crown` (512), blaze banker, portable bank terminal.
- **Aether:** gravitite sword+tools+armor, cloud staff, nature staff, holy/flaming/lightning sword, vampire blade, phoenix armor+bow, neptune armor, shield of repulsion, invisibility cloak, **life shard (+2 hearts)**, bronze/silver/gold dungeon keys, victory medal.
- **Twilight:** knightmetal gear+shield+ring, fiery sword/pick + fiery armor, naga/yeti/arctic/phantom armor, giant's sword/pickaxe, glass/ice sword, ice/ender/seeker/tri bows, block-and-chain, cube of annihilation, lich scepters (twilight/lifedrain/zombie/fortification), lamp of cinders, charm of life I/II, four-leaf clover, crown splinter, emperor's cloth, trophy pedestal, fiery blood/tears + boss mats.
- **Mowzie's:** wrought helm, umvuthana masks (6, effect each), geomancer staff + trinket set, elokosa paws, naga fang dagger. **Mutant:** creeper shard, mutant skeleton armor set. **Aquamirae:** terrible armor + weapon line (cleaver/blade/fang/chakram), tempest trident, tidepiercer, remnant saber, shatterblade/spike, dagger of greed, rune of the storm, frozen key, terrible/abyssal smithing templates, abyssal amethyst. **Sea Myths:** protector & el-gran-majá scale sets. **Hybrid Aquatic:** nautilus helm/pauldrons, reinforced/glowing diving sets, ominous conch (boss summon), pearl/black pearl. **Illager Invasion:** hallowed gem, platinum-infused hatchet, platinum chunk/sheet, primal essence. **It Takes a Pillage:** ravager horn. **Doped:** netherite horseshoes.
- **CBC:** AP/HE/smoke/shrapnel/**fluid** shells, AP/flak autocannon rounds, machine-gun round, steel cannon barrel + screw/quick-firing breech, steel autocannon barrel/breech, nitropowder, cannon builder/drill/loader/welder tools. **Warnautics:** medium/large bomb, sea torpedo. **CGS:** gatling, blazegun, ballistazooka, nailgun, launcher, rockets, piercing/incendiary/flechette rounds. **Radar:** fire controller, guided fuze, radar warning receiver, jammer, plane radar. **Aeronautics:** levitite (+pearlescent), gyroscopic propeller bearing, mounted potato cannon, Simulated physics assembler + gyroscopic mechanism + engine assembly. **Space:** basic spacesuit set, cryogenic tank, superalloys (copronickel/inconel/monel/hastelloy), air liquefier, chemical synthesizer.
- **Big Globe:** **voidmetal ingot/block**.

## 🟥 EPIC — jackpot / boss-tier
- **Create:** netherite backtank/diving set (best air gear). **Enchantment Industry:** nugget/block of **super experience**. **Numismatics:** `numismatics:sun` (4096).
- **Aether:** **valkyrie lance/axe/tools/armor/cape**, **hammer of kingbdogz**.
- **Twilight:** **mazebreaker pickaxe**, **mystic crown**, all **9 boss trophies** (naga/lich/hydra/minoshroom/ur-ghast/snow-queen/knight-phantom/alpha-yeti/quest-ram).
- **Mowzie's:** **axe of a thousand metals** (`mowziesmobs:wrought_axe`), **sol visage**, **earthrend gauntlet**, **ice crystal**.
- **Mutant:** **hulk hammer**, **endersoul hand**.
- **Aquamirae:** **maelstrom vestige**, **dreadwake** (tiered), abyssal armor set. **Sea Myths:** **kraken** & **leviathan** scale sets (sword + armor, netherite-class).
- **CBC:** **nethersteel cannon barrel + screw breech**, built-up steel/nethersteel barrels, congealed/hardened nitro. **Space:** **big rocket engine**, **advanced spacesuit set**, rocket generator, netherite oxygen backtank.
- **Big Globe:** **voidmetal armor set + upgrade (smithing) template**, **omni bottled aura**.
- **Supplementaries:** cannon + cannonball, globe, music disc (heave ho). **Explosion Overhaul:** `explosionoverhaul:vinlanx_the_light` (its only item).

---

## To do
- [ ] Decide **add-on-top vs trim-vanilla** per tier.
- [ ] Pick the final per-tier item sets (this doc is the menu) → wire LootJS (`wda_dungeon_loot.js`).
- [ ] Verify ⚠ ids (none currently flagged after jar pass — most confirmed) before shipping.
- [ ] Coin ladder as graded currency: Spur/Bevel→common, Sprocket/Cog→mid, Crown→large, Sun→epic vault.
- [ ] Note: many adventure mods' gear expects their own progression — consider whether best boss gear (valkyrie, leviathan, sol visage) should be dungeon loot or stay boss-locked.
- [ ] Fold **Simply Swords** / **Simply More** uniques into Uncommon / Rare (added 0.9.2, after this survey).
- [ ] Fold **Incendium** / **Born in Chaos** drops into the tiers (added 0.9.4, after this survey).
