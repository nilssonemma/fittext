import { Component, h, Prop, State } from '@stencil/core'
import { fittext } from './fittext'

@Component({
  tag: 'app-root',
  styleUrl: 'app-root.css',
  scoped: true,
})
export class AppRoot {
  @State() outputWidth: string = '100px' //rename
  @Prop() minFontSize: number = 8 // if fontsize == minfontsize, cannot put more in input?
  @Prop() maxFontSize: number = 45
  @State() textContent: string

  componentWillLoad() {
    const output = localStorage.getItem('output')
    if (output) this.outputWidth = output
    const textContent = localStorage.getItem('textContent')
    if (textContent) this.textContent = textContent
    // set slider value
  }
  componentDidLoad() {
    fittext('#output')
  }
  onRangeChanged(event: Event) {
    this.outputWidth = (event.target as HTMLInputElement).value + 'px'
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
        ></input>
        <input
          type="range"
          id="slider"
          min="1"
          max="500"
          onInput={(e: Event) => this.onRangeChanged(e)}
        ></input>
      </form>,
      <div id="output" style={{ width: this.outputWidth }}>
        <p style={{ fontSize: '12px' }}>{this.textContent}</p>
      </div>,
    ]
  }
}
