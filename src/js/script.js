import * as glitch from './glitch.js';
import * as hoverMove from './hoverMove.js';
import * as navigationControl from './navigation.js';
import * as typeText from './typeText.js';
import * as gitHubAPI from './gitHubApi.js';
import * as blogAPI from './blogAPI.js';
export const theConsole = document.querySelector('.theConsole');

glitch.navLink.forEach(x => {
  x.setAttribute("data-id", `${x.textContent}`);
  x.addEventListener('mouseover', glitch.wordWarp)
});

window.addEventListener('load', glitch.reset);