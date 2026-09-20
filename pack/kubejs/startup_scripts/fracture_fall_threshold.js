// Brave New Globe — broken legs only from falls taller than 10 blocks
// -----------------------------------------------------------------------------
// More Diseases & Treatments applies `fracture` on any FALL damage (≈33% roll)
// in LivingDamageEvent$Pre. There is no height config. Deny the effect unless
// the landing fall distance is greater than 10 blocks.
//
// LivingFallEvent stores the distance because fallDistance can already be
// cleared by the time Applicable runs. NativeEvents lives in startup_scripts
// so the listener is on both logical sides (same pattern as bleeding).
// -----------------------------------------------------------------------------

const $FractureApplicable = Java.loadClass(
	'net.neoforged.neoforge.event.entity.living.MobEffectEvent$Applicable'
)
const $FractureApplicableResult = Java.loadClass(
	'net.neoforged.neoforge.event.entity.living.MobEffectEvent$Applicable$Result'
)
const $LivingFallEvent = Java.loadClass(
	'net.neoforged.neoforge.event.entity.living.LivingFallEvent'
)

const FRACTURE_ID = 'more_diseases_and_treatments:fracture'
const MIN_FALL_BLOCKS = 10
const LAST_FALL_KEY = 'bngLastFallDistance'

NativeEvents.onEvent($LivingFallEvent, event => {
	const entity = event.getEntity()
	if (!entity || !entity.getPersistentData) return
	entity.getPersistentData().putDouble(LAST_FALL_KEY, event.getDistance())
})

NativeEvents.onEvent($FractureApplicable, event => {
	const inst = event.getEffectInstance()
	if (!inst) return
	if (inst.getEffect().getRegisteredName() !== FRACTURE_ID) return
	const entity = event.getEntity()
	if (!entity) return
	let last = 0
	if (entity.getPersistentData) {
		last = entity.getPersistentData().getDouble(LAST_FALL_KEY)
	}
	const live = entity.fallDistance || 0
	if (Math.max(last, live) <= MIN_FALL_BLOCKS) {
		event.setResult($FractureApplicableResult.DO_NOT_APPLY)
	}
})
