// Brave New Globe — When Dungeons Arise dungeon loot (LootJS)
// -----------------------------------------------------------------------------
// WDA's chest tables (dungeons_arise:chests/<structure>/<variant>) are 100%
// vanilla and never see modded items. This injects modpack loot so raiding a
// dungeon is worth it.
//
// STAGE 1 (this file): Simply Swords unique-crafting materials as a rare find,
// so dungeons feed the uniques progression. Additive — vanilla loot untouched.
//
// STAGE 2 (TODO): full tiered spectrum from LOOT.md (Common/Uncommon/Rare/Epic)
// keyed by dungeon size. Add per-tier bonus pools once the item sets + the
// add-on-vs-trim decision are locked. See BraveNewGlobe/LOOT.md.
//
// API: LootJS 3.7.0 (AlmostReliable), NeoForge 1.21.1.
// -----------------------------------------------------------------------------

LootJS.lootTables((event) => {
    // Every WDA chest table (current + future dungeons) by namespace.
    event
        .modifyLootTables(/^dungeons_arise:chests\/.*/)
        .createPool((pool) => {
            // ~40% of WDA chests carry a Simply Swords crafting material.
            pool.when((c) => c.randomChance(0.4));
            pool.addEntry(LootEntry.of("simplyswords:empowered_remnant", [1, 2]).withWeight(45));
            pool.addEntry(LootEntry.of("simplyswords:contained_remnant").withWeight(25));
            pool.addEntry(LootEntry.of("simplyswords:runefused_gem").withWeight(15));
            pool.addEntry(LootEntry.of("simplyswords:runic_tablet").withWeight(10));
            pool.addEntry(LootEntry.of("simplyswords:netherfused_gem").withWeight(5));
        });
});
