// Brave New Globe — dripstone block back to pointed dripstone
// -----------------------------------------------------------------------------
// Vanilla crafts a dripstone block from four pointed dripstone (2x2). There is
// no reverse. One block returns the four spikes. New id, so the vanilla craft
// stays.
// -----------------------------------------------------------------------------

ServerEvents.recipes(event => {
	event.shapeless('4x minecraft:pointed_dripstone', ['minecraft:dripstone_block'])
		.id('bravenewglobe:dripstone_block_to_pointed')
})
