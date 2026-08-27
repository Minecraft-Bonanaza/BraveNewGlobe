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
- [`MODLIST.md`](MODLIST.md) — human-readable grouped list of every mod (currently **135**).
  Update it when adding or removing mods; packwiz metafiles remain the source of truth.
- [`SPECTRUM.md`](SPECTRUM.md) — Special Interest Group (SIG) framework for a future
  **FTB Quests** book. **FTB Quests is not in the pack.** Update this file when a mod
  creates, joins, or is excluded from a career path.

Village, glacier, overworld-depth, WDA, spawn-clamp, and chunk-performance behavior for the
current pack is documented in [Notes.md](Notes.md). SIG / quest-design rules live in
[SPECTRUM.md](SPECTRUM.md). After editing a zip under `pack/datapacks/`,
run `packwiz refresh` before committing.

Current pack version is **0.7.18** (`pack.toml` matches). An **unversioned** add after
0.7.18 is **SPECTRUM.md** (docs only; no jar / worldgen). **0.7.17** / **0.7.18** (same
author commit `5b385da`) swap the coin economy to **Create: Numismatics** plus Delivery
Required and the shop/stock-market stack (no jar rebuild, no worldgen; relaunch). An
**unversioned** add after 0.7.16 still includes **Create: Linear Bearing** `1.2.6`,
**VS / Sable Hose Connectors** `0.1.8`, and **MODLIST.md**. **0.7.16** adds **Better Combat**
(no jar rebuild, no worldgen; relaunch). **0.7.2–0.7.15** are datapack-only
WDA placement retunes (no jar rebuild; relaunch). **Fresh world required** for players
upgrading from **0.6.x** (ceiling +896 → +1024; or regenerate the top + clear DH) and
from any version before **0.6** (floor −608). **No fresh world** for 0.7.1→0.7.18.

## Height-patched Big Globe (as of 0.7.0)
**Big Globe** is **not** the stock Modrinth jar. `pack/mods/big-globe.pw.toml` points at
`bundled-jars/bigglobe-5.3.2-mc1.21.1-shallow608.jar` (raw-GitHub, sha256-pinned, **no
`[update]` block**). The height, deep-tier layout, and rescaled ore curves live **inside**
that jar because BG's `reload_dimension` reads the generator from its own jar every load —
datapacks and companion mods cannot change it. That is why the old
`bigglobe_shallow_overworld.zip` produced the Distant Horizons offset.

**0.7.0 rebuilt the jar** so the ceiling is **+1024** (stock) while the floor stays **−608**.
Filename still says `shallow608` because "608" is the floor. Current sha256 starts
`df683d31…`. Underground layers + ore curves are unchanged from 0.6. DH tracks the new
bounds (`min_y` −608, LODs up to +1024). `cloud_height` is already 1024.

- Do **not** run `packwiz update` on Big Globe (there is no `[update]` block on purpose; adding
  one would revert players to the unpatched Modrinth jar).
- Do **not** re-add `bigglobe_shallow_overworld.zip`.
- Do **not** drop the ceiling back to +896 — aerial WDA / airship content needs the stock sky.
- On any Big Globe version bump, re-run `build_patched_jar.py` (lives in the `bigGlobeAero`
  tooling, not this repo). The script asserts all 14 edited strings still exist. Then replace
  the jar in `bundled-jars/`, update filename / URL / sha256 in `big-globe.pw.toml`, and
  `packwiz refresh`. Keep ceiling **+1024** and floor **−608**.
- **Repo-privacy:** packwiz clients download the jar anonymously from
  `raw.githubusercontent.com`. Making this repo private breaks that. Move the jar to a
  no-login host before the repo goes private.
- Big Globe by builderb0y (CC BY-NC 4.0); this jar is modified for personal-server use.

## When Dungeons Arise (as of 0.7.15, still in 0.7.18)
**When Dungeons Arise** (`pack/mods/when-dungeons-arise.pw.toml`) is Modrinth `8DfbfASn`
version `XIRJSFQ0` (`2.1.68`). Keep `side = "both"`. Only NeoForge + Minecraft deps.

Placement is **not** WDA's own sets. `pack/datapacks/bigglobe_whendungeonsarise.zip` is the
Modrinth BG compat pack `5obAEsYh` v1.1, **patched** via `bigGlobeAero/patch_wda_compat.py`:

- WDA `major`/`minor` structure sets are **emptied** (do not restore them — structures would
  double-place).
- 24 of 38 structures live in **five** `stattinkerer` sets: `:sky` (**5**, **32/28**),
  `:sea` (4, 48/42), `:common` (11, 32/28, **8-chunk** village exclusion),
  `:large_dungeon` (**3**, **280/250**), `:nest` (1, **96/80** + `frequency` **0.65**).
  14 are in no set (removed). Do **not** put `heavenly_challenger` back in
  `large_dungeon` (moved to sky in 0.7.2). Do **not** put `mechanical_nest` back in
  `large_dungeon` (own `:nest` set since 0.7.12). Do **not** restore nest `frequency`
  **0.0065** (0.7.13 typo; 0.7.15 is **0.65**).
- Aerial structures (sky + nest): fixed **Y 700–750**, no heightmap,
  **`terrain_adaptation: none`**. Do **not** re-apply `bury` at altitude (that encases
  them in stone).
- Aquatic ships stay at sea level.
- Current underground depths (all `#bigglobe:underground`, `bury`, in `common`):
  **scorched_mines −150**, **plague_asylum −300**, **foundry −540**. Do **not** drop
  foundry to −560 (floor clip vs −608) or −100. Keep it in core/molten (−592..−496).
- Giant towers: `keep_kayra` / `infested_temple` / `kisegi_sanctuary` start **0** +
  `WORLD_SURFACE_WG` + **`bury`**, gated to `#bigglobe:land`. `start 0` is the
  proven 0.7.0/0.7.1/0.7.7/0.7.9 anchor — a full 16-block margin above BG's `surface−16`
  cave threshold so `#land` still matches. **0.7.10** switched `beard_box` → **`bury`**
  to fill steep-terrain gaps. Do **not** sink them to −16 or deeper (0.7.2's −45/−25
  produced **zero spawns**). Do **not** restore infested/kisegi to −45/−25. Do **not**
  re-apply 0.7.8's −15 (1-block margin, fragile). Do **not** put `beard_box` back as
  current. Compat history is in CHANGELOG [0.7.0]–[0.7.18] (and the unversioned add after 0.7.16).
- **0.7.1:** do **not** restore `dungeons_arise:small_prairie_house` (orphaned structure
  def + biome tag). Its `start_pool` is gone in WDA 2.1.68; even out of every set, MC
  still loads the def and "Create New World" crashed on 0.7.0. After editing the zip,
  `packwiz refresh`.

Village / sky buffers: pillager outposts stay at a **6-chunk** `exclusion_zone` vs
`bigglobe_ctov:villages` (`bigglobe_ctov_compat.zip` via `patch_ctov_compat.py`).
**0.7.3:** `large_dungeon` vs villages is **12 chunks**; `sky` vs `large_dungeon` is
**12 chunks**. **0.7.13:** `nest` vs `sky` is **12 chunks**. **0.7.14:** `common` vs
villages is **8 chunks**. A set allows only one exclusion_zone; the dungeon chain is
`sky → large_dungeon → villages` (no cycle). Do **not** shrink the dungeon buffer
back to 6. Do **not** drop the common village buffer.

**Ocean glaciers** (`pack/datapacks/bigglobe_less_glacier.zip`, as of **0.6.7**, still in
**0.7.18**) are fewer and smaller solid sheets. Frequency: `glacier_crack_threshold` temp bar
`unmixLinear(-0.4, -0.65)` (nudged from 0.6.6's `-0.35/-0.6`; size/sheet unchanged).
Size: cutoff **C = 0.4** on *both* `glaciers.json` (ice,
`hard_distance <= 1.4 × (threshold − 0.4)`, no cap) and
`shallow_ocean_test_glacier.json` (biome). Keep those two files on the same C or ice and
biome diverge. Aquamirae follows the biome. Do **not** re-add `glacier_field.json` —
0.6.1's new noise loaded but never cleared the `0.5` cutoff, so ice fill was zero
everywhere. Do **not** restore the `0.75` cap or the 0.6.4 `0.60`-only feature cutoff as
current. If the *biome* does not shrink in-game, move `shallow_ocean_test_glacier.json`
into the patched jar (it is a decision-tree override). Details in [Notes.md](Notes.md).
Only new cold-ocean chunks pick up glacier changes.

**C2ME is not in the pack** (removed **0.6.10** after chunk-loading bugs from the C2ME ×
Vertigo mixin overlap). Do **not** re-add `pack/mods/c2me.pw.toml` unless that overlap is
resolved or Vertigo is also dropped. packwiz-installer deletes the jar on next player
launch; leftover `config/c2me.toml` is inert.

**Vertigo** (`pack/mods/vertigo.pw.toml`) is Fabric via Sinytra Connector + FFAPI
(Modrinth `4LzgJp1j`, `1.2.4`). Keep `side = "both"`. It is in the pack **without**
`bigglobe_shallow_overworld.zip`. The 0.6-beta DH offset was that datapack, not Vertigo.
If chunk-loading issues persist after dropping C2ME, Vertigo is the next suspect.

**In Control!** (`pack/mods/in-control.pw.toml`) is CurseForge NeoForge `10.2.7` (project
257356). Keep `side = "both"`. No McJtyLib dep in this build. Spawn clamp lives in
`pack/config/incontrol/spawn.json`: deny `seaeater:kraken` / `leviathan` / `sea_eater` at
Y ≥ −49 (deep-only, **Y ≤ −50**). Stattinkerer weights for those three are **2**
(`pack/datapacks/stattinkerer_bigglobe_compat.zip`, files `..._2_1_1`). Do not drop In
Control if you still want the Y clamp — Big Globe spawn JSON has no height field.

**Creating Space** (`pack/mods/creating-space.pw.toml`) is Modrinth-only (`8VQksBiY`,
`1.7.18`). Keep `side = "both"`. It ships its own planet dimensions — do not add a Big Globe
compat datapack for it unless worldgen actually overlaps.

**Corpse** (`pack/mods/corpse.pw.toml`) is CurseForge NeoForge `1.1.13` (project 316582).
Keep `side = "both"`. Optional Jade is already in the pack; OpenHUD is not required.

**Create Aeronautics: Throwable Rope Connector**
(`pack/mods/create-aeronautics-throwable-rope-connector.pw.toml`) is CurseForge `0.4.3`
(project 1529882). Keep `side = "both"`. Deps (Create 6.0.10, `aeronautics_bundled` 1.3.1)
are already in the pack.

**Drive-By-Wire With Sable is not in the pack** (removed in 0.6.11). Do **not** re-add
`pack/mods/drive-by-wire-with-sable.pw.toml` — `drivebywire` is only an optional Aeroworks
dep; Aeroworks and the Throwable Rope Connector both run without it. **Keep Sable**
(`pack/mods/sable.pw.toml`) — Aeroworks requires it.

**Better Combat** (`pack/mods/better-combat.pw.toml`) is Modrinth NeoForge `2.4.0+1.21.1`
(`5sy6g3kz` / `VhIOvcXP`). Keep `side = "both"`. Deps already in the pack: playerAnimator
`2.0.4` (`gedNE4y2` / `HJZB6bmA`) and Cloth Config `15.0.140` (`9s6osm5g` / `izKINKFg`).
**0.7.16** re-pointed those two from CurseForge to Modrinth at the same versions — do not
`packwiz curseforge add` them back. It does not modify mob/villager AI (MCA Reborn
unchanged). No committed Better Combat config.

**Create: Linear Bearing** (`pack/mods/create-linear-bearing.pw.toml`) is CurseForge `1.2.6`
(project 1556708 / file 8181069). Keep `side = "both"`. Deps already in the pack: Create,
Create Aeronautics (`aeronautics_bundled` 1.3.1), Sable `2.0.5`. Do not drop Sable.

**VS / Sable Hose Connectors** (`pack/mods/vs-hose-connectors.pw.toml`) is CurseForge
`0.1.8-1.21.1` (project 1426984 / file 8333129). Keep `side = "both"`. Requires Create;
talks to **Sable** already in the pack. Valkyrien Skies is **not** in the pack — do not
add VS for this mod. No committed config for either mod.

**Create: Numismatics** (`pack/mods/create-numismatics.pw.toml`) is Modrinth `1.0.20`
(`Jdbbtt0i` / `guON3qvQ`). Keep `side = "both"`. **0.7.17** added it and **removed
Numismatic Overhaul, the old Numismatic Bounties, and owo-lib** — do not re-add those three.
**Create Aeronautics: Delivery Required** (`pack/mods/create-aeronautics-delivery-required.pw.toml`)
is Modrinth `1.0.2` (`hSTW3jx7` / `NOeDEseI`). Keep `side = "both"`.

**0.7.18** Numismatics ecosystem (all Modrinth, keep `side = "both"` except Calculator):
Villager Currency `1.2.0` (`KrXYrtG9`), Create: Numismatic Bounties `2.0` (`gNGxmzHv`,
needs **Bountiful** already in pack), Tradeworks `1.0.7` (`gnOpd0sq`), Marketplace `0.5.0`
(`O7RTXyyq`), Stock Market `1.1.0` (`CnrVw3tZ`), Numismatics Utils `2.2` (`8kRKVjUw`),
**Numismatics Calculator** `1.2.0` (`MI9E0Mar`, **`side = "client"`**). Do not mark
Calculator `both` unless dedicated servers need it.

**`MODLIST.md`** lists all 135 mods grouped by purpose. Update it in the same commit as
`packwiz curseforge add` / removals so the count and groupings stay current. packwiz
metafiles remain the source of truth.

**`SPECTRUM.md`** is the SIG catalog for FTB Quests authors (unversioned after 0.7.18).
**FTB Quests is not in the pack** — do not add a questbook chapter list as if it shipped.
When adding a mod, ask: does it create a baseline → specialized curve? Which SIG owns it?
If none, is it world / fauna / QoL instead? Update `SPECTRUM.md` in the same commit.
Do not make **Create** itself a SIG. Do not quest player-minted coins or remote / mailbox
checkout (Commerce / Logistics stay in-person / physical freight).

**Project Atmosphere** biome temps live in `pack/config/projectatmosphere/biome_temps.json`.
If you add a Big Globe biome, add a matching Celsius range or PA will spam the log every tick.

**`ctov_integration_fallbacks.zip`** is empty stubs for Waystones / Vampirism / bounty village
pools. **Delete it** before adding any of those mods, or the empty pools shadow theirs.

Do not drop **Villager API** (`villagerapi`) when pruning village-reskin or economy mods:
**MCA Reborn** still depends on it. Numismatic Overhaul (the original 0.5.1 reason) was
removed in **0.7.17**. Better Village itself stays out.

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
>
> Also update [`MODLIST.md`](MODLIST.md) in the same commit when you add or remove a mod (count is
> currently **135**). If the mod joins or leaves a career path, update [`SPECTRUM.md`](SPECTRUM.md)
> too. packwiz metafiles remain the source of truth.

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

### packwiz `side` (as of 0.5.2–0.7.18)
`side` in each `*.pw.toml` controls whether packwiz downloads the mod on a given install:

- `side = "both"` — clients and dedicated servers install it (the default for most of the pack).
- `side = "client"` — **skipped on dedicated servers**; still installed for PrismLauncher / client
  instances.
- `side = "server"` — **skipped on the default client install**; still installed for dedicated-server
  syncs (`--side server`).

Current `side = "client"` mods: **ImmediatelyFast**, **Iris Shaders**, **Iris & Oculus Flywheel
Compat**, **Iris/Oculus For Simple Clouds**, **Mod Menu**, **Particle Rain**, **Sodium**,
**Numismatics Calculator**.

**JEI must stay `side = "both"`.** 0.5.2 briefly marked it client-only; **0.5.3** reverted that
so dedicated servers still get it. Do not lump JEI in with the rendering/QoL client-only list.

**Creating Space, Vertigo, In Control!, Corpse, Throwable Rope Connector, Sable, When
Dungeons Arise, Better Combat, Create: Linear Bearing, VS / Sable Hose Connectors, Create:
Numismatics (and Villager Currency / Numismatic Bounties / Tradeworks / Marketplace / Stock
Market / Utils), Create Aeronautics: Delivery Required, and the patched Big Globe jar are
`side = "both"`.** Do not mark them client-only. **C2ME is not in the pack** (removed 0.6.10).
**Drive-By-Wire With Sable is not in the pack.** **Numismatic Overhaul, the old Numismatic
Bounties, and owo-lib are not in the pack** (removed 0.7.17).

**Too Fast is `side = "server"`.** Do not change it to `client`. If singleplayer also
needs the rubber-band fix, use `--side both` on that instance or change the `.pw.toml` to
`side = "both"` and `packwiz refresh`.

**MapStitch is not in the pack** (removed in 0.5.5). Do not re-add its leftover
`pack/config/mapstitch.json` / `mapstitch_state` as if they were a live mod.
