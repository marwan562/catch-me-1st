import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";

export const servicesAnimation = (container) => {
  const ctx = gsap.context(() => {
    new SplitText(".service-title", {
      type: "chars, words",
      smartWrap: true,
      autoSplit: true,
      onSplit(self) {
        gsap.from(self.chars, {
          duration: 2,
          stagger: 0.2,
          opacity: 0,
          color: "var(--primary-foreground)",
          x: window.innerWidth,
          ease: "power3.in",
          scrollTrigger: {
            trigger: ".service-title",
            start: "top 60%",
            end: "+=150 60%",
            scrub: 1.5,
          },
        });
      },
    });

    new SplitText(".description-service", {
      type: "chars, words",
      smartWrap: true,
      autoSplit: true,
      onSplit(self) {
        gsap.from(self.words, {
          duration: 0.5,
          opacity: 0,
          ease: "back.out",
          stagger: {
            yoyo: true,
            amount: 2,
            from: "random",
            each: 0.1,
            repeat: -1,
          },
          color: "var(--primary-foreground)",
          scrollTrigger: {
            trigger: ".description-service",
            start: "top 55%",
            toggleActions: "play none none reverse",
          },
        });
      },
    });

    const appendSquareChileInContainer = (container) => {
      for (let i = 0; i < 70; i++) {
        const square = document.createElement("div");
        square.className = "bg-[var(--secondary-foreground)] size-10 z-50";
        container.appendChild(square);
      }
    };

    const images = gsap.utils.toArray(".image");
    const container1 = document.getElementById("squares-img-1");
    const container2 = document.getElementById("squares-img-2");
    appendSquareChileInContainer(container1);
    appendSquareChileInContainer(container2);

    images.forEach((el) => {
      gsap.to([container1.childNodes, container2.childNodes], {
        opacity: 0,
        ease: "back.out",
        duration: 0.5,
        stagger: {
          amount: 1,
          from: "random",
        },
        scrollTrigger: {
          trigger: el,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });
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

    new SplitText(".service", {
      type: "chars, lines",
      mask: "lines",
      smartWrap: true,
      onSplit(self) {
        self.lines.forEach((el) => {
          const splitAboutMeAnim = gsap.from(el, {
            y: 20,
            opacity: 0,
            color: "var(--primary-foreground)",
            duration: 1,
            stagger: 0.1,
            ease: "back.in",
          });
          ScrollTrigger.create({
            animation: splitAboutMeAnim,
            trigger: el,
            start: "top 95%",
            toggleActions: "play none none reverse",
          });
        });
      },
    });

    const startShape = `m150 53.1 30.4 61.5 67.9 9.9-49.1 47.9 11.6 67.6-60.8-31.9L89.3 240l11.6-67.6-49.1-47.9 67.9-9.9L150 53.1z`;
    const heartShape = `M10,30
    A20,20 0,0,1 50,30
    A20,20 0,0,1 90,30
    Q90,60 50,90
    Q10,60 10,30 Z`;

    gsap.to("#circle-path", {
      fill: "var(--primary-foreground)",
    });
    const tl = gsap.timeline({ repeat: -1, yoyo: true });
    tl.to(
      "#circle-path",
      {
        duration: 1,
        morphSVG: startShape,
      },
      "+=1"
    ).to(
      "#circle-path",
      {
        duration: 1,
        morphSVG: heartShape,
      },
      "+=1"
    );

    document.querySelectorAll(".ticker").forEach((ticker) => {
      const inner = ticker.querySelector(".ticker-wrap");
      const content = inner.querySelector(".ticker-text");
      const duration = ticker.getAttribute("data-duration");
      inner.append(content.cloneNode(true));

      const animations = [];
      inner.querySelectorAll(".ticker-text").forEach((element) => {
        const animation = gsap.to(element, {
          x: "-100%",
          repeat: -1,
          duration: duration,
          ease: "linear",
        });
        animations.push(animation);
      });

      ticker.addEventListener("mouseenter", () => {
        animations.forEach((anim) => anim.pause());
      });

      ticker.addEventListener("mouseleave", () => {
        animations.forEach((anim) => anim.play());
      });
    });
  }, container);

  return () => ctx.revert();
};
