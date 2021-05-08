import { Component, h, State } from '@stencil/core'
import { fittext } from './fittext'

@Component({
  tag: 'app-root',
  styleUrl: 'app-root.css',
  scoped: true,
})
export class AppRoot {
  @State() outputWidth: string = '100'
  @State() maxOutputWidth: number = 500
  @State() textContent: string

  componentWillLoad() {
    const output = localStorage.getItem('output')
    if (output) this.outputWidth = output
    const textContent = localStorage.getItem('textContent')
    if (textContent) this.textContent = textContent
  }
  componentDidLoad() {
    ;(document.getElementById(
      'slider',
    ) as HTMLInputElement).value = this.outputWidth
    fittext('#output')
  }
  onRangeChanged(event: Event) {
    this.outputWidth = (event.target as HTMLInputElement).value
    localStorage.setItem('output', this.outputWidth)
    fittext('#output')
  }
  onInputChanged(event?: Event) {
    this.textContent = (event.target as HTMLInputElement).value
    localStorage.setItem('textContent', this.textContent)
    fittext('#output')
  }
  render() {
    return [
      <form>
        <input
          type="text"
          value={this.textContent}
          onInput={(e: Event) => this.onInputChanged(e)}
          placeholder="Enter text"
        ></input>
        <p>Select width of output div</p>
        <input
          type="range"
          id="slider"
          min="1"
          max={window.innerWidth - 70}
          value={this.outputWidth}
          onInput={(e: Event) => this.onRangeChanged(e)}
        ></input>
      </form>,
      <div
        id="output"
        style={{
          width: this.outputWidth + 'px',
          maxWidth: window.innerWidth - 70 + 'px',
        }}
      >
        <p style={{ fontSize: '12px' }}>{this.textContent}</p>
      </div>,
    ]
  }
}
