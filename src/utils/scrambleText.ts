export class ScrambleText {
  private props: ScrambleProps
  private targetElement: HTMLElement | null = null
  private rafId: number | null = null
  private elapsed: number = 0
  private fpsInterval: number
  private chars: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+~`|}{[]:;?><,./-='
  private finalText: string[] = []
  private currentText: string[] = []

  constructor(props: ScrambleProps, targetElement?: HTMLElement) {
    this.props = { 
      ...{ 
        speed: 1, 
        playOnMount: true,
        scrambleFactor: 0.28,
        speedVariability: 0.2
      }, 
      ...props 
    }

    // Set target element if provided
    if (targetElement) {
      this.targetElement = targetElement
    }

    // Set FPS interval based on speed
    this.fpsInterval = 1000 / (60 * this.props.speed)

    // Initialize final text
    this.finalText = this.props.text?.split('') || []
    this.currentText = Array(this.finalText.length).fill('')

    // Initialize and play if playOnMount is true
    if (this.props.playOnMount) {
      this.play()
    } else if (this.props.text) {
      this.draw(this.props.text)
    }
  }

  /** Sets the target DOM element for rendering. */
  public setTargetElement(element: HTMLElement): void {
    this.targetElement = element
    if (this.props.playOnMount && this.props.text) {
      this.play()
    }
  }

  /** Draws the text and updates the DOM element. */
  private draw(text: string): string {
    // Update the DOM element if set
    if (this.targetElement) {
      this.targetElement.innerHTML = text
    }
    return text
  }

  /** Starts the animation. */
  public play(): void {
    if (!this.targetElement) {
      console.warn('No target element set. Set a target element before playing.')
      return
    }
    
    this.reset()
    this.props.onAnimationStart?.()
    this.rafId = requestAnimationFrame(this.animate.bind(this))
  }

  /** Animation loop. */
  private animate(timestamp: number): void {
    if (!this.rafId) return

    if (!this.elapsed) this.elapsed = timestamp
    const timeElapsed = timestamp - this.elapsed

    if (timeElapsed > this.fpsInterval) {
      this.elapsed = timestamp - (timeElapsed % this.fpsInterval)
      
      let complete = true
      let currentString = ''
      
      // Process each character position
      for (let i = 0; i < this.finalText.length; i++) {
        const targetChar = this.finalText[i]
        
        // If this position is already correct, keep it
        if (this.currentText[i] === targetChar) {
          currentString += targetChar
          continue
        }
        
        complete = false
        
        // Random chance to set this character to its final value
        // The scrambleFactor determines how quickly characters settle to their final value
        if (Math.random() < this.props.scrambleFactor) {
          this.currentText[i] = targetChar
          currentString += targetChar
        } else {
          // Otherwise show a random character
          const randomChar = this.chars[Math.floor(Math.random() * this.chars.length)]
          currentString += randomChar
        }
      }
      
      // Draw the current state
      this.draw(currentString)
      this.props.onAnimationFrame?.(currentString)
      
      if (complete) {
        this.props.onAnimationEnd?.()
        this.stop()
      } else {
        this.rafId = requestAnimationFrame(this.animate.bind(this))
      }
    } else {
      this.rafId = requestAnimationFrame(this.animate.bind(this))
    }
  }

  /** Stops the animation. */
  public stop(): void {
    if (this.rafId) {
      cancelAnimationFrame(this.rafId)
      this.rafId = null
    }
  }

  /** Resets the scramble state. */
  private reset(): void {
    this.elapsed = 0
    this.currentText = Array(this.finalText.length).fill('')
  }
  
  /** Changes the target text and restarts the animation */
  public updateText(newText: string): void {
    this.props.text = newText
    this.finalText = newText.split('')
    this.reset()
    
    if (this.rafId) {
      this.stop()
      this.play()
    } else if (this.props.playOnMount) {
      this.play()
    }
  }
}

// Define props interface
interface ScrambleProps {
  text: string
  speed?: number
  playOnMount?: boolean
  scrambleFactor?: number
  speedVariability?: number
  onAnimationStart?: () => void
  onAnimationFrame?: (text: string) => void
  onAnimationEnd?: () => void
}
