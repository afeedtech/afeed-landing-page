

## Fix Boomerang Connector Animation

Three issues with the current animated boomerang icon on the connector line:

1. **Too fast** -- completes in 2 seconds, making it hard to notice
2. **Plays only once** -- uses `forwards` fill mode instead of looping
3. **Disappears at end** -- opacity goes to 0 at 100% keyframe

### Changes in `src/index.css`

**LTR animation (line 418):**
- Change duration from `2s` to `4s` for a slower, more noticeable travel
- Change `forwards` to `infinite` so it loops continuously
- Add a brief pause at start/end by adjusting keyframe percentages (icon visible from 5%-95%, with small gaps for a natural "reset" feel)

**RTL animation (line 442):**
- Same duration and looping changes

**Keyframes adjustments:**
- `hiwTravelLTR`: keep icon fully visible (opacity 1) from ~8% to ~92%, fade in at start and fade out at end within 5% windows, then hold invisible briefly before restarting
- `hiwTravelRTL`: mirror the same timing

### Result
The boomerang icon will smoothly and continuously travel along the connector line at a comfortable pace, looping indefinitely once the section scrolls into view.
