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
      smartWrap: true,
      autoSplit: true,
      deepSlice: true,
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

    const btns = document.querySelectorAll("#btn");

    btns.forEach((btn) => {
      gsap.from(btn, {
        xPercent: -50,
        opacity: 0,
        ease: "power2.in",
        duration: 0.3,
        backgroundColor: "var(--primary-foreground)",
        scrollTrigger: {
          trigger: btn,
          start: "top 91%",
          toggleActions: "play none none reverse",
        },
      });
    });

    const arrowDown = document.getElementById("arrow-down");

    gsap.from(arrowDown, {
      x: -arrowDown.offsetWidth,
      ease: "none",
      scrollTrigger: {
        trigger: arrowDown,
        start: "top 70%",
        toggleActions: "play none none reverse",
        markers: true,
      },
    });

    gsap.from(arrowDown, {
      ease: "none",
      scrollTrigger: {
        trigger: arrowDown,
        start: "top center",
        end: "+=500px",
        scrub: 2,
        pin: true,
      },
    });

    new SplitText(".number", {
      type: "chars, words",
      mask: "chars",
      smartWrap: true,
      autoSplit: true,
      onSplit(self) {
        self.chars.forEach((el) => {
          const splitAboutMeAnim = gsap.from(el, {
            y: 20,
            opacity: 0,
            duration: 1,
            ease: "power2.in",
          });
          ScrollTrigger.create({
            animation: splitAboutMeAnim,
            trigger: el,
            start: "top 90%",
            toggleActions: "play none none reverse",
          });
        });
      },
    });

    const line = document.querySelector("#bouncy-line path");
    const line2 = document.querySelector("#bouncy-line-2 path");

    const circles = document.querySelectorAll(".circle-move");
    const circles2 = document.querySelectorAll(".circle-move-2");

    const here = circles.forEach((el, i) => {
      gsap.to(el, {
        motionPath: {
          path: line,
          align: line,
          autoRotate: true,
          alignOrigin: [0.5, 0.5],
        },
        rotate: 180 * i,
        duration: 4,
        repeat: -1,
        yoyo: true,
        delay: i * 0.5,
        ease: "power1.inOut",
      });
    });

    circles2.forEach((el) => {
      gsap.set(el, {
        autoAlpha: 1,
      });
    });

    circles2.forEach((el, i) => {
      gsap.to(el, {
        motionPath: {
          path: line2,
          align: line2,
          autoRotate: true,
          autofocus: true,
          alignOrigin: [1, 0.5],
        },
        rotate: 180 * (i + 20),
        duration: 4,
        repeat: -1,
        yoyo: true,
        delay: (i + 4) * 0.5,

        ease: "power1.inOut",
      });
    });

    const circleAnim1 = document.getElementById("circle-ani-2");
    const circleAnim2 = document.getElementById("circle-ani-2");
    const circleAnim3 = document.getElementById("circle-ani-3");
    const circleAnim4 = document.getElementById("circle-ani-4");

    const circlesAniTL = gsap.timeline({
      scrollTrigger: {
        trigger: circleAnim1,
        start: "top 95%",
        scrub: true,
      },
      defaults: { ease: "none" },
    });

    circlesAniTL
      .to([circleAnim2, circleAnim3, circleAnim4], {
        rotate: "90deg",
        transformOrigin: "right",
      })
      .to([circleAnim3, circleAnim4], {
        rotate: "180deg",
        transformOrigin: "right",
      })
      .to(circleAnim4, {
        rotate: "270deg",
        transformOrigin: "right",
      })
      .to([circleAnim1, circleAnim2, circleAnim3, circleAnim4], {
        rotate: "360deg",
        transformOrigin: "right",
      });
  }, container);

  return () => ctx.revert();
};
