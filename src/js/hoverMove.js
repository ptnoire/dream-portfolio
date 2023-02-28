import { theConsole } from "./script.js";

export const section = document.querySelector('.section_001');

let isHovering = false;
let rotateX = 0;
let rotateY = 0;

const ROTATION_LIMIT = 30;

section.addEventListener('mouseenter', () => {
  isHovering = true;
});

section.addEventListener('mouseleave', () => {
  isHovering = false;
  rotateX = 0;
  rotateY = 0;
  theConsole.style.transform = `rotateX(-15deg) rotateY(-30deg)`;
});

section.addEventListener('mousemove', (e) => {
  if (isHovering) {
    const sectionRect = section.getBoundingClientRect();
    const centerX = sectionRect.left + sectionRect.width / 2;
    const centerY = sectionRect.top + sectionRect.height / 2;
    const xDiff = e.clientX - centerX;
    const yDiff = centerY - e.clientY;

    rotateX = (yDiff / centerY) * ROTATION_LIMIT;
    rotateY = (xDiff / centerX) * ROTATION_LIMIT;

    theConsole.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  }
});