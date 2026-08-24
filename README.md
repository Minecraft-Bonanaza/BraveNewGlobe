# Brave New Globe

A [Big Globe](https://modrinth.com/mod/big-globe) modpack for **Minecraft 1.21.1** on
**NeoForge** — Create-ecosystem tech, cannons, aeronautics, and hand-authored Big Globe
world/spawn compatibility.

- **Loader:** NeoForge `21.1.248` (runs Fabric mods via Sinytra Connector + Forgified Fabric API)
- **How it's delivered:** [packwiz](https://packwiz.infra.link/). You set your launcher up **once**;
  after that, **every time you launch, the pack pulls the latest mods automatically** — new mods are
  added, updated mods are re-downloaded, and removed mods are deleted. You never drag jars by hand.
- **Current pack version:** `0.6.10` (changelog / commit titles; `pack/pack.toml` version string
  is still `0.6.7`). **Fresh world required** if you are upgrading from any version before
  **0.6** (overworld height changed). 0.6.1–0.6.10 do not need a new world if you are already
  on 0.6.

## What's in the pack
- **Create ecosystem** — Create plus a large stack of add-ons (aeronautics, cannons, logistics,
  diesel generators, trains, and more). **Creating Space** adds Create-based rockets and travel
  to other planets (its own dimensions; no Big Globe compat datapack).
- **Big Globe world generation** — height-patched 5.3.2 jar
  (`bundled-jars/bigglobe-5.3.2-mc1.21.1-shallow608.jar`): overworld floor **−608**, ceiling
  **+896** (DH-safe; the height lives inside BG's own jar). Ocean glaciers are **fewer and
  smaller solid sheets** (`bigglobe_less_glacier`: colder temp bar `unmixLinear(-0.4, -0.65)`
  plus ice *and* biome gated to `1.4 × (crack_threshold − 0.4)`). 0.6.7 only nudges the
  frequency dial colder; size/sheet stay as 0.6.6. The glacier biome matches the ice, so
  Aquamirae's Sea of Shivers shrinks with them. 0.6.5 restored the solid-sheet look (no
  `0.75` cap); 0.6.4's broken-floe core and 0.6.1's `glacier_field` are not current.
  Hand-authored compatibility datapacks cover spawns, structures, and cross-mod integration
  (shipped via Paxi). The old `bigglobe_shallow_overworld` *datapack* is **not** in the pack
  (that approach caused the 0.6-beta Distant Horizons offset).
- **Chunk performance** — **Vertigo** (Fabric via Connector; strips empty vertical sections
  from chunk packets). **C2ME is not in the pack** (removed in 0.6.10 after chunk-loading
  bugs from its mixin overlap with Vertigo). packwiz deletes the C2ME jar on next launch.
- **Survival & QoL** — seasons, thirst/diseases, farming and food, **ChoiceTheorem's Overhauled
  Village (CTOV)** as the sole village system (vanilla villages disabled; biased toward large walled
  villages), and supporting libraries. **Villager API** stays as a Numismatic Overhaul dependency;
  Better Village is not in the pack. **In Control!** clamps Sea Myths' large creatures
  (kraken / leviathan / sea_eater) to deep water (**Y ≤ −50**) and their spawn weight is halved.
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
- **[Notes](Notes.md)** — current overworld-depth / village / glacier rules, Vertigo (C2ME
  removed), In Control / Sea Myths, Creating Space, packwiz `side` flags, line-ending/hash
  gotcha, plus misc config notes.

## Quick start (players)
Full steps are in **[Client Installation Instructions](ClientInstallationInstructions.md)**. In short:

1. Install [PrismLauncher](https://prismlauncher.org/) and create a `1.21.1` / NeoForge `21.1.248` instance.
2. Drop [`tools/packwiz-installer-bootstrap.jar`](tools/packwiz-installer-bootstrap.jar) into the
   instance's `.minecraft` folder.
3. Add the packwiz pre-launch command and launch. After that, updates are automatic.
4. **Start a new world** if you are upgrading from any pack version before 0.6 (height changed).
   Verify F3 min Y is **−608** and Distant Horizons LODs line up with real terrain. If you are
   already on 0.6, keep that world. packwiz will drop C2ME on the next launch.
