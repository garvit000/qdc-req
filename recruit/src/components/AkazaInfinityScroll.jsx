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

    // Zoom Akaza eye from scale 1 to 2 on scroll from top to 50% viewport height
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

    // Fade in castle image from 0 to 1 opacity between 30% and 70% scroll
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

    // Fade in and play video at 70% scroll point
    ScrollTrigger.create({
      trigger: document.body,
      start: "70% top",
      onEnter: () => {
        gsap.to(castleVideo, { opacity: 1, duration: 2 });
        if (castleVideo.paused) {
          castleVideo.play().catch(() => {
            // Autoplay blocked? Add user interaction fallback if needed
          });
        }
      },
    });

    // Clean up ScrollTriggers on unmount
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
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
          backgroundColor: "black",
        }}
      >
        <img
          ref={akazaEyeRef}
          src="/assets/akaza-eye.png"
          alt="Akaza Eye"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            objectFit: "cover",
            transformOrigin: "center center",
            willChange: "transform",
          }}
        />
        <img
          ref={castleImageRef}
          src="/assets/infinity-castle.jpg"
          alt="Infinity Castle"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            objectFit: "cover",
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
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            objectFit: "cover",
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
          padding: "100px 20px",
          maxWidth: 600,
          margin: "0 auto",
          textAlign: "center",
        }}
      >
        <h1>Welcome to the Demon World</h1>
        <p>Scroll to dive into the Infinity Castle...</p>
        {/* Your other page content here */}
      </div>
    </>
  );
}
