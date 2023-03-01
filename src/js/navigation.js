import { theConsole } from "./script.js";
import * as typeText from './typeText.js';

const ABOUT_LINK = document.querySelector('.link_1');
const SECTION_001 = document.querySelector('.section_001');
const SECTION_002 = document.querySelector('.section_002');
const theConsole002 = document.querySelector('.theConsole_002');
const loadingScreenTwo = document.querySelector('.loadingScreen_002');

ABOUT_LINK.addEventListener('click', function() {
    theConsole.classList.add('flickerOff');
    setTimeout(() => {
        SECTION_001.classList.add('hidden');
        loadingScreenTwo.classList.add('afterEffect');
        SECTION_002.classList.remove('hidden');
    }, 1000)
    setTimeout(() => {
        loadingScreenTwo.classList.add('hidden');
        theConsole002.classList.remove('hidden');
        typeText.type();
    }, 2000)
})