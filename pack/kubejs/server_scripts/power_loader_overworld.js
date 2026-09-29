// Brave New Globe — overworld crafts for Create: Power Loader
// -----------------------------------------------------------------------------
// The mod's own recipes stay. Empty andesite and empty brass still take a
// respawn anchor (create_power_loader:empty_andesite_chunk_loader and
// empty_brass_chunk_loader). A ghast click still fills those empties.
// These recipes are a second path. They output the working loaders and use
// their own ids, so they do not replace the empty-loader recipes.
//
// Both shapes are the mod's frame. The compass and the empty map stay in the
// core slot the anchor occupies in the mod. The added parts are overworld
// Create pieces already used at that tier, so this route costs more than an
// anchor plus a ghast:
//   Andesite — two mechanical presses beside the compass. A press is an iron
//     block, an andesite casing, and a shaft (Create's andesite press recipe).
//   Brass — three extra precision mechanisms in the window (six total). Each
//     mechanism is a gold sheet plus five passes of cogwheel, large cogwheel,
//     and iron nugget. The mod's brass shell only spends three.
// No netherrack, cinder flour, magma, lava, soul sand, ghast tears, blaze
// powder, ender pearls, or a blaze-burner sequenced assembly.
// -----------------------------------------------------------------------------

ServerEvents.recipes(event => {
	event.custom({
		type: 'minecraft:crafting_shaped',
		pattern: [
			'GGG',
			'PRP',
			'CSC'
		],
		key: {
			G: { tag: 'c:glass_blocks' },
			P: { item: 'create:mechanical_press' },
			R: { item: 'minecraft:compass' },
			C: { item: 'create:andesite_casing' },
			S: { item: 'create:shaft' }
		},
		result: {
			id: 'create_power_loader:andesite_chunk_loader'
		}
	}).id('bravenewglobe:crafting/andesite_chunk_loader')

	event.custom({
		type: 'create:mechanical_crafting',
		accept_mirrored: false,
		pattern: [
			'GGGGG',
			'G P G',
			'GPRPG',
			'CPPPC',
			'CCSCC'
		],
		key: {
			G: { tag: 'c:glass_blocks' },
			P: { item: 'create:precision_mechanism' },
			R: { item: 'minecraft:map' },
			C: { item: 'create:brass_casing' },
			S: { item: 'create:shaft' }
		},
		result: {
			id: 'create_power_loader:brass_chunk_loader'
		}
	}).id('bravenewglobe:mechanical_crafting/brass_chunk_loader')
})
