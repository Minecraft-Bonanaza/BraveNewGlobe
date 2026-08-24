# Brave New Globe — Maintainer Instructions

How the pack is built and how to make changes. If you just want to *play*, see
[ClientInstallationInstructions.md](ClientInstallationInstructions.md) instead.

The pack is defined by [packwiz](https://packwiz.infra.link/) metadata in [`pack/`](pack/), **not** by
committed jars (except the pinned files in `bundled-jars/`):

- `pack/pack.toml` — manifest (MC + loader versions, index hash)
- `pack/index.toml` — file index (auto-managed; do not hand-edit)
- `pack/mods/*.pw.toml` — one tiny metadata file per mod (download source + hash)
- `bundled-jars/` — jars with no usable Modrinth/CurseForge distribution (or the height-patched
  Big Globe jar). packwiz downloads them by raw-GitHub URL, sha256-pinned.
- `pack/config/**` — real config files shipped as-is
- `pack/datapacks/**` — zip datapacks shipped as-is (Big Globe compat, recipe packs, etc.). packwiz
  installs them into the instance `datapacks/` folder. **Paxi** is set to force-load that folder
  (`Load from base 'datapacks' directory = true` in `pack/config/paxi-neoforge-1_21.toml`). Do **not**
  put them under `config/paxi/datapacks/`.

Village, glacier, overworld-depth, and chunk-performance behavior for the current pack is
documented in [Notes.md](Notes.md). After editing a zip under `pack/datapacks/`, run
`packwiz refresh` before committing.

Current pack version in `pack.toml` is **0.6.1**. **Fresh world required** for players upgrading
from any version before **0.6**. 0.6.1 is datapack-only (ocean glaciers) and does not need a
new world if they are already on 0.6.

## Height-patched Big Globe (as of 0.6, still in 0.6.1)
**Big Globe** is **not** the stock Modrinth jar. `pack/mods/big-globe.pw.toml` points at
`bundled-jars/bigglobe-5.3.2-mc1.21.1-shallow608.jar` (raw-GitHub, sha256-pinned, **no
`[update]` block**). The height, deep-tier layout, and rescaled ore curves live **inside**
that jar because BG's `reload_dimension` reads the generator from its own jar every load —
datapacks and companion mods cannot change it. That is why the old
`bigglobe_shallow_overworld.zip` produced the Distant Horizons offset.

- Do **not** run `packwiz update` on Big Globe (there is no `[update]` block on purpose; adding
  one would revert players to the unpatched Modrinth jar).
- Do **not** re-add `bigglobe_shallow_overworld.zip`.
- On any Big Globe version bump, re-run `build_patched_jar.py` (lives in the `bigGlobeAero`
  tooling, not this repo). The script asserts all 14 edited strings still exist. Then replace
  the jar in `bundled-jars/`, update filename / URL / sha256 in `big-globe.pw.toml`, and
  `packwiz refresh`.
- **Repo-privacy:** packwiz clients download the jar anonymously from
  `raw.githubusercontent.com`. Making this repo private breaks that. Move the jar to a
  no-login host before the repo goes private.
- Big Globe by builderb0y (CC BY-NC 4.0); this jar is modified for personal-server use.

**Ocean glaciers** (`pack/datapacks/bigglobe_less_glacier.zip`, as of **0.6.1**) are
experimental / unverified Big Globe script. On first load after a glacier edit, watch the
log for column-value / script errors and revert the datapack if `glacier_field` does not
resolve. Living knobs (coverage cutoff, field scales, fill multiplier, Voronoi variation)
are in [Notes.md](Notes.md). Only new cold-ocean chunks pick up glacier changes.

**C2ME** (`pack/mods/c2me.pw.toml`) is native NeoForge from Modrinth (`COlSi5iR`,
`0.4.0-alpha.0.120+1.21.1`). Keep `side = "both"`. It is alpha. Runtime config is
`config/c2me.toml` (not shipped). If lighting glitches with Vertigo, disable
`threading-lighting` there first.

**Vertigo** (`pack/mods/vertigo.pw.toml`) is Fabric via Sinytra Connector + FFAPI
(Modrinth `4LzgJp1j`, `1.2.4`). Keep `side = "both"`. It is in the pack **without**
`bigglobe_shallow_overworld.zip`. The 0.6-beta DH offset was that datapack, not Vertigo.

**Creating Space** (`pack/mods/creating-space.pw.toml`) is Modrinth-only (`8VQksBiY`,
`1.7.18`). Keep `side = "both"`. It ships its own planet dimensions — do not add a Big Globe
compat datapack for it unless worldgen actually overlaps.

**Project Atmosphere** biome temps live in `pack/config/projectatmosphere/biome_temps.json`.
If you add a Big Globe biome, add a matching Celsius range or PA will spam the log every tick.

**`ctov_integration_fallbacks.zip`** is empty stubs for Waystones / Vampirism / bounty village
pools. **Delete it** before adding any of those mods, or the empty pools shadow theirs.

Do not drop **Villager API** (`villagerapi`) when pruning village-reskin mods: **Numismatic Overhaul**
still depends on it (0.5.1 hotfix). Better Village itself stays out.

The other `bundled-jars/` entries (Create: Better High Seas, Food Spoilage, Realistic Farmland,
Sea Myths) are still the 0.4 CurseForge-distribution workaround.

## Common operations (run from `pack/`)
```bash
# add / update a mod
packwiz modrinth add <slug-or-url>                              # from Modrinth
packwiz curseforge add "<name>"                                 # from CurseForge
packwiz url add <name> <direct-download-url>                    # from any direct URL

# after dropping local files (datapacks / config) into the tree
packwiz refresh          # re-index — ALWAYS run before committing

# publish
git add -A && git commit -m "update: ..." && git push
```

> ⚠️ Always `packwiz refresh` before committing, or `index.toml` won't match the tree and every player's
> launch will fail the hash check.

## Line endings (required for hash stability)
This repo's `.gitattributes` is `* -text`: Git must **not** convert CRLF/LF. packwiz hashes the
raw bytes of every file under `pack/`. If Git or an editor rewrites line endings, hashes break
even when the text looks the same (this is what the 0.5.4 hash-fix commit addressed).

- Do **not** delete `.gitattributes`.
- Do **not** enable `core.autocrlf` / `core.eol` conversion on this clone.
- After any real change under `pack/`, run `packwiz refresh` so `index.toml` matches the bytes
  you are about to commit.

## Optional / client-side mods
Mods can be marked optional with an `[option]` block in their `pack/mods/*.pw.toml` file:

```toml
[option]
optional = true
default = false
description = "Shown to players in the packwiz installer selection screen."
```

The rendering trio — **Iris Shaders**, **Iris & Oculus Flywheel Compat**, and **Distant Horizons** —
must be toggled together (all ON or all OFF). See the comments in those `.pw.toml` files and
[Notes.md](Notes.md) for why.

### packwiz `side` (as of 0.5.2–0.6.1)
`side` in each `*.pw.toml` controls whether packwiz downloads the mod on a given install:

- `side = "both"` — clients and dedicated servers install it (the default for most of the pack).
- `side = "client"` — **skipped on dedicated servers**; still installed for PrismLauncher / client
  instances.
- `side = "server"` — **skipped on the default client install**; still installed for dedicated-server
  syncs (`--side server`).

Current `side = "client"` mods: **ImmediatelyFast**, **Iris Shaders**, **Iris & Oculus Flywheel
Compat**, **Iris/Oculus For Simple Clouds**, **Mod Menu**, **Particle Rain**, **Sodium**.

**JEI must stay `side = "both"`.** 0.5.2 briefly marked it client-only; **0.5.3** reverted that
so dedicated servers still get it. Do not lump JEI in with the rendering/QoL client-only list.

**Creating Space, C2ME, Vertigo, and the patched Big Globe jar are `side = "both"`.** Do not mark
them client-only.

**Too Fast is `side = "server"`.** Do not change it to `client`. If singleplayer also
needs the rubber-band fix, use `--side both` on that instance or change the `.pw.toml` to
`side = "both"` and `packwiz refresh`.

**MapStitch is not in the pack** (removed in 0.5.5). Do not re-add its leftover
`pack/config/mapstitch.json` / `mapstitch_state` as if they were a live mod.
