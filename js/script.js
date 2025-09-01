"use strick";

/* urls */
const scriptUrl =
  "https://script.google.com/macros/s/AKfycbzMbNXrKgfEQExIjDUHP_uccgUqwvJI1CSDJz-hvcOR9lQU2csmW_VXQqRSX7zn3nAL/exec";

/* html elements */
const hamburgerBtn = document.getElementById("hamburger-btn");
const mobileNav = document.getElementById("mobile-nav");
const readAllBtn = document.getElementById("read-all-btn");
const hiddenAbout = document.getElementById("hidden-about");
const contactForm = document.getElementById("contact-form");
const toast = document.getElementById("toast");
const themeBtn = document.getElementById("theme-btn");
const htmlTag = document.getElementById("entire-page");

/* variables */

/* Event listener */
hamburgerBtn.addEventListener("click", handleHam);
readAllBtn.addEventListener("click", handleReadAll);
contactForm.addEventListener("submit", handleSubmitForm);
themeBtn.addEventListener("click", handleTheme);

function handleTheme(e) {
  htmlTag.classList.toggle("dark");

  if (htmlTag.classList.contains("dark")) {
    e.target.src = "../images/light-mode.svg";
  } else {
    e.target.src = "../images/dark-mode.svg";
  }
}

function handleSubmitForm(e) {
  e.preventDefault();

  fetch(scriptUrl, { method: "POST", body: new FormData(contactForm) })
    .then((response) => response.json())
    .then((data) => {
      if (data.result === "success") {
        toast.classList.add("success-toast");
        toast.textContent = `Thank You! Your message has been sent.`;
        contactForm.reset();
      } else {
        toast.classList.add("fail-toast");
        toast.textContent = `Error: ${data.error}`;
      }
      toast.classList.remove("hidden");
      setTimeout(() => {
        toast.classList.add("hidden");
      }, 3000);
    })
    .catch((error) => {
      console.error(error.message);
      toast.textContent = `Error sending your message`;
    });
}

function handleReadAll() {
  hiddenAbout.classList.toggle("hidden");
  if (!hiddenAbout.classList.contains("hidden")) {
    readAllBtn.textContent = "Show Less";
  } else {
    readAllBtn.textContent = "Read More";
  }
}

function handleHam(e) {
  hamburgerBtn.classList.toggle("toggleMenu");
  mobileNav.classList.toggle("hidden");
}
