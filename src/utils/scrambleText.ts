const GLYPHS = '!<>-_\\/[]{}=+*^?#$%&@'

type ScrambleOptions = {
  /** total animation time in ms */
  duration?: number
  /** how often unrevealed glyphs re-randomize, in ms */
  cycleMs?: number
}

/**
 * Reveals `text` left to right with an ease-out wave; characters ahead of
 * the wave cycle through random glyphs at a steady cadence.
 */
export function scrambleText(
  el: HTMLElement,
  text: string,
  { duration = 1100, cycleMs = 50 }: ScrambleOptions = {},
): void {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    el.textContent = text
    return
  }

  const randomChar = () => GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
  const scramble = (from: number) =>
    text
      .slice(from)
      .replace(/\S/g, randomChar) // keep spaces so the word shape holds

  let start: number | null = null
  let lastCycle = 0
  let tail = scramble(0)

  const frame = (now: number) => {
    start ??= now
    const t = Math.min((now - start) / duration, 1)
    const eased = 1 - (1 - t) ** 3
    const revealed = Math.round(eased * text.length)

    if (now - lastCycle >= cycleMs) {
      tail = scramble(revealed)
      lastCycle = now
    }

    el.textContent = text.slice(0, revealed) + tail.slice(0, text.length - revealed)

    if (t < 1) requestAnimationFrame(frame)
    else el.textContent = text
  }

  requestAnimationFrame(frame)
}
