function removeCSSClass(element: HTMLElement, className: string) {
  const reg = new RegExp('(\\s|^)' + className + '(\\s|$)');
  element.className = element.className.replace(reg, ' ');
}

function addCSSClass(element: HTMLElement, className: string) {
  element.classList.add(className);
}

export { removeCSSClass, addCSSClass };
