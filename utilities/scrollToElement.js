const scrollToElement = (selector) => {
  const element = document.querySelector(selector)
  element.scrollIntoView({
    behavior: 'smooth',
    block: 'start',
    inline: 'nearest',
  })
}

export default scrollToElement