import gsap from "gsap";

let listeners = [];

export const navbarAnimation = (container) => {
  const ctx = gsap.context(() => {
    // open menu
    const container = document.getElementById("background-menu");
    const btnMenu = document.getElementById("btn-menu-nav");
    const btnCloseMenu = document.getElementById("btn-close-menu-nav");
    const menu = document.getElementById("menu-nav");
    const video = document.getElementById("video");
    const showVideoMouse = document.getElementById("showVideoMouse");

    let isMenuOpen = false;

    const toggleMenu = () => {
      isMenuOpen = !isMenuOpen;

      if (isMenuOpen) {
        // opening the menu
        gsap.to(menu, {
          y: "0%",
          opacity: 1,
          duration: 0.5,
          ease: "power4.out",
        });

        gsap
          .timeline()
          .from(".video", {
            delay: 0.4,
            x: -60,
            duration: 0.4,
            opacity: 0,
          })
          .from(".controls", {
            y: 20,
            stagger: { each: 0.3 },
            duration: 0.8,
            opacity: 0,
          });

        gsap.from(".content-menu", {
          x: 40,
          stagger: { each: 0.3 },
          duration: 1,
          scale: 0,
          opacity: 0,
          ease: "power1.in",
        });

        gsap.to(".square", {
          opacity: 1,
          scale: 1,
          stagger: {
            each: 0.01,
            from: "random",
          },
          duration: 0.1,
          ease: "power3.in",
        });
      } else {
        // closing the menu
        gsap.to(menu, {
          y: "-100%",
          opacity: 0,
          duration: 0.5,
          ease: "power4.in",
        });

        gsap.to(".square", {
          opacity: 0,
          scale: 0.5,
          duration: 0.4,
          ease: "power1.inOut",
        });
      }
    };

    btnMenu.addEventListener("click", toggleMenu);
    btnCloseMenu.addEventListener("click", toggleMenu);
    const tl = gsap.timeline();
    const handleMouseEnter = () => {
      tl.to(showVideoMouse, {
        scale: 1,
        opacity: 1,
        duration: 0.5,
        ease: "power3.out",
      });
      tl.to(showVideoMouse, {
        opacity: 0.7,

        duration: 0.3,
        ease: "power3.out",
      });
    };

    const handleMouseMove = (e) => {
      const rect = video.getBoundingClientRect();
      gsap.to(showVideoMouse, {
        top: e.clientY - rect.top - 10,
        left: e.clientX - rect.left - 10,
        duration: 0.2,
        ease: "none",
      });
    };

    const handleMouseActive = () => {
      gsap.to(showVideoMouse, {
        scale: 2,
      });
    };

    const handleMouseLeave = () => {
      gsap.to(showVideoMouse, {
        scale: 0,
        opacity: 0,
        duration: 0.3,
        ease: "power3.in",
      });
    };

    video.addEventListener("mouseenter", handleMouseEnter);
    video.addEventListener("mousemove", handleMouseMove);
    video.addEventListener("mouseleave", handleMouseLeave);
    video.addEventListener("click", handleMouseActive);

    const squareSize = 40; // px

    const vw = window.innerWidth 
    const vh = window.innerHeight / 2 

    const cols = Math.ceil(vw / squareSize);
    const rows = Math.ceil(vh / squareSize);
    const total = cols * rows;

    for (let i = 0; i < total; i++) {
      const square = document.createElement("div");
      square.className = "square";
      container.appendChild(square);
    }

    const squares = document.querySelectorAll(".square");
    console.log(squares);

    // Change theme
    const btnPaleteMenu = document.getElementById("btn-menu");
    const menuPalete = document.getElementById("menu");
    btnPaleteMenu.addEventListener("click", () => {
      menuPalete.classList.toggle("hidden");
    });
    const select = document.getElementById("theme-select");
    select.addEventListener("change", (e) => {
      const theme = e.target.value;
      if (theme) {
        document.documentElement.setAttribute("data-theme", `light-${theme}`);
      }
    });

    const svgPath1 = document.getElementById("path1-svg");
    const path = document.getElementById("path");
    const totalLength = path.getTotalLength();

    gsap.from(".logo", {
      duration: 3,
      motionPath: {
        path: path,
        align: path,
        alignOrigin: [0.5, 1],
      },
      onComplete: () => svgPath1.classList.add("hidden"),
    });

    gsap.fromTo(
      path,
      { strokeDasharray: totalLength, strokeDashoffset: 0 },
      {
        strokeDashoffset: -totalLength,
        delay: 1,
        duration: 3.5,
        ease: "power2.inOut",
      }
    );

    const svgPath2 = document.getElementById("path2-svg");
    const path2 = document.getElementById("path2");
    const totalLength2 = path2.getTotalLength();

    gsap.from("#circle", {
      duration: 3.5,
      scale: 1.5,
      opacity: 0,
      motionPath: {
        path: path2,
        align: path2,
        alignOrigin: [0.5, 1],
      },
      ease: "power2.inOut",
    });

    gsap.to("#circle", {
      delay: 3,
      opacity: 0,
      scale: 0,
    });

    const paintBruch = document.getElementById("paint-bruch");

    const invisablePainBruch = gsap
      .to(paintBruch, {
        opacity: 0,
        duration: 0.5,
        onComplete: () => {
          paintBruch.classList.add("hidden");
        },
      })
      .pause();

    gsap.from(paintBruch, {
      duration: 3.5,
      scale: 3,
      opacity: 0,
      motionPath: {
        path: path2,
        align: path2,
        autoRotate: true,
        alignOrigin: [0, 1],
      },
      ease: "power2.inOut",
      onComplete: () => {
        invisablePainBruch.play();
        svgPath2.classList.add("hidden");
      },
    });

    gsap.fromTo(
      path2,
      { strokeDasharray: totalLength2, strokeDashoffset: 0 },
      {
        strokeDashoffset: totalLength2,
        delay: 0.7,
        duration: 3,
        ease: "power2.inOut",
      }
    );

    gsap.from(".palette-color", {
      opacity: 0,
      y: 20,
      rotate: 50,
      delay: 3,
      ease: "power2.inOut",
    });

    gsap.to(".palette-color", {
      delay: 3,
      ease: "power2.inOut",
      x: -5,
      y: 5,
    });
  }, container);

  return () => ctx.revert();
};
