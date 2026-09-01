# Brave New Globe — Notes

Miscellaneous maintainer/config notes for the pack.

## Derek's Notes
Under config, need to enable hyperspeed generation in Big Globe's config to support DH API usage when
generating LODs. Otherwise DH doesn't recognize the renderer and will memory leak.

## Rendering toggle (Iris / Iris Flywheel Compat / Distant Horizons)
These three optional mods must be enabled or disabled **together** (all ON or all OFF). Running Iris
without Distant Horizons alongside our mandatory rendering mods (Flywheel/Create) results in buggy
rendering. They ship as `optional = true, default = false` in their `pack/mods/*.pw.toml` files.

## Known issue — DH + Simple Clouds artifacting under Iris
With Distant Horizons and Simple Clouds running under Iris rendering, artifacting will sometimes appear
across the boundary between the two render zones (the DH/far zone and the near zone).

Fixes:
- **Permanent:** disable the bottom 3 settings under **Visual** in the Simple Clouds config, **or** let
  the LODs fully load.
- **Temporary:** if artifacting occurs, reload the shaders and it should go away.

## FTB Quests (as of 0.9.10)
- **Shipped book:** 17 chapters, 242 quests (0.9.0 was 15 / 230; 0.9.10 added Cataclysm +
  Bosses' Rise). Guidance-only; no line gates another. Industry lines use Awareness →
  Functional → Achievement; exploration lines are locate-and-progress. See [QUESTS.md](QUESTS.md)
  and [SPECTRUM.md](SPECTRUM.md).
- **Source of truth** is committed `pack/config/ftbquests/**/*.snbt`. Regenerate from
  `bigGlobeAero/build_ftbquests.py` + `quest_lines/*.py`. IDs are SHA-1 of stable keys (0.8.1).
  Changing keys is a content rewrite, not a progress-safe regen.
- **No checkmarks.** Industry / Twilight / Aether / WDA gates are item count / mod advancement /
  dimension / stat. **Cataclysm and Bosses' Rise use FTB kill tasks.** Do not reintroduce
  player-attested checkmarks. Do not convert Twilight / Aether / WDA to kill tasks.
- **Create Core** was rewritten in 0.8.7 (15 craft-the-block → 12 purpose-driven + checkmarks) and
  again in **0.9.0** (15 objective-only). Existing worlds will see mixed or reset Create Core
  progress. Cataclysm / Bosses' Rise chapters are new in 0.9.10 (empty progress).
- **No fresh world** for 0.7.1 → 0.9.10. The industry / Twilight / Aether / WDA chapters are
  unchanged since 0.9.0.
- **WDA chapter vs pack generation:** several stock WDA advancements used as quest gates
  (Coliseum, monastery, lighthouse, abandoned temple, mushroom mines, bandit towers, Shiraz
  Palace) belong to structures this pack emptied from WDA's `major`/`minor` sets in 0.7.0. Those
  quests will not complete in a normal world. Living WDA placement rules stay in this file / the
  0.7.x changelog — do not restore those structures just to complete the quests.

## World / upgrade (living)
- Overworld bounds **−608 → +1024** via the height-patched Big Globe jar (not a datapack).
- Fresh world required when upgrading from **pre-0.6** (floor) and from **0.6.x → 0.7.0**
  (ceiling; or regenerate the top + clear the Distant Horizons cache).
- **0.7.1 → 0.9.10 needs no new overworld.** Existing chunks keep old WDA / Born in Chaos /
  Cataclysm / Bosses'Rise placements until regenerated. Existing **Nether** chunks generated
  before 0.9.4 stay vanilla until regenerated (Incendium + Better Fortresses). 0.9.6 is a
  Simply More jar bump; 0.9.7 is a Simply Swords config; 0.9.8–0.9.10 need **new overworld
  chunks** (and unexplored Nether for Cataclysm / Bosses'Rise nether arenas) to see the new
  structures.

## Nether / Born in Chaos (as of 0.9.5)
- **Incendium** `5.4.4` (Modrinth, packwiz name **Incendium Legacy**, `side = both`) — datapack
  biome modifiers into the vanilla Nether source. No BG Nether datapack (Big Globe is overworld
  only).
- **YUNG's Better Nether Fortresses** `3.1.5` (Modrinth, `side = "server"`). YUNG's API is
  already `both`. Default PrismLauncher packwiz-installer `--side client` **skips** this mod
  (same as Too Fast). Dedicated servers get it; singleplayer keeps vanilla fortresses unless
  the metafile is `both` or the installer is `--side both`.
- **Born in Chaos** `1.7.6` (Modrinth, `side = both`). Overworld **gameplay** structures re-keyed
  in `pack/datapacks/bigglobe_borninchaos.zip` (0.9.5): plains quartet → `#minecraft:is_plains`,
  `mound_of_hounds` → `#is_badlands`, `infernal_pumpkin` → `#is_forest`. Tag-gated BiC structures
  already worked via `bigglobe_tags.zip`. Cosmetic `grave_*` memorials left un-compatted.
  Overworld **mob** spawns still pending review against BG biome tags.
- Fold Incendium / Born in Chaos drops into [LOOT.md](LOOT.md) later — they landed after the
  0.9.1 survey.

## Cataclysm / Bosses'Rise (as of 0.9.10)
- **L_Ender's Cataclysm** `3.33` (Modrinth `46KJle7n` / `mYBUDZWl`, `side = both`) + dep
  **Lionfish-API** `3.1` (`FoVacERa` / `fTRMVgyZ`, `side = both`). Curios already in.
  Arena / summon bosses (never random-spawn). Overworld structure biomes overridden in
  `pack/datapacks/bigglobe_cataclysm.zip`: acropolis → `#is_ocean`, frosted_prison →
  `#is_mountain`, sunken_city → `#is_deep_ocean`, ancient_factory → `#is_overworld`,
  cursed_pyramid → `#is_badlands` + `#is_savanna` + `#is_plains` (**0.9.9** widened from
  badlands-only). Nether/End structures need no override.
- **Bosses'Rise** `2.1.2` (Modrinth `q2bV1Tm1` / `lE9PF6Wp`, modId `block_factorys_bosses`,
  `side = both`). GeckoLib already in. Compat `pack/datapacks/bigglobe_bossesrise.zip`:
  sandworm_nest → badlands/savanna/plains, dragon_tower → plains/jungle/savanna/forest,
  yeti_hideout → mountain, kraken_ship → deep_ocean. `underworld_arena` (Nether) needs none.
- Both are **exploration chapters**, not SIGs. Quest text pushes cannons / airships over 1v1
  melee. Do not make them career lines.

## LootJS / WDA chests / Simply Swords (as of 0.9.7)
- **LootJS** `3.7.0` is in (0.9.1). Scaffold `pack/kubejs/server_scripts/wda_dungeon_loot.js` is
  intentionally a **no-op** — WDA `dungeons_arise:chests/*` tables are still 100% vanilla.
  Do **not** re-add `borninchaos_remnant_loot.js` (landed then reverted in 0.9.7).
- **[LOOT.md](LOOT.md)** is the menu (Common / Uncommon / Rare / Epic) from the 0.9.1 jar-lang
  survey. Wire pools from that list; do not invent a second inventory.
- **Simply Swords** `1.70.2-1.21.1` (CurseForge) + **Simply More** **`1.3.0_alpha5`** (Modrinth
  as of **0.9.6**, version `ZPX1C3yg`; CF `allowModDistribution:false`) plus deps **Fzzy Config**
  `0.7.6` and **Simply Tooltips** `0.1.5`. All `side = both`. Optional Better Combat integration
  is already in the pack. No worldgen / no BG datapack.
- **0.9.7:** unique / remnant loot is **off** via partial `pack/config/simplyswords/{loot,general}.toml`
  (`enableLootDrops = false`, `enableContainedRemnants = false`, `nonPlayerWeaponAbilityChance = 0.0`).
  Fzzy Config merges the rest. With remnants off, uniques are also effectively uncraftable —
  crafted weapon-type variety is what remains. Do **not** fold uniques into LOOT.md while this
  holds. Verify in-game after sync; if drops still happen, bake the generated Mod Menu toml.
- **0.9.6 crash fix:** release Simply More `1.2.3` (2026-06-10) targeted an older Simply
  Tooltips method (`borderStyleFor`). Simply Tooltips `0.1.5` (pulled by Simply Swords
  `1.70.2`) renamed it → `MixinApplyError` on any Simply Swords / Simply More tooltip
  (e.g. the creative tab). `1.3.0_alpha5` (2026-08-26) is the build compiled against that API.
- Do **not** `packwiz curseforge add` Simply More. Do **not** roll back to `1.2.3`. Prefer a
  future Simply More *release* that matches Simply Tooltips `0.1.5` over staying on alpha.
  Do not bump Simply Tooltips independently of Simply More.
- After editing kubejs scripts or LOOT.md wiring, `packwiz refresh` and commit **both**
  `index.toml` and `pack.toml`.
