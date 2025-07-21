import gsap from "gsap";
import {
  DrawSVGPlugin,
  MorphSVGPlugin,
  MotionPathPlugin,
  ScrollTrigger,
  SplitText,
} from "gsap/all";
import { navbarAnimation } from "./navbarAnimation";
import { heroAnimation } from "./heroAnimation";
import { aboutMeAnimation } from "./aboutmeAnimation";
import { servicesAnimation } from "./servicesAnimation";

gsap.registerPlugin(
  MotionPathPlugin,
  ScrollTrigger,
  SplitText,
  DrawSVGPlugin,
  MorphSVGPlugin
);

document.addEventListener("DOMContentLoaded", () => {
  const navbarContainer = document.getElementById("navbar");
  const heroSectionContainer = document.getElementById("hero-section");
  const aboutMeContainer = document.getElementById("about-me-section");
  const serviceContainer = document.getElementById("service-section");

  const revertNavbar = navbarAnimation(navbarContainer);
  const revertHero = heroAnimation(heroSectionContainer);
  const revertAboutMe = aboutMeAnimation(aboutMeContainer);
  const revertServcie = servicesAnimation(serviceContainer);

  window.addEventListener("beforeunload", () => {
    revertNavbar();
    revertHero();
    revertAboutMe();
    revertServcie();
  });
});
