# Brave New Globe

A [Big Globe](https://modrinth.com/mod/big-globe) modpack for **Minecraft 1.21.1** on
**NeoForge** — Create-ecosystem tech, cannons, aeronautics, and hand-authored Big Globe
world/spawn compatibility.

Current pack: **1.0.11** — **192** mods. Quest book **17 chapters / 246 quests**.

**1.0.0 is the first production release.** The content stack is in — including the team's
in-house **Create: Market Maker** economy mod. Survival-layer polish (seasons, diseases,
farming/food, climate) may continue in `1.0.x`.

- **Loader:** NeoForge `21.1.250` (runs Fabric mods via Sinytra Connector + Forgified Fabric API)
- **How it's delivered:** [packwiz](https://packwiz.infra.link/). You set your launcher up **once**;
  after that, **every time you launch, the pack pulls the latest mods automatically** — new mods are
  added, updated mods are re-downloaded, and removed mods are deleted. You never drag jars by hand.

## What's in the pack
- **Create ecosystem** — Create plus a large stack of add-ons (aeronautics and propulsion, cannons,
  logistics, diesel generators, trains, radio towers, and more), plus the in-house
  **Create: Market Maker** economy mod.
- **Programmable control** — CC: Tweaked (in-world Lua) with Sable radar, Big Cannons fire-control,
  and Advanced Peripherals; Create: Radiologistics as a parallel Create-native comms/compute layer.
- **Big Globe world generation** — with hand-authored compatibility datapacks for spawns, structures,
  and cross-mod integration (shipped via Paxi).
- **Survival & QoL** — seasons, diseases, farming and food, villager overhauls, and supporting
  libraries. This layer may still get polish in `1.0.x`.
- **Optional visuals** — Iris shaders, Distant Horizons, Simple Clouds, and other client-side eye-candy
  that can be toggled off on low-spec machines.

## Documentation
- **[Client Installation Instructions](ClientInstallationInstructions.md)** — how to install and
  auto-update the pack as a player (start here if you just want to play).
- **[Maintainer Instructions](MaintainerInstructions.md)** — how the pack is built and how to add/update
  mods with packwiz.
- **[CHARTER.md](CHARTER.md)** — in-universe founding charter (player-facing lore).
- **[SPECTRUM.md](SPECTRUM.md)** — Special Interest Group framework for FTB Quests (baseline →
  specialized careers).
- **[QUESTS.md](QUESTS.md)** — shipped quest book (17 chapters / 246 quests) and line list.
- **[LOOT.md](LOOT.md)** — combat-dungeon LootJS pools + Simply Swords loot rules.
- **[CHANGELOG.md](CHANGELOG.md)** — version history.
- **[MODLIST.md](MODLIST.md)** — human-readable mod list (192 mods).
- **[Notes](Notes.md)** — living pack-state notes (villages, WDA, loot, height, gotchas).

## Quick start (players)
Full steps are in **[Client Installation Instructions](ClientInstallationInstructions.md)**. In short:

1. Install [PrismLauncher](https://prismlauncher.org/) and create a `1.21.1` / NeoForge `21.1.250` instance.
2. Drop [`tools/packwiz-installer-bootstrap.jar`](tools/packwiz-installer-bootstrap.jar) into the
   instance's `.minecraft` folder.
3. Add the packwiz pre-launch command and launch. After that, updates are automatic.
