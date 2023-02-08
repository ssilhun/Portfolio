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
    // console.log(link);
    // const scrollTo = document.querySelector(link);
    // scrollTo.scrollIntoView({behavior: "smooth"});
    navbarMenu.classList.remove('open');
    scrollIntoView(link);
});

// Navbar toggle button for smaal screen
const navbarToggleBtn = document.querySelector('.navbar__toggle-btn');
navbarToggleBtn.addEventListener('click', () => {
    navbarMenu.classList.toggle('open');
});

// Handle click on "contact me" button on home
const HomeContactBtn = document.querySelector('.home__contact');
HomeContactBtn.addEventListener('click', () => {
    scrollIntoView('#contact');

});

// Make home slowly fade to transparent as the window scrolls down
const home = document.querySelector('.home__container');
const homeHeight = home.getBoundingClientRect().height;
document.addEventListener('scroll', () => {
    // console.log(window.scrollY);
    // console.log(`navbarHeight: ${navbarHeight}`);
    // console.log(`home: ${homeHeight}`);
    // console.log(1 - window.scrollY / homeHeight);?
    const opacityControl = 1 - window.scrollY / homeHeight;
    home.style.opacity = opacityControl;
});

// Show "arrow up" buttoon when scrolling down
const arrowUpBtn = document.querySelector('.arrow-up');
document.addEventListener('scroll', () => {
    if (window.scrollY > homeHeight / 2) {
        arrowUpBtn.classList.add('visible');
    }
    else {
        arrowUpBtn.classList.remove('visible');
    }
});

// Handle click on the "arrow up" button
arrowUpBtn.addEventListener('click', () => {
    scrollIntoView('#home');
});

// Projects
const workBtnContainer = document.querySelector('.work__categories');
const projectContainer = document.querySelector('.work__projects');
const projects = document.querySelectorAll('.project');

workBtnContainer.addEventListener('click', (e) => {
    const filter = e.target.dataset.filter || e.target.parentNode.dataset.filter;
    if (filter == null){
        return;
    }
    projectContainer.classList.add('animation-out');

    setTimeout(() => {
        projects.forEach((project) => {
            // console.log(project);
            if(filter === '*' || filter === project.dataset.type){
                project.classList.remove('invisible');
            }
            else{
                project.classList.add('invisible');
            }
        });
    
        // Same way above
        // for(let project of projects){
        //     console.log(project);
        // }
    
        // let project;
        // for(let i=0; i < projects.length; i++) {
        //     project = projects[i];
        //     console.log(project);
        // }
    
        // console.log(filter);

        projectContainer.classList.remove('animation-out');
    }, 300);
});

function scrollIntoView(selector) {
    const scrollTo = document.querySelector(selector);
    scrollTo.scrollIntoView({behavior: "smooth"});
}
