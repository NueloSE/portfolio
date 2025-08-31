"use strick";

const hamburgerBtn = document.getElementById("hamburger-btn");
const hams = document.querySelectorAll(".ham");
const mobileNav = document.getElementById('mobile-nav')

hamburgerBtn.addEventListener("click", handleHam);

function handleHam(e) {
  hamburgerBtn.classList.toggle("toggleMenu");
  mobileNav.classList.toggle("hidden")
}
