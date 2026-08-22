# Installing Brave New Globe (PrismLauncher)

This pack auto-updates. You do the setup **once**; after that, every launch pulls the
latest mods, configs, and datapacks automatically.

## Requirements
- [PrismLauncher](https://prismlauncher.org/)
- A working `java` (PrismLauncher's bundled Java is fine)

## One-time setup

1. **Create the instance.** In PrismLauncher: *Add Instance* → *Minecraft* → version **1.21.1**,
   then add the **NeoForge `21.1.248`** loader. Name it `Brave New Globe`. (The packwiz installer will
   also correct the loader version to match the pack, but creating it right avoids a first-launch prompt.)

2. **Drop in the installer.** Download `packwiz-installer-bootstrap.jar` (see `tools/` in this repo, or
   the [packwiz-installer releases](https://github.com/packwiz/packwiz-installer/releases)) and place it in
   the instance's `.minecraft` folder. Open it via PrismLauncher → *Folder* to find that directory.

3. **Set the pre-launch hook.** PrismLauncher → select the instance → *Edit* → *Settings* →
   *Custom commands* → enable **Custom commands**, and set **Pre-launch command** to:

   ```
   "$INST_JAVA" -jar packwiz-installer-bootstrap.jar https://raw.githubusercontent.com/Minecraft-Bonanaza/BraveNewGlobe/main/pack/pack.toml
   ```

   > If it can't find the jar, use the absolute form:
   > `"$INST_JAVA" -jar "$INST_MC_DIR/packwiz-installer-bootstrap.jar" https://raw.githubusercontent.com/Minecraft-Bonanaza/BraveNewGlobe/main/pack/pack.toml`

4. **Launch.** First launch downloads everything; every launch after only syncs what changed
   (adds new mods, updates changed ones, removes deleted ones).

## Updating
Nothing to do — just launch. The pre-launch hook re-syncs against the repo every time.

## Notes
- Datapacks are shipped under `config/paxi/datapacks/` and loaded globally by the **Paxi** mod (this pack
  includes it), so you do **not** drag datapacks per-world.
- If a launch fails on a hash mismatch, the maintainer likely pushed without running `packwiz refresh` —
  ping them; a re-sync after their fix resolves it.
