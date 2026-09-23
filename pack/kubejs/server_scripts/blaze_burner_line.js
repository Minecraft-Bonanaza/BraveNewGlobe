// Brave New Globe — blaze burners and blaze powder without a blaze mob
// -----------------------------------------------------------------------------
// A heated mix needs a captured burner, and the assembly that captures one
// needs a magma block. The unheated netherrack-and-lava mix exists so the
// first magma (and therefore the first burner) can be made before any burner
// is lit. After that, heated stone and lava is the magma you actually use.
// Crush netherrack for cinder flour (Create's own crushing recipe).
// -----------------------------------------------------------------------------

ServerEvents.recipes(event => {
	event.custom({
		type: 'create:mixing',
		ingredients: [
			{ item: 'minecraft:cobblestone' },
			{ type: 'neoforge:single', amount: 250, fluid: 'minecraft:lava' }
		],
		results: [
			{ id: 'minecraft:netherrack' }
		]
	}).id('bravenewglobe:mixing/cobble_lava_netherrack')

	event.custom({
		type: 'create:mixing',
		ingredients: [
			{ item: 'minecraft:netherrack' },
			{ item: 'minecraft:netherrack' },
			{ item: 'minecraft:netherrack' },
			{ item: 'minecraft:netherrack' },
			{ item: 'minecraft:netherrack' },
			{ item: 'minecraft:netherrack' },
			{ item: 'minecraft:netherrack' },
			{ item: 'minecraft:netherrack' },
			{ type: 'neoforge:single', amount: 1000, fluid: 'minecraft:lava' }
		],
		results: [
			{ id: 'minecraft:magma_block' }
		]
	}).id('bravenewglobe:mixing/netherrack_lava_magma_starter')

	event.custom({
		type: 'create:mixing',
		heat_requirement: 'heated',
		ingredients: [
			{ item: 'minecraft:stone' },
			{ type: 'neoforge:single', amount: 250, fluid: 'minecraft:lava' }
		],
		results: [
			{ id: 'minecraft:magma_block' }
		]
	}).id('bravenewglobe:mixing/stone_lava_magma')

	event.custom({
		type: 'create:mixing',
		heat_requirement: 'heated',
		ingredients: [
			{ item: 'create:cinder_flour' },
			{ item: 'minecraft:magma_block' }
		],
		results: [
			{ id: 'minecraft:blaze_powder' }
		]
	}).id('bravenewglobe:mixing/cinder_magma_blaze_powder')

	event.custom({
		type: 'create:sequenced_assembly',
		ingredient: { item: 'create:empty_blaze_burner' },
		transitional_item: { id: 'kubejs:incomplete_blaze_burner' },
		loops: 1,
		results: [
			{ id: 'create:blaze_burner' }
		],
		sequence: [
			{
				type: 'create:deploying',
				ingredients: [
					{ item: 'kubejs:incomplete_blaze_burner' },
					{ item: 'create:cinder_flour' }
				],
				results: [
					{ id: 'kubejs:incomplete_blaze_burner' }
				]
			},
			{
				type: 'create:deploying',
				ingredients: [
					{ item: 'kubejs:incomplete_blaze_burner' },
					{ item: 'minecraft:magma_block' }
				],
				results: [
					{ id: 'kubejs:incomplete_blaze_burner' }
				]
			},
			{
				type: 'create:filling',
				ingredients: [
					{ item: 'kubejs:incomplete_blaze_burner' },
					{ type: 'neoforge:single', amount: 250, fluid: 'minecraft:lava' }
				],
				results: [
					{ id: 'kubejs:incomplete_blaze_burner' }
				]
			},
			{
				type: 'create:pressing',
				ingredients: [
					{ item: 'kubejs:incomplete_blaze_burner' }
				],
				results: [
					{ id: 'kubejs:incomplete_blaze_burner' }
				]
			}
		]
	}).id('bravenewglobe:sequenced_assembly/blaze_burner')
})
