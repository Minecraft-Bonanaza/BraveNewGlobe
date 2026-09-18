// Brave New Globe — Slice & Dice water sprinklers hydrate Realistic Farmland
// -----------------------------------------------------------------------------
// Realistic Farmland (modid `realistic_farmland`) does not add a new farmland
// block. It mixins vanilla `minecraft:farmland` (`moisture` 0–7). Random ticks
// consume adjacent water sources (+7 to the shared pool), add +1 if
// `isRainingAt(pos.above())`, otherwise dry when vanilla `isWaterNearby` is
// false, then spread moisture. Crops spend 1 moisture per crop random tick.
//
// Slice & Dice water sprinklers (`sliceanddice:sprinkler`, floor variant uses
// the same block + `type=floor`) only register Atmosphere local rain
// (`sliceanddice:weather` / `#sliceanddice:moisturizing`). They never set
// farmland moisture. RF's rain path is +1 vs crop spend of 1, so beds stay dry
// (upstream SliceAndDice#268). Vanilla rain would snap moisture to 7.
//
// While a sprinkler is actually running on water, set farmland in its sprinkle
// AABB to moisture 7 (flag 2, client update only). Fertilizer / potion / lava
// actions are unchanged.
// -----------------------------------------------------------------------------

const $SprinklerBE = Java.loadClass(
	'com.possible_triangle.sliceanddice.block.sprinkler.SprinklerBlockEntity'
)
const $SprinklerBlock = Java.loadClass(
	'com.possible_triangle.sliceanddice.block.sprinkler.SprinklerBlock'
)
const $SprinklerType = Java.loadClass(
	'com.possible_triangle.sliceanddice.api.sprinkler.SprinklerType'
)
const $Configs = Java.loadClass('com.possible_triangle.sliceanddice.config.Configs')
const $FarmlandBlock = Java.loadClass('net.minecraft.world.level.block.FarmlandBlock')
const $Blocks = Java.loadClass('net.minecraft.world.level.block.Blocks')
const $BlockPos = Java.loadClass('net.minecraft.core.BlockPos')
const $TagKey = Java.loadClass('net.minecraft.tags.TagKey')
const $Registries = Java.loadClass('net.minecraft.core.registries.Registries')
const $ResourceLocation = Java.loadClass('net.minecraft.resources.ResourceLocation')
const $AbstractContraptionEntity = Java.loadClass(
	'com.simibubi.create.content.contraptions.AbstractContraptionEntity'
)
const $EntityTypeTest = Java.loadClass('net.minecraft.world.level.entity.EntityTypeTest')
const $AABB = Java.loadClass('net.minecraft.world.phys.AABB')

const MOISTURIZING = $TagKey.create(
	$Registries.FLUID,
	$ResourceLocation.parse('sliceanddice:moisturizing')
)
const SPRINKLE_HEIGHT = 7
const MAX_MOISTURE = 7
const TICK_EVERY = 10
const UPDATE_CLIENTS = 2

function sprinklerRange() {
	try {
		return $Configs.SERVER.sprinklerRange.get()
	} catch (e) {
		try {
			return $Configs.SERVER.getSprinklerRange().get()
		} catch (e2) {
			return 5
		}
	}
}

function isMoisturizing(fluid) {
	if (!fluid) return false
	try {
		if (fluid.isEmpty()) return false
	} catch (e) {
		return false
	}
	try {
		if (typeof fluid.is === 'function') return fluid.is(MOISTURIZING)
	} catch (e) { /* fall through */ }
	try {
		return fluid.getFluid().is(MOISTURIZING)
	} catch (e) {
		return false
	}
}

function remainingTicks(behaviour) {
	if (!behaviour) return 0
	if (typeof behaviour.getRemainingTicks === 'function') return behaviour.getRemainingTicks()
	const n = behaviour.remainingTicks
	return typeof n === 'number' ? n : 0
}

function renderedFluid(behaviour) {
	if (!behaviour) return null
	if (typeof behaviour.getRenderedFluid === 'function') return behaviour.getRenderedFluid()
	return behaviour.renderedFluid
}

function sprinklerKind(state) {
	try {
		return state.getValue($SprinklerBlock.TYPE)
	} catch (e) {
		return $SprinklerType.CEILING
	}
}

function isFloor(kind) {
	try {
		return kind === $SprinklerType.FLOOR || String(kind) === 'FLOOR'
	} catch (e) {
		return false
	}
}

function coord(pos, axis) {
	if (!pos) return 0
	if (axis === 'x') {
		if (typeof pos.x === 'function') return pos.x()
		if (typeof pos.getX === 'function') return pos.getX()
		return pos.x
	}
	if (axis === 'y') {
		if (typeof pos.y === 'function') return pos.y()
		if (typeof pos.getY === 'function') return pos.getY()
		return pos.y
	}
	if (typeof pos.z === 'function') return pos.z()
	if (typeof pos.getZ === 'function') return pos.getZ()
	return pos.z
}

function isSprinklerState(state) {
	if (!state) return false
	try {
		if (state.getBlock() instanceof $SprinklerBlock) return true
	} catch (e) { /* fall through */ }
	try {
		return String(state.getBlock().builtInRegistryHolder().key().location()) === 'sliceanddice:sprinkler'
	} catch (e) {
		return false
	}
}

function hydrateFarmland(mcLevel, x, y, z) {
	const pos = new $BlockPos(x, y, z)
	const state = mcLevel.getBlockState(pos)
	if (!state.is($Blocks.FARMLAND)) return
	const moisture = state.getValue($FarmlandBlock.MOISTURE)
	if (moisture >= MAX_MOISTURE) return
	mcLevel.setBlock(pos, state.setValue($FarmlandBlock.MOISTURE, MAX_MOISTURE), UPDATE_CLIENTS)
}

function hydrateArea(mcLevel, pos, kind, range) {
	const sizeX = range
	const sizeZ = range
	const yOffset = isFloor(kind) ? 3 : 0
	const px = coord(pos, 'x')
	const py = coord(pos, 'y')
	const pz = coord(pos, 'z')
	const minX = Math.ceil(px - sizeX / 2.0)
	const maxX = Math.floor(px + sizeX / 2.0)
	const minY = Math.ceil(py - SPRINKLE_HEIGHT + yOffset)
	const maxY = Math.floor(py + yOffset)
	const minZ = Math.ceil(pz - sizeZ / 2.0)
	const maxZ = Math.floor(pz + sizeZ / 2.0)
	for (let x = minX; x <= maxX; x++) {
		for (let y = minY; y <= maxY; y++) {
			for (let z = minZ; z <= maxZ; z++) {
				hydrateFarmland(mcLevel, x, y, z)
			}
		}
	}
}

function hydrateFromBehaviour(mcLevel, behaviour, pos, kind, range) {
	if (remainingTicks(behaviour) <= 0) return
	if (!isMoisturizing(renderedFluid(behaviour))) return
	hydrateArea(mcLevel, pos, kind, range)
}

function sprinklerBehaviour(be) {
	if (!be) return null
	if (typeof be.getBehaviour === 'function') return be.getBehaviour()
	return be.behaviour
}

function blockCenter(be) {
	const p = be.getBlockPos()
	if (typeof p.getCenter === 'function') return p.getCenter()
	return p
}

function forEachLoadedChunk(mcLevel, consumer) {
	const source = mcLevel.getChunkSource()
	if (!source) return
	let holders = null
	try {
		holders = source.chunkMap.getChunks()
	} catch (e) {
		try {
			holders = source.chunkMap.getUpdatingChunkMap().values()
		} catch (e2) {
			holders = null
		}
	}
	if (!holders) return
	for (const holder of holders) {
		let chunk = null
		try {
			chunk = holder.getTickingChunk()
		} catch (e) {
			try {
				chunk = holder.getFullChunk()
			} catch (e2) {
				chunk = null
			}
		}
		if (!chunk) continue
		consumer(chunk)
	}
}

function hydrateStaticSprinklers(mcLevel, range) {
	forEachLoadedChunk(mcLevel, chunk => {
		let entities
		try {
			entities = chunk.getBlockEntities()
		} catch (e) {
			return
		}
		if (!entities) return
		const values = typeof entities.values === 'function' ? entities.values() : entities
		for (const be of values) {
			if (!(be instanceof $SprinklerBE)) continue
			hydrateFromBehaviour(
				mcLevel,
				sprinklerBehaviour(be),
				blockCenter(be),
				sprinklerKind(be.getBlockState()),
				range
			)
		}
	})
}

function actorList(contraption) {
	if (!contraption) return []
	if (typeof contraption.getActors === 'function') return contraption.getActors()
	return contraption.actors || []
}

function pairLeft(pair) {
	if (!pair) return null
	if (typeof pair.getLeft === 'function') return pair.getLeft()
	if (typeof pair.getFirst === 'function') return pair.getFirst()
	return pair.left
}

function pairRight(pair) {
	if (!pair) return null
	if (typeof pair.getRight === 'function') return pair.getRight()
	if (typeof pair.getSecond === 'function') return pair.getSecond()
	return pair.right
}

function structureState(info) {
	if (!info) return null
	if (typeof info.state === 'function') return info.state()
	return info.state
}

function hydrateMovingSprinklers(mcLevel, range) {
	const minY = mcLevel.getMinBuildHeight()
	const maxY = mcLevel.getMaxBuildHeight()
	const box = new $AABB(-3.0e7, minY, -3.0e7, 3.0e7, maxY, 3.0e7)
	let entities
	try {
		entities = mcLevel.getEntities($EntityTypeTest.forClass($AbstractContraptionEntity), box, e => true)
	} catch (e) {
		return
	}
	if (!entities) return
	for (const entity of entities) {
		let contraption
		try {
			contraption = entity.getContraption()
		} catch (e) {
			continue
		}
		for (const pair of actorList(contraption)) {
			const info = pairLeft(pair)
			const ctx = pairRight(pair)
			const state = structureState(info)
			if (!isSprinklerState(state)) continue
			const inst = ctx ? ctx.temporaryData : null
			if (!inst) continue
			const pos = (typeof inst.getPos === 'function' ? inst.getPos() : inst.pos)
				|| (ctx && ctx.position)
				|| entity.position()
			const kind = (typeof inst.getType === 'function' ? inst.getType() : inst.type)
				|| sprinklerKind(state)
			hydrateFromBehaviour(mcLevel, inst, pos, kind, range)
		}
	}
}

function minecraftLevel(level) {
	if (!level) return null
	if (level.minecraftLevel) return level.minecraftLevel
	if (typeof level.isClientSide === 'function' || typeof level.getChunkSource === 'function') return level
	return null
}

ServerEvents.tick(event => {
	const server = event.server
	const tick = typeof server.getTickCount === 'function' ? server.getTickCount() : server.tickCount
	if (tick % TICK_EVERY !== 0) return

	const range = sprinklerRange()
	let levels
	try {
		levels = server.getAllLevels()
	} catch (e) {
		const mc = server.minecraftServer || server
		levels = typeof mc.getAllLevels === 'function' ? mc.getAllLevels() : [server.overworld]
	}

	for (const level of levels) {
		const mcLevel = minecraftLevel(level)
		if (!mcLevel) continue
		try {
			if (mcLevel.isClientSide()) continue
		} catch (e) { /* server levels only */ }
		hydrateStaticSprinklers(mcLevel, range)
		hydrateMovingSprinklers(mcLevel, range)
	}
})
