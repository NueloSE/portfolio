"use strick";

const hamburgerBtn = document.getElementById("hamburger-btn");
const mobileNav = document.getElementById("mobile-nav");
const readAllBtn = document.getElementById("read-all-btn");
const hiddenAbout = document.getElementById("hidden-about");

hamburgerBtn.addEventListener("click", handleHam);
readAllBtn.addEventListener("click", handleReadAll);

function handleReadAll() {
  hiddenAbout.classList.toggle("hidden");
  if (!hiddenAbout.classList.contains("hidden")) {
    readAllBtn.textContent = "Show Less"
  } else {
    readAllBtn.textContent = "Read More"
  }
}

function handleHam(e) {
  hamburgerBtn.classList.toggle("toggleMenu");
  mobileNav.classList.toggle("hidden");
}
