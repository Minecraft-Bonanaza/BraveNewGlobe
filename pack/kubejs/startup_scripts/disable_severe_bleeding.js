// Brave New Globe — disable More Diseases & Treatments bleeding
// -----------------------------------------------------------------------------
// MDAT 1.0.1 has two bleed effects:
//   more_diseases_and_treatments:bleeding        → "Moderate bleeding" (disabled)
//   more_diseases_and_treatments:severebleeding  → "Severe bleeding"   (disabled)
//
// Both are applied from LivingIncomingDamageEvent (skeletons, zombies, piglins,
// creepers, wolves, arrows, …) with a random roll. The mod has no config to turn
// individual diseases off, so we deny them in canBeAffected before addEffect
// can start the first damage tick.
//
// NativeEvents must live in startup_scripts so the listener is on both logical
// sides (client HUD + dedicated server).
// -----------------------------------------------------------------------------

const $Applicable = Java.loadClass(
	'net.neoforged.neoforge.event.entity.living.MobEffectEvent$Applicable'
)
const $ApplicableResult = Java.loadClass(
	'net.neoforged.neoforge.event.entity.living.MobEffectEvent$Applicable$Result'
)

const DISABLED_BLEEDING_IDS = [
	'more_diseases_and_treatments:bleeding',
	'more_diseases_and_treatments:severebleeding',
]

NativeEvents.onEvent($Applicable, event => {
	const inst = event.getEffectInstance()
	if (!inst) return
	const name = inst.getEffect().getRegisteredName()
	if (DISABLED_BLEEDING_IDS.indexOf(name) !== -1) {
		event.setResult($ApplicableResult.DO_NOT_APPLY)
	}
})
