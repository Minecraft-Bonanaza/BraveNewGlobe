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

## FTB Quests (as of 0.9.0)
- **Shipped book:** 15 chapters, 230 quests. Guidance-only; no line gates another. Industry lines
  use Awareness → Functional → Achievement; exploration lines are locate-and-progress. See
  [QUESTS.md](QUESTS.md) (line list) and [SPECTRUM.md](SPECTRUM.md) (design rules).
- **Source of truth** is committed `pack/config/ftbquests/**/*.snbt`. Regenerate from
  `bigGlobeAero/build_ftbquests.py` + `quest_lines/*.py`. IDs are SHA-1 of stable keys (0.8.1).
  Changing keys is a content rewrite, not a progress-safe regen.
- **No checkmarks.** Every gate is item count / mod advancement / dimension / stat. Boss kills are
  advancement-gated. Do not reintroduce player-attested checkmarks.
- **Create Core** was rewritten in 0.8.7 (15 craft-the-block → 12 purpose-driven + checkmarks) and
  again in **0.9.0** (15 objective-only). Existing worlds will see mixed or reset Create Core
  progress. Other chapters are new.
- **No fresh world** for 0.7.1 → 0.9.2. The book itself is unchanged since 0.9.0.
- **WDA chapter vs pack generation:** several stock WDA advancements used as quest gates
  (Coliseum, monastery, lighthouse, abandoned temple, mushroom mines, bandit towers, Shiraz
  Palace) belong to structures this pack emptied from WDA's `major`/`minor` sets in 0.7.0. Those
  quests will not complete in a normal world. Living WDA placement rules stay in this file / the
  0.7.x changelog — do not restore those structures just to complete the quests.

## World / upgrade (living)
- Overworld bounds **−608 → +1024** via the height-patched Big Globe jar (not a datapack).
- Fresh world required when upgrading from **pre-0.6** (floor) and from **0.6.x → 0.7.0**
  (ceiling; or regenerate the top + clear the Distant Horizons cache).
- **0.7.1 → 0.9.2 needs no new world.** Existing chunks keep old WDA placements until regenerated.

## LootJS / WDA chests (as of 0.9.2)
- **LootJS** `3.7.0` is in (0.9.1). Scaffold `pack/kubejs/server_scripts/wda_dungeon_loot.js` is
  intentionally a **no-op** — WDA `dungeons_arise:chests/*` tables are still 100% vanilla.
- **[LOOT.md](LOOT.md)** is the menu (Common / Uncommon / Rare / Epic) from the 0.9.1 jar-lang
  survey. Wire pools from that list; do not invent a second inventory.
- **Simply Swords** `1.70.2-1.21.1` + **Simply More** `1.2.3` (0.9.2, CurseForge, `side = both`)
  plus deps **Fzzy Config** `0.7.6` and **Simply Tooltips** `0.1.5`. Optional Better Combat
  integration is already in the pack. No worldgen / no BG datapack. Fold unique weapons into
  LOOT.md Uncommon/Rare later — they landed after the survey.
- Do **not** `packwiz curseforge add` a Simply More `1.3.0_alphaN` build (release `1.2.3` is pinned).
- After editing kubejs scripts or LOOT.md wiring, `packwiz refresh` and commit **both**
  `index.toml` and `pack.toml`.
