import { theConsole } from './script.js'

export const navLink = document.querySelectorAll('.nav_link');
export const navBar = document.querySelector('.navBar');
export const btmBar = document.querySelector('.btmNav');
export const openingText = document.querySelector('.opening_text');
const letters = 'abcdefghijklmnopqrstuvwxyz!#$&+1234567890'


export const wordWarp = function() {
    const elem = this.dataset.id;
    let interations = 0;
    const interval = setInterval(() => {
        this.classList.add('afterEffect');
        this.textContent = elem.split("")
        .map((letter, index) => {
            if(index < interations) return elem[index];
            return letters[Math.floor(Math.random() * letters.length)]
        })
        .join("")
        .toUpperCase();
        if(interations >= elem.length) {
            clearInterval(interval);
            this.classList.remove('afterEffect');
        }
        interations += 1 / 3;
    }, 30)
}

export const reset = function() {
    setTimeout(() => {
        openingText.classList.add('hidden');
        theConsole.classList.remove('hidden');
        theConsole.classList.add('console');
        navBar.classList.remove('moveUp');
        btmBar.classList.remove('moveDown');
        // setTimeout(() => navBar.classList.remove('afterEffect'), 1000);
    }, 2000);
}