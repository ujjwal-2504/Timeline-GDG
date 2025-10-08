"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import "./HeroSection.css";
import "./MobileScreenHeroSection.css";

export default function HeroSection() {
  const pageRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const centerImageRef = useRef<HTMLImageElement>(null);
  const titleWrapRef = useRef<HTMLDivElement>(null);
  const pageTitleWrapRef = useRef<HTMLDivElement>(null);
  const cutoutMiddleTextRef = useRef<HTMLParagraphElement>(null);
  const isInitialized = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined" || isInitialized.current) return;

    gsap.registerPlugin(ScrollTrigger);

    const page = pageRef.current;
    const hero = heroRef.current;
    const centerImage = centerImageRef.current;
    const titleWrap = titleWrapRef.current;
    const pageTitleWrap = pageTitleWrapRef.current;

    if (!page || !hero || !centerImage) return;

    const cutouts = gsap.utils.toArray(".cutout") as Element[];
    const coverImages = document.querySelectorAll(
      ".cover-image"
    ) as NodeListOf<HTMLElement>;

    // Wait only for HERO images to load (avoid blocking on entire page)
    const heroImgsNode = hero?.querySelectorAll("img") || ([] as any);
    const images = Array.from(heroImgsNode) as HTMLImageElement[];
    const imgsToWait = images.filter((img) => !img.complete);

    const onAllImagesLoaded = () => {
      if (isInitialized.current) return;

      // Use requestAnimationFrame to wait for browser paint
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          initAnimation();
          isInitialized.current = true;
        });
      });
    };

    if (imgsToWait.length === 0) {
      onAllImagesLoaded();
    } else {
      let loaded = 0;
      imgsToWait.forEach((img) => {
        img.addEventListener("load", () => {
          loaded++;
          if (loaded === imgsToWait.length) onAllImagesLoaded();
        });
        img.addEventListener("error", () => {
          loaded++;
          if (loaded === imgsToWait.length) onAllImagesLoaded();
        });
      });
    }

    function initAnimation() {
      const RANDOM_X = Math.max(window.innerWidth * 0.6, 700);
      const RANDOM_Y = Math.max(window.innerHeight * 0.6, 500);
      const ROTATION = 30;
      const SCALE_MIN = 0.75;
      const SCALE_MAX = 1.15;
      const STAGGER_ASSEMBLE = 0.12;
      const BASE_DURATION_ASSEMBLE = 2.2;
      const STAGGER_COLLAPSE = 0.03;
      const COLLAPSE_DURATION = 1.8;
      const SCRUB = 1.6;
      const CENTER_START_SCALE = 0.75;
      const CENTER_TARGET_SCALE = 1.12;
      const CENTER_EXTRA_ZOOM = 1.18;

      // Kill existing hero triggers
      ScrollTrigger.getAll().forEach((st) => {
        if (st.vars.id === "hero-main" || st.vars.id === "page-title-fadeout") {
          st.kill();
        }
      });

      // CRITICAL: Wait for document height to stabilize
      let lastHeight = document.documentElement.scrollHeight;
      let stabilityCheckCount = 0;

      const checkStability = () => {
        const currentHeight = document.documentElement.scrollHeight;

        if (currentHeight === lastHeight) {
          stabilityCheckCount++;
          if (stabilityCheckCount >= 3) {
            // Height is stable for 3 checks, proceed with animation
            createAnimation();
            return;
          }
        } else {
          stabilityCheckCount = 0;
          lastHeight = currentHeight;
        }

        requestAnimationFrame(checkStability);
      };

      checkStability();

      function createAnimation() {
        const pageHeight = page!.offsetHeight;
        const endDistance = pageHeight;
        const isMobile = window.innerWidth <= 767;

        if (centerImage) {
          centerImage.style.opacity = "0";
          centerImage.style.transform = `scale(${CENTER_START_SCALE})`;
          centerImage.style.transformOrigin = "center center";
        }

        const titleText = document.querySelector("#title-text");
        const ranchiText = document.querySelector("#ranchi");
        const titleLogo = document.querySelector("#title-logo");
        const pageTitleText = document.querySelector("#page-title-text");

        if (titleText) {
          const words = titleText.textContent!.trim().split(/\s+/);
          titleText.innerHTML = words
            .map((word) => `<span class="word">${word}</span>`)
            .join(" ");
        }

        if (ranchiText) {
          ranchiText.innerHTML = `<span class="word">${ranchiText.textContent}</span>`;
        }

        const wordSpans = titleWrap?.querySelectorAll(".word");

        const heroTl = gsap.timeline({
          defaults: { ease: "power4.out" },
          scrollTrigger: {
            trigger: page,
            start: "top top",
            end: "+=" + endDistance,
            // markers: true, // disable to prevent layout shifts
            scrub: SCRUB,
            pin: hero,
            anticipatePin: 1,
            id: "hero-main",
            invalidateOnRefresh: true,
            refreshPriority: 1,
          },
        });

        // Keep title wrapper hidden initially
        if (titleWrap) {
          gsap.set(titleWrap, { opacity: 0 });
        }

        // Ensure initial hidden/offscreen state, then assemble to natural positions
        gsap.set(cutouts, {
          x: () => gsap.utils.random(-RANDOM_X, RANDOM_X),
          y: () => gsap.utils.random(-RANDOM_Y, RANDOM_Y),
          rotation: () => gsap.utils.random(-ROTATION, ROTATION),
          scale: () => gsap.utils.random(SCALE_MIN, SCALE_MAX),
          opacity: 0,
        });

        // Helper: mobile target scale mapping from MobileScreenHeroSection.css
        const getMobileTargetScale = (el: Element): number => {
          const id = (el as HTMLElement).id;
          if (id === "cutout17") return 1.5;
          if (id === "cutout1") return 0.8;
          if (id === "cutout2") return 0.5;
          if (id === "cutout3") return 0.5;
          if (id === "cutout16") return 0.67;
          return 1;
        };

        // Cool entrance animation for page title - runs immediately on page load
        if (pageTitleText) {
          gsap.set(pageTitleText, {
            y: -50,
            scale: 0.8,
            opacity: 0,
            rotationX: 90,
            transformOrigin: "center center",
          });

          // Create separate timeline for immediate page load animation
          const pageTitleTl = gsap.timeline({ delay: 0.5 });
          pageTitleTl.to(pageTitleText, {
            y: 0,
            scale: 1,
            opacity: 1,
            rotationX: 0,
            duration: 1.5,
            ease: "back.out(1.7)",
          });
        }

        heroTl.to(
          cutouts,
          {
            x: 0,
            y: 0,
            rotation: 0,
            scale: (i, el) =>
              isMobile ? getMobileTargetScale(el as Element) : 1,
            opacity: 1,
            duration: BASE_DURATION_ASSEMBLE,
            stagger: STAGGER_ASSEMBLE,
          },
          0
        );

        // Cool entrance animation for cutout middle text after cutouts appear
        const cutoutMiddleText = cutoutMiddleTextRef.current;
        if (cutoutMiddleText) {
          gsap.set(cutoutMiddleText, {
            y: 50,
            scale: 0.5,
            opacity: 0,
            rotationY: 180,
            transformOrigin: "center center",
          });

          heroTl.to(
            cutoutMiddleText,
            {
              y: 0,
              scale: 1,
              opacity: 1,
              rotationY: 0,
              duration: 1.2,
              ease: "back.out(1.8)",
            },
            BASE_DURATION_ASSEMBLE + 0.3
          );
        }

        const getHeroCenter = () => {
          const heroRect = hero!.getBoundingClientRect();
          return {
            x: heroRect.left + heroRect.width / 2,
            y: heroRect.top + heroRect.height / 2,
          };
        };

        const getElCenter = (el: Element) => {
          const r = (el as HTMLElement).getBoundingClientRect();
          return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
        };

        // Title/logo/words: initial state is set later via set(), then animated in

        heroTl.to(
          cutouts,
          {
            x: (i, el) => getHeroCenter().x - getElCenter(el as Element).x,
            y: (i, el) => getHeroCenter().y - getElCenter(el as Element).y,
            scale: 0.12,
            opacity: 0,
            rotation: () => gsap.utils.random(-6, 6),
            duration: COLLAPSE_DURATION,
            stagger: STAGGER_COLLAPSE,
            ease: "power2.in",
          },
          "+=0.15"
        );

        // Disappear animation for cutout middle text with cutout collapse
        if (cutoutMiddleText) {
          heroTl.to(
            cutoutMiddleText,
            {
              y: -40,
              scale: 0.3,
              opacity: 0,
              rotationY: -90,
              duration: COLLAPSE_DURATION * 0.7,
              ease: "power2.in",
            },
            "-=" + COLLAPSE_DURATION * 0.8
          );
        }

        // Scroll-triggered fadeout of page title
        if (pageTitleText) {
          // Create a separate scroll trigger for page title fadeout
          ScrollTrigger.create({
            trigger: page,
            start: "top top",
            end: "+=200",
            scrub: 1,
            id: "page-title-fadeout",
            onUpdate: (self) => {
              const progress = self.progress;
              gsap.to(pageTitleText, {
                y: -30 * progress,
                scale: 1 - 0.1 * progress,
                opacity: 1 - progress,
                rotationX: -45 * progress,
                duration: 0.1,
                ease: "none",
              });
            },
          });
        }

        if (titleWrap) {
          heroTl.to(
            titleWrap,
            {
              x: () => getHeroCenter().x - getElCenter(titleWrap).x,
              y: () => getHeroCenter().y - getElCenter(titleWrap).y,
              scale: 0.45,
              opacity: 0,
              duration: COLLAPSE_DURATION,
              ease: "power2.in",
            },
            "-=" + COLLAPSE_DURATION * 0.7
          );
        }

        heroTl.to(
          centerImage,
          {
            opacity: 1,
            scale: CENTER_TARGET_SCALE,
            duration: COLLAPSE_DURATION + 0.6,
            ease: "power3.out",
            onStart() {
              if (centerImage) centerImage.style.pointerEvents = "none";
            },
          },
          "-=" + COLLAPSE_DURATION * 0.8
        );

        heroTl.to(
          centerImage,
          {
            scale: CENTER_EXTRA_ZOOM,
            duration: 1.2,
            ease: "power2.out",
          },
          "+=0.08"
        );

        heroTl.addLabel("spread");
        const coverImgArr = Array.from(coverImages);

        for (let i = 0; i < 4; i++) {
          const offset =
            i === 0
              ? { opacity: 1, y: -120, duration: 1.5, ease: "back.out(1.2)" }
              : i === 1
              ? { opacity: 1, x: 400, duration: 1.5, ease: "back.out(1.2)" }
              : i === 2
              ? { opacity: 1, y: 150, duration: 1.5, ease: "back.out(1.2)" }
              : { opacity: 1, x: -400, duration: 1.5, ease: "back.out(1.2)" };
          heroTl.to(coverImgArr[i], offset as gsap.TweenVars, "spread");
        }

        ScrollTrigger.matchMedia({
          // For mobile screens (≤ 767px)
          "(max-width: 767px)": function () {
            heroTl.set(titleWrap, {
              x: 0,
              y: 0,
              scale: 1,
              opacity: 0,
              backgroundColor: "#fff",
              width: "450px",
              borderRadius: "16px",
              boxShadow: "0 0 20px 10px #fff",
              padding: "1rem",
              top: 321,
              right: "50%",
              transform: "translateX(-50%)",
            });
          },

          // For larger screens (> 767px)
          "(min-width: 768px)": function () {
            heroTl.set(titleWrap, {
              x: 0,
              y: 0,
              scale: 1,
              opacity: 0,
              backgroundColor: "#fff",
              borderRadius: "16px",
              boxShadow: "0 0 20px 10px #fff",
              padding: "7px 0",
              top: 250,
              width: "45%",
              right: 450,
            });
          },
        });

        heroTl.set(titleLogo, { y: 80, opacity: 0 });
        heroTl.set(Array.from(wordSpans ?? []), { y: 100, opacity: 0 });

        // Reveal title wrapper just before animating its contents
        if (titleWrap) {
          heroTl.to(titleWrap, { opacity: 1, duration: 0.1 });
        }

        heroTl.to(titleLogo, {
          y: 5,
          opacity: 1,
          duration: 0.5,
          ease: "back.out(1.7)",
        });

        heroTl.to(Array.from(wordSpans ?? []), {
          y: 5,
          opacity: 1,
          duration: 1,
          stagger: {
            each: 0.08,
            ease: "power2.out",
          },
          ease: "back.out(1.4)",
        });

        // Final refresh after timeline is created and after window load
        setTimeout(() => {
          ScrollTrigger.refresh();
        }, 100);

        const onWindowLoad = () => {
          ScrollTrigger.refresh();
        };
        window.addEventListener("load", onWindowLoad, { once: true });

        // Also re-invalidate hero timeline on any refresh to ensure dynamic calcs are used
        const refreshHandler = () => {
          heroTl.invalidate();
        };
        ScrollTrigger.addEventListener("refresh", refreshHandler);

        // Cleanup listeners when component unmounts or re-inits
        heroTl.eventCallback("onComplete", () => {
          window.removeEventListener("load", onWindowLoad);
          ScrollTrigger.removeEventListener("refresh", refreshHandler);
        });
      }
    }

    let resizeTimer: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        ScrollTrigger.getAll().forEach((st) => {
          if (
            st.vars.id === "hero-main" ||
            st.vars.id === "page-title-fadeout"
          ) {
            st.kill();
          }
        });
        isInitialized.current = false;

        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            initAnimation();
            isInitialized.current = true;
          });
        });
      }, 300);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      ScrollTrigger.getAll().forEach((st) => {
        if (st.vars.id === "hero-main" || st.vars.id === "page-title-fadeout") {
          st.kill();
        }
      });
      clearTimeout(resizeTimer);
      isInitialized.current = false;
    };
  }, []);

  return (
    <>
      <div className="page" id="page1" ref={pageRef}>
        <div className="background-elements">
          <div className="floating-shape shape1"></div>
          <div className="floating-shape shape2"></div>
          <div className="floating-shape shape3"></div>
          <div className="floating-shape shape4"></div>
          <div className="floating-shape shape5"></div>
          <div className="floating-shape shape6"></div>
        </div>

        <section className="hero-content" ref={heroRef}>
          <div id="center-box">
            <img
              id="center-image"
              src="/images/hero/background.jpg"
              alt="center image"
              loading="eager"
              ref={centerImageRef}
            />
            <img
              src="/images/hero/background.png"
              alt="top"
              className="cover-image"
              id="cover-image-top"
              loading="eager"
            />
            <img
              src="/images/hero/background.png"
              alt="right"
              className="cover-image"
              id="cover-image-right"
              loading="eager"
            />
            <img
              src="/images/hero/background.png"
              alt="bottom"
              className="cover-image"
              id="cover-image-bottom"
              loading="eager"
            />
            <img
              src="/images/hero/background.png"
              alt="left"
              className="cover-image"
              id="cover-image-left"
              loading="eager"
            />
          </div>

          <div id="page-title-wrap" ref={pageTitleWrapRef}>
            <div id="page-title-text" className="text-[6.5rem] md:text-[12rem]">
              Past Events
            </div>
          </div>

          <p
            id="cutout-middle-text"
            className="text-[5rem] text-black"
            ref={cutoutMiddleTextRef}
          >
            Our Journey
          </p>

          <div id="title-wrap" ref={titleWrapRef}>
            <img
              id="title-logo"
              src="/images/hero/gdgLogo.png"
              alt="GDG Logo"
              loading="eager"
            />
            <div id="title">
              <div id="title-text">Google Developer Groups</div>
              <div id="ranchi">रांची</div>
            </div>
          </div>

          <div className="cutouts">
            <img
              src="/images/hero/cutouts/1.png"
              alt="gdg_1"
              className="cutout"
              id="cutout1"
              loading="eager"
            />
            <img
              src="/images/hero/cutouts/2.png"
              alt="gdg_2"
              className="cutout"
              id="cutout2"
              loading="eager"
            />
            <img
              src="/images/hero/cutouts/3.png"
              alt="gdg_3"
              className="cutout"
              id="cutout3"
              loading="eager"
            />
            <img
              src="/images/hero/cutouts/4.png"
              alt="gdg_4"
              className="cutout"
              id="cutout4"
              loading="eager"
            />
            <img
              src="/images/hero/cutouts/5.png"
              alt="gdg_5"
              className="cutout"
              id="cutout5"
              loading="eager"
            />
            <img
              src="/images/hero/cutouts/6.png"
              alt="gdg_6"
              className="cutout"
              id="cutout6"
              loading="eager"
            />
            <img
              src="/images/hero/cutouts/7.png"
              alt="gdg_7"
              className="cutout"
              id="cutout7"
              loading="eager"
            />
            <img
              src="/images/hero/cutouts/8.png"
              alt="gdg_8"
              className="cutout"
              id="cutout8"
              loading="eager"
            />
            <img
              src="/images/hero/cutouts/9.png"
              alt="gdg_9"
              className="cutout"
              id="cutout9"
              loading="eager"
            />
            <img
              src="/images/hero/cutouts/10.png"
              alt="gdg_10"
              className="cutout"
              id="cutout10"
              loading="eager"
            />
            <img
              src="/images/hero/cutouts/11.png"
              alt="gdg_11"
              className="cutout"
              id="cutout11"
              loading="eager"
            />
            <img
              src="/images/hero/cutouts/12.png"
              alt="gdg_12"
              className="cutout"
              id="cutout12"
              loading="eager"
            />
            <img
              src="/images/hero/cutouts/13.png"
              alt="gdg_13"
              className="cutout"
              id="cutout13"
              loading="eager"
            />
            <img
              src="/images/hero/cutouts/14.png"
              alt="gdg_14"
              className="cutout"
              id="cutout14"
              loading="eager"
            />
            <img
              src="/images/hero/cutouts/15.png"
              alt="gdg_15"
              className="cutout"
              id="cutout15"
              loading="eager"
            />
            <img
              src="/images/hero/cutouts/16.png"
              alt="gdg_16"
              className="cutout"
              id="cutout16"
              loading="eager"
            />
            <img
              src="/images/hero/cutouts/17.png"
              alt="gdg_17"
              className="cutout"
              id="cutout17"
              loading="eager"
            />
          </div>
        </section>
      </div>
    </>
  );
}
