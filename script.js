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

// Fade in the video
gsap.to("#castle-video", {
  opacity: 1,
  scrollTrigger: {
    trigger: "body",
    start: "60% top",
    end: "90% top",
    scrub: true,
  }
});

// Control video playback based on scroll position
ScrollTrigger.create({
  trigger: "body",
  start: "70% top",
  end: "bottom bottom",
  scrub: true,
  onUpdate: (self) => {
    const video = document.getElementById("castle-video");
    if (video && video.duration) {
      // Calculate video time based on scroll progress
      const progress = self.progress;
      const targetTime = progress * video.duration;
      
      // Only update if there's a significant difference to avoid jitter
      if (Math.abs(video.currentTime - targetTime) > 0.1) {
        video.currentTime = targetTime;
      }
    }
  },
  onEnter: () => {
    const video = document.getElementById("castle-video");
    if (video) {
      video.pause(); // Pause auto-play since we're controlling it manually
    }
  }
});