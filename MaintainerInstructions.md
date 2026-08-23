# Brave New Globe — Maintainer Instructions

How the pack is built and how to make changes. If you just want to *play*, see
[ClientInstallationInstructions.md](ClientInstallationInstructions.md) instead.

The pack is defined by [packwiz](https://packwiz.infra.link/) metadata in [`pack/`](pack/), **not** by
committed jars:

- `pack/pack.toml` — manifest (MC + loader versions, index hash). Current pack version: **0.6-beta**.
- `pack/index.toml` — file index (auto-managed; do not hand-edit)
- `pack/mods/*.pw.toml` — one tiny metadata file per mod (download source + hash). **No jars in git.**
- `pack/config/**` — real config files shipped as-is
- `pack/datapacks/**` — zip datapacks shipped as-is (Big Globe compat, recipe packs, etc.). packwiz
  installs them into the instance `datapacks/` folder. **Paxi** is set to force-load that folder
  (`Load from base 'datapacks' directory = true` in `pack/config/paxi-neoforge-1_21.toml`). Do **not**
  put them under `config/paxi/datapacks/`.

Village, glacier, and **overworld height** behavior for the current pack is documented in
[Notes.md](Notes.md). After editing a zip under `pack/datapacks/`, run `packwiz refresh` before
committing.

**`bigglobe_shallow_overworld.zip` (0.6-beta) changes dimension bounds.** Players must create a
fresh world. Do not ship a further bounds change without calling that out in the changelog and
client install docs.

Do not drop **Villager API** (`villagerapi`) when pruning village-reskin mods: **Numismatic Overhaul**
still depends on it (0.5.1 hotfix). Better Village itself stays out.

**Vertigo** (`pack/mods/vertigo.pw.toml`) is a Fabric mod (`1.2.4`, Modrinth `4LzgJp1j`) that
runs through **Sinytra Connector + Forgified Fabric API**. Keep `side = "both"`. It still needs
beta testing that Connector applies its networking mixins cleanly alongside Distant Horizons.

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

### packwiz `side` (as of 0.5.2–0.6-beta)
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

**Vertigo is `side = "both"`** (0.6-beta). Do not mark it client-only; empty-section skipping
is a server/client networking change.

**Too Fast is `side = "server"`** (0.5.6). Do not change it to `client`. If singleplayer also
needs the rubber-band fix, use `--side both` on that instance or change the `.pw.toml` to
`side = "both"` and `packwiz refresh`.

**MapStitch is not in the pack** (removed in 0.5.5). Do not re-add its leftover
`pack/config/mapstitch.json` / `mapstitch_state` as if they were a live mod.
