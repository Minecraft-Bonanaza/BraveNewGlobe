# Brave New Globe — Client Installation & Auto-Update

How to set up the **Brave New Globe** modpack as a player. You do this setup **one time**
(about 10 minutes). After that, just launch and you're always up to date.

- **Minecraft:** `1.21.1`
- **Loader:** NeoForge `21.1.248` (runs Fabric mods via Sinytra Connector + Forgified Fabric API)
- **Pack version:** `0.7.9`
- **Delivery:** [packwiz](https://packwiz.infra.link/). You set your launcher up **once**; after that,
  **every time you launch, the pack pulls the latest mods automatically** — new mods are added, updated
  mods are re-downloaded, and removed mods are deleted. You never drag jars by hand.

---

## What you need
- [PrismLauncher](https://prismlauncher.org/) (free)
- Java — PrismLauncher's bundled Java is fine; nothing else to install

## Step 1 — Create the instance
1. Open PrismLauncher → **Add Instance**.
2. Pick **Minecraft version `1.21.1`**.
3. Click **NeoForge** and choose version **`21.1.248`**.
4. Name it `Brave New Globe` → **OK**.

> The installer will also correct the loader version to match the pack automatically, but creating it
> right avoids a first-launch prompt.

## Step 2 — Add the installer file
The pack is pulled by a tiny helper called `packwiz-installer-bootstrap.jar`.

1. Download it from this repo: **[`tools/packwiz-installer-bootstrap.jar`](tools/packwiz-installer-bootstrap.jar)**
   (or from the [official releases](https://github.com/packwiz/packwiz-installer-bootstrap/releases)).
2. In PrismLauncher, select your instance → click **Folder** (top toolbar). This opens the instance folder.
3. Go into the **`.minecraft`** folder inside it.
4. Put `packwiz-installer-bootstrap.jar` in that `.minecraft` folder.

## Step 3 — Turn on auto-sync (one command)
1. In PrismLauncher, select the instance → **Edit** → **Settings** tab → **Custom commands**.
2. Tick **Custom commands** to enable it.
3. In the **Pre-launch command** box, paste **exactly** this:

   ```
   "$INST_JAVA" -jar packwiz-installer-bootstrap.jar https://raw.githubusercontent.com/Minecraft-Bonanaza/BraveNewGlobe/main/pack/pack.toml
   ```

That's the whole trick: before each launch, PrismLauncher runs this line, which checks the repo and
downloads anything that changed.

## Step 4 — Launch
Hit **Launch**. The **first** launch downloads all the mods (you'll see a small progress window — this
is normal and only happens once). When it finishes, Minecraft starts.

That's it — you're set up. ✅

## Getting updates later
**Do nothing.** Just launch the instance. The pre-launch command re-syncs against the repo every time,
so you always get the latest mods, configs, and datapacks. Updates are usually a few seconds.

## Worlds — 0.7.9 placement vs 0.7.1 hotfix vs 0.7.0 ceiling vs 0.6 height
**0.7.2–0.7.9** are **datapack-only** When Dungeons Arise placement retunes. They do
**not** change world height. Relaunch so packwiz pulls the updated
`bigglobe_whendungeonsarise.zip`. Already-generated chunks keep old structure
positions until those chunks (or the world) are regenerated.

**0.7.1** is a **datapack-only hotfix**. It does **not** change world height.
**"Create New World" works again** — 0.7.0 crashed at registry load because the
BG×WDA compat pack still defined `small_prairie_house`, whose template pool is gone
in When Dungeons Arise 2.1.68.

**0.7.0** restored the overworld **ceiling** from +896 → **+1024** (stock sky for airships /
When Dungeons Arise aerial structures). The **floor stays −608**. That change lives in a
rebuilt height-patched Big Globe jar (`bigglobe-5.3.2-mc1.21.1-shallow608.jar` — "608" is
the floor). **Existing 0.6.x worlds will not have the extra sky** until you start a new
world, or regenerate the top and **clear the Distant Horizons cache**. Deep terrain stays
aligned if you keep the world (the floor did not move).

**0.6** changed Big Globe's overworld **floor** (to **−608**) via that patched jar.
**Existing worlds from pack versions before 0.6 will not line up.** Create a new world if you
are coming from 0.5.x or 0.6-beta.

After the first chunks generate, press F3 and confirm the world-floor / min Y is **−608**
and the build limit / max Y is **+1024**. Distant Horizons LODs should sit on the real
terrain (no vertical "wall of chunks") and reach the new ceiling. If they don't, you are
still on an old save or an old Big Globe jar — start fresh (or clear DH) and relaunch so
packwiz can pull the rebuilt jar.

**0.6.1–0.6.11 did not change height.** 0.7.0 does (ceiling only). 0.7.1–0.7.9 do not.

- **0.6.1** generated **no ice** (the new `glacier_field` never cleared its cutoff).
- **0.6.2** put ice back as a dense-core sheet that merged into a **continent-sized** mass.
- **0.6.3** capped fill at `0.75` so that mass broke into large floes, still covering the
  whole cold ocean.
- **0.6.4** raised the cutoff to `0.60` so ice was **broken floes over the deep/cold core
  only** (biome / Aquamirae still full-size).
- **0.6.5** restored the **solid-sheet** look (dropped the cap and the `0.60` cutoff).
- **0.6.6** makes glaciers **fewer and smaller**: colder temperature bar
  (`unmixLinear(-0.35, -0.6)`), and cutoff **C = 0.4** on both the ice and the glacier
  biome so they shrink together (Aquamirae shrinks too).
- **0.6.7** nudges that temperature bar colder (`unmixLinear(-0.4, -0.65)`) for a few
  fewer glacier oceans. Size (C = 0.4) and the solid-sheet look are unchanged.
- **0.6.8** adds **In Control!** and clamps Sea Myths' Leviathan to **Y ≤ −50**.
- **0.6.9** extends that deep-only clamp to kraken + sea_eater and halves their spawn
  weight (4 → 2).
- **0.6.10** **removes C2ME** (chunk-loading bugs from its mixin overlap with Vertigo).
  Vertigo stays. The next launch deletes the C2ME jar automatically.
- **0.6.11** adds **Corpse** (lootable body on death) and **Create Aeronautics: Throwable
  Rope Connector**. Drive-By-Wire With Sable is **not** in the pack (tried, then dropped).
- **0.7.0** raises the ceiling to **+1024**, adds **When Dungeons Arise** `2.1.68` (aerial
  structures at **Y 700–750**), and puts a 6-chunk village buffer on pillager outposts +
  large dungeons. packwiz adds the WDA jar and rebuilt Big Globe jar on next launch.
- **0.7.1** drops the orphaned `small_prairie_house` structure def + biome tag from the
  BG×WDA compat datapack so "Create New World" no longer crashes. Relaunch; no new world
  for this hotfix.
- **0.7.2** seats floating `infested_temple` / `kisegi_sanctuary` (start **−45** / **−25**)
  and moves `heavenly_challenger` into the sky set (sky 5, large_dungeon 4).
- **0.7.3** widens the village↔large-dungeon buffer **6 → 12** chunks, adds a **12-chunk**
  sky↔dungeon exclusion, and widens sky jitter (separation 56 → **44**).
- **0.7.4** retunes underground depths: **scorched_mines −150**, **plague_asylum −300**,
  **foundry −560** (core/molten). **0.7.5** raises foundry to **−540**; **0.7.6** to
  **−520** (clear of the −608 floor, still in core/molten). **0.7.7** puts foundry
  back at **−540**, and restores `infested_temple` / `kisegi_sanctuary` to surface
  **0** + **`beard_box`** so they generate again (0.7.2's −45/−25 sank the biome
  check underground vs `#bigglobe:land` → zero spawns). **0.7.8** seated
  `infested_temple` / `kisegi_sanctuary` / `keep_kayra` at surface **−15** with
  **`beard_box`** (only a 1-block margin above BG's `surface−16` cave threshold).
  **0.7.9** puts those three back on the proven surface **0** + **`beard_box`**
  (full 16-block margin so `#land` still matches). Relaunch; no new world.

Already-generated cold ocean stays as it was; explore **new** ocean (or delete those chunks)
to see the 0.6.7 ice. Large Sea Myths already spawned above −50 stay until they despawn.
Already-generated 0.6.x sky has no WDA aerial layer until those chunks (or the world) are
regenerated. Already-generated 0.7.0–0.7.8 WDA structures keep their old positions until
those chunks are regenerated. Worlds created on **0.7.2–0.7.6** likely never spawned
`infested_temple` / `kisegi_sanctuary` (biome mismatch); after 0.7.7 / 0.7.9 explore
**new** land (or regenerate those chunks) to get them. 0.7.8 chunks that did generate
keep the −15 seating until regenerated.

## Troubleshooting
- **"Unable to access jarfile packwiz-installer-bootstrap.jar"** — the jar isn't in `.minecraft`, or is
  in the wrong folder. Either move it there, or use the absolute-path form of the command instead:
  ```
  "$INST_JAVA" -jar "$INST_MC_DIR/packwiz-installer-bootstrap.jar" https://raw.githubusercontent.com/Minecraft-Bonanaza/BraveNewGlobe/main/pack/pack.toml
  ```
- **A launch fails on a "hash mismatch"** — the file bytes on GitHub no longer match `pack/index.toml`.
  That used to happen when Git rewrote line endings (fixed in **0.5.4** by `.gitattributes`). If it
  happens again, the maintainer likely pushed without `packwiz refresh`. Ping them; once they fix it,
  just launch again and it re-syncs.
- **Datapacks** — you do **not** install datapacks manually. This pack ships them under the instance
  `datapacks/` folder; **Paxi** is configured to load that folder globally (`Load from base
  'datapacks' directory = true`). They arrive with the auto-sync. They are **not** under
  `config/paxi/datapacks/`.
- **Dedicated server** — client-only mods (Iris, Sodium, ImmediatelyFast, Mod Menu,
  Particle Rain, Simple Clouds Iris compat) are marked `side = "client"` and will **not** download
  on a dedicated server. **JEI**, **Creating Space**, **Vertigo**, **In Control!**, **Corpse**,
  **Throwable Rope Connector**, **Sable**, **When Dungeons Arise**, and the patched **Big Globe**
  jar are `side = "both"` and do install on the server. **Too Fast** is `side = "server"` and
  **does** install on the server (it is skipped by the default client pre-launch command
  above).
  **C2ME is not in the pack.** Drive-By-Wire With Sable is not in the pack. MapStitch is
  not in the pack.
- **You briefly had 0.6-beta (shallow-overworld datapack)** — that datapack stays gone (it, not
  Vertigo, caused the Distant Horizons offset). 0.6+ ships a height-patched Big Globe jar instead.
  Start a new world if you are coming from that beta.
- **DH still cuts off at +896 after 0.7.0–0.7.9** — the ceiling moved in the Big Globe jar
  in 0.7.0 (0.7.1–0.7.9 did not change height). Clear the Distant Horizons LOD cache and
  relaunch (or start a new world). The floor is still −608.
- **"Create New World" crashed on 0.7.0** — that was the orphaned `small_prairie_house`
  structure def. Relaunch on **0.7.1+** so packwiz pulls the patched datapack, then create
  the world again.
- **Changes not showing up** — GitHub's raw file cache can lag a few minutes after a push. Wait a
  moment and relaunch.
