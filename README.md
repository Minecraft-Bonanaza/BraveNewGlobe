# Brave New Globe

A [Big Globe](https://modrinth.com/mod/big-globe) modpack for **Minecraft 1.21.1** on
**NeoForge** — Create-ecosystem tech, cannons, aeronautics, and hand-authored Big Globe
world/spawn compatibility.

- **Loader:** NeoForge `21.1.248` (runs Fabric mods via Sinytra Connector + Forgified Fabric API)
- **How it's delivered:** [packwiz](https://packwiz.infra.link/). You set your launcher up **once**;
  after that, **every time you launch, the pack pulls the latest mods automatically** — new mods are
  added, updated mods are re-downloaded, and removed mods are deleted. You never drag jars by hand.
- **Current pack version:** `0.7.18` (`pack/pack.toml` matches). **0.7.18** / **0.7.17** swap
  the coin economy to **Create: Numismatics** (plus Delivery Required, villager-coin trades,
  shops / stock market — relaunch; no worldgen change). An **unversioned** add after 0.7.16
  still includes **Create: Linear Bearing**, **VS / Sable Hose Connectors**, and
  **[MODLIST.md](MODLIST.md)**. **0.7.16** adds **Better Combat** (relaunch; no worldgen
  change). **0.7.2–0.7.15** are datapack-only WDA placement retunes (relaunch; no height
  change). **Fresh world required**
  if you are upgrading from **0.6.x** (ceiling +896 → **+1024**; or regenerate the top
  and clear the Distant Horizons cache) or from any version before **0.6** (floor is
  **−608**).

## What's in the pack
- **Create ecosystem** — Create plus a large stack of add-ons (aeronautics, cannons, logistics,
  diesel generators, trains, and more). **Create: Numismatics** is the coin / bank-card
  currency (0.7.17 replaced Numismatic Overhaul). **Create Aeronautics: Delivery Required**
  pays airship delivery contracts in those coins. **Create: Linear Bearing** adds Sable
  physics sliders (cranes / elevators). **VS / Sable Hose Connectors** transfer fluids,
  items, rotation, and energy across Sable physics ships. **Creating Space** adds
  Create-based rockets and travel to other planets (its own dimensions; no Big Globe
  compat datapack).
- **Big Globe world generation** — height-patched 5.3.2 jar
  (`bundled-jars/bigglobe-5.3.2-mc1.21.1-shallow608.jar`): overworld floor **−608**, ceiling
  **+1024** (stock sky restored in **0.7.0** for airships / aerial structures; "608" in the
  filename is the floor). DH-safe; the height lives inside BG's own jar. Ocean glaciers are
  **fewer and smaller solid sheets** (`bigglobe_less_glacier`: colder temp bar
  `unmixLinear(-0.4, -0.65)` plus ice *and* biome gated to `1.4 × (crack_threshold − 0.4)`).
  0.6.7 only nudges the frequency dial colder; size/sheet stay as 0.6.6. The glacier biome
  matches the ice, so Aquamirae's Sea of Shivers shrinks with them. Hand-authored compatibility
  datapacks cover spawns, structures, and cross-mod integration (shipped via Paxi). The old
  `bigglobe_shallow_overworld` *datapack* is **not** in the pack (that approach caused the
  0.6-beta Distant Horizons offset).
- **Adventure structures** — **When Dungeons Arise** `2.1.68` with a patched Big Globe compat
  datapack. Aerial builds sit at a fixed **Y 700–750** open-sky band (airship targets, no
  terrain base). Structures are split into **five** `stattinkerer` sets (**sky 5** at
  **32/28** / sea 4 / common 11 / **large_dungeon 3** at **280/250** / **nest 1** at
  **96/80** + `frequency` **0.65**); 24 of 38 generate. Large dungeons keep a **12-chunk**
  buffer from CTOV villages; sky keeps a **12-chunk** buffer from large dungeons;
  common keeps an **8-chunk** village buffer; nest keeps a **12-chunk** buffer from sky;
  pillager outposts stay at **6 chunks**. Underground: **scorched_mines −150**,
  **plague_asylum −300**, **foundry −540** (core/molten, clear of the −608 floor).
  **0.7.1** dropped an orphaned `small_prairie_house` structure def that crashed
  "Create New World". **0.7.7** fixed `infested_temple`/`kisegi_sanctuary` not
  generating (0.7.2 had sunk the biome check underground vs `#bigglobe:land`).
  Land dungeons (`keep_kayra` / `infested_temple` / `kisegi_sanctuary`) sit at surface
  **0** with **`bury`** (0.7.10; fills steep-terrain gaps). **0.7.12** moved
  `mechanical_nest` into its own nest set; **0.7.15** set nest frequency to **0.65**
  (~1,900 blocks apart). Do not re-apply 0.7.8's −15 seating or 0.7.13's 0.0065
  nest frequency.
- **Chunk performance** — **Vertigo** (Fabric via Connector; strips empty vertical sections
  from chunk packets). **C2ME is not in the pack** (removed in 0.6.10 after chunk-loading
  bugs from its mixin overlap with Vertigo). packwiz deletes the C2ME jar on next launch.
- **Survival & QoL** — seasons, thirst/diseases, farming and food, **ChoiceTheorem's Overhauled
  Village (CTOV)** as the sole village system (vanilla villages disabled; biased toward large walled
  villages), and supporting libraries. **Villager API** stays as an **MCA Reborn** dependency
  (Numismatic Overhaul is gone as of 0.7.17); Better Village is not in the pack. **In Control!**
  clamps Sea Myths' large creatures (kraken / leviathan / sea_eater) to deep water
  (**Y ≤ −50**) and their spawn weight is halved.
  **Corpse** leaves a lootable body on death. **Better Combat** overhauls player melee
  (animations, weapon-arc hits, combos); it does not change MCA Reborn villager AI.
  **Create Aeronautics: Throwable Rope Connector**, **Create Aeronautics: Delivery Required**,
  **Create: Linear Bearing**, and **VS / Sable Hose Connectors** are in; Drive-By-Wire With
  Sable is not (optional Aeroworks dep, dropped in 0.6.11). Sable stays. **owo-lib** is not
  in the pack (it only existed for Numismatic Overhaul).
- **Optional visuals** — Iris shaders, Distant Horizons, Simple Clouds, and other client-side eye-candy
  that can be toggled off on low-spec machines. Several of those (Iris, Sodium, ImmediatelyFast, etc.)
  are packwiz `side = "client"` so dedicated servers skip them; **JEI stays `both`**. MapStitch is not in the pack.
- **Server movement** — **Too Fast** (`side = "server"`) lifts the vanilla `moved too quickly`
  speed cap on dedicated servers so high-speed travel does not rubber-band.

## Documentation
- **[Changelog](CHANGELOG.md)** — version-by-version pack changes.
- **[Mod List](MODLIST.md)** — human-readable list of every mod in the pack (135), grouped by purpose.
- **[Client Installation Instructions](ClientInstallationInstructions.md)** — how to install and
  auto-update the pack as a player (start here if you just want to play).
- **[Maintainer Instructions](MaintainerInstructions.md)** — how the pack is built and how to add/update
  mods with packwiz.
- **[Notes](Notes.md)** — current overworld-depth / village / glacier / WDA rules, Vertigo (C2ME
  removed), In Control / Sea Myths, Corpse / Throwable Rope Connector, Linear Bearing /
  Hose Connectors, Create Numismatics economy / Delivery Required, Better Combat, Creating
  Space, packwiz `side` flags, line-ending/hash gotcha, plus misc config notes.

## Quick start (players)
Full steps are in **[Client Installation Instructions](ClientInstallationInstructions.md)**. In short:

1. Install [PrismLauncher](https://prismlauncher.org/) and create a `1.21.1` / NeoForge `21.1.248` instance.
2. Drop [`tools/packwiz-installer-bootstrap.jar`](tools/packwiz-installer-bootstrap.jar) into the
   instance's `.minecraft` folder.
3. Add the packwiz pre-launch command and launch. After that, updates are automatic.
4. **Start a new world** if you are upgrading from 0.6.x (ceiling raised to **+1024**; or
   regenerate the top and clear the DH cache) or from any pack version before 0.6 (floor
   **−608**). Verify F3 min Y is **−608** and Distant Horizons LODs line up with real terrain.
   **0.7.1–0.7.18** (including the unversioned Linear Bearing / Hose Connectors add after
   0.7.16) do not change height — relaunch so Numismatics / Delivery Required, Linear
   Bearing, Hose Connectors, Better Combat, and the latest WDA compat datapack install.
