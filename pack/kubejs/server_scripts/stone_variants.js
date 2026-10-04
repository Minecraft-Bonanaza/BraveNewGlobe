// Brave New Globe — stone variants swap and unpolish
// -----------------------------------------------------------------------------
// Polished diorite / granite / andesite go back to the raw block. Any of the
// three plus cobblestone becomes either of the other two. Vanilla already has
// diorite + cobble → 2 andesite; that stays. The granite path is 1:1, and
// Polymorph picks when two shapeless recipes share the same inputs.
// -----------------------------------------------------------------------------

ServerEvents.recipes(event => {
	let variants = ['diorite', 'granite', 'andesite']

	for (let name of variants) {
		event.shapeless('minecraft:' + name, ['minecraft:polished_' + name])
			.id('bravenewglobe:unpolish_' + name)
	}

	for (let from of variants) {
		for (let to of variants) {
			if (from === to) continue
			event.shapeless('minecraft:' + to, ['minecraft:' + from, 'minecraft:cobblestone'])
				.id('bravenewglobe:' + from + '_cobble_to_' + to)
		}
	}
})
