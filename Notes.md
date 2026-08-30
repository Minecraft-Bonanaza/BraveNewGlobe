# Brave New Globe — Notes

Miscellaneous maintainer/config notes for the pack.

## Packwiz hashes and line endings (as of 0.5.4; `pack.toml` hash as of 0.8.6)
packwiz pins a sha256 of every file under `pack/` in `pack/index.toml`. If Git rewrites
line endings (CRLF ↔ LF) on checkout, those bytes change and **every player's launch fails
the hash check** even though the pack content is the same.

The repo has `.gitattributes` with `* -text` so Git **does not** convert end-of-line. Do not
delete that file, and do not turn on `core.autocrlf` / `core.eol` conversion for this clone.
After real edits under `pack/`, still run `packwiz refresh` before committing — and
commit **both** `index.toml` and `pack.toml`. Refresh writes the index *and* the
`[index]` hash field in `pack.toml`.

**0.8.6** is a different hash failure than 0.5.4. **0.8.5** updated `index.toml`
(PonderJS + KubeJS chain) but left a stale `[index]` hash in `pack.toml`, so
packwiz reported **"index hash file invalid"**. The index file itself was
correct; only the hash *recorded in* `pack.toml` was old. **0.8.6** re-refreshes
so they match (`d902d2d2…`). No mod, config, or worldgen changes. **No fresh
world.** Relaunch.

## Overworld depth — height-patched Big Globe (as of 0.7.0, still in 0.8.6)
Current pack version is **0.8.6** (`pack.toml` matches). **0.8.6** re-refreshes
the stale `pack.toml` `[index]` hash left by 0.8.5 (packwiz **"index hash file
invalid"**). No mod changes. **0.8.5** adds **Ponder
for KubeJS** (`ponderjs` 1.21.1-2.4.0, slug **`ponder`**) plus **KubeJS**
`2101.7.2`, **Rhino** `2101.2.8`, and **Better Advanced Tooltips** `2101.1.0` —
the missing required dep chain for **Delivery Required** (crash on load without
them). **0.8.4** adds **LDLib2** `2.2.37` and restores **owo-lib**
`0.12.15.5-beta.1`. **0.8.3** self-hosts **Create: Villager Commerce** in
`bundled-jars/`. **0.8.2** re-points **Create: Linear Bearing** to Modrinth
`1.3.5`. **0.8.1** / **0.8.0** / **0.7.19** add **FTB Quests** (Create Core
shipped). **0.7.17** / **0.7.18** swap the coin economy to **Create:
Numismatics**. Overworld bounds are **floor −608**,
**ceiling +1024**, sea level 0 — unchanged from 0.7.0. That height lives inside a patched
Big Globe 5.3.2 jar (`bundled-jars/bigglobe-5.3.2-mc1.21.1-shallow608.jar`,
`pack/mods/big-globe.pw.toml`). The filename still says `shallow608` because **608 is the
floor**; 0.7.0 rebuilt the jar (sha256 `df683d31…`) to restore the stock **+1024** ceiling
for airships / aerial structures while keeping the deep-floor disk. Underground layers +
ore curves are unchanged from 0.6. **0.7.1–0.8.6 did not rebuild the jar** (0.7.1–0.7.15
are datapack-only WDA hotfixes / placement retunes; **0.7.16** is Better Combat; later
adds are Create/Sable mods, the Numismatics economy, Villager Commerce, FTB Quests,
Linear Bearing's Modrinth re-point, 0.8.4 libraries, and the 0.8.5 PonderJS chain;
**0.8.6** is the hash-only fix).
`cloud_height` is already 1024. Distant Horizons
anchors to generator `min_y` = −608 and now renders LODs up to +1024 — no offset.

**Fresh world required** when upgrading:

- From any pack version **before 0.6** — old saves used default −1024…+1024 or the brief
  0.6-beta datapack compact (−464…+896). Floor is −608 now.
- From **0.6–0.6.11** — ceiling was **+896**. 0.7.0 raises it to **+1024**. Start a new
  world, **or** regenerate the top and **clear the Distant Horizons cache** so the extra
  sky renders cleanly. The floor did not move, so existing deep terrain stays aligned if
  you keep the world.
- From **0.7.0 → 0.7.1** — **no** fresh world. Datapack-only hotfix; relaunch. New worlds
  can be created again (0.7.0 crashed at "Create New World").
- From **0.7.1 → 0.8.6** — **no** fresh world for height. 0.7.1–0.7.15 are
  datapack-only WDA placement retunes; later versions add combat / economy /
  quests / libraries (no worldgen). **0.8.6** is hash-only. Relaunch.
  Already-generated chunks keep old structure positions until those
  chunks (or the world) are regenerated.

Verify F3 min Y = **−608**, max Y = **+1024**, and DH LODs align with real terrain.

Why a jar, not a datapack: Big Globe's `reload_dimension` reads the world-preset generator
(including `height`) from **its own jar every load** and ignores datapack / `level.dat`
overrides. DH anchors LODs to that same `generator.height.min_y`. The 0.6-beta
`bigglobe_shallow_overworld.zip` therefore produced LODs offset by exactly 560 blocks
(−1024 vs −464). Do **not** re-add that datapack.

Current underground layout (from the 0.5.9 / 0.6 jar; floor unchanged in 0.7.0–0.8.6):

| Layer | Y range | Thickness |
|---|---|---|
| Cave zone | surface → −320 | caves held 32 above the deep dark |
| Stone cap | −352 → −320 | 32 (buffer, no caves/sculk) |
| Deep Dark | −480 → −352 | 128 (full) |
| Gap | −496 → −480 | 16 |
| Core / Molten | −592 → −496 | 96 (75% of default 128) |
| Lava Sea | −592 → −576 | ~16 |
| Base stone | −608 → −592 | 16 |

Deep-ore curves are rescaled ~×0.63 to the shorter stone column (new core-top −496 vs
default −784): diamond ramp `256→512` → `160→320`, gold/redstone `128→256` → `80→160`,
iron/copper exp delay `512` → `320`, emerald `/−192` → `/−128`. Lapis and coal unchanged.
Net: diamonds reach ~full richness above the core; ~41% less underground storage/gen than
default −1024. The restored +1024 ceiling does not change those underground savings.

Re-patch on any Big Globe update (`build_patched_jar.py` in `bigGlobeAero` asserts all 14
edited strings). Keep ceiling **+1024** and floor **−608**. The metafile has **no `[update]`
block** so `packwiz update` cannot revert to the stock Modrinth jar. The jar is served from
public `raw.githubusercontent.com` — move it to a no-login host before making this repo
private. CC BY-NC 4.0, personal-server use.

## When Dungeons Arise (as of 0.7.15, still in 0.8.6)
**When Dungeons Arise** `2.1.68` (Modrinth `8DfbfASn` / version `XIRJSFQ0`,
`pack/mods/when-dungeons-arise.pw.toml`) is in the pack. `side = "both"`. Only NeoForge +
Minecraft deps (no libraries). Its `neoforge.mods.toml` declares minecraft `[1.21,1.21.1)`
and loads on NeoForge 21.1.x.

Placement is driven by `pack/datapacks/bigglobe_whendungeonsarise.zip` — the Modrinth Big
Globe compat pack `5obAEsYh` v1.1, **patched** via `bigGlobeAero/patch_wda_compat.py` for
this pack's height and for WDA 2.1.68. WDA's own `major`/`minor` structure sets are
**emptied** so nothing double-places. 24 of 38 standalone structures generate in **five**
custom `stattinkerer` sets; **14 are removed** (in no set):

illager_windmill, mushroom_village, mushroom_mines, thornborn_towers, coliseum,
jungle_tree_house, lighthouse, abandoned_temple, greenwood_pub, monastery, illager_fort,
bathhouse, bandit_towers, shiraz_palace.

| Set | Count | Spacing / separation | Role |
|---|---|---|---|
| `stattinkerer:sky` | 5 | **32 / 28** | aerial airship targets (incl. `heavenly_challenger`); 12-chunk exclusion vs `large_dungeon` |
| `stattinkerer:sea` | 4 | 48 / 42 | aquatic ships at sea level |
| `stattinkerer:common` | 11 | 32 / 28 | smaller land / mixed + underground dungeons; **8-chunk** exclusion vs villages |
| `stattinkerer:large_dungeon` | **3** | **280 / 250** | ground towers only (`keep_kayra` / `infested_temple` / `kisegi_sanctuary` at start **0** + **`bury`**); 12-chunk exclusion vs villages; ~4000-block min separation |
| `stattinkerer:nest` | 1 | **96 / 80** + `frequency` **0.65** | flying `mechanical_nest` at Y 700–750; ~1900 blocks apart; 12-chunk exclusion vs `sky` |

Weights are still WDA originals. `sky` Σweight is 7. Groupings live in
`bigGlobeAero/patch_wda_compat.py`. **0.7.2** moved `heavenly_challenger` from
`large_dungeon` → `sky`. **0.7.3** added the sky↔dungeon exclusion (a set allows one
`exclusion_zone`, so the chain is `sky → large_dungeon → villages`, no cycle) and
widened sky jitter (`separation` 56 → 44). **0.7.11** densified sky **64/44 → 48/42**
(match sea) and stretched `large_dungeon` **64/56 → 280/250**. **0.7.12** split
`mechanical_nest` into its own `:nest` set. **0.7.13** densified sky again
**48/42 → 32/28** (match `common`) and added nest's sky exclusion. **0.7.14** gave
`common` an **8-chunk** village exclusion. **0.7.15** corrected nest `frequency`
**0.0065 → 0.65** (65% on the 96 grid ≈ **~1,900 blocks** apart; 0.7.13's 0.0065
was 0.65% and made it locate-only at ~19,000).

**Aerial structures** (sky + nest) spawn at a **fixed absolute Y 700–750** with **no**
heightmap projection and **`terrain_adaptation: none`** (no terrain base). They need an
airship to reach. Fixed-Y cannot clip the +1024 ceiling (tops out ~Y 878); BG land rarely
nears Y 700 so they should not intersect terrain. Do **not** re-apply the compat pack's
original `bury` on aerial structures — at altitude that encases each build in a stone
blob. Aquatic ships (`illager_galley`, `undead_pirate_ship`, `typhon`,
`illager_corsair`) stay at sea level.

Compat mismatches vs WDA 2.1.68 + this shallow world (author 0.7.0, depths retuned 0.7.2–0.7.15):

- **`foundry`** — was Y 900 in `#bigglobe:nether` → overworld underground forge
  (`#bigglobe:underground`, `bury`, in `common`). Depths: 0.7.0 **−100** → 0.7.4 **−560**
  (core/molten) → 0.7.5 **−540** (floor clearance) → 0.7.6 **−520** → **0.7.7 −540**
  (current: ~20 blocks above the −608 floor even for the tallest downward piece,
  still inside core/molten −592..−496; lava sea tops at −576). Do **not** drop it
  to −560 (a downward piece can clip the world floor) or to −100.
- **`mining_complex`** (2.1.68 renamed the compat's `mining_system`) and
  **`kisegi_sanctuary`** got missing BG biome bridges so they generate at all.
- **`scorched_mines`** re-gated from `bigglobe:molten_cave` (only exists ~Y −496+ here) to
  `#bigglobe:underground`. Depth: 0.7.0 **−200** → **0.7.4 −150** (cave zone).
- **`plague_asylum`** is also `#bigglobe:underground`, `bury`, in `common`. Depth: 0.7.0
  **−133** → **0.7.4 −300** (cave zone).
- **`bandit_village`** `bigglobe:hot_wasteland` → `#bigglobe:warm`. **`ceryneian_hind`**
  moved from buried `sandy_cave` @ Y −93 to the surface (`start_height 0`, `beard_thin`),
  gated to `#bigglobe:warm`.
- Giant towers (`keep_kayra`, `infested_temple`, `kisegi_sanctuary`): all three currently
  **`start_height 0`**, `WORLD_SURFACE_WG`, **`bury`**, gated to `#bigglobe:land`.
  `start 0` is the proven 0.7.0/0.7.1/0.7.7/0.7.9 anchor — biome check at the surface, a
  **full 16-block margin** above Big Globe's **`surface−16`** cave threshold (`test_cave`).
  At −16 or deeper the biome check flips underground and `#bigglobe:land` no longer
  matches → **zero spawns** (the **0.7.2** failure mode: infested −45 / kisegi −25;
  zero generation from 0.7.2 through 0.7.6). **0.7.7** reverted infested/kisegi to
  surface **0** + `beard_box` so they generate again (`keep_kayra` stayed 0 /
  `beard_thin` until 0.7.8). **0.7.8** seated all three at **−15** + `beard_box`
  (only a 1-block margin above the cave threshold — fragile). **0.7.9** puts them
  back on **start 0** and kept `beard_box`. **0.7.10** switched `beard_box` → **`bury`**
  so steep downhill sides no longer float (`beard_box`'s engine kernel only reaches
  ~12 blocks below the footprint; `bury` fills all air in the bounding box, at the
  cost of a terrain embankment on steep downhill sides). `bury` is stock WDA's own
  choice for `infested_temple`. A structure cannot be both *sunk below surface−16*
  and *land-gated* in BG. Do **not** restore infested/kisegi to −45/−25. Do **not**
  drop any of the three to −16 or deeper. Do **not** re-apply 0.7.8's −15 as current.
  Do **not** put `beard_box` back as current (0.7.10 replaced it with `bury` for
  these three). **`mechanical_nest`** is **not** in `large_dungeon` — **0.7.12** moved
  it to **`stattinkerer:nest`**. It still flies at Y 700–750, gated to
  `#bigglobe:land`. Do **not** put it back in `large_dungeon`.
- **`mining_complex`** (~197-tall) sunk (`start_height −187`, surface-projected,
  `terrain_adaptation none`) so only ~10 blocks peek above the surface. Now in `common`.

Do **not** restore WDA's own `major`/`minor` sets.

**0.7.1 hotfix:** the upstream compat pack (v1.1, built for older WDA) also shipped
`dungeons_arise:small_prairie_house` — a structure def whose `start_pool` was
removed/renamed in WDA 2.1.68. It was in **none** of the sets, but Minecraft loads
**every** structure definition at registry time, so "Create New World" crashed with
`Unbound values in registry template_pool`. Dropped the structure def and its biome tag
(`small_prairie_house_biomes.json`) from `pack/datapacks/bigglobe_whendungeonsarise.zip`
via `bigGlobeAero/patch_wda_compat.py`. Verified: no remaining structure def references a
missing pool. Do **not** restore that def. Datapack-only — relaunch; no fresh world for
the hotfix itself.

**0.7.2–0.8.6** did not change the 24/38 split (same 14 removed). 0.7.2–0.7.15 retuned
placement / heights / set membership (nest split in 0.7.12). **0.7.16–0.8.6** did not
touch WDA. Datapack-only through 0.7.15; relaunch.
Already-generated chunks keep old WDA positions until regenerated. Worlds created on
**0.7.2–0.7.6** likely never spawned `infested_temple` / `kisegi_sanctuary`. Worlds
created on **0.7.13** have nests at the too-rare 0.0065 frequency until those chunks
are regenerated.

## Chunk performance — Vertigo only (C2ME removed in 0.6.10)
**C2ME is not in the pack.** It was added in 0.5.7 and **removed in 0.6.10** after
chunk-loading bugs from the predicted C2ME × Vertigo lighting / chunk-system mixin overlap.
It was a leaf mod (nothing depended on it). packwiz-installer deletes the jar on the next
player launch. Any leftover runtime `config/c2me.toml` is an inert orphan — harmless. Do
**not** re-add C2ME unless that mixin overlap is resolved, or Vertigo is also dropped.

**Vertigo** `1.2.4` (Modrinth `4LzgJp1j`, `pack/mods/vertigo.pw.toml`) stays —
Fabric via Sinytra Connector + FFAPI, `side = "both"`. Strips empty vertical sections from
ChunkData packets. Re-added in 0.5.7 **without** `bigglobe_shallow_overworld.zip`. The
0.6-beta Distant Horizons "600-block" offset was that datapack's floor mismatch, not Vertigo.
If chunk-loading issues persist after 0.6.10, Vertigo is the next suspect.

## Sea Myths spawn clamp — In Control! (as of 0.6.8 / 0.6.9)
Sea Myths' large creatures were spawning at the surface (Big Globe's spawn format has no Y
field, so biome was the only prior lever). **In Control!** `10.2.7` (CurseForge project
257356, `pack/mods/in-control.pw.toml`, NeoForge 1.21, `side = "both"`) hard-clamps them.
This build has **no McJtyLib dependency** (only an optional Lost Cities dep, absent). It
governs BG-world spawns because Big Globe uses vanilla `SpawnHelper`, so the NeoForge spawn
events In Control hooks still fire.

Current `pack/config/incontrol/spawn.json`: deny `seaeater:kraken`, `seaeater:leviathan`,
and `seaeater:sea_eater` at **Y ≥ −49**, so they only spawn at **Y ≤ −50** (deep). Ocean
floor is the natural lower bound; there is no hard −100 floor (that would exclude the
deepest trenches). 0.6.8 was Leviathan-only; **0.6.9** extended the clamp to all three.

**Stattinkerer weights** (`pack/datapacks/stattinkerer_bigglobe_compat.zip`, 0.6.9): natural
spawn weight **4 → 2** for those three types (files renamed `..._4_1_1` → `..._2_1_1`).
`sea_eater` is biome-gated to `bigglobe:deep_ocean` only; kraken and leviathan also list
`ocean` / `shallow_ocean`, but the Y clamp still keeps them deep.

## Creating Space (added while pack.toml said 0.6-beta)
**Creating Space** `1.7.18` (Modrinth `8VQksBiY`, `pack/mods/creating-space.pw.toml`) is
Create-based rocket / space travel. `side = "both"`. Depends on **Create** `6.0.10` (already
in the pack). Not published on CurseForge.

It adds its **own planet dimensions**, so no Big Globe compat datapack is required. Author
confirmed another 1.21.1 pack runs this exact `1.7.18` + Create `6.0.10` combo.

## Project Atmosphere biome temperatures (as of 0.5.6)
`pack/config/projectatmosphere/biome_temps.json` must define a Celsius range for every biome
the overworld actually uses. Stock only had `minecraft:plains`; without ranges, PA's per-tick
`WeatherMgr` spams *"No temperature range defined for biome bigglobe:…"*.

Current file covers `minecraft:plains` plus all **52** Big Globe biomes (seasonal
spring/summer/autumn/winter for surface climate tiers; stable `all` ranges for oceans, caves,
nether, end, and special biomes). If a new Big Globe biome is added, add a matching entry
here or the log spam returns.

## CTOV integration fallbacks (as of 0.5.6)
`pack/datapacks/ctov_integration_fallbacks.zip` defines 7 empty template pools that CTOV 3.6.3
buildings reference for optional mods this pack does **not** install:

- `ctov:village/waystone/{sand,normal,mossy}`
- `ctov:village/vampirism/totem`
- `ctov:village/bounty/{bounty_board,plains,swamp}`

Without them, Lithostitched logs *"Couldn't find template pool reference"* for every village
piece. Villages generate the same either way. **Delete this datapack before adding Waystones,
Vampirism, or a bounty mod**, or the empty pools would shadow the real ones.

## Villages (CTOV only, as of 0.5 / 0.5.1; buffers as of 0.7.14)
**ChoiceTheorem's Overhauled Village** is the only village system. Vanilla / Big Globe villages are
disabled, and **Better Villages** was removed (it only reskinned vanilla jigsaw pools, which no
longer generate).

**Villager API** is still in the pack. 0.5 removed it as an assumed Better-Village-only dependency,
but **Numismatic Overhaul** also required it (mod loading crashed without it). Restored in **0.5.1**.
**0.7.17** removed Numismatic Overhaul; Villager API stays because **MCA Reborn** still requires it.
Better Village stays out.

Current rules live in `pack/datapacks/bigglobe_ctov_compat.zip`:

- `bigglobe:villages` is an empty structure set. Placement (salt / spacing / separation) is kept as
  an override so Big Globe's built-in 5-village default does not come back.
- The 21 `small/*` variants are not in `bigglobe_ctov:villages` (the JSON files may still be in the
  zip; they are unused).
- Per-cell lottery weights: large-fortified **8**, medium-fortified **5**, large **3**, medium **2**.
- Fortified (walled) biome extras:
  - `plains_fortified` → + `warm_plains`, `warm_light_forest`, `warm_dense_forest`
  - `mesa_fortified` → + `hot_plains`, `#bigglobe:beach`
  - `taiga_fortified` → + `bigglobe:glacier`
- **Village buffers:** `bigglobe_ctov:pillager_outposts` still has a **6-chunk**
  `exclusion_zone` vs `bigglobe_ctov:villages` (0.7.0, in `bigglobe_ctov_compat.zip` via
  `bigGlobeAero/patch_ctov_compat.py`). **0.7.3** widened `stattinkerer:large_dungeon`'s
  exclusion vs villages **6 → 12 chunks** (~192 blocks) and added a `sky` exclusion vs
  `stattinkerer:large_dungeon` at **12 chunks** (air structures were spawning on/near
  large dungeons). **0.7.13** added `nest` vs `sky` at **12 chunks**. **0.7.14** added
  `common` vs villages at **8 chunks** (camps / huts / wells / mines no longer sit on
  villages). A set allows only one exclusion_zone, so the dungeon chain is still
  `sky → large_dungeon → villages` (no cycle; villages stay the priority). `common`
  and `nest` each spend their one exclusion on villages and sky respectively.
  Sky/dungeon/common/nest exclusions live in `bigglobe_whendungeonsarise.zip`.

`pack/config/bettervillage_1.properties` is leftover from Better Villages and is unused.

## Glacier ice (`bigglobe_less_glacier`, as of 0.6.7, still in 0.8.6)
`pack/datapacks/bigglobe_less_glacier.zip` retunes **both** the glacier *feature* (ice) and the
glacier *biome* decision tree so their footprints match. Aquamirae's Sea of Shivers is keyed
to `bigglobe:glacier`, so its cracked ice / arcs / spirals shrink with the biome.
**0.6.8–0.8.6 did not touch glaciers.**

History of this datapack:

- **0.6.1 (v1)** — new `glacier_field` noise (`2.0 × (glacier_field − 0.5)`). The noise
  loaded (no log error) but never cleared the `0.5` cutoff → **zero ice**.
- **0.6.2 (v2)** — dropped `glacier_field`; fill `1.4 × (glacier_crack_threshold − 0.25)`.
  Ice returned, but deep/cold cores fully filled and merged into a **continent-sized sheet**.
- **0.6.3** — capped fill at `0.75` so cells cannot fully merge. The mass broke into large
  floes, but it still covered the **whole cold ocean**.
- **0.6.4** — raised the coverage cutoff `0.25 → 0.60` so ice only formed over the
  **deep/cold core** (broken floes). Feature-only; biome / Aquamirae unchanged.
- **0.6.5** — reverted to v2 **solid-sheet** fill (`1.4 × (threshold − 0.25)`, no cap).
  Size was meant to come from the biome next, not a feature cap.
- **0.6.6** — **fewer + smaller**. Colder temperature bar `unmixLinear(-0.35, -0.6)`,
  and cutoff **C = 0.4** applied to *both* ice and biome so the footprints stay matched.
- **0.6.7 (current)** — same size and solid-sheet look as 0.6.6; temperature bar nudged
  colder `unmixLinear(-0.35, -0.6)` → **`unmixLinear(-0.4, -0.65)`** so a few fewer
  glacier oceans. Frequency only; C = 0.4 and the sheet are unchanged.

Current rules:

- **`glacier_crack_threshold.json`** — temperature bar
  `unmixLinear(-0.4, -0.65, temperature_at_sea_level)` (was `-0.35 / -0.6` in 0.6.6,
  `-0.25 / -0.5` before that), still min'd with the depth term. Glacier oceans only
  appear where it is colder → **rarer**.
- **`glaciers.json` dispatcher** — a Voronoi cell fills when
  `hard_distance <= 1.4 × (glacier_crack_threshold − 0.4)`. **No `0.75` cap**, so deep/cold
  cells merge into a **solid sheet**. Threshold ≤ 0.4 is open water.
- **`shallow_ocean_test_glacier.json`** — biome uses the same C = 0.4 formula
  (`hard_distance < 1.4 × (crack_threshold − 0.4)`). Ice and biome shrink together.
- Still gated to **cold, deep, non-river ocean**: `!in_river`, surface below sea level, and
  `glacier_crack_threshold > 0.0`.
- **`glacier_cell`** Voronoi `distance` stays **48** (from 0.5); `variation` stays **40**
  (from 0.6.1) so the sheet edge is de-gridded.
- There is **no `glacier_field.json`** anymore.

Tunable knobs (they compound — nudge gently):

- **Frequency:** the temp bar. Colder (`-0.4 / -0.65` vs 0.6.6 `-0.35 / -0.6`, vs
  original `-0.25 / -0.5`) → rarer glacier oceans.
- **Size:** cutoff **C** (currently `0.4`) in *both* `glaciers.json` and
  `shallow_ocean_test_glacier.json`. Higher C → smaller glaciers. Keep the two files in
  sync or ice and biome will diverge again.
- The `1.4` multiplier is still in the formula; C is the intended size dial.

Caveats:

- The biome file is a **decision-tree override**. If in-game the *biome* does not shrink
  (only the ice does), that file needs to move into the patched Big Globe jar. The temp
  bar and ice size still apply via datapack regardless.
- Only **newly generated** cold-ocean chunks pick it up. No jar or world reset. Explore
  fresh ocean (or delete those chunks) to see the new pattern.
  - 0.6.1 chunks that generated with no ice stay empty until regenerated.
  - 0.6.2 / 0.6.5 chunks keep continent-sized solid sheets until regenerated.
  - 0.6.3 chunks keep whole-ocean broken floes until regenerated.
  - 0.6.4 chunks keep deep-core-only broken floes until regenerated.
  - 0.6.6 chunks keep the slightly warmer-bar (more frequent) glaciers until regenerated.

## Client-only / server-only mods (packwiz `side`, as of 0.5.2–0.8.6)
These mods are `side = "client"` so a dedicated-server install skips them. Player (PrismLauncher)
installs still get them:

- ImmediatelyFast
- Iris Shaders
- Iris & Oculus Flywheel Compat
- Iris/Oculus For Simple Clouds
- Mod Menu
- Particle Rain
- Sodium
- Numismatics Calculator

**JEI is `side = "both"`.** 0.5.2 briefly marked it client-only; **0.5.3** restored it so
dedicated servers still install it. Do not lump JEI in with the rendering/QoL client-only list.

**Creating Space, Vertigo, In Control!, Corpse, Throwable Rope Connector, Sable, When
Dungeons Arise, Better Combat, Create: Linear Bearing, VS / Sable Hose Connectors, Create:
Numismatics (and Villager Currency / Numismatic Bounties / Tradeworks / Marketplace / Stock
Market / Utils), Create Aeronautics: Delivery Required, Create: Villager Commerce,
FTB Quests / FTB Library / FTB Teams, LDLib2, owo-lib, Ponder for KubeJS /
KubeJS / Rhino / Better Advanced Tooltips, and
the patched Big Globe jar are `side = "both"`.** Dedicated servers and clients both
install them. **C2ME is not in the
pack** (removed 0.6.10). **Drive-By-Wire With Sable is not in the pack** (briefly indexed
in 0.6.11, then removed). **Numismatic Overhaul and the old Numismatic Bounties
are not in the pack** (removed 0.7.17). **owo-lib was removed in 0.7.17 and restored
in 0.8.4.** **PonderJS is in** (0.8.5; required by Delivery Required).

**Too Fast is `side = "server"`** (unversioned add after 0.5.5). Dedicated-server packwiz syncs
install it; the default PrismLauncher pre-launch command (`--side client`) skips it. Singleplayer
only gets the rubber-band fix if the jar is actually in the instance.

**MapStitch was removed in 0.5.5** (it had been `side = "both"` as of 0.5.4). Leftover
`pack/config/mapstitch.json` and `pack/config/mapstitch_state` are unused. Xaero's Minimap
and World Map stay.

`side` is independent of `[option]` (optional vs required). Distant Horizons and Simple Clouds are
still `side = "both"` even though they are client-oriented.


## Corpse + Throwable Rope Connector (as of 0.6.11)
**Corpse** `1.1.13` (henkelmax, CurseForge 316582 / file 7018307, `pack/mods/corpse.pw.toml`)
spawns a lootable model of your body on death (right-click to recover items; death-history
list + optional waypoint). `side = "both"`. Standalone; optional deps are Jade (already in
the pack) and OpenHUD (not in the pack).

**Create Aeronautics: Throwable Rope Connector** `0.4.3` (CurseForge 1529882 / file 8618590,
`pack/mods/create-aeronautics-throwable-rope-connector.pw.toml`) is a Create Aeronautics
add-on. `side = "both"`. Required deps already in the pack: Create `6.0.10` and
`aeronautics_bundled` `1.3.1`.

**Drive-By-Wire With Sable is not in the pack.** It was briefly indexed/committed during
0.6.11 (`drivebywire-0.3.0.jar`, CurseForge 1520378 / file 8247104) then removed:
`drivebywire` is only an optional Aeroworks dep; Aeroworks and the Throwable Rope Connector
both run without it. **Sable stays** (`pack/mods/sable.pw.toml`, `2.0.5`) — Aeroworks
requires it. Do not drop Sable when pruning optional aeronautics extras.

## Better Combat (as of 0.7.16)
**Better Combat** NeoForge `2.4.0+1.21.1` (ZsoltMolnarrr / "by Daedelus", Modrinth
`5sy6g3kz` / version `VhIOvcXP`, `pack/mods/better-combat.pw.toml`) is a player-side
melee overhaul: attack animations, weapon-arc collision hits, combos, dual-wielding.
`side = "both"` (hit detection is server-synced). It does **not** modify mob or villager
AI, so MCA Reborn villager behavior and per-entity tick cost are unchanged.

Required libraries were **already in the pack** — no new deps:
- **playerAnimator** `2.0.4` (`pack/mods/playeranimator.pw.toml`, Modrinth `gedNE4y2` /
  `HJZB6bmA`)
- **Cloth Config** `15.0.140` (`pack/mods/cloth-config.pw.toml`, Modrinth `9s6osm5g` /
  `izKINKFg`)

**0.7.16** re-pointed those two from CurseForge to Modrinth at the **same versions**
(identical jars; installer-friendly source). Do not `packwiz curseforge add` them back
over the Modrinth metafiles.

Gameplay: arc-hits can strike several entities at once. Near a CTOV / MCA village that
can anger multiple villagers with one swing (reputation). Tunable in Better Combat's
settings. No committed `pack/config` for it — first launch writes defaults.

No worldgen change. **No fresh world.** Relaunch so packwiz adds the jar.

## Create: Linear Bearing + VS / Sable Hose Connectors (unversioned after 0.7.16; Bearing as of 0.8.2)
These two mods landed in author commit `00a0f01` while `pack.toml` still said
**0.7.16**, in the same commit as **`MODLIST.md`**. Current `pack.toml` is **0.8.6**.
Both are `side = "both"`. No worldgen. **No fresh world.**
Relaunch so packwiz adds the jars.

**Create: Linear Bearing** is now **Modrinth** `1.3.5` (`linear-bearing`,
`pack/mods/linear-bearing.pw.toml`, project `ZTwCjE7O` / version `8SJdnoXS`).
**0.8.2** re-pointed it CurseForge → Modrinth because CF had
`allowModDistribution:false` (packwiz-installer could not download it). Original
add was CurseForge `1.2.6` (project 1556708 / file 8181069,
`create-linear-bearing.pw.toml` — that metafile is gone). Turns a glued Create
structure into a Sable physics slider (Linear Casing as the track, Linear Bearing
as the moving joint — cranes, elevators, sliding parts on airships). Required
deps already in the pack: Create, Create Aeronautics (`aeronautics_bundled` 1.3.1),
Sable `2.0.5`. Do not drop Sable. Do not `packwiz curseforge add` it back over
the Modrinth metafile.

**VS / Sable Hose Connectors** `0.1.8-1.21.1` (CurseForge 1426984 / file 8333129,
`pack/mods/vs-hose-connectors.pw.toml`) links Sable physics ships/sublevels with connectors
that transfer fluids, items, rotational power, and energy (manual Create-wrench link or
auto-magnetic). Requires Create; talks to **Sable** already in the pack. Valkyrien Skies is
**not** in the pack — do not add VS for this mod. No committed `pack/config` for either
mod — first launch writes defaults.

**`MODLIST.md`** is a human-readable grouped list of all **145** mods (as of 0.8.6;
129 when first added, 135 as of 0.7.18, 136 after Villager Commerce, 141 as of 0.8.4).
Dependency nestings there are best-effort. packwiz `pack/mods/*.pw.toml` remains the
source of truth. Update `MODLIST.md` when adding or removing mods.

## Create: Numismatics economy (as of 0.7.17 / 0.7.18)
**0.7.17** (same author commit as 0.7.18, `5b385da`; `pack.toml` jumped **0.7.16 → 0.7.18**)
replaced the old coin/purse stack:

- **Removed:** Numismatic Overhaul: Neoforged, Numismatic Bounties, and **owo-lib** (Overhaul's
  only remaining reason to ship owo-lib). packwiz deletes the jars on next launch. Dropped
  shipped `pack/config/numismaticoverhaul-*`; leftover runtime copies on a player's machine
  are inert orphans.
- **Added:** **Create: Numismatics** `1.0.20` (Modrinth `Jdbbtt0i` / `guON3qvQ`,
  `pack/mods/create-numismatics.pw.toml`, `side = "both"`) — Create-styled coins, bank cards,
  and vendors.
- **Added:** **Create Aeronautics: Delivery Required** `1.0.2` (Modrinth `hSTW3jx7` /
  `NOeDEseI`, `pack/mods/create-aeronautics-delivery-required.pw.toml`, `side = "both"`) —
  contract-based delivery logistics for Aeronautics contraptions; payouts use Numismatics
  currency.

**0.7.18** adds the rest of the ecosystem (all Modrinth, `side = "both"` unless noted):

- **Create Numismatics: Villager Currency** `1.2.0` (`KrXYrtG9` / `AcNxwhOd`) — in-person
  villager trades convert emerald costs to Numismatics bevels (vanilla and modded villagers).
- **Create: Numismatic Bounties** `2.0` (`gNGxmzHv` / `nTFR56FV`) — **Bountiful** (already in
  the pack) pays out Numismatics coins.
- **Create: Tradeworks** `1.0.7` (`gnOpd0sq` / `zdkVXpwz`) — physical barter stalls.
- **Create: Marketplace** `0.5.0` (`O7RTXyyq` / `PJAwbBur`) — server-wide shop directory
  (browse only; trade at the vendor block). Optional Xaero waypoint integration; Xaero's
  Minimap / World Map are already in the pack.
- **Create: Stock Market** `1.1.0` (`CnrVw3tZ` / `1kv0CE2W`) — Market Terminal (listings,
  24h price history, top sellers).
- **Create: Numismatics Utils** `2.2` (`8kRKVjUw` / `6c1vcLsi`) — Bank Meter HUD and account
  QoL.
- **Numismatics Calculator** `1.2.0` (`MI9E0Mar` / `C0z4oKQX`, **`side = "client"`**) — coin
  math helper. Dedicated-server packwiz skips it.

**Villager API stays** — **MCA Reborn** still requires it. Do not drop `villagerapi` because
Overhaul is gone. Do not re-add Numismatic Overhaul or the old Numismatic Bounties.
**owo-lib is back** as of 0.8.4 (it was not Overhaul-only). No worldgen.
**No fresh world.** Relaunch so packwiz swaps the jars. First launch writes
Numismatics configs.

## Create: Villager Commerce (added after 0.7.18; self-hosted as of 0.8.3)
**Create: Villager Commerce** `1.0.1` landed in author commit `5dce09f`
("Added Villager Commerce") while `pack.toml` stayed **0.7.18**. Current
`pack.toml` is **0.8.6**. `side = "both"`. No worldgen. **No fresh world.**

**0.8.2** found CF `allowModDistribution:false` and no Modrinth page (All-Rights-
Reserved). **0.8.3** self-hosts the jar at
`bundled-jars/createvillagercommerce-1.0.1.jar` (sha1 verified against CF); the
metafile (`pack/mods/create-villager-commerce.pw.toml`) points at the raw-GitHub
URL, sha256-pinned — the same pattern as the other bundled jars. Do not switch
it back to `metadata:curseforge` (clients cannot download it). Relaunch so
packwiz pulls the bundled jar.

Merchant Stalls (Create tablecloth + emerald) link to a Create stock network so
**villagers automatically buy from player shops**. Markets are managed with
**Market Ledgers** (vanilla lectern + a book named exactly `Market Ledger`): daily
purchase limits, preset trades, villager registration. Purchases are **simulated** —
the sold item leaves stock and payment is inserted; villagers do not keep the goods.

**Create: Numismatics** is already in the pack, so preset trades use coins. Without
Numismatics the mod falls back to iron ingots (same value scale). Required dep
already present: **Create**. Do not drop Numismatics if you want coin payouts at
stalls.

This is the player-shop / villager-customer side of town commerce.
**Villager Currency** is the opposite direction (players buy from villagers for
coins). Both stay. **Villager API** stays for MCA Reborn.

SIG home: Commerce & Markets (see [SPECTRUM.md](SPECTRUM.md)). Update
[`MODLIST.md`](MODLIST.md) (count is **145** as of 0.8.6).

## SPECTRUM — SIG / FTB Quests design (unversioned after 0.7.18; quests as of 0.7.19+)
**[`SPECTRUM.md`](SPECTRUM.md)** (author commit `41ec107`, "Spectrum.md") is the living
framework for designing **FTB Quests** around player specialization. The locked
15-line roadmap is **[`QUESTS.md`](QUESTS.md)** (0.8.0).

A **Special Interest Group (SIG)** is a career with a **baseline → specialized** curve
(anyone can do the simple version; investment in tools / industry / knowledge improves
yield, safety, or scale). Fifteen SIGs are catalogued (Metalworking, Agriculture, Textiles,
Power, Land Transport, Aeronautics, Naval, Logistics, Commerce, Ordnance, Medicine,
Settlement, optional Enchanting / Astronautics, soft Civil Works). World / fauna / QoL /
libraries are **non-SIG layers** (questable as flavor, not careers). **Create** itself is
shared industrial substrate, not a SIG.

**FTB Quests is in the pack** (0.7.19+). **Create Core** has shipped (0.8.0).
Keep SIG IDs stable and update `SPECTRUM.md` / `QUESTS.md` in the same commit as
quest `.snbt` changes.

Design rules that belong here (living), not only in CHANGELOG:

- Prefer **physical logistics** over remote / magic shortcuts. Bank cards OK; fulfillment
  must travel. Marketplace / Stock Market are **directories** (travel still required).
- Currency is **earned** (villagers, bounties, deliveries, player trade) — not
  player-minted. Do not quest "craft coins from ore" / CoinCraft.
- Reward **capability and efficiency**, not exclusive access that deletes the baseline.
- When adding a mod: does it create a baseline → specialized curve? Which SIG owns it?
  If none, is it world / fauna / QoL instead? Update `SPECTRUM.md` and `MODLIST.md`
  together.

See also: [MODLIST.md](MODLIST.md), [CHANGELOG.md](CHANGELOG.md), [QUESTS.md](QUESTS.md).

## FTB Quests (as of 0.7.19 / 0.8.0 / 0.8.1)
**FTB Quests** `2101.1.34`, **FTB Library** `2101.1.35`, and **FTB Teams** `2101.1.11`
(NeoForge 1.21.1, CurseForge — official FTB mods are not on Modrinth) landed in
**0.7.19**. All `side = "both"`. Architectury was already present. Guidance-only:
no line is gated behind another.

**0.8.0** ships the first chapter **Create Core**
(`pack/config/ftbquests/quests/chapters/create_core.snbt`) — 15 guidance quests
(Andesite Alloy → kinetics → casings / machines → brass → Precision Mechanism →
Mechanical Mastery). Item-detection tasks (no consume), soft dependency ordering,
XP + small item rewards. The 15-line roadmap is **[QUESTS.md](QUESTS.md)**.
Generated by `bigGlobeAero/build_ftbquests.py`; the committed `.snbt` is the
**source of truth** — regenerate from the script rather than overwriting via
in-game edit mode.

**0.8.1** derives all FTB Quests IDs (chapter / quest / task / reward) from
**stable keys** via SHA-1 instead of random hex. Regenerating a chapter yields
identical IDs, so re-runs are **progress-safe**. Create Core's IDs were
regenerated **once** to those stable values — anyone who completed Create Core
on **0.8.0** (random IDs) will see those quests as new after 0.8.1. Later
regens do not reset progress.

No worldgen. **No fresh world.** Relaunch so packwiz adds the FTB jars and
quest files.

## LDLib2 + owo-lib restore (as of 0.8.4)
**LDLib2** `2.2.37` (CurseForge project 626676 / file 8724783,
`pack/mods/ldlib.pw.toml`, `side = "both"`) — KilaBash rendering/GUI library.
The CF project is named "LDLib"; the jar is `ldlib2-neoforge-1.21.1-2.2.37-all.jar`.

**oωo (owo-lib)** `0.12.15.5-beta.1+1.21` (CurseForge project 532610 / file 6785734,
`pack/mods/owo-lib.pw.toml`, `side = "both"`) was **removed in 0.7.17** as an
assumed Numismatic-Overhaul-only dep and **restored in 0.8.4** because other
mods still require it. Do not drop it again with the old Overhaul reasoning.

**0.8.4** could not add **PonderJS** (the old `ponderjs` slug had no 1.21.1
build). **0.8.5** found it under slug **`ponder`** — see the next section.

No worldgen. **No fresh world.** Relaunch so packwiz adds the two library jars.

## PonderJS + KubeJS chain (as of 0.8.5)
**Create Aeronautics: Delivery Required** declares `ponderjs` as a **required**
dependency (`[1.21.1-2.4.0,)`), so the pack crashed on load without it. The
1.21.1 line ships as **Ponder for KubeJS** under CurseForge slug **`ponder`**
(project 622888 / file 7436813); the modId is still `ponderjs`. The old
`ponderjs` slug has no 1.21.1 build — that is why 0.8.4 missed it.

Added (all CurseForge, `side = "both"`):

- **Ponder for KubeJS** `ponderjs-neoforge-1.21.1-2.4.0` (`pack/mods/ponder.pw.toml`)
- **KubeJS** `2101.7.2` (project 238086 / file 8715199, `pack/mods/kubejs.pw.toml`)
- **Rhino** `2101.2.8` (project 416294 / file 8463898, `pack/mods/rhino.pw.toml`) — JS engine
- **Better Advanced Tooltips** `2101.1.0` (project 1637623 / file 8576077,
  `pack/mods/better-advanced-tooltips.pw.toml`)

Do not `packwiz curseforge add ponderjs` (wrong slug). Do not drop this chain
or Delivery Required will crash again. These are **libraries** — not a SIG /
quest line. Optional: point players at in-world Ponder scenes. Do not make
KubeJS scripting a career.

No worldgen. **No fresh world.** Relaunch so packwiz adds the four jars.
[`MODLIST.md`](MODLIST.md) count is **145**.

## pack.toml index hash (as of 0.8.6)
**0.8.5** committed a stale `[index]` hash in `pack.toml`. The PonderJS commit
updated `index.toml` but not the hash field, so packwiz reported **"index hash
file invalid"**. **0.8.6** re-refreshes so `pack.toml`'s sha256 matches
`index.toml` (`d902d2d2…`). Version string is **0.8.6**. No mods, configs, or
worldgen change. **No fresh world.** Relaunch.

This is not the 0.5.4 line-ending rewrite. The index file was already correct;
only the hash *recorded in* `pack.toml` was stale. Always `packwiz refresh`
after editing anything under `pack/` **and commit `pack.toml`** — refresh
writes both `index.toml` and that hash field.

## Too Fast (as of unversioned add after 0.5.5)
**Too Fast** `0.4.3.5` (Modrinth `w6JSkKSH`) raises the server-side player movement speed
limit so high-speed travel (Create aeronautics, etc.) does not trip vanilla
`moved too quickly` kicks / rubber-banding. Server-side only; no client assets.

Conflicts with Random Patches (not in this pack). Do not also install Random Patches.

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

## Known / open — invalid empty item on load (as of 0.5.6)
`ItemStack: Tried to load invalid item: 'No key id in MapLike[{}]'` (observed near 51, 228, -4860)
is a malformed empty item during load. Non-fatal (vanilla drops it and continues). Source not yet
identified.
