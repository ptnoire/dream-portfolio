import { theConsole } from "./script.js";
import * as typeText from './typeText.js';

const ABOUT_LINK = document.querySelector('.link_1');
const PROJECTS_LINK = document.querySelector('.link_2');
const BLOG_LINK = document.querySelector('.link_3');
const SECTION_001 = document.querySelector('.section_001');
const SECTION_002 = document.querySelector('.section_002');
const SECTION_003 = document.querySelector('.section_003');
const SECTION_004 = document.querySelector('.section_004');
const theConsole002 = document.querySelector('.theConsole_002');
// const loadingScreenTwo = document.querySelector('.loadingScreen_002');

let currentScreen = SECTION_001;
let loadScreen;
let currentConsole;

const navigationFunction = function(sectionDefine) {
    currentScreen.classList.add('flickerOff');
    setTimeout(() => {
        if(currentScreen) currentScreen.classList.add('hidden');
        currentScreen = sectionDefine;
        currentConsole = currentScreen.querySelector('.theConsole');
        loadScreen = currentScreen.querySelector('.loadingScreen');
        currentConsole.classList.add('hidden');
        loadScreen.classList.remove('hidden');
        loadScreen.classList.add('afterEffect');
        currentScreen.classList.remove('flickerOff');
        currentScreen.classList.remove('hidden');
    }, 500)
    setTimeout(() => {
        loadScreen.classList.add('hidden');
        currentConsole.classList.remove('hidden');
    }, 1250)
}

ABOUT_LINK.addEventListener('click', function() {
    const sectionDefine = SECTION_002;
    navigationFunction(sectionDefine);
})

PROJECTS_LINK.addEventListener('click', function() {
    const sectionDefine = SECTION_003;
    navigationFunction(sectionDefine);
})

BLOG_LINK.addEventListener('click', function() {
    const sectionDefine = SECTION_004;
    navigationFunction(sectionDefine);
})