// Brave New Globe — seeds compost to bone meal
// -----------------------------------------------------------------------------
// Vanilla already composts wheat / beetroot / melon / pumpkin seeds at 30%.
// Mod seeds (Farmer's Delight, Create: Cotton, and anything on #c:seeds) often
// have no compost chance. This puts the whole seeds tag on the same 30% so
// a composter will take them and fill toward bone meal.
// -----------------------------------------------------------------------------

ServerEvents.compostableRecipes(event => {
	event.add('#c:seeds', 0.3)
	event.add('#minecraft:villager_plantable_seeds', 0.3)
	event.add('farmersdelight:tomato_seeds', 0.3)
	event.add('farmersdelight:cabbage_seeds', 0.3)
	event.add('createcotton:cotton_seeds', 0.3)
})
