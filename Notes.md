# Brave New Globe — Notes

Miscellaneous maintainer/config notes for the pack.

## Packwiz hashes and line endings (as of 0.5.4)
packwiz pins a sha256 of every file under `pack/` in `pack/index.toml`. If Git rewrites
line endings (CRLF ↔ LF) on checkout, those bytes change and **every player's launch fails
the hash check** even though the pack content is the same.

The repo has `.gitattributes` with `* -text` so Git **does not** convert end-of-line. Do not
delete that file, and do not turn on `core.autocrlf` / `core.eol` conversion for this clone.
After real edits under `pack/`, still run `packwiz refresh` before committing.

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

## Glacier ice (`bigglobe_less_glacier`, as of 0.5)
`pack/datapacks/bigglobe_less_glacier.zip` retunes the glacier *feature* only:

- `!in_river` guard so rivers do not get glacier ice (the glacier biome already excludes rivers).
- Feature-only `0.4×` fill scale inside the dispatcher; glacier *biome* extent is unchanged.
- `glacier_cell` Voronoi `distance` 32 → **48** (fewer, more spaced patches).
- Aquamirae's Sea of Shivers and `glacier_crack_threshold` are not overridden.

## Client-only mods (packwiz `side`, as of 0.5.2–0.5.4)
These mods are `side = "client"` so a dedicated-server install skips them. Player (PrismLauncher)
installs still get them:

- ImmediatelyFast
- Iris Shaders
- Iris & Oculus Flywheel Compat
- Iris/Oculus For Simple Clouds
- Mod Menu
- Particle Rain
- Sodium

**JEI and MapStitch are `side = "both"`.** 0.5.2 briefly marked both client-only; **0.5.3**
restored JEI and **0.5.4** restored MapStitch so dedicated servers still install them.

`side` is independent of `[option]` (optional vs required). Distant Horizons and Simple Clouds are
still `side = "both"` even though they are client-oriented.

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
