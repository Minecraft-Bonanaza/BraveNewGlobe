// Brave New Globe — Slice & Dice water sprinklers hydrate Realistic Farmland
// -----------------------------------------------------------------------------
// Hooked to minecraft:farmland randomTick — the same moment Realistic Farmland
// recalculates moisture. After RF finishes, we snap moisture to 7 if a Slice &
// Dice sprinkler can reach this plot:
//   * ceiling sprinkler within horizontal radius (default 5 → ±2) and ≤7 above
//   * floor sprinkler within that radius and ≤3 below (spray-up)
//   * the vertical column on this plot, from the farmland up/down to the
//     sprinkler, is only air, crops, or the sprinkler itself
// -----------------------------------------------------------------------------

const SPRINKLE_HEIGHT = 7
const FLOOR_HEIGHT = 3
const HALF_RANGE = 2 // sprinklerRange default 5, matching Slice & Dice AABB

function asId(value) {
	return String(value || '').toLowerCase()
}

function isSprinkler(block) {
	if (!block) return false
	const id = asId(block.id)
	return id === 'sliceanddice:sprinkler' || id.indexOf('sliceanddice:sprinkler') !== -1
}

function isAir(block) {
	if (!block) return true
	const id = asId(block.id)
	return id === 'minecraft:air' || id === 'minecraft:cave_air' || id === 'minecraft:void_air' || id === 'air'
}

function isCrop(block) {
	if (!block) return false
	try {
		if (typeof block.hasTag === 'function') {
			if (block.hasTag('minecraft:crops')) return true
			if (block.hasTag('minecraft:bee_growables')) return true
			if (block.hasTag('c:crops')) return true
		}
	} catch (e) { /* ignore */ }
	try {
		const tags = block.tags
		if (tags) {
			const s = asId(tags)
			if (s.indexOf('crops') !== -1) return true
		}
	} catch (e) { /* ignore */ }
	try {
		if (block.properties && block.properties.age !== undefined) return true
	} catch (e) { /* ignore */ }
	return false
}

function canSprayThrough(block) {
	return isAir(block) || isCrop(block) || isSprinkler(block)
}

function columnClear(level, x, z, y0, y1) {
	const lo = Math.min(y0, y1)
	const hi = Math.max(y0, y1)
	for (let y = lo; y <= hi; y++) {
		if (!canSprayThrough(level.getBlock(x, y, z))) return false
	}
	return true
}

function wet(block) {
	if (!block) return
	try {
		block.set('minecraft:farmland[moisture=7]')
	} catch (e) {
		try {
			block.set('minecraft:farmland', { moisture: '7' })
		} catch (e2) { /* ignore */ }
	}
}

function sprinklerReachable(level, fx, fy, fz) {
	for (let dx = -HALF_RANGE; dx <= HALF_RANGE; dx++) {
		for (let dz = -HALF_RANGE; dz <= HALF_RANGE; dz++) {
			for (let dy = 1; dy <= SPRINKLE_HEIGHT; dy++) {
				const block = level.getBlock(fx + dx, fy + dy, fz + dz)
				if (!isSprinkler(block)) continue
				// Rain falls on this plot: the column above the farmland must be
				// air/crop up to the sprinkler's Y (sprinkler itself allowed).
				if (columnClear(level, fx, fz, fy + 1, fy + dy)) return true
			}
			for (let dy = 1; dy <= FLOOR_HEIGHT; dy++) {
				const block = level.getBlock(fx + dx, fy - dy, fz + dz)
				if (!isSprinkler(block)) continue
				if (columnClear(level, fx, fz, fy - dy, fy - 1)) return true
			}
		}
	}
	return false
}

function onFarmlandTick(event) {
	const block = event.block
	if (!block) return
	const level = event.level || block.level
	if (!level) return
	try {
		if (level.client) return
	} catch (e) { /* ignore */ }

	const x = block.x
	const y = block.y
	const z = block.z
	const server = event.server || (level.getServer && level.getServer())
	const run = () => {
		const again = level.getBlock(x, y, z)
		if (!again || asId(again.id).indexOf('minecraft:farmland') === -1) return
		if (sprinklerReachable(level, x, y, z)) wet(again)
	}

	// RF wraps FarmlandBlock.randomTick. Run one tick later so we overwrite
	// RF's result instead of getting clobbered in the same call.
	if (server && typeof server.scheduleInTicks === 'function') {
		server.scheduleInTicks(1, run)
	} else {
		run()
	}
}

if (typeof BlockEvents !== 'undefined' && typeof BlockEvents.randomTick === 'function') {
	BlockEvents.randomTick('minecraft:farmland', onFarmlandTick)
} else {
	console.warn('[BNG] BlockEvents.randomTick missing; sprinkler farmland hook not registered')
}
