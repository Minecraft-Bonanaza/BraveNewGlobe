# Brave New Globe — Notes

Miscellaneous maintainer/config notes for the pack.

## Packwiz hashes and line endings (as of 0.5.4)
packwiz pins a sha256 of every file under `pack/` in `pack/index.toml`. If Git rewrites
line endings (CRLF ↔ LF) on checkout, those bytes change and **every player's launch fails
the hash check** even though the pack content is the same.

The repo has `.gitattributes` with `* -text` so Git **does not** convert end-of-line. Do not
delete that file, and do not turn on `core.autocrlf` / `core.eol` conversion for this clone.
After real edits under `pack/`, still run `packwiz refresh` before committing.

## Chunk performance — C2ME + Vertigo (as of 0.5.7)
Two independently removable performance mods targeting Big Globe's tall overworld chunk-streaming
cost. Neither requires a fresh world. `pack.toml` version is **0.5.7**.

- **C2ME** `0.4.0-alpha.0.120+1.21.1` (Modrinth `COlSi5iR`, `pack/mods/c2me.pw.toml`) —
  native NeoForge, no extra deps, `side = "both"`. Parallel chunk gen/load + chunk I/O.
  **Alpha** (normal for C2ME on 1.21.1). Worldgen opts target vanilla `NoiseChunkGenerator`,
  which Big Globe's `bigglobe:scripted` generator bypasses — those modules are largely inert.
  Generic chunk-system rewrite still wraps BG; if worldgen races or hangs, disable
  worldgen-threading / chunk-system in `config/c2me.toml` (generated at runtime, not shipped).
- **Vertigo** `1.2.4` (Modrinth `4LzgJp1j`, `pack/mods/vertigo.pw.toml`) — Fabric via Sinytra
  Connector + FFAPI, `side = "both"`. Strips empty vertical sections from ChunkData packets.
  Re-added **without** `bigglobe_shallow_overworld.zip`. The 0.6-beta Distant Horizons
  "600-block" offset was that datapack's floor mismatch, not Vertigo.

Highest-risk overlap is **lighting**: Vertigo syncs skylight while C2ME `threading-lighting`
threads the server lighting provider. If lighting glitches, disable C2ME `threading-lighting`
first. Neither declares hard incompatibilities; C2ME only discourages `dynview` and
`betterchunkloading` (both absent). C2ME bundles MixinSquared.

Do **not** re-add the shallow-overworld datapack on main. That work stays parked on branch
`0.6-beta`.

## Overworld depth (as of 0.5.7)
Main uses **Big Globe default** overworld bounds (floor `-1024`, ceiling `+1024`, sea level 0).
The 0.6-beta shallow-overworld datapack is **not** in this pack. Vertigo *is* in the pack
(see above) without shrinking the world.

If a player created a world during the brief window when 0.6-beta was on main, that save used
the compacted height (`-464`…`+896`). Starting a new world is the safe option for those saves.
Pre-0.6-beta worlds and worlds created after the revert are fine.

## Creating Space (as of 0.6)
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

## Glacier ice (`bigglobe_less_glacier`, as of 0.5)
`pack/datapacks/bigglobe_less_glacier.zip` retunes the glacier *feature* only:

- `!in_river` guard so rivers do not get glacier ice (the glacier biome already excludes rivers).
- Feature-only `0.4×` fill scale inside the dispatcher; glacier *biome* extent is unchanged.
- `glacier_cell` Voronoi `distance` 32 → **48** (fewer, more spaced patches).
- Aquamirae's Sea of Shivers and `glacier_crack_threshold` are not overridden.

## Client-only / server-only mods (packwiz `side`, as of 0.5.2–0.5.7)
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

**Creating Space, C2ME, and Vertigo are `side = "both"`.** Dedicated servers and clients both
install them.

**Too Fast is `side = "server"`** (unversioned add after 0.5.5). Dedicated-server packwiz syncs
install it; the default PrismLauncher pre-launch command (`--side client`) skips it. Singleplayer
only gets the rubber-band fix if the jar is actually in the instance.

**MapStitch was removed in 0.5.5** (it had been `side = "both"` as of 0.5.4). Leftover
`pack/config/mapstitch.json` and `pack/config/mapstitch_state` are unused. Xaero's Minimap
and World Map stay.

`side` is independent of `[option]` (optional vs required). Distant Horizons and Simple Clouds are
still `side = "both"` even though they are client-oriented.

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
