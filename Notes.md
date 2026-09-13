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

## Current pack state (0.9.15)

Living rules. CHANGELOG stays historical.

- **Version / count:** `pack.toml` **0.9.15**, **158** mods. Quest book **17 / 242**.
- **No fresh overworld** from 0.7.1 → 0.9.15. New Cataclysm / Bosses'Rise / Born in Chaos /
  Integrated Villages airships / tighter WDA spacings still need **unexplored chunks**.
  Nether added in 0.9.4 — existing Nether chunks stay vanilla until regenerated.
- **World height:** patched Big Globe jar, floor **−608**, ceiling **+1024**. Do not
  `packwiz update` Big Globe. Fresh world is only required from pre-0.6 (floor) or 0.6.x
  (ceiling; or regen the top + clear DH).
- **Datapacks** live in `pack/datapacks/` and packwiz installs them to the instance
  `datapacks/` folder. Paxi `Load from base 'datapacks' directory = true`. They are **not**
  under `config/paxi/datapacks/`. Current BG compat zips include
  `bigglobe_integratedvillages.zip` (airship-only) and `bigglobe_simplyswords_nouniques.zip`
  (empty `lootable_uniques` tag).

## Villages

- **CTOV** is the only ground village system (vanilla `bigglobe:villages` emptied).
- **Integrated Villages** `1.3.3` + **Integrated API** `1.8.2` (`side = both`): only the
  **airship village** generates (`regular_villages` emptied). Placement
  (`bigglobe_integratedvillages.zip` via `build_iv_compat.py`):
  - biomes `#bigglobe:land`
  - **surface + 300** (`WORLD_SURFACE_WG` + constant offset 300; was fixed Y=300 in 0.9.12)
  - `terrain_adaptation: none` (floats free)
  - `air_villages` spacing **75/59** (~1,200 blocks)
  - `air_village_avoid` → `bigglobe_ctov:villages` (8 chunks)
- Config (`defaultconfigs/integrated_villages-neoforge-1_21.toml`):
  `disableVanillaVillages=false` (keeps CTOV), `activateCreateContraptions=true`
  (airship propellers spin).

## When Dungeons Arise placement (current)

`bigglobe_whendungeonsarise.zip` via `patch_wda_compat.py`. WDA `major`/`minor` emptied.
Five `stattinkerer` sets:

| Set | Count | Spacing / sep | Notes |
|---|---|---|---|
| sky | 5 | **25/22** (~400) | aerial Y 700–750; 12-chunk exclusion vs large_dungeon |
| sea | 4 | 48/42 | ships at sea level |
| common | 11 | 32/28 | 8-chunk exclusion vs villages |
| large_dungeon | 3 | **125/111** (~2,000) | infested / kayra / kisegi; start 0 + `bury`; 12 vs villages |
| nest | 1 | **41/36** (~656) | `mechanical_nest`; frequency removed; 12 vs sky |

Outposts stay 6-chunk vs villages. Underground: scorched_mines **−150**, plague_asylum **−300**,
foundry **−540**. Do not restore `small_prairie_house` or WDA major/minor.

## Combat-dungeon loot

See **[LOOT.md](LOOT.md)**. LootJS is additive over combat/boss dungeon chests only
(WDA / Cataclysm / Bosses'Rise / Aquamirae). Four pools: FILLER ~28% / TREASURE ~35% /
TREASURE_GEAR ~15% (enchant 5–15) / JACKPOT ~38%. No endgame armor (ingots only).
Metallurgy + andesite/zinc filler are **out** of the wired pools. Currencies halved vs 0.9.12.

**Simply Swords** (`config/simplyswords/loot.toml` + `bigglobe_simplyswords_nouniques.zip`):
native injector **on** (material + rare types, global); runic weapons **off**; Runic Tablet
is a rare TREASURE_GEAR drop (`tabletHardPity=400`); uniques **fully disabled** (weight 0 +
pity 100000 + empty tag). Remnants stay off. Do not re-add `borninchaos_remnant_loot.js`.
There is no `config/simplyswords/general.toml` (removed in 0.9.11 — mob ability chance is
not a spawn/drop switch).

## Server-only mods

**Too Fast** and **YUNG's Better Nether Fortresses** are `side = server`. Default PrismLauncher
`--side client` skips them. Dedicated servers get them.

## packwiz gotchas

- Always `packwiz refresh` and commit **both** `index.toml` and `pack.toml` (0.8.5 forgot the hash).
- Do **not** `packwiz curseforge add` Simply More (Modrinth `1.3.0_alpha5`; CF
  `allowModDistribution:false`) or `ponderjs` (wrong slug — use `ponder`).
- Do **not** `packwiz update` Big Globe (height-patched jar).
- Prefer a future Simply More *release* that matches Simply Tooltips `0.1.5` over staying on alpha.
