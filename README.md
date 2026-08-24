# Brave New Globe

A [Big Globe](https://modrinth.com/mod/big-globe) modpack for **Minecraft 1.21.1** on
**NeoForge** — Create-ecosystem tech, cannons, aeronautics, and hand-authored Big Globe
world/spawn compatibility.

- **Loader:** NeoForge `21.1.248` (runs Fabric mods via Sinytra Connector + Forgified Fabric API)
- **How it's delivered:** [packwiz](https://packwiz.infra.link/). You set your launcher up **once**;
  after that, **every time you launch, the pack pulls the latest mods automatically** — new mods are
  added, updated mods are re-downloaded, and removed mods are deleted. You never drag jars by hand.

## What's in the pack
- **Create ecosystem** — Create plus a large stack of add-ons (aeronautics, cannons, logistics,
  diesel generators, trains, and more). **Creating Space** adds Create-based rockets and travel
  to other planets (its own dimensions; no Big Globe compat datapack).
- **Big Globe world generation** — with hand-authored compatibility datapacks for spawns, structures,
  and cross-mod integration (shipped via Paxi). Overworld depth is the Big Globe default
  (`-1024`…`+1024`). Glacier *ice* is tuned smaller and sparser than the stock Big Globe feature;
  the glacier biome itself is unchanged. The 0.6-beta shallow-overworld experiment is parked on
  branch `0.6-beta` and is **not** on main.
- **Chunk performance** — **C2ME** (native NeoForge; parallel chunk gen/load/IO) and **Vertigo**
  (Fabric via Connector; strips empty vertical sections from chunk packets). No fresh world
  required. Vertigo is back without the shallow-world datapack.
- **Survival & QoL** — seasons, thirst/diseases, farming and food, **ChoiceTheorem's Overhauled
  Village (CTOV)** as the sole village system (vanilla villages disabled; biased toward large walled
  villages), and supporting libraries. **Villager API** stays as a Numismatic Overhaul dependency;
  Better Village is not in the pack.
- **Optional visuals** — Iris shaders, Distant Horizons, Simple Clouds, and other client-side eye-candy
  that can be toggled off on low-spec machines. Several of those (Iris, Sodium, ImmediatelyFast, etc.)
  are packwiz `side = "client"` so dedicated servers skip them; **JEI stays `both`**. MapStitch is not in the pack.
- **Server movement** — **Too Fast** (`side = "server"`) lifts the vanilla `moved too quickly`
  speed cap on dedicated servers so high-speed travel does not rubber-band.

## Documentation
- **[Changelog](CHANGELOG.md)** — version-by-version pack changes.
- **[Client Installation Instructions](ClientInstallationInstructions.md)** — how to install and
  auto-update the pack as a player (start here if you just want to play).
- **[Maintainer Instructions](MaintainerInstructions.md)** — how the pack is built and how to add/update
  mods with packwiz.
- **[Notes](Notes.md)** — current overworld-depth / village / glacier rules, C2ME + Vertigo,
  Creating Space, packwiz `side` flags, line-ending/hash gotcha, plus misc config notes.

## Quick start (players)
Full steps are in **[Client Installation Instructions](ClientInstallationInstructions.md)**. In short:

1. Install [PrismLauncher](https://prismlauncher.org/) and create a `1.21.1` / NeoForge `21.1.248` instance.
2. Drop [`tools/packwiz-installer-bootstrap.jar`](tools/packwiz-installer-bootstrap.jar) into the
   instance's `.minecraft` folder.
3. Add the packwiz pre-launch command and launch. After that, updates are automatic.
