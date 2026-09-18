// Brave New Globe — cap splint HUD duration at apply time (both logical sides)
// -----------------------------------------------------------------------------
// MDAT applies `splinteffect` as infinite (-1). Mutate the instance duration
// to 2400 ticks as soon as it is added so the client HUD shows 2:00 instead
// of ∞. Server recast in server_scripts/splint_duration.js is the fallback.
// -----------------------------------------------------------------------------

const $Added = Java.loadClass(
	'net.neoforged.neoforge.event.entity.living.MobEffectEvent$Added'
)

const SPLINT_EFFECT = 'more_diseases_and_treatments:splinteffect'
const SPLINT_TICKS = 2400

NativeEvents.onEvent($Added, event => {
	const inst = event.getEffectInstance()
	if (!inst) return
	const name = inst.getEffect().getRegisteredName()
	if (name !== SPLINT_EFFECT) return
	const dur = inst.getDuration()
	if (dur >= 0 && dur <= SPLINT_TICKS) return
	try {
		const field = inst.getClass().getDeclaredField('duration')
		field.setAccessible(true)
		field.setInt(inst, SPLINT_TICKS)
	} catch (e) {
		// Server script recasts if the field is inaccessible.
	}
})
