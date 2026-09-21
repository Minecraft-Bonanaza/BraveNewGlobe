# Candidate mods

Holding list for mods we want, **until there is a quiet window to ship them**.

Players' instances pull `main` on every launch (packwiz). Pinning a new mod and pushing
while people are mid-setup or on the server **auto-updates them** and can desync client
and dedicated server. Do **not** treat this file as a work order. Store the entry here;
add it to the pack only when a maintainer explicitly says the window is open.

When a candidate is decided, **do not delete it**. Strikethrough the title, move the
block under **Accepted** or **Rejected**, and add the matching note.

---

## How to use this list

### Status rules

| Status | Meaning |
|--------|---------|
| **Pending** | Queued. Keep the name, description, link, and pin notes. Do not packwiz-add. Do not push. |
| **ACCEPTED** | Already shipped. Strikethrough the heading. Note `**ACCEPTED** — added in <pack version> (<YYYY-MM-DD>)`. |
| **REJECTED** | We will not add it. Strikethrough the heading. Note `**REJECTED** — <one-line reason>`. |

Example after a quiet-window ship:

```markdown
### ~~Provisioner's Delight~~
**ACCEPTED** — added in 1.1.8 (2026-09-18)
```

New candidates go under **Pending** with: name, what it is, link(s), loader pin notes,
required extra mods, and any config to apply **when** it is eventually added.

### Agents — do not add from this file

Listing a mod here is **not** consent to pin it. Do not add, refresh, version-bump, or
push because an entry exists or looks ready.

Add a Pending mod only when the user names that mod **and** says to add it now (server
idle / between sessions). Then follow the steps below and mark it ACCEPTED with the
pack version and date. If they say reject, mark REJECTED and stop.

### Agent steps — only after an explicit add-now

Follow [MaintainerInstructions.md](MaintainerInstructions.md). Short version:

1. Target **Minecraft 1.21.1 / NeoForge** only. `1.21.1` ≠ `1.21.10`.
2. Prefer **Modrinth** when the same project is on both. From `pack/`:
   - `packwiz modrinth add <slug-or-url>`
   - `packwiz curseforge add "<exact name>"` only if there is no Modrinth pin
   - If CurseForge `allowModDistribution` is false, vendor like Villager Commerce (`bundled-jars/` + raw GitHub URL). Do not `packwiz curseforge add`.
3. Add **required dependencies** that are not already in `pack/mods/` (listed per entry). Do not add optional/compat extras unless the entry says to.
4. `packwiz -y` can overwrite Create / Curios / playerAnimator. Prefer writing `pack/mods/<slug>.pw.toml` by hand (NeoForge 1.21.1 file, `side = both` unless the project is client-only), then `packwiz refresh`.
5. After the pin exists, open the jar and confirm:
   - no `data/<modid>/neoforge/biome_modifier/` (or equivalent worldgen) unless the entry already accepted that
   - loot table ids you might later put in `wda_dungeon_loot.js` actually exist
6. Ship any **required config** noted on the entry (recipe disables, etc.).
7. `packwiz refresh`. Bump `pack/pack.toml` version per the current series, then update `CHANGELOG.md`, `MODLIST.md`, `README.md` count, and `Notes.md` if it changes pack-state rules.
8. Commit the pin + `pack/index.toml` + `pack/pack.toml` together. Mark this entry ACCEPTED with the **pack version and date**.

Do **not** `packwiz update` Big Globe or Climbable Ropes. Do **not** add Create: Server Optimizer, Simulated Jet Engines, Guard Villagers, or other MaintainerInstructions bans.

---

## Pending

### SAnnounce

**Pending** — pulled in 1.1.9 (2026-09-18). The NeoForge `1.0.2` jar wants **21.1.250+**; pack loader is **21.1.248**. Re-add when the NeoForge pin moves (or a 21.1.248-compatible jar exists).

Server announcement tool: repeating or one-shot chat / title / hotbar messages, `/adminannounce` panel, `&` colors. Client jar optional (vanilla GUI fallback). **No world gen.**

Ops QoL, not gameplay. Description still talks Fabric; pin the NeoForge 1.21.1 jar, not Fabric.

- **Link:** [CurseForge](https://www.curseforge.com/minecraft/mc-mods/sannounce)
- **Pin:** `SAnnounce-NeoForge-1.21.1-1.0.2.jar`. Prefer `side = server` so Prism clients skip it; admins who want the custom GUI can install the same jar locally.
- **Also add:** none.
- **Blocked by:** NeoForge `[21.1.250,)` vs pack `21.1.248`.

---

## Accepted

### ~~ParCool!~~
**ACCEPTED** — added in 1.1.12 (2026-09-21) with ParCool+ Compatibility++ `1.2.1`. Pin is **3.4.3.3-NF**, not 4.x.

### ~~Day Counter (NeoForge)~~
**ACCEPTED** — added in 1.1.12 (2026-09-21) as **Counter** `0.5-1.21.1`. Disable coords/FPS/time overlays after first launch.

### ~~Beautified Chat (Server + Client)~~
**ACCEPTED** — added in 1.1.12 (2026-09-21): **Server** `3.2` + **Collective** `8.40`. Client jar not shipped.

### ~~Simplest Paxels~~
**ACCEPTED** — added in 1.1.12 (2026-09-21) `1.0.6`.

### ~~Provisioner's Delight~~
**ACCEPTED** — added in 1.1.8 (2026-09-18)

Farmer's Delight expansion for **preserved food**: canned/bottled goods, rations, hardtack, crackers, instant noodles, beverage cans. Cans need a can opener; empties recycle to iron. Extra-large crates for bulk haul. 0.9.31 adds Create recipes (fluids, jars) on top of the cooking-pot line.

Fits Agriculture (spoilage, expedition food, physical logistics) without new wild crops. **No world gen.**

- **Link:** [CurseForge](https://www.curseforge.com/minecraft/mc-mods/provisioners-delight) · [Modrinth](https://modrinth.com/mod/provisioners-delight) (`AqjSR89O`)
- **Pin:** Modrinth NeoForge 1.21.1, current `0.9.31` (`provisionersdelight-0.9.31neoforge.jar`). `side = both`.
- **Also add if missing:** **Patchouli** (Modrinth `nU0bVIaL`, required). Farmer's Delight is already in.
- **After add:** whitelist/blacklist new canned foods in `pack/config/foodspoil-common.toml` if they should not rot (cans) or should rot slowly. Do not enable worldgen you did not find in the jar.

### ~~Petrol's Parts~~
**ACCEPTED** — added in 1.1.8 (2026-09-18)

Create kinetic parts that do not exist in base Create: coaxial/shaftless/bevel cogs, corner shafts, differentials, planetary gearsets, colossal cog, overload clutch, horse mill, etc. Author calls **Hydraulic Transmission** an end-game cheater part (config can disable any recipe).

No world gen. Overlaps **Create Cardan Shafts** / Gears n' Kinetics on corner-turning, but the rest is new. Horse mill pairs with Animal Weights.

- **Link:** [CurseForge](https://www.curseforge.com/minecraft/mc-mods/petrols-parts) · [Modrinth](https://modrinth.com/mod/petrols-parts) (`AN0CZD9P`)
- **Pin:** Modrinth NeoForge 1.21.1 (latest release for that pair). `side = both`. License is ARR; Modrinth still hosts the jar.
- **Also add if missing:** **Petrolpark's Library** (Modrinth `petrolpark` / `ik2WZkTZ`). Create 6.0.10 is already in.
- **After add:** disable recipes for **Hydraulic Transmission** (and consider **Pneumatic Tube** / **Friction Heater** — the heater makes Blaze Burner heat with no fuel). Use the mod's per-component recipe config, not a datapack, unless the config is missing.

### ~~Storage Delight~~
**ACCEPTED** — added in 1.1.8 (2026-09-18)

Farmer's Delight kitchen furniture: drawers, glass cabinets, countertop cabinets, book-drawers. Crafted blocks only.

**No world gen.** Decorative overlap with FD cabinets and Create: Storage (fxnt). Worth it only as kitchen furniture, not as a logistics mod.

- **Link:** [CurseForge](https://www.curseforge.com/minecraft/mc-mods/storage-delight-forge) · [Modrinth](https://modrinth.com/mod/storage-delight) (`LTTvOp5L`)
- **Pin:** Modrinth NeoForge 1.21.1 (`storage-delight`, not a Fabric file). `side = both`.
- **Also add:** none (Farmer's Delight is already in).
- **After add:** if barrels/cabinets should slow Food Spoilage, add this mod's block ids to `containerMultipliers` in `pack/config/foodspoil-common.toml`. Do not assume vanilla `minecraft:barrel` covers them.

### ~~Better Party~~
**ACCEPTED** — added in 1.1.8 (2026-09-18)

MMORPG-style parties: finder, public/invite/password groups, party chat, XP share, friendly-fire toggle, member locator, HUD. Server-authoritative. Vanilla scoreboard-team sync is on by default (can disable). **No world gen.**

Simple Voice Chat is already in. The voice bridge below ships with it.

- **Link:** [CurseForge](https://www.curseforge.com/minecraft/mc-mods/better-party) · [Modrinth](https://modrinth.com/mod/better-party)
- **Pin:** NeoForge 1.21.1, current `1.1.7` (`better-party-neoforge-1.21.1-1.1.7.jar`). `side = both` (needed on server and clients).
- **Also add:** **Better Party X Simple Voice** in the same window (next entry). SVC is already in (`2.6.23`).
- **After add:** review `config/better_party-common.toml` — locator privacy, max party size, XP-share radius, vanilla team integration vs anything else using `/team`.

### ~~Better Party X Simple Voice~~
**ACCEPTED** — added in 1.1.8 (2026-09-18)

Addon: a Better Party is a Simple Voice Chat group (and the reverse). Live member sync, password sync, party-wide voice modes (Normal / Open / Isolated), speaking indicator on the party HUD.

**Requires Better Party.** Do not ship this addon alone.

- **Link:** [CurseForge](https://www.curseforge.com/minecraft/mc-mods/better-party-x-simple-voice)
- **Pin:** NeoForge 1.21.1, current `1.0.2`. `side = both`. CurseForge-only (no Modrinth hit).
- **Also add:** Better Party (previous entry). SVC already in.

### ~~CC : My Peripheral Extender (CCPE)~~
**ACCEPTED** — added in 1.1.8 (2026-09-18)

CC: Tweaked peripherals aimed at Create: Aeronautics / Sable: wireless peripheral extender (NBT, proxy, redstone, nav, physics, chunk-load), modular monitor, Control Desk, redstone transceiver, electronic transmission, aero/servo bearings, Lua engine, pitot/INS sensors. Author says **no Mixins**.

Stack match: CC 1.120.2, Create 6.0.10, Aeronautics 1.3.2, Sable 2.0.5. **No world gen.** Overlaps Aeroworks Control Stand and Gadgets & Gizmos CC — extra cockpit/engine path, not a replacement. Extender can chunk-load; do not stack that blindly on Vertigo / Aeronautics loaders.

- **Link:** [CurseForge](https://www.curseforge.com/minecraft/mc-mods/cc-my-peripheral-extender) · [wiki](https://zombieeggstew.github.io/ccnavigationtable-template-1.21.1/)
- **Pin:** NeoForge 1.21.1, current `ccpe-1.1.4-1.21.1.jar`. `side = both`. CurseForge-only.
- **Also add:** none of the listed deps are missing. Do not add Simulated Jet Engines.
- **After add:** confirm Aeronautics / Climbable Ropes stay on the current lockstep. Check the extender's chunk-loading config.

### ~~Create: Central Kitchen~~
**ACCEPTED** — added in 1.1.8 (2026-09-18)

Create 2.0 cooking automation for Farmer's Delight / Brewin' And Chewin': mechanical arms on pots/skillets/stoves/cutting boards, packager unpack into cooking pots and kegs, feast/pie serving, cutting-board recipes as sawing/deploying, keg pouring as filling/emptying, boiler heat for pots. Farming automation was split out (see Integrated Farming).

Fits Agriculture specialized kitchens. **No world gen.** Complementary to Ratatouille (Create cookware) and Slice & Dice (slicer/sprinklers), not a duplicate. Extra Delight / Hearth & Harvest recipes stay inert unless those mods are added.

- **Link:** [CurseForge](https://www.curseforge.com/minecraft/mc-mods/create-central-kitchen) · [Modrinth](https://modrinth.com/mod/create-central-kitchen) (`btq68HMO`)
- **Pin:** Modrinth/CF NeoForge 1.21.1, current `2.6.1`. `side = both`.
- **Also add:** none. Needs Create + **Create: Dragons Plus** (already in). FD and Brewin' are already in.
- **After add:** Polymorph already covers colliding recipes; spot-check FD/Brewin JEI. Pair with Integrated Farming in the same window if both are accepted.

### ~~Create: Integrated Farming~~
**ACCEPTED** — added in 1.1.8 (2026-09-18)

Create farming appliances + crop compat: Vacuum Harvester (area harvest + replant), Fishing Net (contraption fishing; lava net only if a lava-fish mod is present — we don't have one), mechanical harvester/arm support for FD tomatoes and mushroom colonies, spout-sped organic compost. **Sable sub-level** harvest/spout/net support is built in.

**No world gen.** Needs Dragons Plus + Farmer's Delight (both in). Slice & Dice sprinklers + Realistic Farmland stay the hydration path; this is harvest/replant/fishing, not soil moisture.

- **Link:** [CurseForge](https://www.curseforge.com/minecraft/mc-mods/create-integrated-farming) · [Modrinth](https://modrinth.com/mod/create-integrated-farming) (`9k1pAsfR`)
- **Pin:** NeoForge 1.21.1, current `1.4.2`. `side = both`.
- **Also add:** none of the listed deps are missing. Do not add Simulated Jet Engines for the "Simulated Series" auger note.
- **After add:** confirm vacuum harvester vs Serene Seasons crop rules; fishing nets vs Hybrid Aquatic (small-creature catch).

### ~~Better Banners~~
**ACCEPTED** — added in 1.1.8 (2026-09-18)

In-game pixel studio for high-res banners/shields/paintings (up to 1080), animation, emissive glow, **import PNG from disk** so everyone else can see it, pattern-provider copy/paste.

**No world gen.** Civil Works / airship flags flavor. Multiplayer risk: arbitrary image import. Loom image path is still beta.

- **Link:** [CurseForge](https://www.curseforge.com/minecraft/mc-mods/better-banners)
- **Pin:** NeoForge 1.21.1, current `betterbanners-1.4.0.jar`. `side = both` (custom banner data has to sync).
- **Also add:** none.
- **After add:** if image import cannot be disabled in config, treat that as a reject reason for public SMP.

### ~~Way Better Title Bar~~
**ACCEPTED** — added in 1.1.8 (2026-09-18)

Client-only Windows window chrome: dark title bar, optional name / FPS / ping / RAM / biome / XYZ in the OS title. Not Traveler's Titles (those are in-game biome cards; already in).

**No world gen.** Windows-only. Brand-new 1.0.0 (~13 KB). Fine as optional client, default off.

- **Link:** [CurseForge](https://www.curseforge.com/minecraft/mc-mods/way-better-title-bar)
- **Pin:** NeoForge 1.21.1 `way_better_title_bar-1.0.0.jar`. `side = client`, `[option] optional = true`, `default = false`.
- **Also add:** none. Server must not require it.

---

## Rejected

_(none yet — evaluated-and-skipped mods from a round stay in chat until a maintainer files them here)_
