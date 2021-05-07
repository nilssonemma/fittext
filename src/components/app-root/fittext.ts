export function fittext(
  selector: string,
  minFontSize?: number,
  maxFontSize?: number,
) {
  const element = document.querySelector(selector) as HTMLElement
  const text = element.firstElementChild as HTMLElement
  const currentTextWidth = text.scrollWidth
  const currentFontSize =
    text.style.fontSize.replace('px', '') ?? minFontSize ?? 12
  const newValue = Math.min(
    Math.max(
      minFontSize ?? 0,
      (Number(element.style.width.replace('px', '')) / currentTextWidth) *
        Number(currentFontSize),
    ),
    maxFontSize ?? 45,
  )
  text.style.fontSize = newValue + 'px'
}
