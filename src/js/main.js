const hamburger = document.querySelector(".toggle__nav");
const primaryNav = document.querySelector(".primary__nav--list");
const navList = document.querySelectorAll(".primary__nav--list");
hamburger.addEventListener("click", toggleNav);

function toggleNav(){
    hamburger.classList.toggle("active");
    primaryNav.classList.toggle("active");
}

// resets nav when nav or body is clicked
navList.forEach(e => {
    e.addEventListener("click", resetNav)
})

function resetNav(){
    hamburger.classList.remove("active");
    primaryNav.classList.remove("active");
}