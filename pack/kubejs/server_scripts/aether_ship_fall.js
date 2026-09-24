// Brave New Globe — airships fall out of the Aether the way players do
// -----------------------------------------------------------------------------
// A player whose feet reach the Aether floor is sent to the return dimension
// (the Overworld) at the same X/Z, just under the ceiling, still falling.
// An assembled ship is a Sable sublevel, so that check never sees it.
// AeroPortals instead waits until the whole ship is 64 blocks under the floor
// and sets it down inside the Aether. This sends the ship home first, while
// it is still above that catch, riders included.
// -----------------------------------------------------------------------------

const $ServerTickPost = Java.loadClass('net.neoforged.neoforge.event.tick.ServerTickEvent$Post')
const $MinecraftServer = Java.loadClass('net.minecraft.server.MinecraftServer')
const $ResourceKey = Java.loadClass('net.minecraft.resources.ResourceKey')
const $Registries = Java.loadClass('net.minecraft.core.registries.Registries')
const $ResourceLocation = Java.loadClass('net.minecraft.resources.ResourceLocation')
const $AetherConfig = Java.loadClass('com.aetherteam.aether.AetherConfig')
const GET_LEVEL = $MinecraftServer.class.getMethod('getLevel', $ResourceKey)

const RETRY_TICKS = 40

function dimensionKey(id) {
	return $ResourceKey.create($Registries.DIMENSION, $ResourceLocation.parse(id))
}

function configString(value) {
	return String(value.get())
}

function levelOf(server, id) {
	return GET_LEVEL.invoke(server, dimensionKey(id))
}

let lastAttempt = {}
let loggedError = false

NativeEvents.onEvent($ServerTickPost, event => {
	try {
		tickShipFall(event)
	} catch (e) {
		if (!loggedError) {
			loggedError = true
			console.error('[BraveNewGlobe] aether_ship_fall failed: ' + e)
		}
	}
})

function tickShipFall(event) {
	let server = event.server
	let cfg = $AetherConfig.SERVER
	if (cfg.disable_falling_to_overworld.get()) return

	let destinationId = configString(cfg.portal_destination_dimension_ID)
	let returnId = configString(cfg.portal_return_dimension_ID)
	if (!destinationId || !returnId || destinationId === returnId) return

	let aether = levelOf(server, destinationId)
	let home = levelOf(server, returnId)
	if (aether == null || home == null) return

	let ships = AeroPortals.subLevelsIn(aether)
	if (ships.isEmpty()) return

	let floor = aether.getMinBuildHeight()
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
		if (minY > floor || maxY < minY) continue

		let previous = lastAttempt[shipId]
		if (previous != null && now - previous < RETRY_TICKS) continue
		lastAttempt[shipId] = now

		let pos = AeroPortals.positionOf(ship)
		let destY = ceiling - (maxY - pos.y)
		// false: place it in the sky. A portal landing would abort or set the ship on the ground.
		AeroPortals.teleport(ship, returnId, pos.x, destY, pos.z, false)
		console.info('[BraveNewGlobe] airship ' + shipId + ' fell out of ' + destinationId + ' to ' + returnId + ' at ' + Math.round(pos.x) + ', ' + Math.round(destY) + ', ' + Math.round(pos.z))
	}
}
