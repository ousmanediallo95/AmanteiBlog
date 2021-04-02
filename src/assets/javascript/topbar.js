const iconMobile = document.querySelector('.header-menu-icon');
const headerMenu = document.querySelector('.header-menu');
let isMenuopen = false;
let mobileMenuDom;

const closeMenu = () => {
    mobileMenuDom.classList.remove('open');
};

const createMobileMenu = () => {
    mobileMenuDom = document.createElement('div');
    mobileMenuDom.classList.add('mobile-menu');
    mobileMenuDom.addEventListener('click', (event) => {
        event.stopPropagation();
    })
    mobileMenuDom.append(headerMenu.querySelector('ul').cloneNode(true));
    headerMenu.append(mobileMenuDom);

};



const openMenu = () => {
    if (mobileMenuDom) {

    } else {
        createMobileMenu();
    }
    mobileMenuDom.classList.add('open');
};


const toggleMobileMenu = (event) => {
    if (isMenuopen) {
        closeMenu();
    } else {
        openMenu();
    }
    isMenuopen = !isMenuopen;

};

iconMobile.addEventListener('click', (event) => {
    event.stopPropagation();
    toggleMobileMenu();
});


window.addEventListener('click', event => {
    if (isMenuopen) {
        toggleMobileMenu();
    }
})

window.addEventListener('resize', event => {
    if (window.innerWidth > 480 && isMenuopen) {
        toggleMobileMenu();

    }
})