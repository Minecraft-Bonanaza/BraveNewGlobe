# Brave New Globe — Client Installation & Auto-Update

How to set up the **Brave New Globe** modpack as a player. You do this setup **one time**
(about 10 minutes). After that, just launch and you're always up to date.

- **Minecraft:** `1.21.1`
- **Loader:** NeoForge `21.1.248` (runs Fabric mods via Sinytra Connector + Forgified Fabric API)
- **Pack version:** `0.8.7` (`pack.toml`). **0.8.7** reworks **Create Core** to
  **12 purpose-driven quests** (use a machine to produce an output or do a
  task; capstone = a passive Andesite Alloy line) with bootstrap-kit rewards.
  Open the quest book in-game. Same mods as 0.8.6. **0.8.6** is a packwiz hash-only
  fix — 0.8.5's `pack.toml` `[index]` hash was stale ( **"index hash file
  invalid"** ). No new mods. **0.8.5** adds **Ponder for KubeJS**
  plus KubeJS / Rhino / Better Advanced Tooltips so **Delivery Required** can
  load (the pack crashed without them). **0.8.4** adds **LDLib2** and restores
  **owo-lib**. **0.8.3** self-hosts **Create: Villager Commerce** (villagers buy
  from player shops). **0.8.2** updates **Create: Linear Bearing** to Modrinth
  `1.3.5`. **0.7.19–0.8.1** add **FTB Quests** and the first **Create Core**
  chapter. **No new world** from 0.7.1 onward.
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

## Worlds — 0.8.7 Create Core vs 0.8.6 hash fix vs 0.8.5 PonderJS vs 0.8.4 libraries vs 0.8.3 Villager Commerce vs 0.8.2 Linear Bearing vs FTB Quests vs 0.7.18 Numismatics vs 0.7.16 Better Combat vs 0.7.15 placement vs 0.7.1 hotfix vs 0.7.0 ceiling vs 0.6 height
**0.8.7** rebuilds the **Create Core** quest chapter (15 → **12** purpose-driven
quests: use/produce + automate, bootstrap-kit rewards). It does **not** change
world height, structures, or mods. If you completed Create Core on **0.8.0** /
**0.8.1**, expect mixed progress — this is a content rewrite, not a same-key
regen. Relaunch. **No new world.**

**0.8.6** only fixes `pack.toml`'s `[index]` hash so it matches `index.toml`.
0.8.5's PonderJS commit updated the index file but left the recorded hash
stale, which made packwiz report **"index hash file invalid"**. No mods,
configs, or worldgen change. Relaunch. **No new world.**

**0.8.5** adds **Ponder for KubeJS** (`ponderjs` 1.21.1-2.4.0) plus **KubeJS**,
**Rhino**, and **Better Advanced Tooltips**. Delivery Required needs these to
launch. It does **not** change world height or structure placement. Relaunch so
packwiz downloads the jars. **No new world.**

**0.8.4** adds **LDLib2** `2.2.37` and restores **owo-lib**. It does **not**
change world height or structure placement. Relaunch so packwiz downloads the
jars. **No new world.**

**0.8.3** self-hosts **Create: Villager Commerce** `1.0.1` in `bundled-jars/`
so packwiz can download it (CurseForge distribution is disabled). Merchant
Stalls let villagers automatically buy from player shops (Numismatics coins).
**No new world.**

**0.8.2** re-points **Create: Linear Bearing** to Modrinth `1.3.5` (CF could
not serve it to the installer). **No new world.**

**0.7.19–0.8.1** add **FTB Quests** and the first **Create Core** guidance
chapter. Open the quest book in-game. If you completed Create Core on **0.8.0**,
those quest IDs changed once in **0.8.1** (progress on that chapter reset that
one time). **0.8.7** rewrote the chapter again (12 purpose-driven quests) — expect
mixed progress. **No new world.**

**0.7.18** / **0.7.17** (same author commit; `pack.toml` is **0.7.18**) swap the coin
economy: **Numismatic Overhaul**, the old **Numismatic Bounties**, and **owo-lib** come
out; **Create: Numismatics** `1.0.20` and **Create Aeronautics: Delivery Required** `1.0.2`
come in, plus villager-coin trades, Numismatics bounty payouts, Tradeworks, Marketplace,
Stock Market, Utils, and a client-side calculator. They do **not** change world height or
structure placement. Relaunch so packwiz swaps the jars. **No new world.** Old Overhaul
coins / purse configs on disk are unused.

The **unversioned** add after 0.7.16 originally added **Create: Linear Bearing**
`1.2.6` (now Modrinth `1.3.5` as of 0.8.2) and **VS / Sable Hose Connectors**
`0.1.8` (fluid/item/rotation/energy hoses across Sable ships), plus a
human-readable **[MODLIST.md](MODLIST.md)**. They do **not** change world
height or structure placement. **No new world.**

**0.7.16** adds **Better Combat** (player melee overhaul). It does **not** change world
height or structure placement. Relaunch so packwiz downloads the jar. **No new world.**

**0.7.2–0.7.15** are **datapack-only** When Dungeons Arise placement retunes. They do
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

**0.6.1–0.6.11 did not change height.** 0.7.0 does (ceiling only). 0.7.1–0.8.7 do not.

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
  (full 16-block margin so `#land` still matches). **0.7.10** switches those three
  from `beard_box` → **`bury`** so steep downhill sides no longer float. **0.7.11**
  densifies sky **64/44 → 48/42** and stretches large dungeons **64/56 → 280/250**
  (~4000-block min separation). **0.7.12** splits `mechanical_nest` into its own
  `stattinkerer:nest` set (**96/80**); large_dungeon is now the **3** ground towers
  only. **0.7.13** densifies sky again **48/42 → 32/28** (match common), adds a
  **12-chunk** nest↔sky exclusion, and (mistakenly) set nest `frequency` to
  **0.0065** (~19k apart). **0.7.14** adds an **8-chunk** common↔village buffer.
  **0.7.15** corrects nest frequency **0.0065 → 0.65** (~1,900 blocks apart).
- **0.7.16** adds **Better Combat** `2.4.0+1.21.1` (player melee animations / arc-hits /
  combos). playerAnimator and Cloth Config stay at the same versions, now from Modrinth.
  Arc-hits can anger several MCA villagers with one swing near a village — tunable in
  Better Combat's settings. Relaunch; no new world.
- **Unversioned (after 0.7.16)** adds **Create: Linear Bearing** `1.2.6` (Sable physics
  sliders for contraptions) and **VS / Sable Hose Connectors** `0.1.8` (hoses across
  Sable ships), plus **[MODLIST.md](MODLIST.md)** (129 mods then; **145** as of 0.8.7).
  Relaunch; no new world.
- **0.7.17** removes **Numismatic Overhaul**, the old **Numismatic Bounties**, and
  **owo-lib**, and adds **Create: Numismatics** `1.0.20` plus **Create Aeronautics:
  Delivery Required** `1.0.2` (airship delivery contracts paid in Numismatics coins).
  `pack.toml` jumps to **0.7.18** in the same commit. Relaunch; no new world.
- **0.7.18** adds the Numismatics shop stack: Villager Currency `1.2.0`, Create:
  Numismatic Bounties `2.0` (Bountiful payouts in coins), Tradeworks `1.0.7`,
  Marketplace `0.5.0`, Stock Market `1.1.0`, Numismatics Utils `2.2`, and Numismatics
  Calculator `1.2.0` (client-only). Relaunch; no new world.
- **Unversioned (after 0.7.18)** adds **[SPECTRUM.md](SPECTRUM.md)** (SIG
  framework), then **Create: Villager Commerce** `1.0.1` (later self-hosted in
  0.8.3). Relaunch; no new world.
- **0.7.19** adds **FTB Quests** + FTB Library + FTB Teams. **0.8.0** ships
  **Create Core** (then 15 craft-the-block quests) + **[QUESTS.md](QUESTS.md)**.
  **0.8.1** makes quest IDs deterministic (Create Core IDs regenerated once).
  **0.8.7** rebuilds that chapter to **12 purpose-driven quests**. Relaunch;
  no new world.
- **0.8.2** re-points Linear Bearing CurseForge → Modrinth `1.3.5`. **0.8.3**
  self-hosts Villager Commerce in `bundled-jars/`. **0.8.4** adds **LDLib2**
  and restores **owo-lib**. **0.8.5** adds **Ponder for KubeJS** plus KubeJS /
  Rhino / Better Advanced Tooltips (required by Delivery Required). **0.8.6**
  re-refreshes the stale `pack.toml` index hash from that 0.8.5 commit. Relaunch;
  no new world.

Already-generated cold ocean stays as it was; explore **new** ocean (or delete those chunks)
to see the 0.6.7 ice. Large Sea Myths already spawned above −50 stay until they despawn.
Already-generated 0.6.x sky has no WDA aerial layer until those chunks (or the world) are
regenerated. Already-generated 0.7.0–0.7.14 WDA structures keep their old positions until
those chunks are regenerated. Worlds created on **0.7.2–0.7.6** likely never spawned
`infested_temple` / `kisegi_sanctuary` (biome mismatch); after 0.7.7 / 0.7.9 explore
**new** land (or regenerate those chunks) to get them. 0.7.8 chunks that did generate
keep the −15 seating until regenerated. 0.7.9 chunks keep `beard_box` foundations until
regenerated. 0.7.13 chunks keep the too-rare nest frequency until regenerated.

## Troubleshooting
- **"Unable to access jarfile packwiz-installer-bootstrap.jar"** — the jar isn't in `.minecraft`, or is
  in the wrong folder. Either move it there, or use the absolute-path form of the command instead:
  ```
  "$INST_JAVA" -jar "$INST_MC_DIR/packwiz-installer-bootstrap.jar" https://raw.githubusercontent.com/Minecraft-Bonanaza/BraveNewGlobe/main/pack/pack.toml
  ```
- **A launch fails on "hash mismatch" or "index hash file invalid"** — two different
  failures. **"index hash file invalid"** is what **0.8.5** hit: `index.toml` was
  fine, but `pack.toml`'s recorded `[index]` hash was stale. **0.8.6** fixes that —
  relaunch. **"hash mismatch"** is when a *file's* bytes no longer match
  `index.toml` (Git rewriting line endings used to do this; fixed in **0.5.4** by
  `.gitattributes`). If either happens again, the maintainer likely pushed without
  `packwiz refresh` (or committed `index.toml` without the new hash in
  `pack.toml`). Ping them; once they fix it, just launch again and it re-syncs.
- **Datapacks** — you do **not** install datapacks manually. This pack ships them under the instance
  `datapacks/` folder; **Paxi** is configured to load that folder globally (`Load from base
  'datapacks' directory = true`). They arrive with the auto-sync. They are **not** under
  `config/paxi/datapacks/`.
- **Dedicated server** — client-only mods (Iris, Sodium, ImmediatelyFast, Mod Menu,
  Particle Rain, Simple Clouds Iris compat, Numismatics Calculator) are marked
  `side = "client"` and will **not** download on a dedicated server. **JEI**, **Creating Space**, **Vertigo**, **In Control!**, **Corpse**,
  **Throwable Rope Connector**, **Sable**, **When Dungeons Arise**, **Better Combat**,
  **Create: Linear Bearing**, **VS / Sable Hose Connectors**, **Create: Numismatics**
  (and Villager Currency / Numismatic Bounties / Tradeworks / Marketplace / Stock Market /
  Utils), **Create Aeronautics: Delivery Required**, **Create: Villager Commerce**,
  **FTB Quests** / **FTB Library** / **FTB Teams**, **LDLib2**, **owo-lib**,
  **Ponder for KubeJS** / **KubeJS** / **Rhino** / **Better Advanced Tooltips**,
  and the patched **Big Globe**
  jar are `side = "both"` and do install on the server. **Too Fast** is `side = "server"` and
  **does** install on the server (it is skipped by the default client pre-launch command
  above). **Numismatics Calculator** is `side = "client"` and will **not** download on a
  dedicated server.
  **C2ME is not in the pack.** Drive-By-Wire With Sable is not in the pack. MapStitch is
  not in the pack. Numismatic Overhaul is not in the pack. **PonderJS is in**
  (0.8.5; required by Delivery Required).
- **You briefly had 0.6-beta (shallow-overworld datapack)** — that datapack stays gone (it, not
  Vertigo, caused the Distant Horizons offset). 0.6+ ships a height-patched Big Globe jar instead.
  Start a new world if you are coming from that beta.
- **DH still cuts off at +896 after 0.7.0** — the ceiling moved in the Big Globe jar
  in 0.7.0 (0.7.1 onward, including 0.8.7, did not change height). Clear the Distant Horizons LOD cache and relaunch (or start a new world).
  The floor is still −608.
- **"Create New World" crashed on 0.7.0** — that was the orphaned `small_prairie_house`
  structure def. Relaunch on **0.7.1+** so packwiz pulls the patched datapack, then create
  the world again.
- **Changes not showing up** — GitHub's raw file cache can lag a few minutes after a push. Wait a
  moment and relaunch.
