# Client installation

Brave New Globe is a packwiz pack for Minecraft **1.21.1** / NeoForge **21.1.250**. Set it up once in PrismLauncher. After that, launching the instance syncs mods, configs, and datapacks from this repo.

This git branch is **`1.0.11-DSAWM`** (Deep Seas and Animal Weights Modification). To test it, point the packwiz pre-launch command at `https://raw.githubusercontent.com/Minecraft-Bonanaza/BraveNewGlobe/1.0.11-DSAWM/pack/pack.toml` instead of `main`.

## Requirements

- [PrismLauncher](https://prismlauncher.org/)
- Java (the copy PrismLauncher bundles is enough)

## 1. Create the instance

1. Open PrismLauncher and click **Add Instance**.
2. Set Minecraft to `1.21.1`. **Note that 1.21.1 and 1.21.10 are not the same thing. I'm looking at you Aiden.**
3. Enable **NeoForge** and select `21.1.250`.
4. Name the instance `Brave New Globe` and click **OK**.

The packwiz installer will correct the loader if it does not match the pack. Creating it with `21.1.250` avoids that prompt on first launch.

## 2. Add the packwiz bootstrap

1. Download [`tools/packwiz-installer-bootstrap.jar`](tools/packwiz-installer-bootstrap.jar) from this repo, or from the [packwiz-installer-bootstrap releases](https://github.com/packwiz/packwiz-installer-bootstrap/releases).
2. In PrismLauncher, select the instance and click **Folder**.
3. Open the `.minecraft` folder inside it.
4. Place `packwiz-installer-bootstrap.jar` in that folder.

## 3. Pre-launch command

1. Select the instance → **Edit** → **Settings** → **Custom commands**.
2. Enable **Custom commands**.
3. Paste this as the **Pre-launch command**:

```
"$INST_JAVA" -jar packwiz-installer-bootstrap.jar https://raw.githubusercontent.com/Minecraft-Bonanaza/BraveNewGlobe/main/pack/pack.toml
```

PrismLauncher runs that line before every launch, so the instance stays in sync with `main`.

## 4. Launch

Click **Launch**. The first run downloads the full pack; a progress window is expected. Later launches only fetch what changed.

## Updates

Do not copy jars or datapacks in by hand. Launch the instance. If a just-pushed update does not appear, wait a few minutes (GitHub raw cache) and launch again.

Optional client mods (shaders, Distant Horizons, connected textures, and similar) can be toggled in the packwiz installer prompt when they are marked optional.

## Troubleshooting

**Unable to access jarfile packwiz-installer-bootstrap.jar**  
The jar is not in `.minecraft`. Move it there, or use this form so the path is explicit:

```
"$INST_JAVA" -jar "$INST_MC_DIR/packwiz-installer-bootstrap.jar" https://raw.githubusercontent.com/Minecraft-Bonanaza/BraveNewGlobe/main/pack/pack.toml
```

**Hash mismatch / index invalid**  
The pack index on `main` is out of date. Ask a maintainer to run `packwiz refresh` and push. After that, launch again.

**Datapacks**  
Do not install datapacks yourself. packwiz puts them in the instance `datapacks/` folder. Paxi is configured to load that folder. They do not go under `config/paxi/datapacks/`.

**Missing Too Fast or YUNG's Better Nether Fortresses**  
Those are `side = server`. A normal PrismLauncher client instance skips them. Dedicated servers still get them.

**Loader / version prompt on first launch**  
The instance Minecraft/NeoForge versions did not match the pack. Accept the correction, or recreate the instance as `1.21.1` / `21.1.250`.
