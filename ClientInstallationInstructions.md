# Brave New Globe — Client Installation & Auto-Update

How to set up the **Brave New Globe** modpack as a player. You do this setup **one time**
(about 10 minutes). After that, just launch and you're always up to date.

- **Minecraft:** `1.21.1`
- **Loader:** NeoForge `21.1.248` (runs Fabric mods via Sinytra Connector + Forgified Fabric API)
- **Pack version:** `0.9.6` (**153** mods) — includes a guidance-only FTB Quests book
  (15 chapters / 230 quests; unchanged since 0.9.0). Open it in-game from the quests button.
  0.9.4 adds Nether content (Incendium, Born in Chaos, Better Nether Fortresses); 0.9.5 makes
  Born in Chaos overworld structures generate in Big Globe biomes. **0.9.6** bumps Simply More
  to `1.3.0_alpha5` so Simply Swords / Simply More tooltips no longer crash. WDA dungeon
  chests are still vanilla.
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
- **Datapacks** — you do **not** install datapacks manually. packwiz drops them in the instance
  `datapacks/` folder; **Paxi** is configured to load that base directory. They arrive with the
  auto-sync.
- **Upgrading 0.8.x → 0.9.6** — no fresh overworld. The quest book is new as of 0.9.0 (Create Core
  was rewritten, so prior Create Core ticks may look mixed or reset). Other chapters start empty.
  Relaunch so packwiz pulls LootJS, Simply Swords / Simply More, Incendium, and Born in Chaos.
- **Upgrading 0.9.2 → 0.9.6** — no fresh overworld. Relaunch. Simply More now auto-installs from
  Modrinth (0.9.3; CurseForge had blocked the download) and as of **0.9.6** is `1.3.0_alpha5`
  (required by Simply Tooltips `0.1.5` — release `1.2.3` crashed on those tooltips). Visit
  **unexplored Nether** (or regenerate it) for Incendium biomes. Born in Chaos gameplay
  structures appear in **newly generated overworld** after 0.9.5. WDA chests stay vanilla
  until loot injection is wired.
- **Upgrading 0.9.5 → 0.9.6** — no fresh world. Relaunch so packwiz replaces Simply More
  `1.2.3` with `1.3.0_alpha5`. That fixes the client crash when a Simply Swords / Simply More
  item tooltip renders (e.g. opening the Simply Swords creative tab).
- **YUNG's Better Nether Fortresses** is marked server-only in the pack, so the default client
  installer skips it (vanilla fortresses in singleplayer). Dedicated servers get the overhaul.
- **Changes not showing up** — GitHub's raw file cache can lag a few minutes after a push. Wait a
  moment and relaunch.
