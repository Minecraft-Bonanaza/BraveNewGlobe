// Brave New Globe — cap More Diseases & Treatments splint at 2 minutes
// -----------------------------------------------------------------------------
// SplintRightclickedProcedure applies `splinteffect` with duration -1 (HUD
// shows ∞) and sets player-data `splinttimer` to 96000 ticks (~80 minutes).
// The mod only removes the effect when that timer hits exactly 0. Recast the
// effect to 2400 ticks (2 minutes) and clamp the hidden timer to match.
// -----------------------------------------------------------------------------

const SPLINT_EFFECT = 'more_diseases_and_treatments:splinteffect'
const SPLINT_TICKS = 2400 // 2 minutes

const $Vars = Java.loadClass(
	'morediseasesandtreatments.network.MoreDiseasesAndTreatmentsModVariables'
)
const $MobEffectInstance = Java.loadClass(
	'net.minecraft.world.effect.MobEffectInstance'
)

function effectDuration(inst) {
	if (!inst) return 0
	if (typeof inst.getDuration === 'function') return inst.getDuration()
	return inst.duration
}

function effectAmplifier(inst) {
	if (!inst) return 0
	if (typeof inst.getAmplifier === 'function') return inst.getAmplifier()
	return inst.amplifier || 0
}

function clampSplintTimer(entity) {
	try {
		const vars = entity.getData($Vars.PLAYER_VARIABLES)
		if (!vars) return
		if (vars.splinttimer > SPLINT_TICKS) {
			vars.splinttimer = SPLINT_TICKS
			vars.markSyncDirty()
		}
	} catch (e) {
		// Attachment missing (non-player / wrong side) — effect recast is enough.
	}
}

function capSplint(entity) {
	if (!entity || !entity.hasEffect || !entity.hasEffect(SPLINT_EFFECT)) return
	const inst = entity.getEffect(SPLINT_EFFECT)
	const dur = effectDuration(inst)
	if (dur >= 0 && dur <= SPLINT_TICKS) {
		clampSplintTimer(entity)
		return
	}
	const amp = effectAmplifier(inst)
	const holder = typeof inst.getEffect === 'function' ? inst.getEffect() : SPLINT_EFFECT
	entity.removeEffect(SPLINT_EFFECT)
	try {
		entity.addEffect(new $MobEffectInstance(holder, SPLINT_TICKS, amp, false, true, true))
	} catch (e) {
		entity.potionEffects.add(SPLINT_EFFECT, SPLINT_TICKS, amp)
	}
	clampSplintTimer(entity)
}

PlayerEvents.loggedIn(event => {
	capSplint(event.player)
})

PlayerEvents.tick(event => {
	capSplint(event.player)
})
