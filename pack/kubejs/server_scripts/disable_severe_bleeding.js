// Brave New Globe — strip leftover bleeding
// -----------------------------------------------------------------------------
// startup_scripts/disable_severe_bleeding.js denies new applications. This
// clears anyone who already has more_diseases_and_treatments:bleeding or
// severebleeding (logged-in players, /effect, NBT, older sessions).
// -----------------------------------------------------------------------------

const DISABLED_BLEEDING_IDS = [
	'more_diseases_and_treatments:bleeding',
	'more_diseases_and_treatments:severebleeding',
]

function clearBleeding(entity) {
	if (!entity || !entity.hasEffect) return
	for (const id of DISABLED_BLEEDING_IDS) {
		if (entity.hasEffect(id)) {
			entity.removeEffect(id)
		}
	}
}

PlayerEvents.loggedIn(event => {
	clearBleeding(event.player)
})

PlayerEvents.tick(event => {
	if (event.player.age % 20 !== 0) return
	clearBleeding(event.player)
})
