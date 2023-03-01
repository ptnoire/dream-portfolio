const typeText = document.querySelector('.typeText');
let index = 0;
const textToType = typeText.textContent;
export function type() {
  typeText.textContent = textToType.slice(0, index);
  index++;
  if (index <= textToType.length) {
      setTimeout(type, 25);
  }
}
