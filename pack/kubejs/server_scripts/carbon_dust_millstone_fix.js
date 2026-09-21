// Brave New Globe — millstone carbon-dust fix
// -----------------------------------------------------------------------------
// Base Create mills coal and charcoal into black/gray dye. Create: Gunpowder
// mills #minecraft:coals (coal AND charcoal) into Carbon Dust — its charcoal ->
// gunpowder progression ingredient. Two create:milling recipes match the same
// input, so Create resolves to the base dye recipe and Carbon Dust is
// unobtainable by milling.
//
// We remove Create's coal + charcoal dye milling recipes so the millstone
// yields Carbon Dust for both. Black/gray dye stay available elsewhere
// (ink sacs, wither rose, black+white for gray), so the loss is cosmetic.
// -----------------------------------------------------------------------------

ServerEvents.recipes(event => {
	event.remove({ id: 'create:milling/charcoal' })
	event.remove({ id: 'create:milling/coal' })
})
