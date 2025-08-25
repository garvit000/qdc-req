gsap.registerPlugin(ScrollTrigger);

// Flag to track if animations have been initialized
let animationsInitialized = false;

// Initialize animations only once
function initializeAnimations() {
    if (animationsInitialized) return;
    animationsInitialized = true;

    // Zoom into Akaza's eye (only once)
    gsap.to("#akaza-eye", {
        scale: 2,
        scrollTrigger: {
            trigger: "body",
            start: "top top",
            end: "50% top",
            scrub: true,
            once: true, // Only trigger once
            onComplete: () => {
                // After zoom completes, start fading in the castle image
                gsap.to("#castle-image", {
                    opacity: 1,
                    duration: 1,
                    ease: "power2.out"
                });
            }
        }
    });

    // Fade in the Infinity Castle image
    gsap.to("#castle-image", {
        opacity: 1,
        scrollTrigger: {
            trigger: "body",
            start: "30% top",
            end: "70% top",
            scrub: true,
            once: true // Only trigger once
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
            once: true, // Only trigger once
            onComplete: () => {
                // Start video playback when it becomes visible
                const video = document.getElementById("castle-video");
                if (video) {
                    video.play().catch(e => console.log("Video autoplay failed:", e));
                }
            }
        }
    });
}

// Control video playback based on scroll position (only after video is visible)
ScrollTrigger.create({
    trigger: "body",
    start: "70% top",
    end: "bottom bottom",
    scrub: true,
    once: true, // Only trigger once
    onUpdate: (self) => {
        const video = document.getElementById("castle-video");
        if (video && video.duration && video.readyState >= 2) {
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
            // Pause manual control since we're letting it play naturally
            video.pause();
        }
    }
});

// Initialize animations when the page loads
window.addEventListener('load', initializeAnimations);

// Fallback: initialize animations if load event doesn't fire
setTimeout(initializeAnimations, 1000);