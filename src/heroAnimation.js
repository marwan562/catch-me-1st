import gsap from "gsap";
import { SplitText } from "gsap/all";

export const heroAnimation = (container) => {
  const ctx = gsap.context(() => {
    const pathHero = document.getElementById("path-hero");
    const totalLengthPathHero = pathHero?.getTotalLength?.();

    gsap.from(["#image1 img", "#image2 img", "#image3 img"], {
      opacity: 0,
      translateY: 600,
      duration: 3,
      stagger: 0.2,
    });

    const tlBlurLeft = gsap.timeline({ yoyo: true, repeat: -1 });
    
    tlBlurLeft.fromTo(
      "#blur-l",
      {
        translateY: -window.innerWidth,
        translateX: window.innerWidth,
        duration: 20,
      },
      { translateX: 0, translateY: 0, duration: 5 }
    );

    tlBlurLeft.to("#blur-l", {
      translateX: 0,
      translateY: 0,
      duration: 5,
      repeat: 2,
      yoyo: true,
    });

    gsap.fromTo(
      "#blur-r",
      {
        translateY: window.innerWidth,
        translateX: window.innerWidth,
        duration: 20,
      },
      { translateX: 0, translateY: 0, duration: 5 }
    );

    const imagesMouseMove = document.getElementById("images-mouse-move");

    const tl = gsap.timeline({
      defaults: { duration: 0.4, ease: "power2.inOut" },
      yoyo: true,
      repeat: -1,
    });

    tl.fromTo(
      ".mouse",
      {
        scale: 1,
        backgroundColor: "var(--primary)",
      },
      {
        scale: 0.8,
        backgroundColor: "var(--primary-foreground)",
      }
    );

    const handleMouseMove = (e) => {
      if (imagesMouseMove) {
        gsap.to(".mouse", {
          top: e.clientY - 30,
          left: e.clientX - 30,
          duration: 0.2,
          ease: "none",
          opacity: 1,
          scale: 1,
          pointerEvents: "none",
        });
      }
    };

    const handleMouseLeave = () => {
      gsap.to(".mouse", {
        opacity: 0,
        scale: 0,
      });
    };

    if (imagesMouseMove) {
      imagesMouseMove.addEventListener("mousemove", handleMouseMove);
      imagesMouseMove.addEventListener("mouseleave", handleMouseLeave);
    }

    if (pathHero) {
      gsap.fromTo(
        pathHero,
        {
          strokeDasharray: totalLengthPathHero,
          strokeDashoffset: totalLengthPathHero,
        },
        {
          strokeDashoffset: 0,
          duration: 4.5,
          delay: 1,
          ease: "back.out",
        }
      );
    }

    gsap.from(".parag", {
      opacity: 0,
      duration: 3,
      y: 70,
    });

    document.fonts.load("1rem Playfair Display").then(() => {
      const splitTitle = new SplitText(".title", { type: "chars, words" });

      gsap.from(splitTitle.chars, {
        opacity: 0,
        ease: "back.out",
        duration: 2,
        stagger: {
          from: "random",
          each: 0.2,
          repeat: -1,
        },
      });
    });
  }, container);

  return () => ctx.revert();
};
