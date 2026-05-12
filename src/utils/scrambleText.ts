const CHARSET_FULL =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+~`|}{[]:;?><,./-='
const CHARSET_MINIMAL =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

/** Pending glyph to the right of the frontier. */
const PLACEHOLDER_GLYPH = '_'

export class ScrambleText {
  private props: ScrambleProps
  private targetElement: HTMLElement | null = null
  private rafId: number | null = null
  private elapsed: number = 0
  private fpsInterval: number
  private currentGateMs: number
  private finalText: string[] = []
  /** Smallest index not yet locked to `finalText[i]` (left-to-right frontier). */
  private frontier: number = 0

  constructor(props: ScrambleProps, targetElement?: HTMLElement) {
    this.props = {
      ...{
        speed: 1,
        playOnMount: true,
        scrambleFactor: 0.28,
        speedVariability: 0,
        charset: 'full',
      },
      ...props,
    }

    if (targetElement) {
      this.targetElement = targetElement
    }

    this.fpsInterval = 1000 / (60 * (this.props.speed ?? 1))
    this.currentGateMs = this.fpsInterval

    this.finalText = this.props.text?.split('') || []

    if (this.props.playOnMount && this.targetElement) {
      this.play()
    } else if (!this.props.playOnMount && this.props.text && this.targetElement) {
      this.draw(this.props.text)
    }
  }

  private scramblePool(): string {
    return this.props.charset === 'minimal' ? CHARSET_MINIMAL : CHARSET_FULL
  }

  private randomGlyph(avoid: string): string {
    const pool = this.scramblePool()
    let out = pool[Math.floor(Math.random() * pool.length)] ?? '?'
    let guard = 0
    while (out === avoid && pool.length > 1 && guard++ < 8) {
      out = pool[Math.floor(Math.random() * pool.length)] ?? '?'
    }
    return out
  }

  private placeholderForIndex(i: number): string {
    // Hair space after _ so bold sans doesn’t visually fuse consecutive placeholders.
    return this.finalText[i] === ' ' ? ' ' : `${PLACEHOLDER_GLYPH}\u200A`
  }

  /** Advances `frontier` past spaces in the final string (instant settle for spaces). */
  private advancePastSpaces(): void {
    while (
      this.frontier < this.finalText.length &&
      this.finalText[this.frontier] === ' '
    ) {
      this.frontier++
    }
  }

  public setTargetElement(element: HTMLElement): void {
    this.targetElement = element
    if (this.props.playOnMount && this.props.text) {
      this.play()
    }
  }

  private draw(text: string): string {
    if (this.targetElement) {
      this.targetElement.textContent = text
    }
    return text
  }

  public play(): void {
    if (!this.targetElement) {
      console.warn('No target element set. Set a target element before playing.')
      return
    }

    if (
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      this.draw(this.props.text ?? '')
      this.props.onAnimationEnd?.()
      return
    }

    this.reset()
    this.props.onAnimationStart?.()
    this.rafId = requestAnimationFrame(this.animate.bind(this))
  }

  private animate(timestamp: number): void {
    if (!this.rafId) return

    if (!this.elapsed) this.elapsed = timestamp
    const timeElapsed = timestamp - this.elapsed

    const gateMs = this.currentGateMs
    if (timeElapsed > gateMs) {
      this.elapsed = timestamp - (timeElapsed % gateMs)

      const v = this.props.speedVariability ?? 0
      const jitter = 1 + (Math.random() * 2 - 1) * v
      this.currentGateMs =
        this.fpsInterval * Math.max(0.55, Math.min(1.45, jitter))

      this.advancePastSpaces()

      const n = this.finalText.length
      if (this.frontier >= n) {
        this.draw(this.props.text ?? '')
        this.props.onAnimationEnd?.()
        this.stop()
        return
      }

      const f = this.frontier
      let lockedThisTick = false
      let currentString = ''

      for (let i = 0; i < n; i++) {
        if (i < f) {
          currentString += this.finalText[i]
        } else if (i === f) {
          const targetChar = this.finalText[f] ?? ''
          if (Math.random() < (this.props.scrambleFactor ?? 0.28)) {
            currentString += targetChar
            lockedThisTick = true
          } else {
            currentString += this.randomGlyph(targetChar)
          }
        } else {
          currentString += this.placeholderForIndex(i)
        }
      }

      this.draw(currentString)
      this.props.onAnimationFrame?.(currentString)

      if (lockedThisTick) {
        this.frontier++
        this.advancePastSpaces()
      }

      if (this.frontier >= n) {
        this.draw(this.props.text ?? '')
        this.props.onAnimationEnd?.()
        this.stop()
      } else {
        this.rafId = requestAnimationFrame(this.animate.bind(this))
      }
    } else {
      this.rafId = requestAnimationFrame(this.animate.bind(this))
    }
  }

  public stop(): void {
    if (this.rafId) {
      cancelAnimationFrame(this.rafId)
      this.rafId = null
    }
  }

  private reset(): void {
    this.elapsed = 0
    this.frontier = 0
    this.currentGateMs = this.fpsInterval
    this.advancePastSpaces()
  }

  public updateText(newText: string): void {
    this.props.text = newText
    this.finalText = newText.split('')

    if (this.rafId) {
      this.stop()
      this.play()
    } else if (this.props.playOnMount && this.targetElement) {
      this.play()
    }
  }
}

interface ScrambleProps {
  text: string
  speed?: number
  playOnMount?: boolean
  scrambleFactor?: number
  speedVariability?: number
  charset?: 'full' | 'minimal'
  onAnimationStart?: () => void
  onAnimationFrame?: (text: string) => void
  onAnimationEnd?: () => void
}
