# Brave New Globe — Client Installation & Auto-Update

How to set up the **Brave New Globe** modpack as a player. You do this setup **one time**
(about 10 minutes). After that, just launch and you're always up to date.

- **Minecraft:** `1.21.1`
- **Loader:** NeoForge `21.1.248` (runs Fabric mods via Sinytra Connector + Forgified Fabric API)
- **Pack version:** `0.6.7`
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

## Worlds — 0.6 height vs 0.6.7 glaciers
**0.6** changed Big Globe's overworld height (floor **−608**, ceiling **+896**) via a patched jar.
**Existing worlds from pack versions before 0.6 will not line up.** Create a new world if you are
coming from 0.5.x or 0.6-beta.

After the first chunks generate, press F3 and confirm the world-floor / min Y is **−608**. Distant
Horizons LODs should sit on the real terrain (no vertical "wall of chunks"). If they don't, you are
still on an old save or an old Big Globe jar — start fresh and relaunch so packwiz can pull
`bigglobe-5.3.2-mc1.21.1-shallow608.jar`.

**0.6.1–0.6.7** only change ocean glaciers (datapack `bigglobe_less_glacier`). If you are
already on a 0.6 world, **keep it**.

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

Already-generated cold ocean stays as it was; explore **new** ocean (or delete those chunks)
to see the 0.6.7 ice.

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
  `datapacks/` folder; **Paxi** is configured to load that folder globally. They arrive with the
  auto-sync.
- **Dedicated server** — client-only mods (Iris, Sodium, ImmediatelyFast, Mod Menu,
  Particle Rain, Simple Clouds Iris compat) are marked `side = "client"` and will **not** download
  on a dedicated server. **JEI**, **Creating Space**, **C2ME**, **Vertigo**, and the patched
  **Big Globe** jar are `side = "both"` and do install on the server. **Too Fast** is
  `side = "server"` and **does** install on the server (it is skipped by the default client
  pre-launch command above). MapStitch is not in the pack.
- **You briefly had 0.6-beta (shallow-overworld datapack)** — that datapack stays gone (it, not
  Vertigo, caused the Distant Horizons offset). 0.6+ ships a height-patched Big Globe jar instead.
  Start a new world if you are coming from that beta.
- **Changes not showing up** — GitHub's raw file cache can lag a few minutes after a push. Wait a
  moment and relaunch.
