// Brave New Globe — Slice & Dice water sprinklers hydrate Realistic Farmland
// -----------------------------------------------------------------------------
// Realistic Farmland @WrapMethods FarmlandBlock.randomTick and does not call
// original, so BlockEvents.randomTick on farmland never fires. PlayerEvents.tick
// already works in this pack (bleeding / splint scripts).
//
// Every second, scan around each player for sliceanddice:sprinkler. Farmland in
// the sprinkle box is set to moisture 7 if the column *between* the plot and
// the sprinkler (not including either end) is only air or crops. Ceiling beside
// an offset sprinkler is ignored so a 5×5 under one head still wets.
// -----------------------------------------------------------------------------

const SPRINKLE_HEIGHT = 7
const FLOOR_HEIGHT = 3
const HALF_RANGE = 3
const TICK_EVERY = 20
const SCAN_XZ = 16
const SCAN_Y = 10

let loggedFirstWet = false

function asId(value) {
	return String(value || '').toLowerCase()
}

function isSprinkler(block) {
	if (!block) return false
	return asId(block.id).indexOf('sliceanddice:sprinkler') !== -1
}

function isFloorSprinkler(block) {
	try {
		const props = block.properties
		if (!props) return false
		return asId(props.type) === 'floor'
	} catch (e) {
		return false
	}
}

function isFarmland(block) {
	if (!block) return false
	const id = asId(block.id)
	return id === 'minecraft:farmland' || id.indexOf('farmland') !== -1
}

function isAir(block) {
	if (!block) return true
	const id = asId(block.id)
	return id === 'minecraft:air' || id === 'minecraft:cave_air' || id === 'minecraft:void_air' || id === 'air' || id === ''
}

function isCrop(block) {
	if (!block || isAir(block)) return false
	try {
		if (typeof block.hasTag === 'function') {
			if (block.hasTag('minecraft:crops')) return true
			if (block.hasTag('#minecraft:crops')) return true
			if (block.hasTag('minecraft:bee_growables')) return true
			if (block.hasTag('c:crops')) return true
			if (block.hasTag('minecraft:replaceable')) return true
			if (block.hasTag('minecraft:replaceable_plants')) return true
		}
	} catch (e) { /* ignore */ }
	try {
		const props = block.properties
		if (props && (props.age !== undefined || props.Age !== undefined)) return true
	} catch (e) { /* ignore */ }
	const id = asId(block.id)
	if (id.indexOf('crop') !== -1) return true
	if (id.indexOf('_stem') !== -1) return true
	if (id.indexOf('farmersdelight:') === 0) return true
	return false
}

function canSprayThrough(block) {
	return isAir(block) || isCrop(block) || isSprinkler(block)
}

function columnClear(level, x, z, farmlandY, sprinklerY) {
	const lo = Math.min(farmlandY, sprinklerY) + 1
	const hi = Math.max(farmlandY, sprinklerY) - 1
	for (let y = lo; y <= hi; y++) {
		if (!canSprayThrough(level.getBlock(x, y, z))) return false
	}
	return true
}

function wet(block, server) {
	if (!block) return
	const id = asId(block.id) || 'minecraft:farmland'
	try {
		if (typeof block.merge === 'function') block.merge({ moisture: '7' })
	} catch (e) { /* ignore */ }
	try {
		block.set(id, { moisture: '7' })
	} catch (e) {
		try {
			block.set(id + '[moisture=7]')
		} catch (e2) { /* ignore */ }
	}
	if (server && typeof server.runCommandSilent === 'function') {
		try {
			const dim = asId(block.level && block.level.dimension) || 'minecraft:overworld'
			server.runCommandSilent(
				`execute in ${dim} run setblock ${block.x} ${block.y} ${block.z} ${id}[moisture=7]`
			)
		} catch (e) { /* ignore */ }
	}
	if (!loggedFirstWet) {
		loggedFirstWet = true
		console.info(`[BNG] sprinkler wetted ${id} at ${block.x} ${block.y} ${block.z}`)
	}
}

function hydrateFromSprinkler(level, server, sprinkler) {
	const sx = sprinkler.x
	const sy = sprinkler.y
	const sz = sprinkler.z
	const floor = isFloorSprinkler(sprinkler)
	const yMin = floor ? sy + 1 : sy - SPRINKLE_HEIGHT
	const yMax = floor ? sy + FLOOR_HEIGHT : sy - 1
	const loY = Math.min(yMin, yMax)
	const hiY = Math.max(yMin, yMax)
	for (let x = sx - HALF_RANGE; x <= sx + HALF_RANGE; x++) {
		for (let z = sz - HALF_RANGE; z <= sz + HALF_RANGE; z++) {
			for (let y = loY; y <= hiY; y++) {
				const plot = level.getBlock(x, y, z)
				if (!isFarmland(plot)) continue
				if (!columnClear(level, x, z, y, sy)) continue
				wet(plot, server)
			}
		}
	}
}

PlayerEvents.tick(event => {
	const player = event.player
	if (!player || player.age % TICK_EVERY !== 0) return
	const level = player.level
	if (!level) return
	const px = Math.floor(player.x)
	const py = Math.floor(player.y)
	const pz = Math.floor(player.z)
	const server = event.server
	for (let x = px - SCAN_XZ; x <= px + SCAN_XZ; x++) {
		for (let y = py - SCAN_Y; y <= py + SCAN_Y; y++) {
			for (let z = pz - SCAN_XZ; z <= pz + SCAN_XZ; z++) {
				const block = level.getBlock(x, y, z)
				if (!isSprinkler(block)) continue
				hydrateFromSprinkler(level, server, block)
			}
		}
	}
})

console.info('[BNG] sprinkler farmland hydration: player tick scan (RF wrap skips farmland randomTick)')
