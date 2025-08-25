gsap.registerPlugin(ScrollTrigger);

// Zoom into Akaza's eye
gsap.to("#akaza-eye", {
  scale: 2,
  scrollTrigger: {
    trigger: "body",
    start: "top top",
    end: "50% top",
    scrub: true,
  }
});

// Fade in the Infinity Castle image from the yellow of the eye
gsap.to("#castle-image", {
  opacity: 1,
  scrollTrigger: {
    trigger: "body",
    start: "30% top",
    end: "70% top",
    scrub: true,
  }
});
gsap.to("#castle-video", {
  opacity: 1,
  scrollTrigger: {
    trigger: "body",
    start: "60% top",
    end: "90% top",
    scrub: true,
  }
});
// Fade in and start playing the video after the image is visible
ScrollTrigger.create({
  trigger: "body",
  start: "70% top",
  onEnter: () => {
    gsap.to("#castle-video", { opacity: 1, duration: 2 });
    gsap.to("#castle-image", { opacity: 0, duration: 2 }); // hide image
    const video = document.getElementById("castle-video");
    video.play();
  }
});
