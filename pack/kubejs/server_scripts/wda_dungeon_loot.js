// Brave New Globe — combat-dungeon tiered loot (LootJS 3.7.0, NeoForge 1.21.1)
// -----------------------------------------------------------------------------
// Scope: COMBAT DUNGEON / BOSS structure mods only —
//   When Dungeons Arise (dungeons_arise), L_Ender's Cataclysm (cataclysm),
//   Bosses'Rise (block_factorys_bosses), Aquamirae (aquamirae).
// Vanilla, villages, Towns&Towers and CTOV are deliberately NOT touched.
//
// These pools are ADDITIVE, layered on top of each chest's existing loot (nothing
// is replaced). Each pool rolls ONCE over a weighted list whose `empty` entry is the
// "nothing" chance; weights per pool sum to 100, so weight = % chance for that chest.
//
// Tier routing (by chest-id keyword; a flagship chest stacks TREASURE + JACKPOT):
//   FILLER   no treasure keyword                     → commons (~28%)
//   TREASURE treasure/vault/ominous/elite/enchants/rare/top → mats+coins (~35%) AND
//   TREASURE_GEAR (same chests)                      → enchanted utility gear/guns (~15%)
//   JACKPOT  boss/flagship premium chests             → epic mats+coins+guns (~38%) AND
//   JACKPOT_RUNIC (same chests)                       → curated Runic-tier weapons (~15%)
//
// Exceptions: none of Aquamirae's chests and Bosses'Rise's dragon_tower boss chest
// contain a routing keyword in their id, so they were falling through to FILLER-only
// (verified against the mods' own loot_table jars). aquamirae:ship_1/ship_2/frozen_chest
// and block_factorys_bosses:dragon_tower are explicitly added to TREASURE below so they
// also get TREASURE + TREASURE_GEAR (dragon_tower already had JACKPOT + JACKPOT_RUNIC via
// FLAGSHIP, so it now gets the full stack, matching its status as the mod's boss chest).
//
// DESIGN: currency ladder (halved) + crafting MATERIALS + consumables + utility, with
// gear a rare enchanted sub-roll. NO endgame armor (ingots only). Guns are ammo-gated.
// Sun = 1% capstone.
//
// Simply Swords weapons are injected directly below (the mod's own native loot
// injector does not reliably reach these WDA-scope tables, so its weapons are added
// explicitly here instead). The mod's ~50 named/lore weapons (Mjolnir, Stormbringer,
// The Devourer, Livyatan, Frostfall, Thunderbrand, Wraithfang, etc.) are true "Unique"
// tier items gated behind its own Runic Tablet awakening minigame — those are
// deliberately excluded here; we only add the mod's material-tier weapons (Iron/Gold/
// Diamond/Netherite/Runic × 13 of its 15 weapon types — chakram and scythe omitted for
// variety's sake) so drops feel like normal loot, not a shortcut around that minigame.
// All ids jar-verified against assets/simplyswords/lang/en_us.json.
// -----------------------------------------------------------------------------

const NOTREASURE = /(dungeons_arise|cataclysm|block_factorys_bosses|aquamirae):chests\/(?!.*(treasure|vault|ominous|elite|enchants|rare|top)).*/;
const TREASURE   = /(dungeons_arise|cataclysm|block_factorys_bosses|aquamirae):chests\/.*(treasure|vault|ominous|elite|enchants|rare|top)|aquamirae:chests\/(ship_1|ship_2|frozen_chest)$|block_factorys_bosses:chests\/dragon_tower$/;
const FLAGSHIP   = /(dungeons_arise:chests\/(infested_temple|keep_kayra|kisegi_sanctuary)\/.*(treasure|vault|ominous|top)|cataclysm:chests\/(acropolis|frosted_prison|desert)_treasure|block_factorys_bosses:chests\/(underworld_arena_vault|dragon_tower)$)/;

// The 13 (of 15) Simply Swords weapon types we use across material tiers.
// Omitted: chakram, scythe (kept exclusive to the curated Runic pool below for variety).
const SWORD_TYPES = [
    "katana", "sai", "rapier", "cutlass", "spear", "longsword", "halberd",
    "claymore", "glaive", "warglaive", "greataxe", "greathammer", "twinblade",
];
// Curated subset for the top (Netherite) material tier — narrower than the lower tiers.
const NETHERITE_TYPES = ["katana", "warglaive", "glaive", "claymore", "greataxe", "halberd", "twinblade"];
// Curated, equal-weight subset of the Runic tier for the JACKPOT_RUNIC pool.
const RUNIC_TYPES = ["katana", "warglaive", "glaive", "greataxe", "scythe"];

LootJS.lootTables((event) => {
    // ── FILLER (Common) — every non-treasure combat-dungeon chest. ~28% something. ──
    event.modifyLootTables(NOTREASURE).createPool((pool) => {
        pool.addEntry(LootEntry.empty().withWeight(72));
        pool.addEntry(LootEntry.of("numismatics:spur", [2, 6]).withWeight(3));
        pool.addEntry(LootEntry.of("numismatics:bevel", [1, 3]).withWeight(2));
        pool.addEntry(LootEntry.of("supplementaries:rope", [2, 4]).withWeight(2));
        pool.addEntry(LootEntry.of("createbigcannons:cast_iron_ingot", [1, 3]).withWeight(2));
        pool.addEntry(LootEntry.of("creatingspace:nickel_ingot", [2, 4]).withWeight(2));
        pool.addEntry(LootEntry.of("cgs:lead_ingot", [1, 3]).withWeight(2));
        pool.addEntry(LootEntry.of("cgs:round_revolver", [2, 6]).withWeight(2));
        pool.addEntry(LootEntry.of("farmersdelight:beef_stew").withWeight(2));
        pool.addEntry(LootEntry.of("reanimal:cooked_ostrich_meat").withWeight(1));
        pool.addEntry(LootEntry.of("reanimal:cooked_crocodile_meat").withWeight(1));
        pool.addEntry(LootEntry.of("brewinandchewin:beer").withWeight(1));
        pool.addEntry(LootEntry.of("twilightforest:torchberries", [2, 4]).withWeight(1));
        pool.addEntry(LootEntry.of("bigglobe:spelunking_rope").withWeight(1));
        pool.addEntry(LootEntry.of("more_diseases_and_treatments:splint").withWeight(1));
        pool.addEntry(LootEntry.of("aether:blue_berry", [2, 4]).withWeight(1));
        pool.addEntry(LootEntry.of("hybrid_aquatic:pearl").withWeight(1));
        pool.addEntry(LootEntry.of("powergrid:capacitor", [1, 3]).withWeight(1));
        pool.addEntry(LootEntry.of("born_in_chaos_v1:monster_flesh", [2, 4]).withWeight(1));
        pool.addEntry(LootEntry.of("cgs:paper_cartridge", [1, 2]).withWeight(1));
        // Simply Swords — Iron tier, unenchanted commons.
        for (const t of SWORD_TYPES) {
            pool.addEntry(LootEntry.of(`simplyswords:iron_${t}`).withWeight(1));
        }
    });

    // ── TREASURE (Uncommon+Rare mats/coins/utility) — treasure-class chests. ~35%. ──
    event.modifyLootTables(TREASURE).createPool((pool) => {
        pool.addEntry(LootEntry.empty().withWeight(65));
        pool.addEntry(LootEntry.of("numismatics:sprocket", [2, 6]).withWeight(3));
        pool.addEntry(LootEntry.of("numismatics:cog", [1, 3]).withWeight(2));
        pool.addEntry(LootEntry.of("create:brass_ingot", [2, 4]).withWeight(2));
        pool.addEntry(LootEntry.of("create:rose_quartz", [2, 4]).withWeight(2));
        pool.addEntry(LootEntry.of("create:precision_mechanism").withWeight(1));
        pool.addEntry(LootEntry.of("create:electron_tube", [1, 3]).withWeight(1));
        pool.addEntry(LootEntry.of("creatingspace:copronickel_ingot", [2, 4]).withWeight(2));
        pool.addEntry(LootEntry.of("createbigcannons:steel_ingot", [2, 4]).withWeight(2));
        pool.addEntry(LootEntry.of("cataclysm:black_steel_ingot", [2, 4]).withWeight(2));
        pool.addEntry(LootEntry.of("create:experience_nugget", [2, 5]).withWeight(2));
        pool.addEntry(LootEntry.of("create_enchantment_industry:experience_cake").withWeight(1));
        pool.addEntry(LootEntry.of("illagerinvasion:hallowed_gem").withWeight(1));
        pool.addEntry(LootEntry.of("illagerinvasion:platinum_chunk", [1, 3]).withWeight(1));
        pool.addEntry(LootEntry.of("twilightforest:ironwood_ingot", [2, 4]).withWeight(1));
        pool.addEntry(LootEntry.of("born_in_chaos_v1:dark_metal_ingot", [1, 3]).withWeight(1));
        pool.addEntry(LootEntry.of("born_in_chaos_v1:elixirof_wither_resistance").withWeight(1));
        pool.addEntry(LootEntry.of("cgs:flintlock").withWeight(1));
        pool.addEntry(LootEntry.of("cgs:round_shotgun", [2, 6]).withWeight(1));
        pool.addEntry(LootEntry.of("cgs:scope").withWeight(1));
        pool.addEntry(LootEntry.of("cbc_more_content:small_bomb", [1, 2]).withWeight(1));
        pool.addEntry(LootEntry.of("cbc_more_content:medium_bomb").withWeight(1));
        pool.addEntry(LootEntry.of("supplementaries:quiver").withWeight(1));
        pool.addEntry(LootEntry.of("aether:golden_feather").withWeight(1));
        pool.addEntry(LootEntry.of("aquamirae:echo_compass").withWeight(1));
        pool.addEntry(LootEntry.of("more_diseases_and_treatments:syringe_2").withWeight(1));
        // Simply Swords — Gold tier, unenchanted.
        for (const t of SWORD_TYPES) {
            pool.addEntry(LootEntry.of(`simplyswords:gold_${t}`).withWeight(1));
        }
    });

    // ── TREASURE_GEAR (rare enchanted utility gear/guns/weapons) — same chests. ~15%. ──
    event.modifyLootTables(TREASURE).createPool((pool) => {
        pool.rolls(1);
        pool.apply((f) => f.enchantWithLevels([5, 15]));   // modest enchants
        pool.addEntry(LootEntry.empty().withWeight(85));
        pool.addEntry(LootEntry.of("minecraft:enchanted_book").withWeight(3));
        pool.addEntry(LootEntry.of("hybrid_aquatic:diving_helmet").withWeight(1));
        pool.addEntry(LootEntry.of("hybrid_aquatic:diving_leggings").withWeight(1));
        pool.addEntry(LootEntry.of("hybrid_aquatic:diving_boots").withWeight(1));
        pool.addEntry(LootEntry.of("hybrid_aquatic:coral_blade").withWeight(1));
        pool.addEntry(LootEntry.of("aquamirae:salvager_helmet").withWeight(1));
        pool.addEntry(LootEntry.of("aquamirae:shatterblade").withWeight(1));
        pool.addEntry(LootEntry.of("illagerinvasion:platinum_infused_hatchet").withWeight(1));
        pool.addEntry(LootEntry.of("aether:iron_ring").withWeight(1));
        pool.addEntry(LootEntry.of("aether:iron_pendant").withWeight(1));
        pool.addEntry(LootEntry.of("cgs:revolver").withWeight(1));
        pool.addEntry(LootEntry.of("cgs:shotgun").withWeight(1));
        // Simply Swords — Diamond tier (enchanted), all 13 types.
        for (const t of SWORD_TYPES) {
            pool.addEntry(LootEntry.of(`simplyswords:diamond_${t}`).withWeight(1));
        }
        // Simply Swords — Netherite tier (enchanted), curated 7-type subset.
        for (const t of NETHERITE_TYPES) {
            pool.addEntry(LootEntry.of(`simplyswords:netherite_${t}`).withWeight(1));
        }
    });

    // ── JACKPOT (Epic mats/coins/guns) — boss/flagship premium chests. ~38%. ──
    event.modifyLootTables(FLAGSHIP).createPool((pool) => {
        pool.addEntry(LootEntry.empty().withWeight(62));
        pool.addEntry(LootEntry.of("numismatics:crown", [1, 2]).withWeight(3));
        pool.addEntry(LootEntry.of("bigglobe:voidmetal_ingot", [1, 2]).withWeight(2));
        pool.addEntry(LootEntry.of("creatingspace:inconel_ingot", [1, 2]).withWeight(2));
        pool.addEntry(LootEntry.of("bigglobe:voidmetal_upgrade").withWeight(1));
        pool.addEntry(LootEntry.of("create:netherite_backtank").withWeight(1));
        pool.addEntry(LootEntry.of("create:precision_mechanism").withWeight(1));
        pool.addEntry(LootEntry.of("create_enchantment_industry:experience_bucket").withWeight(1));
        pool.addEntry(LootEntry.of("create_enchantment_industry:super_experience_nugget", [1, 3]).withWeight(1));
        pool.addEntry(LootEntry.of("reliable_backpacks:backpack").withWeight(1));
        pool.addEntry(LootEntry.of("create_dragons_plus:blaze_upgrade_smithing_template").withWeight(1));
        pool.addEntry(LootEntry.of("cgs:gatling").withWeight(1));
        pool.addEntry(LootEntry.of("cgs:blazegun").withWeight(1));
        pool.addEntry(LootEntry.of("cgs:ballistazooka").withWeight(1));
        pool.addEntry(LootEntry.of("cgs:round_gatling", [4, 8]).withWeight(1));
        pool.addEntry(LootEntry.of("cbc_more_content:large_bomb").withWeight(1));
        pool.addEntry(LootEntry.of("cbc_more_content:cruise_missile").withWeight(1));
        pool.addEntry(LootEntry.of("takesapillage:ravager_horn").withWeight(1));
        pool.addEntry(LootEntry.of("aether:healing_stone").withWeight(1));
        pool.addEntry(LootEntry.of("aether:agility_cape").withWeight(1));
        pool.addEntry(LootEntry.of("numismatics:sun").withWeight(1));
    });

    // ── JACKPOT_RUNIC — curated, equal-weight Runic-tier weapons. ~15% of these chests. ──
    event.modifyLootTables(FLAGSHIP).createPool((pool) => {
        pool.rolls(1);
        pool.apply((f) => f.enchantWithLevels([10, 25]));  // strong enchants, top tier
        pool.addEntry(LootEntry.empty().withWeight(85));
        for (const t of RUNIC_TYPES) {
            pool.addEntry(LootEntry.of(`simplyswords:runic_${t}`).withWeight(3));
        }
    });
});
