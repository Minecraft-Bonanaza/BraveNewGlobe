// Brave New Globe — airships fall out of the Aether the way players do
// -----------------------------------------------------------------------------
// A player whose feet reach the Aether floor is sent to the Overworld alone.
// Standing on a Sable ship does not make that player a vanilla passenger, so
// the Aether steals the crew and leaves the hull behind. AeroPortals then
// catches a deeper fall and sets the ship down inside the Aether.
// Take the ship (riders included) as soon as the keel or the crew is below
// the islands, while they are still in this dimension.
// -----------------------------------------------------------------------------

const $ServerTickPost = Java.loadClass('net.neoforged.neoforge.event.tick.ServerTickEvent$Post')
const $AetherConfig = Java.loadClass('com.aetherteam.aether.AetherConfig')

const RETRY_TICKS = 40
const ERROR_LOG_TICKS = 200
// Islands sit about Y 8–128. Leave before vanilla steal (Y < min build height)
// and before AeroPortals' catch (64 below the floor).
const EXIT_ABOVE_FLOOR = 32
const CREW_EXIT_ABOVE_FLOOR = 24

const AETHER_ID = 'aether:the_aether'
const HOME_ID = 'minecraft:overworld'

let lastAttempt = {}
let lastErrorTick = -99999

function locId(loc) {
	if (loc == null) return ''
	let ns = loc.namespace
	let path = loc.path
	if (ns && path && typeof ns !== 'function' && typeof path !== 'function') {
		return String(ns) + ':' + String(path)
	}
	return String(loc)
}

function levelId(level) {
	if (level == null || level.dimension == null) return ''
	return locId(level.dimension.location)
}

function levelOf(server, id) {
	let want = String(id)
	let it = server.getAllLevels().iterator()
	while (it.hasNext()) {
		let level = it.next()
		if (levelId(level) === want) return level
	}
	return null
}

function playerY(player) {
	let y = player.y
	if (y == null && typeof player.getY === 'function') y = player.getY()
	return y
}

function playerOnShip(player, ship) {
	let tracked = AeroPortals.subLevelOf(player)
	if (tracked != null && String(tracked.getUniqueId()) === String(ship.getUniqueId())) return true
	let box = AeroPortals.boundsOf(ship)
	if (box == null) return false
	let x = player.x
	let y = playerY(player)
	let z = player.z
	if (x == null || y == null || z == null) return false
	return x >= box.minX - 4 && x <= box.maxX + 4 && y >= box.minY - 8 && y <= box.maxY + 8 && z >= box.minZ - 4 && z <= box.maxZ + 4
}

function playersIn(level) {
	let players = level.players
	if (typeof players === 'function') players = level.players()
	if (players != null && typeof players.size === 'function') return players
	return null
}

function crewIsLeaving(ship, aether, crewExitY) {
	let players = playersIn(aether)
	if (players == null) return false
	for (let i = 0; i < players.size(); i++) {
		let player = players.get(i)
		if (player == null || player.isRemoved()) continue
		let y = playerY(player)
		if (y == null || y > crewExitY) continue
		if (playerOnShip(player, ship)) return true
	}
	return false
}

NativeEvents.onEvent($ServerTickPost, event => {
	try {
		tickShipFall(event)
	} catch (e) {
		let now = 0
		try {
			now = event.getServer().getTickCount()
		} catch (ignored) {
		}
		if (now - lastErrorTick >= ERROR_LOG_TICKS) {
			lastErrorTick = now
			console.error('[BraveNewGlobe] aether_ship_fall failed: ' + e)
		}
	}
})

function tickShipFall(event) {
	let server = event.getServer()
	if (server == null) return

	let cfg = $AetherConfig.SERVER
	if (cfg.disable_falling_to_overworld.get()) return

	let destinationId = AETHER_ID
	let returnId = HOME_ID
	let configuredDest = String(cfg.portal_destination_dimension_ID.get())
	let configuredHome = String(cfg.portal_return_dimension_ID.get())
	if (configuredDest) destinationId = configuredDest
	if (configuredHome) returnId = configuredHome
	if (destinationId === returnId) return

	let aether = levelOf(server, destinationId)
	let home = levelOf(server, returnId)
	if (aether == null || home == null) {
		let now = server.getTickCount()
		if (now - lastErrorTick >= ERROR_LOG_TICKS) {
			lastErrorTick = now
			console.error('[BraveNewGlobe] aether_ship_fall missing level dest=' + destinationId + ' home=' + returnId)
		}
		return
	}

	let ships = AeroPortals.subLevelsIn(aether)
	if (ships.isEmpty()) return

	let exitY = aether.getMinBuildHeight() + EXIT_ABOVE_FLOOR
	let crewExitY = aether.getMinBuildHeight() + CREW_EXIT_ABOVE_FLOOR
	let ceiling = home.getMaxBuildHeight() - 1
	let now = server.getTickCount()
	let seen = {}

	for (let i = 0; i < ships.size(); i++) {
		let ship = ships.get(i)
		if (ship.isRemoved()) continue
		let shipId = String(ship.getUniqueId())
		if (seen[shipId]) continue

		let chain = AeroPortals.chainOf(ship)
		let minY = Infinity
		let maxY = -Infinity
		for (let c = 0; c < chain.size(); c++) {
			let part = chain.get(c)
			seen[String(part.getUniqueId())] = true
			if (part.isRemoved()) continue
			let box = AeroPortals.boundsOf(part)
			if (box.minY < minY) minY = box.minY
			if (box.maxY > maxY) maxY = box.maxY
		}
		if (maxY < minY) continue
		if (minY > exitY && !crewIsLeaving(ship, aether, crewExitY)) continue

		let previous = lastAttempt[shipId]
		if (previous != null && now - previous < RETRY_TICKS) continue
		lastAttempt[shipId] = now

		let pos = AeroPortals.positionOf(ship)
		let destY = ceiling - (maxY - pos.y)
		// false: do not validate a portal landing. That check aborts a sky drop.
		AeroPortals.teleport(ship, returnId, pos.x, destY, pos.z, false)
		console.info('[BraveNewGlobe] airship ' + shipId + ' fell out of ' + destinationId + ' to ' + returnId + ' at ' + Math.round(pos.x) + ', ' + Math.round(destY) + ', ' + Math.round(pos.z))
	}
}
