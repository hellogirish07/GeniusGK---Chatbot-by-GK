let currentSlideIndex = 0;
const slides = document.querySelectorAll(".carousel-slide");
const dots = document.querySelectorAll(".dot");
const themeButtons = document.querySelectorAll(".theme-btn");

// Back to top functionality
const backToTopBtn = document.getElementById("back-to-top");

// Show/hide back to top button based on scroll position
window.addEventListener("scroll", () => {
  if (window.pageYOffset > 300) {
    backToTopBtn.classList.add("show");
  } else {
    backToTopBtn.classList.remove("show");
  }
});

// Smooth scroll to top when button is clicked
backToTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

function showSlide(index) {
  // Hide all slides
  slides.forEach((slide) => slide.classList.remove("active"));
  dots.forEach((dot) => dot.classList.remove("active"));
  themeButtons.forEach((btn) => btn.classList.remove("active"));

  // Show current slide
  slides[index].classList.add("active");
  dots[index].classList.add("active");

  // Update theme button
  const currentTheme = slides[index].getAttribute("data-theme");
  const themeBtn = document.querySelector(
    `[onclick="showTheme('${currentTheme}')"]`
  );
  if (themeBtn) themeBtn.classList.add("active");

  currentSlideIndex = index;
}

function changeSlide(direction) {
  let newIndex = currentSlideIndex + direction;
  if (newIndex >= slides.length) newIndex = 0;
  if (newIndex < 0) newIndex = slides.length - 1;
  showSlide(newIndex);
}

function currentSlide(index) {
  showSlide(index - 1);
}

function showTheme(theme) {
  const slideIndex = theme === "light" ? 0 : 1;
  showSlide(slideIndex);
}

// Auto-advance slides every 5 seconds
setInterval(() => {
  changeSlide(1);
}, 5000);

// Initialize carousel
showSlide(0);

// FAQ accordion toggle
const faqQuestions = document.querySelectorAll(".faq-question");
faqQuestions.forEach((btn) => {
  const item = btn.closest(".faq-item");
  const answer = item.querySelector(".faq-answer");
  answer.style.maxHeight = 0;
  btn.addEventListener("click", () => {
    const isOpen = item.classList.toggle("open");
    btn.setAttribute("aria-expanded", isOpen);
    if (isOpen) {
      answer.style.maxHeight = answer.scrollHeight + "px";
    } else {
      answer.style.maxHeight = 0;
    }
  });
});

// Theme toggle (floating button) with persistence
(() => {
  const bodyElement = document.body;
  const storedTheme = localStorage.getItem("theme");
  const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  const initialTheme = storedTheme || (prefersDark ? "dark" : "light");

  if (initialTheme === "dark") {
    bodyElement.classList.add("dark-mode");
  }
  if (!storedTheme) {
    localStorage.setItem("theme", initialTheme);
  }

  const themeToggleBtn = document.createElement("button");
  themeToggleBtn.type = "button";
  themeToggleBtn.className = "theme-toggle-btn";

  const setIcon = () => {
    const isDark = bodyElement.classList.contains("dark-mode");
    themeToggleBtn.textContent = isDark ? "☀️" : "🌙";
    const label = isDark ? "Switch to light theme" : "Switch to dark theme";
    themeToggleBtn.title = label;
    themeToggleBtn.setAttribute("aria-label", label);
  };

  setIcon();
  document.body.appendChild(themeToggleBtn);

  themeToggleBtn.addEventListener("click", () => {
    const isDark = bodyElement.classList.toggle("dark-mode");
    localStorage.setItem("theme", isDark ? "dark" : "light");
    setIcon();
  });
})();