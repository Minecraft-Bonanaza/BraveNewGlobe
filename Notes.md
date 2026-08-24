# Brave New Globe — Notes

Miscellaneous maintainer/config notes for the pack.

## Packwiz hashes and line endings (as of 0.5.4)
packwiz pins a sha256 of every file under `pack/` in `pack/index.toml`. If Git rewrites
line endings (CRLF ↔ LF) on checkout, those bytes change and **every player's launch fails
the hash check** even though the pack content is the same.

The repo has `.gitattributes` with `* -text` so Git **does not** convert end-of-line. Do not
delete that file, and do not turn on `core.autocrlf` / `core.eol` conversion for this clone.
After real edits under `pack/`, still run `packwiz refresh` before committing.

## Overworld depth — height-patched Big Globe (as of 0.6, still in 0.6.11)
Current pack version is **0.6.11** (`pack.toml` matches). The version field lagged at
`0.6.7` through 0.6.8–0.6.10, was bumped to `0.6.10` in a metadata-only commit, then to
`0.6.11` with Corpse. Overworld bounds
are **floor −608**, **ceiling +896**, sea level 0. That height lives inside a patched Big
Globe 5.3.2 jar (`bundled-jars/bigglobe-5.3.2-mc1.21.1-shallow608.jar`,
`pack/mods/big-globe.pw.toml`).

**Fresh world required** when upgrading from any pack version before **0.6**. Old saves used
either default −1024…+1024 or the brief 0.6-beta datapack compact (−464…+896). Verify F3 min Y
= **−608** and Distant Horizons LODs align with real terrain. **0.6.1–0.6.11 do not change
height** — players already on a 0.6 world can keep it.

Why a jar, not a datapack: Big Globe's `reload_dimension` reads the world-preset generator
(including `height`) from **its own jar every load** and ignores datapack / `level.dat`
overrides. DH anchors LODs to that same `generator.height.min_y`. The 0.6-beta
`bigglobe_shallow_overworld.zip` therefore produced LODs offset by exactly 560 blocks
(−1024 vs −464). Do **not** re-add that datapack.

Current underground layout (from the 0.5.9 / 0.6 jar):

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
default −1024.

Re-patch on any Big Globe update (`build_patched_jar.py` in `bigGlobeAero` asserts all 14
edited strings). The metafile has **no `[update]` block** so `packwiz update` cannot revert
to the stock Modrinth jar. The jar is served from public `raw.githubusercontent.com` —
move it to a no-login host before making this repo private. CC BY-NC 4.0, personal-server use.

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

## Villages (CTOV only, as of 0.5 / 0.5.1)
**ChoiceTheorem's Overhauled Village** is the only village system. Vanilla / Big Globe villages are
disabled, and **Better Villages** was removed (it only reskinned vanilla jigsaw pools, which no
longer generate).

**Villager API** is still in the pack. 0.5 removed it as an assumed Better-Village-only dependency,
but **Numismatic Overhaul** also requires it (mod loading crashed without it). Restored in **0.5.1**.
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

`pack/config/bettervillage_1.properties` is leftover from Better Villages and is unused.

## Glacier ice (`bigglobe_less_glacier`, as of 0.6.7, still in 0.6.11)
`pack/datapacks/bigglobe_less_glacier.zip` retunes **both** the glacier *feature* (ice) and the
glacier *biome* decision tree so their footprints match. Aquamirae's Sea of Shivers is keyed
to `bigglobe:glacier`, so its cracked ice / arcs / spirals shrink with the biome.
**0.6.8–0.6.11 did not touch glaciers.**

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

## Client-only / server-only mods (packwiz `side`, as of 0.5.2–0.6.11)
These mods are `side = "client"` so a dedicated-server install skips them. Player (PrismLauncher)
installs still get them:

- ImmediatelyFast
- Iris Shaders
- Iris & Oculus Flywheel Compat
- Iris/Oculus For Simple Clouds
- Mod Menu
- Particle Rain
- Sodium

**JEI is `side = "both"`.** 0.5.2 briefly marked it client-only; **0.5.3** restored it so
dedicated servers still install it. Do not lump JEI in with the rendering/QoL client-only list.

**Creating Space, Vertigo, In Control!, Corpse, Throwable Rope Connector, Sable, and the
patched Big Globe jar are `side = "both"`.** Dedicated servers and clients both install
them. **C2ME is not in the pack** (removed 0.6.10). **Drive-By-Wire With Sable is not in
the pack** (briefly indexed in 0.6.11, then removed).

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
