const hamburger = document.querySelector(".toggle__nav");
const primaryNav = document.querySelector(".primary__nav--list");
hamburger.addEventListener("click", toggleNav);

function toggleNav(){
    hamburger.classList.toggle("active");
    primaryNav.classList.toggle("active");
}