import gsap from "gsap";

export const navbarAnimation = (container) => {
  const ctx = gsap.context(() => {
    const path = document.getElementById("path");
    const totalLength = path.getTotalLength();

    gsap.from(".logo", {
      duration: 3,
      motionPath: {
        path: path,
        align: path,
        alignOrigin: [0, 0.5],
      },
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

    const path2 = document.getElementById("path2");
    const totalLength2 = path2.getTotalLength();

    gsap.from("#circle", {
      duration: 3.5,
      scale: 1.5,
      opacity: 0,
      motionPath: {
        path: path2,
        align: path2,
        alignOrigin: [0.5, 0.5],
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
      onComplete: () => invisablePainBruch.play(),
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

    gsap.from(".paint-bruch-big", {
      opacity: 0,
      y: 20,
      rotate: 50,
      delay: 3,
      ease: "power2.inOut",
    });

    gsap.to(".paint-bruch-big", {
      delay: 3,
      ease: "power2.inOut",
    });
  }, container);

  return () => ctx.revert();
};
