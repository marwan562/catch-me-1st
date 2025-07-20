import gsap from "gsap";
import { SplitText, ScrollTrigger } from "gsap/all";

export const aboutMeAnimation = (container) => {
  const ctx = gsap.context(() => {
    const images = gsap.utils.toArray(".image");
    images.forEach((el) => {
      gsap.from(el, {
        yPercent: -100,
        scrollTrigger: {
          trigger: el,
          start: "top 60%",
          toggleActions: "play none none reverse",
        },
      });
    });

    new SplitText(".aboutme", {
      type: "chars, lines",
      mask: "lines",
      onSplit(self) {
        self.lines.forEach((el) => {
          const splitAboutMeAnim = gsap.from(el, {
            y: 20,
            x: -20,
            opacity: 0,
            duration: 1,
            ease: "power2.in",
          });
          ScrollTrigger.create({
            animation: splitAboutMeAnim,
            trigger: el,
            start: "top bottom",
            toggleActions: "play none none reverse",
          });
        });
      },
    });

    // gsap.from("#aboutme-text", {
    //   y: 50,
    //   opacity: 0,
    //   duration: 0.7,
    //   scrollTrigger: {
    //     trigger: "#aboutme-text",
    //     start: "top 80%",
    //     toggleActions: "play none none reverse",
    //   },
    // });

    SplitText.create("#aboutme-text", {
      type: "chars, words, lines",
      autoSplit: true,
      smartWrap: true,
      onSplit: (self) => {
        return gsap.from(self.chars, {
          opacity: 0,
          color: "var(--primary-foreground)",
          ease: "power2.in",
          stagger: 0.1,
          y: 10,
          scrollTrigger: {
            scrub: 1.5,
            trigger: "#aboutme-text",
            start: "top 70%",
            end: "+=400px",
          },
        });
      },
    });

    // Step 1: Select elements
    const btns = gsap.utils.toArray("#btn");
    console.log(btns);

    btns.forEach((btn) => {
      gsap.from(btn, {
        xPercent: -50,
        opacity: 0,
        ease: "power2.in",
        scrollTrigger: {
          trigger: btn,
          start: "top 91%",
          markers: true,
          toggleActions: "play none none reverse",
        },
      });
    });

    gsap.to("#arrow-down", {
      ease: "none",
      scrollTrigger: {
        trigger: "#arrow-down",
        start: "top center",
        end: "+=500px",
        scrub: 2,
        pin: true,
      },
    });
  }, container);

  return () => ctx.revert();
};
