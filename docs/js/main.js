$(document).ready(function () {

    let containerEl = document.querySelector ('#projects-cards');
    let mixer = mixitup(containerEl, {
        classNames: {
            block: ""
        }
    });

})

const filterToggles = document.querySelectorAll('.projects__menu button');
const portfolioBigCards = document.querySelectorAll('.project__card');

for (let i = 0; i < filterToggles.length; i++) {
    filterToggles[i].addEventListener('click', function () {
        if (i == 0) {
            for (let j = 0; j < 2; j++) {
                portfolioBigCards[j].classList.add('project__card--big')
            }
        } else {
            for (let j = 0; j < 2; j++) {
                portfolioBigCards[j].classList.remove('project__card--big')
            }
        }
    });
}