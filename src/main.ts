import { el, mount, setChildren } from 'redom'
import './scss/main.scss'

import iconMoonSvg from './assets/imgs/icon-moon-night.svg'
import iconSunSvg from './assets/imgs/icon-sun.svg'

const header: HTMLElement = el('header', { class: 'container header' })
const themeSwitchBlock: HTMLDivElement = el('div', { class: 'header__theme-switcher theme-switch-block' })
const btnLightTheme: HTMLButtonElement = el('button', { class: 'btn theme-switch-block__btn theme-switch-block__btn_light' },
  el('img', { src: iconSunSvg, class: 'theme-switch-block__img' })
)
btnLightTheme.addEventListener('click', (e: MouseEvent) => {
  document.documentElement.setAttribute('data-theme', 'light')
  // console.log(!((root.getAttribute('data-theme') !== 'light')))
})
const btnDarkTheme: HTMLButtonElement = el('button', { class: 'btn theme-switch-block__btn theme-switch-block__btn_dark' },
  el('img', { src: iconMoonSvg, class: 'theme-switch-block__img' })
)
btnDarkTheme.addEventListener('click', (e: MouseEvent) => {
  document.documentElement.setAttribute('data-theme', 'dark')
  // console.log(!(root.getAttribute('data-theme') !== 'dark'))
})
setChildren(themeSwitchBlock, [btnLightTheme, btnDarkTheme])
mount(header, themeSwitchBlock)

const footer: HTMLElement = el('footer', { class: 'container footer' })
const footerInfoText: string = 'Created by Anna Tuluptseva, 2024. All rights reserved.'
const footerInfo: HTMLDivElement = el('div', { class: 'footer__info' }, footerInfoText)
mount(footer, footerInfo)

const main: HTMLElement = el('main', { class: 'container main' })
const mainSection: HTMLDivElement = el('div', { class: 'section section_main' })
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
  name: string

  constructor (type: string, subtype: string, name: string, txt: HTMLSpanElement[] | string) {
    this.name = `${name}-${type}`
    this.element = el('a', { class: `${type} ${type}_${subtype} ${name}-${type}` }, txt)
  }
}

// function return random milliseconds in number type
function returnRandomMs (max: number): number {
  return Math.floor(Math.random() * max) * 100
}

// Each letter of a main anchor if independent <span> element,
// it's made in order to animation of each letter would be possible
mainAnchors.forEach((e: Anchor) => {
  const mainNavLi: HTMLLIElement = el('li', { class: 'li main-nav__li' })
  const animPortLetterDelay: number = 1000
  const amoutOfSymbols: number = e.txt.length // amount of symbols in the anchor text
  const letters: HTMLSpanElement[] = e.txt.split('').map((l: string) => {
    const spanLetter: HTMLSpanElement = el('span', { class: `${e.name}__letter ${e.name}-${e.type}__letter_animation` }, `${l}`)
    // if it is ' ', we need set it width otherwise it will be compressed with animation
    if (l === ' ') {
      spanLetter.style.width = '10px'
    }
    // moreover the animation of each main anchor can be different
    // that's why the anchors need to be divided
    if (e.name === 'static-portfolio') {
      const delay: number = returnRandomMs(6)
      // start characteristics for keyframes bluringEnter
      spanLetter.style.opacity = '0'
      spanLetter.style.transform = 'scale(0)'
      spanLetter.style.animationDelay = `${delay}ms`
      window.setTimeout(() => {
        spanLetter.style.opacity = '1'
        spanLetter.style.transform = 'scale(1)'
      }, delay + 2000 / amoutOfSymbols) // animation time / amount of symbols
      return spanLetter
    } if (e.name === 'animated-portfolio') {
      const delay: number = returnRandomMs(10)
      // start characteristics for keyframes bluringEnter
      spanLetter.style.opacity = '0'
      spanLetter.style.transform = 'scale(0)'
      spanLetter.style.animationDelay = `${animPortLetterDelay + delay}ms`
      window.setTimeout(() => {
        spanLetter.style.opacity = '1'
        spanLetter.style.transform = 'scale(1)'
      }, animPortLetterDelay + delay + 2000 / amoutOfSymbols) // animation time / amount of symbols
      return spanLetter
    } else {
      return spanLetter
    }
  })
  const anchorText: AnchorElement = new AnchorElement(e.type, e.subtype, e.name, letters)

  // anchorText.element.addEventListener('mouseenter', (e) => {
  //   console.log(anchorText.element)
  //   anchorText.element.classList.add(`${anchorText.name}_hover`)
  // })

  // anchorText.element.addEventListener('mouseenter', (e) => {
  //   console.log(anchorText.element)
  //   anchorText.element.classList.remove(`${anchorText.name}_hover`)
  // })

  mount(mainNavLi, anchorText.element)
  mount(mainNavUl, mainNavLi)
})
mount(mainNav, mainNavUl)
mount(mainSection, mainNav)
mount(main, mainSection)
setChildren(document.body, [header, main, footer])

document.addEventListener('DOMContentLoaded', () => {

})
