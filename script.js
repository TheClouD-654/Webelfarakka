const navToggle = document.getElementById("navToggle");
const primaryNav = document.getElementById("primaryNav");
const navLinks = primaryNav.querySelectorAll("a");
const revealElements = document.querySelectorAll(".reveal");
const yearNode = document.getElementById("year");
const themeToggle = document.getElementById("themeToggle");

const THEME_KEY = "webel-theme";

function applyTheme(theme) {
  const resolvedTheme = theme === "dark" ? "dark" : "light";
  document.body.setAttribute("data-theme", resolvedTheme);

  if (themeToggle) {
    themeToggle.textContent = resolvedTheme === "dark" ? "Light Mode" : "Dark Mode";
    themeToggle.setAttribute(
      "aria-label",
      resolvedTheme === "dark" ? "Switch to light mode" : "Switch to dark mode"
    );
    themeToggle.setAttribute("aria-pressed", String(resolvedTheme === "dark"));
  }
}

applyTheme(localStorage.getItem(THEME_KEY) || "light");

// Mobile menu toggle
navToggle.addEventListener("click", () => {
  const isOpen = primaryNav.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

// Close menu after selecting a link in mobile view
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    primaryNav.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const currentTheme = document.body.getAttribute("data-theme");
    const nextTheme = currentTheme === "dark" ? "light" : "dark";
    document.body.classList.add("theme-transition");
    applyTheme(nextTheme);
    localStorage.setItem(THEME_KEY, nextTheme);
    window.setTimeout(() => {
      document.body.classList.remove("theme-transition");
    }, 500);
  });
}

// Section reveal animation
const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
);

revealElements.forEach((element) => revealObserver.observe(element));

// Dynamic footer year
yearNode.textContent = new Date().getFullYear();
