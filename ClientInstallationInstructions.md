# Brave New Globe — Client Installation & Auto-Update

How to set up the **Brave New Globe** modpack as a player. You do this setup **one time**
(about 10 minutes). After that, just launch and you're always up to date.

- **Minecraft:** `1.21.1`
- **Loader:** NeoForge `21.1.248` (runs Fabric mods via Sinytra Connector + Forgified Fabric API)
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

## Troubleshooting
- **"Unable to access jarfile packwiz-installer-bootstrap.jar"** — the jar isn't in `.minecraft`, or is
  in the wrong folder. Either move it there, or use the absolute-path form of the command instead:
  ```
  "$INST_JAVA" -jar "$INST_MC_DIR/packwiz-installer-bootstrap.jar" https://raw.githubusercontent.com/Minecraft-Bonanaza/BraveNewGlobe/main/pack/pack.toml
  ```
- **A launch fails on a "hash mismatch"** — the maintainer pushed an update without re-indexing. Ping
  them; once they fix it, just launch again and it re-syncs.
- **Datapacks** — you do **not** install datapacks manually. This pack ships them under the instance
  `datapacks/` folder; **Paxi** is configured to load that folder globally. They arrive with the
  auto-sync.
- **Dedicated server** — client-only mods (Iris, Sodium, ImmediatelyFast, MapStitch, Mod Menu,
  Particle Rain, Simple Clouds Iris compat) are marked `side = "client"` and will **not** download
  on a dedicated server. **JEI** is `side = "both"` and does install on the server.
- **Changes not showing up** — GitHub's raw file cache can lag a few minutes after a push. Wait a
  moment and relaunch.
