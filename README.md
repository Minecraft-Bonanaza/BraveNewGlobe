# Brave New Globe

A [Big Globe](https://modrinth.com/mod/big-globe) modpack for **Minecraft 1.21.1** on
**NeoForge** — Create-ecosystem tech, cannons, aeronautics, and hand-authored Big Globe
world/spawn compatibility. Current pack version: **0.9.0** (**145** mods).

- **Loader:** NeoForge `21.1.248` (runs Fabric mods via Sinytra Connector + Forgified Fabric API)
- **How it's delivered:** [packwiz](https://packwiz.infra.link/). You set your launcher up **once**;
  after that, **every time you launch, the pack pulls the latest mods automatically** — new mods are
  added, updated mods are re-downloaded, and removed mods are deleted. You never drag jars by hand.

## What's in the pack
- **Create ecosystem** — Create plus a large stack of add-ons (aeronautics, cannons, logistics,
  diesel generators, trains, and more). Currency is **Create: Numismatics** (Spur / Cog / Crown / Sun).
- **Guidance quest book** — FTB Quests, **15 chapters / 230 quests** covering every progression
  line. Guidance-only (no line gates another); every gate is objective. See [QUESTS.md](QUESTS.md).
- **Big Globe world generation** — with hand-authored compatibility datapacks for spawns, structures,
  and cross-mod integration (shipped via Paxi). Overworld bounds **−608 → +1024**.
- **Survival & QoL** — seasons, thirst/diseases, farming and food, villager overhauls, and supporting
  libraries.
- **Optional visuals** — Iris shaders, Distant Horizons, Simple Clouds, and other client-side eye-candy
  that can be toggled off on low-spec machines.

## Documentation
- **[Client Installation Instructions](ClientInstallationInstructions.md)** — how to install and
  auto-update the pack as a player (start here if you just want to play).
- **[Maintainer Instructions](MaintainerInstructions.md)** — how the pack is built and how to add/update
  mods with packwiz.
- **[QUESTS.md](QUESTS.md)** — shipped FTB Quests book (15 lines, counts, regen rules).
- **[SPECTRUM.md](SPECTRUM.md)** — Special Interest Group framework for FTB Quests (baseline →
  specialized careers).
- **[MODLIST.md](MODLIST.md)** — human-readable list of every mod.
- **[CHANGELOG.md](CHANGELOG.md)** — version history.
- **[Notes](Notes.md)** — misc config/maintenance notes and gotchas.

## Quick start (players)
Full steps are in **[Client Installation Instructions](ClientInstallationInstructions.md)**. In short:

1. Install [PrismLauncher](https://prismlauncher.org/) and create a `1.21.1` / NeoForge `21.1.248` instance.
2. Drop [`tools/packwiz-installer-bootstrap.jar`](tools/packwiz-installer-bootstrap.jar) into the
   instance's `.minecraft` folder.
3. Add the packwiz pre-launch command and launch. After that, updates are automatic.
