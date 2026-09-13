// Brave New Globe — When Dungeons Arise tiered loot (LootJS 3.7.0, NeoForge 1.21.1)
// -----------------------------------------------------------------------------
// WDA chests are private + 100% vanilla. This layers ADDITIVE, WDA-native pools
// (a single roll over a weighted list whose `empty` entry IS the "nothing" chance;
// weights per pool sum to 100, so weight = %). Vanilla loot is untouched.
//
// Routing (mutually-exclusive base + flagship layer):
//   FILLER   chests w/o a treasure keyword          → commons (~24%)
//   TREASURE treasure/vault/ominous/elite/enchants  → mats+coins (~35%)  AND
//   TREASURE_GEAR (same chests)                      → enchanted utility gear (~10%)
//   JACKPOT  flagship premium chests                 → epic mats+coins+unique (~33%)
//
// DESIGN: reward = Numismatics coin ladder + crafting MATERIALS + consumables, with
// gear as a RARE enchanted utility sub-roll only (weight ≤4, low enchant levels).
// ENDGAME ARMOR IS NOT LOOT — ignitium/gravitite/etc. stay boss-craft-locked; WDA
// chests only ever drop their crafting *materials*. Sun is a genuine capstone (1%
// per flagship chest). All ids jar-verified. Enchants applied at the pool level.
// -----------------------------------------------------------------------------

const NOTREASURE = /dungeons_arise:chests\/(?!.*(treasure|vault|ominous|elite|enchants)).*/;
const TREASURE   = /dungeons_arise:chests\/.*(treasure|vault|ominous|elite|enchants)/;
const FLAGSHIP   = /dungeons_arise:chests\/(infested_temple|keep_kayra|kisegi_sanctuary)\/.*(treasure|vault|ominous|top)/;

LootJS.lootTables((event) => {
    // ── FILLER (Common) — every non-treasure WDA chest. ~24% something. ──
    event.modifyLootTables(NOTREASURE).createPool((pool) => {
        pool.addEntry(LootEntry.empty().withWeight(76));
        pool.addEntry(LootEntry.of("numismatics:spur", [2, 6]).withWeight(6));
        pool.addEntry(LootEntry.of("numismatics:bevel", [1, 3]).withWeight(4));
        pool.addEntry(LootEntry.of("create:andesite_alloy", [2, 5]).withWeight(3));
        pool.addEntry(LootEntry.of("create:zinc_ingot", [1, 4]).withWeight(2));
        pool.addEntry(LootEntry.of("createmetallurgy:coke", [2, 4]).withWeight(2));
        pool.addEntry(LootEntry.of("farmersdelight:vegetable_soup").withWeight(2));
        pool.addEntry(LootEntry.of("brewinandchewin:beer").withWeight(2));
        pool.addEntry(LootEntry.of("aether:blue_berry", [2, 4]).withWeight(1));
        pool.addEntry(LootEntry.of("hybrid_aquatic:pearl").withWeight(1));
        pool.addEntry(LootEntry.of("powergrid:capacitor", [1, 3]).withWeight(1));
    });

    // ── TREASURE (Uncommon+Rare mats/coins/unique) — treasure-class chests. ~35%. ──
    event.modifyLootTables(TREASURE).createPool((pool) => {
        pool.addEntry(LootEntry.empty().withWeight(65));
        pool.addEntry(LootEntry.of("numismatics:sprocket", [2, 6]).withWeight(7));
        pool.addEntry(LootEntry.of("numismatics:cog", [1, 3]).withWeight(5));
        pool.addEntry(LootEntry.of("create:brass_ingot", [2, 4]).withWeight(4));
        pool.addEntry(LootEntry.of("create:rose_quartz", [2, 4]).withWeight(3));
        pool.addEntry(LootEntry.of("createmetallurgy:steel_ingot", [2, 4]).withWeight(3));
        pool.addEntry(LootEntry.of("create:experience_nugget", [2, 5]).withWeight(2));
        pool.addEntry(LootEntry.of("cataclysm:black_steel_ingot", [2, 4]).withWeight(2));
        pool.addEntry(LootEntry.of("create:precision_mechanism").withWeight(2));
        pool.addEntry(LootEntry.of("create_enchantment_industry:experience_cake").withWeight(2));
        pool.addEntry(LootEntry.of("createmetallurgy:tungsten_ingot", [1, 3]).withWeight(1));
        pool.addEntry(LootEntry.of("illagerinvasion:hallowed_gem").withWeight(1));
        pool.addEntry(LootEntry.of("illagerinvasion:platinum_chunk", [1, 3]).withWeight(1));
        pool.addEntry(LootEntry.of("cbc_more_content:small_bomb", [1, 2]).withWeight(1));
        pool.addEntry(LootEntry.of("supplementaries:quiver").withWeight(1));
    });

    // ── TREASURE_GEAR (rare enchanted UTILITY gear) — same chests, rarest sub-roll. ~10%. ──
    // No armor set — enchanted book + diving utility only, modest enchant levels.
    event.modifyLootTables(TREASURE).createPool((pool) => {
        pool.rolls(1);
        pool.apply((f) => f.enchantWithLevels([5, 15]));   // below easy enchant-table access
        pool.addEntry(LootEntry.empty().withWeight(90));
        pool.addEntry(LootEntry.of("minecraft:enchanted_book").withWeight(4));
        pool.addEntry(LootEntry.of("hybrid_aquatic:diving_helmet").withWeight(2));
        pool.addEntry(LootEntry.of("hybrid_aquatic:diving_leggings").withWeight(2));
        pool.addEntry(LootEntry.of("hybrid_aquatic:diving_boots").withWeight(2));
    });

    // ── JACKPOT (Epic mats/coins/unique) — flagship premium chests only. ~33%. ──
    // Materials + capstone coins ONLY. No armor. Sun is a true 1% capstone.
    event.modifyLootTables(FLAGSHIP).createPool((pool) => {
        pool.addEntry(LootEntry.empty().withWeight(67));
        pool.addEntry(LootEntry.of("cataclysm:ignitium_ingot", [2, 4]).withWeight(7));
        pool.addEntry(LootEntry.of("numismatics:crown", [1, 2]).withWeight(6));
        pool.addEntry(LootEntry.of("cataclysm:witherite_ingot", [1, 3]).withWeight(4));
        pool.addEntry(LootEntry.of("cataclysm:enderite_ingot", [1, 2]).withWeight(4));
        pool.addEntry(LootEntry.of("createmetallurgy:obdurium_ingot", [1, 2]).withWeight(3));
        pool.addEntry(LootEntry.of("bigglobe:voidmetal_ingot", [1, 2]).withWeight(3));
        pool.addEntry(LootEntry.of("create_enchantment_industry:experience_bucket").withWeight(2));
        pool.addEntry(LootEntry.of("takesapillage:ravager_horn").withWeight(2));
        pool.addEntry(LootEntry.of("numismatics:sun").withWeight(1));
        pool.addEntry(LootEntry.of("create:netherite_backtank").withWeight(1));
    });
});
