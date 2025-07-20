import gsap from "gsap";
import { MotionPathPlugin, ScrollTrigger, SplitText } from "gsap/all";
import { navbarAnimation } from "./navbarAnimation";
import { heroAnimation } from "./heroAnimation";
import { aboutMeAnimation } from "./aboutmeAnimation";

gsap.registerPlugin(MotionPathPlugin, ScrollTrigger, SplitText);

// Change theme
const btnMenu = document.getElementById("btn-menu");
const menu = document.getElementById("menu");
btnMenu.addEventListener("click", () => {
  menu.classList.toggle("hidden");
});
const select = document.getElementById("theme-select");
select.addEventListener("change", (e) => {
  const theme = e.target.value;
  if (theme) {
    document.documentElement.setAttribute("data-theme", `light-${theme}`);
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const navbarContainer = document.getElementById("navbar");
  const heroSectionContainer = document.getElementById("hero-section");
  const aboutMeContainer = document.getElementById("about-me-section");

  const revertNavbar = navbarAnimation(navbarContainer);
  const revertHero = heroAnimation(heroSectionContainer);
  const revertAboutMe = aboutMeAnimation(aboutMeContainer);

  window.addEventListener("beforeunload", () => {
    revertNavbar();
    revertHero();
    revertAboutMe();
  });
});
