// script.js

// Highlight nav links based on scroll position
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav a");

window.addEventListener("scroll", () => {
  let currentSection = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 80;
    if (pageYOffset >= sectionTop) {
      currentSection = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${currentSection}`) {
      link.classList.add("active");
    }
  });
});

// Optional: Scroll to top button (if added)
const scrollBtn = document.getElementById("scrollToTop");

if (scrollBtn) {
  scrollBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  window.addEventListener("scroll", () => {
    scrollBtn.style.display = window.scrollY > 300 ? "block" : "none";
  });
}// Contact form validation
document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault(); // prevent actual form submission

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();
  const msgBox = document.getElementById("formMsg");

  if (!name || !email || !message) {
    msgBox.style.color = "red";
    msgBox.textContent = "Please fill in all fields.";
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    msgBox.style.color = "red";
    msgBox.textContent = "Please enter a valid email address.";
    return;
  }

  msgBox.style.color = "green";
  msgBox.textContent = "Message sent successfully! (This is a demo)";
  
  // Reset form (optional)
  this.reset();
});
document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();
  const msgBox = document.getElementById("formMsg");

  const recaptchaResponse = grecaptcha.getResponse();

  if (!name || !email || !message) {
    msgBox.style.color = "red";
    msgBox.textContent = "Please fill in all fields.";
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    msgBox.style.color = "red";
    msgBox.textContent = "Please enter a valid email address.";
    return;
  }

  if (!recaptchaResponse) {
    msgBox.style.color = "red";
    msgBox.textContent = "Please verify that you're not a robot.";
    return;
  }

  msgBox.style.color = "green";
  msgBox.textContent = "Message sent successfully! (This is a demo)";
  this.reset();
  grecaptcha.reset(); // Reset reCAPTCHA
});

