import { blogFetch } from "./blogAPI.js";
import { theConsole } from "./script.js";
import * as typeText from './typeText.js';

const ABOUT_LINK = document.querySelector('.link_1');
const PROJECTS_LINK = document.querySelector('.link_2');
const BLOG_LINK = document.querySelector('.link_3');
const CONTACT_LINK = document.querySelector('.link_4');
const HOME_LINK = document.querySelector('.link_0');
const SECTION_001 = document.querySelector('.section_001');
const SECTION_002 = document.querySelector('.section_002');
const SECTION_003 = document.querySelector('.section_003');
const SECTION_004 = document.querySelector('.section_004');
const SECTION_005 = document.querySelector('.section_005');

const city1 = document.querySelector('.city1');
const city2 = document.querySelector('.city2');
const city3 = document.querySelector('.city3');
const city4 = document.querySelector('.city4');
const city5 = document.querySelector('.city5');


let currentScreen = SECTION_001;
let loadScreen;
let currentConsole;
let transformer = 0;
let angle1 = '';
let angle2 = '';

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

const transformerFunction = (transformer, angle1, angle2) => {
    city1.style.transform = `translateX(${transformer}%) rotateX(${angle1}) rotateY(${angle2})`;
    city2.style.transform = `translateX(${transformer}%) rotateX(${angle1}) rotateY(${angle2})`;
    city3.style.transform = `translateX(${transformer}%) rotateX(${angle1}) rotateY(${angle2})`;
    city4.style.transform = `translateX(${transformer}%) rotateX(${angle1}) rotateY(${angle2})`;
    city5.style.transform = `translateX(${transformer}%) rotateX(${angle1}) rotateY(${angle2})`;
}

HOME_LINK.addEventListener('click', function() {
    const sectionDefine = SECTION_001;
    navigationFunction(sectionDefine);
    transformer = 0;
    angle1 = '-15deg';
    angle2 = '-30deg';
    transformerFunction(transformer, angle1, angle2);
})

ABOUT_LINK.addEventListener('click', function() {
    const sectionDefine = SECTION_002;
    navigationFunction(sectionDefine);
    typeText.clear();
    setTimeout(() => {
        typeText.type();
    }, 1500);
    transformer = 400;
    angle1 = '-15deg';
    angle2 = '40deg';
    transformerFunction(transformer, angle1, angle2);
})

PROJECTS_LINK.addEventListener('click', function() {
    const sectionDefine = SECTION_003;
    navigationFunction(sectionDefine);
    transformer = 600;
    angle1 = '-15deg';
    angle2 = '20deg';
    transformerFunction(transformer, angle1, angle2);
})

BLOG_LINK.addEventListener('click', function() {
    const sectionDefine = SECTION_004;
    navigationFunction(sectionDefine);
    transformer = 950;
    angle1 = '-15deg';
    angle2 = '-20deg';
    transformerFunction(transformer, angle1, angle2);
    blogFetch();
})

CONTACT_LINK.addEventListener('click', function() {
    const sectionDefine = SECTION_005;
    navigationFunction(sectionDefine);
    transformer = 1200;
    angle1 = '-15deg';
    angle2 = '-40deg';
    transformerFunction(transformer, angle1, angle2);

})