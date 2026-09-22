// Brave New Globe — wheat is evergreen
// -----------------------------------------------------------------------------
// Serene Seasons fertility is tag-driven. Vanilla wheat is only on summer +
// autumn. #sereneseasons:year_round_crops is included in every season tag, so
// adding wheat there makes it grow (and tooltip as fertile) year-round.
// Block = crop growth. Item = seed/crop tooltips.
// -----------------------------------------------------------------------------

ServerEvents.tags('block', event => {
	event.add('sereneseasons:year_round_crops', 'minecraft:wheat')
})

ServerEvents.tags('item', event => {
	event.add('sereneseasons:year_round_crops', [
		'minecraft:wheat',
		'minecraft:wheat_seeds',
	])
})
