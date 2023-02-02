'use strict';

// Make navbar transparent when it is on the top 
const navbar = document.querySelector('#navbar');
const navbarHeight = navbar.getBoundingClientRect().height;
document.addEventListener('scroll', () => {
    // console.log(window.scrollY);
    // console.log(`navbarHeight: ${navbarHeight}`);
    if (window.scrollY > navbarHeight) {
        navbar.classList.add('navbar--dark');
    }
    else {
        navbar.classList.remove('navbar--dark');
    }

});
// Handle scrolling when tapping on the navbar menu
const navbarMenu = document.querySelector('.navbar__menu');
navbarMenu.addEventListener('click', (event) => {
    const target = event.target;
    const link = target.dataset.link;
    if (link == null) {
        return;
    }
    navbarMenu.classList.remove('open');
    scrollIntoView(link);
});

// Navbar toggle button for smaal screen
const navbarToggleBtn = document.querySelector('.navbar__toggle-btn');
navbarToggleBtn.addEventListener('click', () => {
    navbarMenu.classList.toggle('open');
});

function logItem(e) {
    const item = document.querySelector(`[data-id=${toggle}]`);
    item.toggleAttribute('hidden');
}

const chapters = document.querySelectorAll('#toggle');
chapters.forEach((chapter) => {
chapter.addEventListener('toggle', logItem);
});
