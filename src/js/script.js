import * as glitch from './glitch.js';
import * as hoverMove from './hoverMove.js';

export const theConsole = document.querySelector('.theConsole');

glitch.navLink.forEach(x => {
  x.setAttribute("data-id", `${x.textContent}`);
  x.addEventListener('mouseover', glitch.wordWarp)
});

glitch.reset();