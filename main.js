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

// Remove selection from the previous item and select the new one
const active = document.querySelector('.category__btn.selected');
active.classList.remove('selected');
const target = e.target.nodeName === 'BUTTON' ? e.target : e.target.parentNode;
target.classList.add('selected');
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

// 1. Take all the section elements
// 2. Observe all section using IntersectionObserver
// 3. Activate the item corresponding to the displayed section

const sectionIds = [
    '#home',
    '#about',
    '#skills',
    '#work',
    '#testimonials',
    '#contact',
];

const sections = sectionIds.map(id => document.querySelector(id));
const navItems = sectionIds.map(id => 
    document.querySelector(`[data-link="${id}"]`));

// console.log(sections);
// console.log(navItems);
let selectedNavIndex;
let selectedNavItem = navItems[0];
function selectNavItem(selected) {
            selectedNavItem.classList.remove('active');
            selectedNavItem = selected;
            // const navItem = navItems[selectedIndex];
            // navItem.classList.add('active');
            selectedNavItem.classList.add('active');
}
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.3,
}

const observerCallback = (entries, observer) => {
    entries.forEach(entry => {
        // console.log(entry.target);
        if(!entry.isIntersecting && entry.intersectionRatio > 0) {
            const index = sectionIds.indexOf(`#${entry.target.id}`);
            // console.log(index, entry.target.id);
            // Getting up page when scrolling down
            if(entry.boundingClientRect.y < 0) {
                selectedNavIndex = index + 1;
            }
            else{
                selectedNavIndex = index - 1;
            }
            // selectedNavItem.classList.remove('active');
            // selectedNavItem = navItems[selectedIndex];
            // const navItem = navItems[selectedIndex];
            // navItem.classList.add('active');
            // selectedNavItem.classList.add('active');
        }
    });
};

const observer = new IntersectionObserver(observerCallback, observerOptions);
sections.forEach(section => observer.observe(section));