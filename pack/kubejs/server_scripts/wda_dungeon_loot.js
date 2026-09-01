// Brave New Globe — When Dungeons Arise dungeon loot (LootJS)
// -----------------------------------------------------------------------------
// Injects tiered, modpack-flavored loot into WDA's private loot tables
// (dungeons_arise:chests/<structure>/<variant>) so raiding a dungeon is worth it.
//
// Strategy (filled in after the loot survey):
//   - Wildcard the WDA chest tables by regex (auto-covers all + future dungeons).
//   - Tier by dungeon size:  common POIs  <  sea/sky  <  large dungeons.
//   - Add a bonus pool per tier; optionally trim vanilla filler on the big ones.
//   - Pools drawn from item lists (or item tags) chosen from the modpack survey.
//
// NOTE: LootJS 3.7.0 (NeoForge 1.21.1) API is confirmed at authoring time before
//       any modifier is written here. This scaffold is intentionally a no-op.
// -----------------------------------------------------------------------------

// TODO (post-survey): LootJS.lootTables(event => { event.modify(/dungeons_arise:chests\/.../) ... })
