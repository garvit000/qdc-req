import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function AkazaInfinityScroll() {
  const akazaEyeRef = useRef(null);
  const castleImageRef = useRef(null);
  const castleVideoRef = useRef(null);

  useEffect(() => {
    const akazaEye = akazaEyeRef.current;
    const castleImage = castleImageRef.current;
    const castleVideo = castleVideoRef.current;

    // Zoom Akaza eye
    gsap.to(akazaEye, {
      scale: 2,
      ease: "none",
      scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: "50% top",
        scrub: true,
      },
    });

    // Fade in castle image
    gsap.to(castleImage, {
      opacity: 1,
      ease: "none",
      scrollTrigger: {
        trigger: document.body,
        start: "30% top",
        end: "70% top",
        scrub: true,
      },
    });

    // Scroll trigger to show and play video
    ScrollTrigger.create({
      trigger: document.body,
      start: "70% top",
      onEnter: () => {
        gsap.to(castleVideo, { opacity: 1, duration: 2 });
        if (castleVideo.paused) {
          castleVideo.play().catch(() => {
            // Autoplay might be blocked, wait for user interaction
          });
        }
      },
    });

    // Cleanup on unmount
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <>
      <div
        id="background-container"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          overflow: "hidden",
          zIndex: -1,
        }}
      >
        <img
          ref={akazaEyeRef}
          src="/assets/akaza-eye.jpg"
          alt="Akaza Eye"
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            objectFit: "cover",
            top: 0,
            left: 0,
            transformOrigin: "center center",
            willChange: "transform",
          }}
        />
        <img
          ref={castleImageRef}
          src="/assets/infinity_castle.JPG"
          alt="Infinity Castle"
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            objectFit: "cover",
            top: 0,
            left: 0,
            opacity: 0,
            willChange: "opacity",
          }}
        />
        <video
          ref={castleVideoRef}
          src="/assets/infinity-castle.mp4"
          muted
          playsInline
          loop
          preload="auto"
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            objectFit: "cover",
            top: 0,
            left: 0,
            opacity: 0,
            willChange: "opacity",
          }}
        />
      </div>

      <div
        className="content"
        style={{
          position: "relative",
          zIndex: 10,
          color: "white",
          padding: "50px",
          maxWidth: "600px",
          margin: "0 auto",
          textAlign: "center",
        }}
      >
        <h1>Welcome to the Demon World</h1>
        <p>Scroll to dive into the Infinity Castle...</p>
        {/* More content here */}
      </div>
    </>
  );
}
