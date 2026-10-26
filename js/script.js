"use strict";

/* urls */
const scriptUrl =
  "https://script.google.com/macros/s/AKfycbzMbNXrKgfEQExIjDUHP_uccgUqwvJI1CSDJz-hvcOR9lQU2csmW_VXQqRSX7zn3nAL/exec";

/* html elements */
const htmlTag = document.documentElement;
const siteHeader = document.getElementById("site-header");
const hamburgerBtn = document.getElementById("hamburger-btn");
const mobileNav = document.getElementById("mobile-nav");
const mobileLinks = document.querySelectorAll(".mobile-link");
const themeBtn = document.querySelectorAll(".theme-btn");
const contactForm = document.getElementById("contact-form");
const submitBtn = document.getElementById("submit-btn");
const toast = document.getElementById("toast");
const revealEls = document.querySelectorAll(".reveal");

/* Event listener */
hamburgerBtn.addEventListener("click", handleHam);
mobileLinks.forEach((element) => element.addEventListener("click", closeMenu));
themeBtn.forEach((element) => element.addEventListener("click", handleTheme));
contactForm.addEventListener("submit", handleSubmitForm);
window.addEventListener("scroll", handleScroll, { passive: true });

document.getElementById("year").textContent = new Date().getFullYear();
handleScroll();
setupReveal();

function handleTheme() {
  const isDark = htmlTag.classList.toggle("dark");
  try {
    localStorage.setItem("theme", isDark ? "dark" : "light");
  } catch (e) {}
}

function handleScroll() {
  const scrolled = window.scrollY > 10;
  siteHeader.classList.toggle("bg-white/80", scrolled);
  siteHeader.classList.toggle("dark:bg-[#0b0a12]/80", scrolled);
  siteHeader.classList.toggle("backdrop-blur", scrolled);
  siteHeader.classList.toggle("border-slate-200", scrolled);
  siteHeader.classList.toggle("dark:border-white/10", scrolled);
}

function handleHam() {
  const isOpen = hamburgerBtn.classList.toggle("toggleMenu");
  mobileNav.classList.toggle("hidden", !isOpen);
  hamburgerBtn.setAttribute("aria-expanded", isOpen);
}

function closeMenu() {
  hamburgerBtn.classList.remove("toggleMenu");
  mobileNav.classList.add("hidden");
  hamburgerBtn.setAttribute("aria-expanded", false);
}

function setupReveal() {
  if (!("IntersectionObserver" in window)) {
    revealEls.forEach((element) => element.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
  );

  revealEls.forEach((element) => observer.observe(element));
}

function showToast(message, type) {
  toast.textContent = message;
  toast.classList.remove("hidden", "success-toast", "fail-toast");
  toast.classList.add(type);
  setTimeout(() => {
    toast.classList.add("hidden");
  }, 5000);
}

function handleSubmitForm(e) {
  e.preventDefault();

  const originalLabel = submitBtn.innerHTML;
  submitBtn.disabled = true;
  submitBtn.textContent = "Sending…";

  fetch(scriptUrl, { method: "POST", body: new FormData(contactForm) })
    .then((response) => response.json())
    .then((data) => {
      if (data.result === "success") {
        showToast("Thank you! Your message has been sent.", "success-toast");
        contactForm.reset();
      } else {
        showToast(`Error: ${data.error}`, "fail-toast");
      }
    })
    .catch((error) => {
      console.error(error.message);
      showToast("Error sending your message. Please email me directly.", "fail-toast");
    })
    .finally(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalLabel;
    });
}
