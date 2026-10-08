/**
 * Motion is a progressive enhancement: HTML and CSS never require this module
 * to reveal content. Every ScrollTrigger belongs to the matchMedia context,
 * so changing the motion preference or tearing down the page restores styles.
 */
export function initAnimations() {
  const gsap = window.gsap;
  const ScrollTrigger = window.ScrollTrigger;

  if (!gsap || !ScrollTrigger) return () => {};

  gsap.registerPlugin(ScrollTrigger);
  const media = gsap.matchMedia();
  let refreshFrame;

  media.add(
    {
      desktop: "(min-width: 960px)",
      mobile: "(max-width: 959px)",
      canPin: "(min-width: 1000px) and (min-height: 700px)",
      reducedMotion: "(prefers-reduced-motion: reduce)",
    },
    (context) => {
      const { desktop, canPin, reducedMotion } = context.conditions;
      if (reducedMotion) return;

      const one = (selector) => document.querySelector(selector);
      const all = (selector) => gsap.utils.toArray(selector);
      const hero = one(".hero");
      const heroImage = one(".hero-background img");
      const heroBackground = one(".hero-background");
      const heroLines = all(".hero-line");
      const heroCopy = one(".hero-copy");
      const heroBottom = one(".hero-bottom");

      // A restored scroll position should never replay an opening over a page
      // the visitor is already exploring.
      if (hero && window.scrollY < hero.offsetHeight * 0.45) {
        const entrance = gsap.timeline({ defaults: { ease: "power3.out" } });

        if (heroImage) {
          entrance.fromTo(
            heroImage,
            { scale: 1.075, opacity: 0.48 },
            { scale: 1, opacity: 1, duration: 5.2, ease: "power2.out" },
            0,
          );
        }
        if (heroLines.length) {
          entrance.fromTo(
            heroLines,
            { yPercent: 18, opacity: 0 },
            { yPercent: 0, opacity: 1, duration: 1.15, stagger: 0.15 },
            0.2,
          );
        }
        if (heroCopy) {
          entrance.fromTo(
            heroCopy,
            { y: 16, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.95 },
            0.7,
          );
        }
        if (heroBottom) {
          entrance.fromTo(
            heroBottom,
            { y: 12, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8 },
            0.9,
          );
        }
      }

      if (hero && heroBackground) {
        // The entrance acts on the photograph. This second, independent
        // transform moves its wrapper as the desert gives way to the map.
        gsap.to(heroBackground, {
          yPercent: desktop ? 14 : 6,
          scale: desktop ? 1.06 : 1.025,
          ease: "none",
          scrollTrigger: {
            trigger: hero,
            start: "top top",
            end: "bottom top",
            scrub: 1.1,
          },
        });
      }
      const heroTitle = one(".hero-title");
      if (hero && heroTitle) {
        gsap.to(heroTitle, {
          yPercent: desktop ? -13 : -6,
          opacity: 0.1,
          ease: "none",
          scrollTrigger: {
            trigger: hero,
            start: "top top",
            end: "bottom 28%",
            scrub: 0.8,
          },
        });
      }

      // Do not pre-hide every section on initialization. immediateRender:
      // false keeps the static page readable until its entrance actually runs.
      all(".scene-reveal").forEach((element) => {
        gsap.from(element, {
          y: desktop ? 27 : 17,
          opacity: 0,
          duration: 0.85,
          ease: "power2.out",
          immediateRender: false,
          scrollTrigger: {
            trigger: element,
            start: "top 91%",
            once: true,
          },
        });
      });

      const mapStage = one(".map-stage");
      if (mapStage) {
        gsap.from(mapStage, {
          y: desktop ? 50 : 24,
          scale: desktop ? 1.035 : 1.015,
          clipPath: desktop ? "inset(7% 3% 7% 3%)" : "inset(3% 0% 3% 0%)",
          duration: 1.35,
          ease: "power3.out",
          immediateRender: false,
          scrollTrigger: {
            trigger: mapStage,
            start: "top 90%",
            once: true,
          },
        });
      }

      const sphinx = one("#esfinge");
      const sphinxStage = one(".sphinx-stage");
      const sphinxImage = one(".sphinx-image-layer") || one(".sphinx-image");
      const sphinxCaption = one(".sphinx-caption");
      if (sphinxStage) {
        gsap.from(sphinxStage, {
          clipPath: desktop ? "inset(10% 7% 10% 7%)" : "inset(7% 0% 7% 0%)",
          y: desktop ? 36 : 18,
          duration: 1.5,
          ease: "power3.out",
          immediateRender: false,
          scrollTrigger: {
            trigger: sphinxStage,
            start: "top 90%",
            once: true,
          },
        });
      }
      if (sphinxImage && sphinx) {
        gsap.fromTo(
          sphinxImage,
          { scale: desktop ? 1.105 : 1.07, yPercent: desktop ? -3 : -1.5 },
          {
            scale: desktop ? 1.075 : 1.045,
            yPercent: desktop ? 3 : 1.5,
            ease: "none",
            scrollTrigger: {
              trigger: sphinxStage || sphinx,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.2,
            },
          },
        );
      }
      if (sphinxCaption) {
        gsap.from(sphinxCaption, {
          y: 20,
          opacity: 0,
          duration: 1,
          ease: "power2.out",
          immediateRender: false,
          scrollTrigger: {
            trigger: sphinxCaption,
            start: "top 93%",
            once: true,
          },
        });
      }
      all(".sphinx-facts .fact").forEach((fact, index) => {
        gsap.from(fact, {
          y: 18,
          opacity: 0,
          duration: 0.75,
          delay: desktop ? index * 0.07 : 0,
          ease: "power2.out",
          immediateRender: false,
          scrollTrigger: { trigger: fact, start: "top 92%", once: true },
        });
      });

      const engineering = one("#engenharia");
      const visual = one(".engineering-visual");
      const diagram = one(".engineering-diagram");
      if (engineering) {
        gsap.fromTo(
          engineering,
          { backgroundColor: "#33434a" },
          {
            backgroundColor: "#181c1d",
            ease: "none",
            scrollTrigger: {
              trigger: engineering,
              start: "top bottom",
              end: "top 25%",
              scrub: 1,
            },
          },
        );
      }
      if (engineering && diagram) {
        const drawing = gsap.timeline({
          defaults: { ease: "power2.out" },
          scrollTrigger: {
            trigger: diagram,
            start: "top 82%",
            once: true,
          },
        });
        drawing.from(
          diagram,
          {
            y: 22,
            scale: 0.97,
            opacity: 0,
            duration: 1.1,
            immediateRender: false,
          },
          0,
        );

        all(
          ".engineering-diagram .geometry-line, .engineering-diagram .pyramid-outline",
        )
          .filter((path) => typeof path.getTotalLength === "function")
          .forEach((path, index) => {
            const length = path.getTotalLength();
            if (!Number.isFinite(length) || length <= 0) return;
            drawing.fromTo(
              path,
              { strokeDasharray: length, strokeDashoffset: length },
              {
                strokeDashoffset: 0,
                duration: 1.45,
                immediateRender: false,
                // Retain dashed construction-line styling after the draw.
                onComplete: () =>
                  gsap.set(path, {
                    clearProps: "strokeDasharray,strokeDashoffset",
                  }),
              },
              0.2 + index * 0.055,
            );
          });
      }

      if (canPin && engineering && visual) {
        // Reserve only space already present in the two-column composition;
        // no artificial scroll corridor and no pin on short or mobile screens.
        const availableTravel =
          engineering.offsetHeight - visual.offsetHeight - 160;
        const pinDistance = Math.min(250, availableTravel);
        if (pinDistance > 80) {
          ScrollTrigger.create({
            trigger: visual,
            start: "top 112px",
            end: () =>
              `+=${Math.max(0, Math.min(250, engineering.offsetHeight - visual.offsetHeight - 160))}`,
            pin: visual,
            pinSpacing: false,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          });
        }
      }

      all(".timeline-entry").forEach((entry) => {
        gsap.from(entry, {
          y: desktop ? 32 : 20,
          opacity: 0,
          duration: 0.95,
          ease: "power3.out",
          immediateRender: false,
          scrollTrigger: {
            trigger: entry,
            start: "top 92%",
            once: true,
          },
        });
        const image = entry.querySelector("img");
        if (image && desktop) {
          gsap.fromTo(
            image,
            { scale: 1.045 },
            {
              scale: 1,
              ease: "none",
              scrollTrigger: {
                trigger: entry,
                start: "top bottom",
                end: "bottom top",
                scrub: 1,
              },
            },
          );
        }
      });

      refreshFrame = requestAnimationFrame(() => ScrollTrigger.refresh());
    },
  );

  return () => {
    if (refreshFrame !== undefined) cancelAnimationFrame(refreshFrame);
    media.revert();
  };
}
