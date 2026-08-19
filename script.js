const body = document.body
const themeToggle = document.querySelector('.theme-toggle')
const btnTheme = document.querySelector('#btn-theme')
const navToggle = document.querySelector('.nav__hamburger')
const btnHamburger = navToggle.querySelector('i')
const navList = document.querySelector('.nav__list')
const navLinks = document.querySelectorAll('.nav__list .link--nav')

const getStoredTheme = () => {
  const theme = localStorage.getItem('portfolio-theme')
  return theme === 'dark' || theme === 'light' ? theme : 'light'
}

const setTheme = (theme, persist = true) => {
  const isDark = theme === 'dark'

  body.classList.remove('light', 'dark')
  body.classList.add(theme)
  btnTheme.classList.toggle('fa-sun', isDark)
  btnTheme.classList.toggle('fa-moon', !isDark)
  themeToggle.setAttribute('aria-pressed', String(isDark))
  themeToggle.setAttribute(
    'aria-label',
    isDark ? 'Switch to light theme' : 'Switch to dark theme'
  )

  if (persist) {
    localStorage.setItem('portfolio-theme', theme)
  }
}

setTheme(getStoredTheme(), false)

themeToggle.addEventListener('click', () => {
  setTheme(body.classList.contains('dark') ? 'light' : 'dark')
})

const setNavigationOpen = (isOpen) => {
  navList.classList.toggle('display-nav-list', isOpen)
  btnHamburger.classList.toggle('fa-bars', !isOpen)
  btnHamburger.classList.toggle('fa-times', isOpen)
  navToggle.setAttribute('aria-expanded', String(isOpen))
  navToggle.setAttribute(
    'aria-label',
    isOpen ? 'Close navigation' : 'Open navigation'
  )
}

navToggle.addEventListener('click', () => {
  const isOpen = navToggle.getAttribute('aria-expanded') === 'true'
  setNavigationOpen(!isOpen)
})

navLinks.forEach((link) => {
  link.addEventListener('click', () => setNavigationOpen(false))
})

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    setNavigationOpen(false)
  }
})

window.addEventListener('resize', () => {
  if (window.innerWidth > 760) {
    setNavigationOpen(false)
  }
})

const scrollUp = () => {
  const btnScrollTop = document.querySelector('.scroll-top')
  const hasScrolled =
    body.scrollTop > 500 || document.documentElement.scrollTop > 500

  btnScrollTop.style.display = hasScrolled ? 'block' : 'none'
}

document.addEventListener('scroll', scrollUp, { passive: true })

document.querySelector('#footer-year').textContent = new Date().getFullYear()
