// Brave New Globe — andesite-age Power Grid generator / heat parts
// -----------------------------------------------------------------------------
// Vanilla Power Grid gates the basic commutator, induction rotor, and basin
// heater behind Create mechanical crafting. Mechanical Crafters need brass,
// which needs a heated mixer — first generator / first heat would still
// require a captured blaze. These crafting-table recipes keep the same
// andesite-age parts and skip that loop. Mechanical-crafting recipes stay.
//
// Commutator: original 4-row pattern squeezed to 3×3, pins on the left and
// right of the andesite casing (was a single pin on top).
// Rotor: same 3×3 as mechanical crafting minus the two wing (left/right) coils.
// Basin heater: original 5-wide squeezed to 3×3, dropping the two wing coils
// from the top row of resistive coils.
// -----------------------------------------------------------------------------

ServerEvents.recipes(event => {
	event.shaped('powergrid:generator_commutator', [
		'GMG',
		'PCP',
		'ASA',
	], {
		G: '#minecraft:coals',
		M: '#c:plates/copper',
		P: 'powergrid:pins',
		C: 'create:andesite_casing',
		A: 'create:andesite_alloy',
		S: 'create:shaft',
	})

	event.shaped('powergrid:generator_induction_rotor', [
		'AMA',
		' S ',
		'AMA',
	], {
		A: 'create:andesite_alloy',
		M: '#c:copper_coils',
		S: 'create:shaft',
	})

	event.shaped('powergrid:basin_heater', [
		'RRR',
		'C C',
		'CEC',
	], {
		R: 'powergrid:resistive_coil',
		C: '#c:plates/copper',
		E: 'powergrid:conductive_casing',
	})
})
