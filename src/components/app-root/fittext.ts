export function fittext(
  selector: string,
  minFontSize?: number,
  maxFontSize?: number,
) {
  const element = document.querySelector(selector) as HTMLElement
  const text = element.firstElementChild as HTMLElement
  const currentTextWidth = text.scrollWidth
  const currentFontSize = toNumber(text.style.fontSize)
  const newValue = Math.min(
    Math.max(
      minFontSize ?? 0,
      (toNumber(element.style.width) / currentTextWidth) * currentFontSize,
    ),
    maxFontSize ?? element.scrollHeight - 20,
  )
  text.style.fontSize = newValue + 'px'
}
function toNumber(pixelValue: string): number {
  return Number(pixelValue.replace('px', ''))
}
