import { el, mount, setChildren } from 'redom'
import './scss/main.scss'

const footer: HTMLElement = el('footer', { class: 'footer' })
const footerInfoText: string = 'Created by Anna Tuluptseva, 2024. All rights reserved.'
const footerInfo: HTMLDivElement = el('div', { class: 'footer__info' }, footerInfoText)
mount(footer, footerInfo)

const mainSection: HTMLElement = el('section', { class: 'section section_main' })
const mainNav: HTMLElement = el('nav', { class: 'nav main-nav' })
const mainNavUl: HTMLUListElement = el('ul', { class: 'ul main-nav__ul' })

interface Anchor {
  type: 'anchor'
  subtype: string
  name: string
  txt: string
}

const mainAnchors: Anchor[] = [
  {
    type: 'anchor',
    subtype: 'main',
    name: 'static-portfolio',
    txt: 'Портфолио'
  },
  {
    type: 'anchor',
    subtype: 'main',
    name: 'animated-portfolio',
    txt: 'Анимированное портфолио'
  }
]

class AnchorElement {
  element: HTMLAnchorElement

  constructor (type: string, subtype: string, name: string, txt: HTMLSpanElement[] | string) {
    this.element = el('a', { class: `${type} ${type}_${subtype} ${name}-${type}` }, txt)
  }
}

// function return random milliseconds in number type
function returnRandomMs (max: number): number {
  return Math.floor(Math.random() * max) * 100
}

// Each letter of a main anchor if independent <span> element,
// it's made in order to animation of each letter would be possible
mainAnchors.forEach((e) => {
  const mainNavLi: HTMLLIElement = el('li', { class: 'li main-nav__li' })
  const letters: HTMLSpanElement[] = e.txt.split('').map((l: string) => {
    const spanLetter: HTMLSpanElement = el('span', { class: `${e.name}__letter ${e.name}__letter_animation` }, `${l}`)
    // moreover the animation of each main anchor can be different
    // that's why the anchors need to be divided
    if (e.name === 'static-portfolio') {
      const delay: number = returnRandomMs(6)
      spanLetter.style.opacity = '0'
      spanLetter.style.transform = 'scale(0)'
      spanLetter.style.animationDelay = `${delay}ms`
      console.log(spanLetter.style.animationDelay)
      window.setTimeout(() => {
        spanLetter.style.opacity = '1'
        spanLetter.style.transform = 'scale(1)'
      }, delay)
      return spanLetter
    } else {
      return spanLetter
    }
  })
  const letter: AnchorElement = new AnchorElement(e.type, e.subtype, e.name, letters)
  mount(mainNavLi, letter.element)
  mount(mainNavUl, mainNavLi)
})
mount(mainNav, mainNavUl)
mount(mainSection, mainNav)
setChildren(document.body, [mainSection, footer])

document.addEventListener('DOMContentLoaded', () => {

})
