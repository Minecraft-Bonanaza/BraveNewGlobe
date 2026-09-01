// Brave New Globe — Born in Chaos × Simply Swords loot bridge (LootJS)
// -----------------------------------------------------------------------------
// Simply Swords only injects its unique-crafting currency (Remnants) into a
// fixed set of *vanilla* tables (villages / ruined_portal / ender_dragon).
// Born in Chaos mobs use their own private tables (born_in_chaos_v1:entities/*),
// so by default killing them drops nothing toward uniques.
//
// This makes the pack's most dangerous mobs the fuel for Simply Swords uniques:
// a small % of Born in Chaos kills yield an Empowered Remnant, with a rare
// chance at the Runic Tablet (the "awaken a unique" template).
//
// API: LootJS 3.7.0 (AlmostReliable), NeoForge 1.21.1.
// -----------------------------------------------------------------------------

LootJS.lootTables((event) => {
    // Match every Born in Chaos entity table (current + future mobs) by namespace.
    event
        .modifyLootTables(/^born_in_chaos_v1:entities\/.*/)
        .createPool((pool) => {
            // Fires on ~5% of kills; within that, mostly Remnants, rarely a Tablet.
            pool.when((c) => c.randomChance(0.05));
            pool.addEntry(LootEntry.of("simplyswords:empowered_remnant").withWeight(85));
            pool.addEntry(LootEntry.of("simplyswords:runic_tablet").withWeight(15));
        });
});
