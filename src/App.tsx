import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

import BlogCard from "./components/module/blogCard"
import FAQSection from "./components/module/faqSection"
import SiteFooter from "./components/module/footer"
import SiteHeader from "./components/module/header"
import IntroCard from "./components/module/introCard"
import ProductCard from "./components/module/productCard"
import TeamSection from "./components/module/teamSection"
import AboutSection from "./components/module/teamIntro"
import AnimationContainer from "./components/module/animation"

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  useGSAP(() => {
    const ctx = gsap.context(() => {
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches

      if (reduceMotion) {
        gsap.set(
          [
            ".intro-card-animation",
            ".about-section",
            ".services-label",
            ".services-title",
            ".services-description",
            ".services-line",
            ".service-card-animation",
            ".services-footer-badge",
            ".projects-label",
            ".projects-title",
            ".projects-description",
            ".projects-line",
            ".project-counter",
            ".project-card-animation",
            ".projects-cta",
            ".team-section-animation",
            ".faq-section-animation",
            ".blog-label",
            ".blog-title",
            ".blog-description",
            ".blog-line",
            ".blog-cta",
            ".blog-card-animation",
            ".footer-animation",
          ],
          {
            clearProps: "all",
          },
        )

        return
      }

      /* =========================================================
         HELPERS
      ========================================================= */

      const createReveal = (
        target: string,
        trigger: string,
        options: gsap.TweenVars = {},
      ) => {
        gsap.fromTo(
          target,
          {
            opacity: 0,
            y: 80,
            ...options,
          },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power4.out",
            ...options,
            scrollTrigger: {
              trigger,
              start: "top 82%",
              toggleActions: "play none none reverse",
            },
          },
        )
      }

      const createParallax = (
        target: string,
        trigger: string,
        vars: gsap.TweenVars,
        scrub = 1.5,
      ) => {
        gsap.to(target, {
          ...vars,
          ease: "none",
          scrollTrigger: {
            trigger,
            start: "top bottom",
            end: "bottom top",
            scrub,
          },
        })
      }

      /* =========================================================
         INTRO
      ========================================================= */

      const introTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: ".intro-area",
          start: "top 82%",
          toggleActions: "play none none reverse",
        },
      })

      introTimeline
        .fromTo(
          ".intro-background-line",
          {
            scaleX: 0,
            opacity: 0,
            transformOrigin: "right center",
          },
          {
            scaleX: 1,
            opacity: 1,
            duration: 1.5,
            ease: "expo.out",
          },
        )
        .fromTo(
          ".intro-card-animation",
          {
            opacity: 0,
            y: 120,
            scale: 0.84,
            rotateX: 16,
            filter: "blur(8px)",
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            rotateX: 0,
            filter: "blur(0px)",
            duration: 1.15,
            stagger: {
              each: 0.16,
              from: "start",
            },
            ease: "power4.out",
          },
          "-=0.9",
        )

      createParallax(
        ".intro-orb-one",
        ".intro-area",
        {
          y: -220,
          x: 120,
          scale: 1.35,
          rotation: 25,
        },
        2,
      )

      createParallax(
        ".intro-orb-two",
        ".intro-area",
        {
          y: 180,
          x: -120,
          scale: 0.82,
          rotation: -20,
        },
        2.4,
      )

      createParallax(
        ".intro-grid",
        ".intro-area",
        {
          y: -150,
          x: 35,
        },
        1.5,
      )

      /* =========================================================
         INTRO FLOATING EFFECT
      ========================================================= */

      gsap.to(".intro-orb-one", {
        yPercent: 8,
        duration: 4.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      })

      gsap.to(".intro-orb-two", {
        yPercent: -7,
        duration: 5.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      })

      /* =========================================================
         ABOUT
      ========================================================= */

      const aboutTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: ".about-section",
          start: "top 84%",
          toggleActions: "play none none reverse",
        },
      })

      aboutTimeline
        .fromTo(
          ".about-section",
          {
            opacity: 0,
            y: 100,
            scale: 0.96,
            filter: "blur(10px)",
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            filter: "blur(0px)",
            duration: 1.25,
            ease: "power4.out",
          },
        )
        .fromTo(
          ".about-glow",
          {
            opacity: 0,
            scale: 0.5,
          },
          {
            opacity: 1,
            scale: 1,
            duration: 1.2,
            ease: "power3.out",
          },
          "-=0.8",
        )

      createParallax(
        ".about-glow",
        ".about-section",
        {
          y: -140,
          x: 120,
          scale: 1.3,
        },
        2,
      )

      /* =========================================================
         SERVICES HEADER
      ========================================================= */

      const servicesHeader = gsap.timeline({
        scrollTrigger: {
          trigger: ".services-section",
          start: "top 78%",
          toggleActions: "play none none reverse",
        },
      })

      servicesHeader
        .fromTo(
          ".services-label",
          {
            opacity: 0,
            y: 35,
            scale: 0.72,
            filter: "blur(5px)",
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            filter: "blur(0px)",
            duration: 0.85,
            ease: "back.out(1.7)",
          },
        )
        .fromTo(
          ".services-title",
          {
            opacity: 0,
            y: 100,
            clipPath: "inset(100% 0% 0% 0%)",
          },
          {
            opacity: 1,
            y: 0,
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 1.2,
            ease: "power4.out",
          },
          "-=0.45",
        )
        .fromTo(
          ".services-description",
          {
            opacity: 0,
            y: 35,
            filter: "blur(5px)",
          },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.85,
            ease: "power3.out",
          },
          "-=0.65",
        )
        .fromTo(
          ".services-line",
          {
            scaleX: 0,
            opacity: 0,
            transformOrigin: "right center",
          },
          {
            scaleX: 1,
            opacity: 1,
            duration: 0.9,
            ease: "expo.out",
          },
          "-=0.45",
        )

      /* =========================================================
         SERVICES CARDS
      ========================================================= */

      gsap.fromTo(
        ".service-card-animation",
        {
          opacity: 0,
          y: 130,
          scale: 0.82,
          rotateY: 15,
          rotateX: 8,
          filter: "blur(9px)",
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotateY: 0,
          rotateX: 0,
          filter: "blur(0px)",
          duration: 1.2,
          stagger: {
            each: 0.17,
            from: "start",
          },
          ease: "power4.out",
          scrollTrigger: {
            trigger: ".services-cards",
            start: "top 83%",
            toggleActions: "play none none reverse",
          },
        },
      )

      /* =========================================================
         SERVICES BACKGROUND
      ========================================================= */

      createParallax(
        ".services-grid-bg",
        ".services-section",
        {
          y: -190,
          x: 50,
        },
        1.6,
      )

      createParallax(
        ".services-orb-one",
        ".services-section",
        {
          x: 220,
          y: 260,
          scale: 1.4,
          rotation: 45,
        },
        2.2,
      )

      createParallax(
        ".services-orb-two",
        ".services-section",
        {
          x: -190,
          y: -240,
          scale: 0.78,
          rotation: -40,
        },
        2,
      )

      createParallax(
        ".services-diagonal",
        ".services-section",
        {
          y: 260,
          rotation: 7,
        },
        2,
      )

      gsap.to(".services-orb-one", {
        opacity: 0.65,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      })

      gsap.to(".services-orb-two", {
        opacity: 0.45,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      })

      /* =========================================================
         SERVICES FOOTER
      ========================================================= */

      createReveal(
        ".services-footer-badge",
        ".services-footer-badge",
        {
          scale: 0.82,
          duration: 1,
          ease: "back.out(1.7)",
        },
      )

      /* =========================================================
         PROJECT HEADER
      ========================================================= */

      const projectsHeader = gsap.timeline({
        scrollTrigger: {
          trigger: ".projects-section",
          start: "top 78%",
          toggleActions: "play none none reverse",
        },
      })

      projectsHeader
        .fromTo(
          ".projects-label",
          {
            opacity: 0,
            x: 90,
            scale: 0.72,
            filter: "blur(5px)",
          },
          {
            opacity: 1,
            x: 0,
            scale: 1,
            filter: "blur(0px)",
            duration: 0.85,
            ease: "back.out(1.6)",
          },
        )
        .fromTo(
          ".projects-title",
          {
            opacity: 0,
            y: 100,
            clipPath: "inset(100% 0% 0% 0%)",
          },
          {
            opacity: 1,
            y: 0,
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 1.2,
            ease: "power4.out",
          },
          "-=0.45",
        )
        .fromTo(
          ".projects-description",
          {
            opacity: 0,
            y: 35,
            filter: "blur(5px)",
          },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.85,
            ease: "power3.out",
          },
          "-=0.65",
        )
        .fromTo(
          ".projects-line",
          {
            scaleX: 0,
            opacity: 0,
            transformOrigin: "right center",
          },
          {
            scaleX: 1,
            opacity: 1,
            duration: 0.9,
            ease: "expo.out",
          },
          "-=0.45",
        )

      /* =========================================================
         PROJECT COUNTER
      ========================================================= */

      const counter = {
        value: 0,
      }

      const projectNumber = gsap.utils.toArray<HTMLElement>(
        ".project-number",
      )[0]

      if (projectNumber) {
        gsap.fromTo(
          ".project-counter",
          {
            opacity: 0,
            x: -100,
            scale: 0.72,
            rotate: -6,
          },
          {
            opacity: 1,
            x: 0,
            scale: 1,
            rotate: 0,
            duration: 1.1,
            ease: "back.out(1.6)",
            scrollTrigger: {
              trigger: ".project-counter",
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          },
        )

        gsap.to(counter, {
          value: 6,
          duration: 1.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".project-counter",
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
          onUpdate: () => {
            projectNumber.textContent = String(
              Math.floor(counter.value),
            ).padStart(2, "0")
          },
        })
      }

      /* =========================================================
         PROJECT CARDS
      ========================================================= */

      gsap.fromTo(
        ".project-card-animation",
        {
          opacity: 0,
          y: 130,
          scale: 0.82,
          rotateX: 15,
          filter: "blur(9px)",
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotateX: 0,
          filter: "blur(0px)",
          duration: 1.2,
          stagger: {
            each: 0.14,
            from: "start",
          },
          ease: "power4.out",
          scrollTrigger: {
            trigger: ".projects-grid",
            start: "top 82%",
            toggleActions: "play none none reverse",
          },
        },
      )

      /* =========================================================
         PROJECT BACKGROUND
      ========================================================= */

      createParallax(
        ".projects-grid-bg",
        ".projects-section",
        {
          y: -180,
          x: -45,
        },
        1.5,
      )

      createParallax(
        ".projects-orb-one",
        ".projects-section",
        {
          x: 210,
          y: 270,
          scale: 1.35,
          rotation: 50,
        },
        2.2,
      )

      createParallax(
        ".projects-orb-two",
        ".projects-section",
        {
          x: -190,
          y: -250,
          scale: 0.8,
          rotation: -45,
        },
        2,
      )

      gsap.to(".projects-orb-one", {
        opacity: 0.7,
        duration: 3.2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      })

      gsap.to(".projects-orb-two", {
        opacity: 0.5,
        duration: 4.2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      })

      /* =========================================================
         PROJECT CTA
      ========================================================= */

      gsap.fromTo(
        ".projects-cta",
        {
          opacity: 0,
          y: 70,
          scale: 0.78,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: ".projects-cta",
            start: "top 91%",
            toggleActions: "play none none reverse",
          },
        },
      )

      /* =========================================================
         TEAM
      ========================================================= */

      gsap.fromTo(
        ".team-section-animation",
        {
          opacity: 0,
          y: 120,
          scale: 0.95,
          filter: "blur(8px)",
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: "blur(0px)",
          duration: 1.3,
          ease: "power4.out",
          scrollTrigger: {
            trigger: ".team-section-animation",
            start: "top 84%",
            toggleActions: "play none none reverse",
          },
        },
      )

      /* =========================================================
         FAQ
      ========================================================= */

      gsap.fromTo(
        ".faq-section-animation",
        {
          opacity: 0,
          y: 110,
          scale: 0.96,
          filter: "blur(8px)",
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: "blur(0px)",
          duration: 1.25,
          ease: "power4.out",
          scrollTrigger: {
            trigger: ".faq-section-animation",
            start: "top 84%",
            toggleActions: "play none none reverse",
          },
        },
      )

      /* =========================================================
         BLOG HEADER
      ========================================================= */

      const blogHeader = gsap.timeline({
        scrollTrigger: {
          trigger: ".blog-section",
          start: "top 78%",
          toggleActions: "play none none reverse",
        },
      })

      blogHeader
        .fromTo(
          ".blog-label",
          {
            opacity: 0,
            x: 90,
            scale: 0.72,
            filter: "blur(5px)",
          },
          {
            opacity: 1,
            x: 0,
            scale: 1,
            filter: "blur(0px)",
            duration: 0.85,
            ease: "back.out(1.6)",
          },
        )
        .fromTo(
          ".blog-title",
          {
            opacity: 0,
            y: 100,
            clipPath: "inset(100% 0% 0% 0%)",
          },
          {
            opacity: 1,
            y: 0,
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 1.2,
            ease: "power4.out",
          },
          "-=0.45",
        )
        .fromTo(
          ".blog-description",
          {
            opacity: 0,
            y: 35,
            filter: "blur(5px)",
          },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.85,
            ease: "power3.out",
          },
          "-=0.65",
        )
        .fromTo(
          ".blog-line",
          {
            scaleX: 0,
            opacity: 0,
            transformOrigin: "right center",
          },
          {
            scaleX: 1,
            opacity: 1,
            duration: 0.9,
            ease: "expo.out",
          },
          "-=0.45",
        )

      /* =========================================================
         BLOG CTA
      ========================================================= */

      gsap.fromTo(
        ".blog-cta",
        {
          opacity: 0,
          x: -90,
          scale: 0.76,
          rotate: -4,
        },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          rotate: 0,
          duration: 1,
          ease: "back.out(1.6)",
          scrollTrigger: {
            trigger: ".blog-cta",
            start: "top 86%",
            toggleActions: "play none none reverse",
          },
        },
      )

      /* =========================================================
         BLOG CARDS
      ========================================================= */

      gsap.fromTo(
        ".blog-card-animation",
        {
          opacity: 0,
          y: 125,
          scale: 0.83,
          rotateY: -13,
          filter: "blur(9px)",
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotateY: 0,
          filter: "blur(0px)",
          duration: 1.2,
          stagger: {
            each: 0.17,
            from: "start",
          },
          ease: "power4.out",
          scrollTrigger: {
            trigger: ".blog-cards",
            start: "top 82%",
            toggleActions: "play none none reverse",
          },
        },
      )

      /* =========================================================
         BLOG BACKGROUND
      ========================================================= */

      createParallax(
        ".blog-grid-bg",
        ".blog-section",
        {
          y: -170,
        },
        1.5,
      )

      createParallax(
        ".blog-orb-one",
        ".blog-section",
        {
          x: 210,
          y: 230,
          scale: 1.3,
          rotation: 40,
        },
        2,
      )

      createParallax(
        ".blog-orb-two",
        ".blog-section",
        {
          x: -190,
          y: -230,
          scale: 0.8,
          rotation: -40,
        },
        2,
      )

      gsap.to(".blog-orb-one", {
        opacity: 0.65,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      })

      gsap.to(".blog-orb-two", {
        opacity: 0.5,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      })

      /* =========================================================
         FOOTER
      ========================================================= */

      gsap.fromTo(
        ".footer-animation",
        {
          opacity: 0,
          y: 100,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power4.out",
          scrollTrigger: {
            trigger: ".footer-animation",
            start: "top 92%",
            toggleActions: "play none none reverse",
          },
        },
      )

      /* =========================================================
         FLOATING ORBS
      ========================================================= */

      gsap.to(".floating-orb", {
        y: -20,
        x: 12,
        duration: 4,
        repeat: -1,
        yoyo: true,
        stagger: {
          each: 0.45,
          from: "random",
        },
        ease: "sine.inOut",
      })

      /* =========================================================
         CTA HOVER
      ========================================================= */

      const buttons = gsap.utils.toArray<HTMLElement>(
        ".projects-cta button, .blog-cta",
      )

      buttons.forEach((button) => {
        const arrow = button.querySelector<HTMLElement>(
          "span:last-child",
        )

        if (!arrow) return

        const enterHandler = () => {
          gsap.to(button, {
            y: -5,
            scale: 1.025,
            duration: 0.35,
            ease: "power3.out",
          })

          gsap.to(arrow, {
            x: -7,
            scale: 1.1,
            duration: 0.4,
            ease: "back.out(2)",
          })
        }

        const leaveHandler = () => {
          gsap.to(button, {
            y: 0,
            scale: 1,
            duration: 0.4,
            ease: "power3.out",
          })

          gsap.to(arrow, {
            x: 0,
            scale: 1,
            duration: 0.35,
            ease: "power3.out",
          })
        }

        button.addEventListener("mouseenter", enterHandler)
        button.addEventListener("mouseleave", leaveHandler)

        gsap.context(() => {
          return () => {
            button.removeEventListener("mouseenter", enterHandler)
            button.removeEventListener("mouseleave", leaveHandler)
          }
        })
      })

      /* =========================================================
         CARD MICRO HOVER
      ========================================================= */

      const cards = gsap.utils.toArray<HTMLElement>(
        ".intro-card-animation, .service-card-animation, .project-card-animation, .blog-card-animation",
      )

      cards.forEach((card) => {
        const enterHandler = () => {
          gsap.to(card, {
            y: -8,
            scale: 1.015,
            duration: 0.4,
            ease: "power3.out",
          })
        }

        const leaveHandler = () => {
          gsap.to(card, {
            y: 0,
            scale: 1,
            duration: 0.45,
            ease: "power3.out",
          })
        }

        card.addEventListener("mouseenter", enterHandler)
        card.addEventListener("mouseleave", leaveHandler)

        gsap.context(() => {
          return () => {
            card.removeEventListener("mouseenter", enterHandler)
            card.removeEventListener("mouseleave", leaveHandler)
          }
        })
      })

      /* =========================================================
         REFRESH
      ========================================================= */

      requestAnimationFrame(() => {
        ScrollTrigger.refresh()
      })
    })

    return () => ctx.revert()
  })

  return (
    <div className="min-h-screen w-full overflow-x-clip bg-gray-100">
      <SiteHeader />

      <main className="w-full overflow-x-clip">

        {/* =====================================================
            HERO / 3D
        ===================================================== */}

        <section className="relative w-full overflow-hidden">
          <AnimationContainer />
        </section>

        {/* =====================================================
            INTRO
        ===================================================== */}

        <section className="intro-area relative w-full overflow-hidden bg-gray-100 px-5 py-20 lg:px-0 lg:py-28">

          <div className="pointer-events-none absolute inset-0 overflow-hidden">

            <div className="intro-grid absolute inset-[-20%] opacity-[0.035]">
              <div
                className="h-full w-full"
                style={{
                  backgroundImage:
                    "linear-gradient(#b08b38 1px, transparent 1px), linear-gradient(90deg, #b08b38 1px, transparent 1px)",
                  backgroundSize: "70px 70px",
                }}
              ></div>
            </div>

            <div className="intro-orb-one floating-orb absolute -left-32 top-20 h-96 w-96 rounded-full bg-[#d4af5a]/10 blur-3xl"></div>

            <div className="intro-orb-two floating-orb absolute -right-40 bottom-0 h-120 w-120 rounded-full bg-[#b08b38]/10 blur-3xl"></div>

            <div className="absolute left-[20%] top-20 h-32 w-32 rotate-45 rounded-4xl border border-[#b08b38]/10"></div>

            <div className="absolute right-[15%] bottom-20 h-24 w-24 rounded-full border border-[#d4af5a]/20"></div>

          </div>

          <div className="relative mx-auto w-full max-w-360">

            <div className="intro-background-line absolute left-1/2 top-0 h-px w-[80%] -translate-x-1/2 bg-linear-to-r from-transparent via-[#b08b38]/40 to-transparent"></div>

            <section className="intro-cards grid w-full grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">

              <div className="intro-card-animation perspective-distant">
                <IntroCard />
              </div>

              <div className="intro-card-animation perspective-distant">
                <IntroCard />
              </div>

              <div className="intro-card-animation perspective-distant">
                <IntroCard />
              </div>

            </section>

            <section className="about-section relative mt-12 w-full overflow-hidden lg:px-20">

              <div className="about-glow pointer-events-none absolute -right-20 top-0 h-72 w-72 rounded-full bg-[#d4af5a]/10 blur-3xl"></div>

              <AboutSection />

            </section>

          </div>
        </section>

        {/* =====================================================
            SERVICES
        ===================================================== */}

        <section
          dir="rtl"
          className="services-section relative w-full overflow-hidden bg-white py-24 lg:py-32"
        >

          <div className="pointer-events-none absolute inset-0 overflow-hidden">

            <div className="services-grid-bg absolute inset-[-15%] opacity-[0.025]">
              <div
                className="h-full w-full"
                style={{
                  backgroundImage:
                    "linear-gradient(#b08b38 1px, transparent 1px), linear-gradient(90deg, #b08b38 1px, transparent 1px)",
                  backgroundSize: "90px 90px",
                }}
              ></div>
            </div>

            <div className="services-orb-one floating-orb absolute -left-40 top-0 h-md w-md rounded-full bg-[#b08b38]/10 blur-3xl"></div>

            <div className="services-orb-two floating-orb absolute -right-48 bottom-0 h-136 w-136 rounded-full bg-[#d4af5a]/10 blur-3xl"></div>

            <div className="services-diagonal absolute left-[-20%] top-[45%] h-px w-[140%] rotate-[-8deg] bg-linear-to-r from-transparent via-[#b08b38]/15 to-transparent"></div>

            <div className="absolute right-[12%] top-32 h-28 w-28 rotate-45 rounded-4xl border border-[#d4af5a]/10"></div>

            <div className="absolute left-[15%] bottom-32 h-20 w-20 rounded-full border border-[#b08b38]/10"></div>

          </div>

          <div className="relative mx-auto flex w-full max-w-360 flex-col gap-16 px-5 lg:px-10">

            <div className="services-header flex w-full flex-col items-center text-center">

              <div className="services-label mb-6 flex items-center gap-3 rounded-full border border-[#d4af5a]/30 bg-[#d4af5a]/10 px-5 py-2.5 shadow-sm">

                <span className="h-2.5 w-2.5 rounded-full bg-linear-to-r from-[#b08b38] to-[#d4af5a] shadow-[0_0_15px_rgba(176,139,56,0.4)]"></span>

                <p className="text-sm font-bold text-[#9a772d]">
                  خدمات تخصصی شیراز ملک
                </p>

              </div>

              <h2 className="services-title text-3xl font-black leading-[1.8] text-gray-900 md:text-4xl lg:text-5xl">

                به دنبال چه چیزی{" "}

                <span className="mr-2 bg-linear-to-r from-[#b08b38] to-[#d4af5a] bg-clip-text text-transparent">
                  می‌گردید؟
                </span>

              </h2>

              <p className="services-description mt-5 max-w-2xl text-sm font-medium leading-8 text-gray-500 md:text-base">

                خدمات تخصصی شیراز ملک برای طراحی، بازسازی و زیباسازی فضاهای
                داخلی و خارجی، با تمرکز بر کیفیت، جزئیات و سلیقه شما.

              </p>

              <div className="services-line mt-7 h-1.5 w-20 rounded-full bg-linear-to-r from-[#b08b38] to-[#d4af5a]"></div>

            </div>

            <div className="services-cards grid w-full grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3">

              <div className="service-card-animation perspective-[1400px]">
                <ProductCard />
              </div>

              <div className="service-card-animation perspective-[1400px]">
                <ProductCard />
              </div>

              <div className="service-card-animation perspective-[1400px]">
                <ProductCard />
              </div>

            </div>

            <div className="services-footer-badge flex justify-center">

              <div className="flex items-center gap-3 rounded-full border border-gray-200 bg-gray-50 px-7 py-3.5 shadow-sm">

                <span className="h-2.5 w-2.5 rounded-full bg-linear-to-r from-[#b08b38] to-[#d4af5a]"></span>

                <p className="text-sm font-bold text-gray-600">
                  طراحی، اجرا و مشاوره در کنار شما
                </p>

              </div>

            </div>

          </div>
        </section>

        {/* =====================================================
            PROJECTS
        ===================================================== */}

        <section
          dir="rtl"
          className="projects-section relative w-full overflow-hidden bg-[#f8f8f6] py-24 lg:py-32"
        >

          <div className="pointer-events-none absolute inset-0 overflow-hidden">

            <div className="projects-grid-bg absolute inset-[-15%] opacity-[0.025]">
              <div
                className="h-full w-full"
                style={{
                  backgroundImage:
                    "linear-gradient(#b08b38 1px, transparent 1px), linear-gradient(90deg, #b08b38 1px, transparent 1px)",
                  backgroundSize: "80px 80px",
                }}
              ></div>
            </div>

            <div className="projects-orb-one floating-orb absolute -left-48 top-20 h-lg w-lg rounded-full bg-[#d4af5a]/10 blur-3xl"></div>

            <div className="projects-orb-two floating-orb absolute -right-48 bottom-0 h-xl w-xl rounded-full bg-[#b08b38]/10 blur-3xl"></div>

            <div className="absolute left-[10%] top-[20%] h-40 w-40 rotate-45 rounded-4xl border border-[#b08b38]/10"></div>

            <div className="absolute right-[8%] bottom-[15%] h-28 w-28 rounded-full border border-[#d4af5a]/15"></div>

          </div>

          <div className="relative mx-auto w-full max-w-360 px-5 lg:px-10">

            <div className="mb-16 flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">

              <div className="projects-header-content flex max-w-4xl flex-col">

                <div className="projects-label mb-6 flex w-fit items-center gap-3 rounded-full border border-[#d4af5a]/30 bg-white px-5 py-2.5 shadow-sm">

                  <span className="h-2.5 w-2.5 rounded-full bg-linear-to-r from-[#b08b38] to-[#d4af5a] shadow-[0_0_15px_rgba(176,139,56,0.35)]"></span>

                  <p className="text-sm font-bold text-[#9a772d]">
                    پروژه‌های اخیر
                  </p>

                </div>

                <h2 className="projects-title text-3xl font-black leading-[1.8] text-gray-900 md:text-4xl lg:text-5xl">

                  نگاهی به{" "}

                  <span className="mx-2 bg-linear-to-r from-[#b08b38] to-[#d4af5a] bg-clip-text text-transparent">
                    پروژه‌های اجرا
                  </span>{" "}

                  توسط شیراز ملک

                </h2>

                <p className="projects-description mt-5 max-w-3xl text-sm font-medium leading-8 text-gray-500 md:text-base">

                  مجموعه‌ای از پروژه‌های طراحی و معماری که با تمرکز بر جزئیات،
                  کیفیت اجرا و هویت منحصربه‌فرد هر فضا شکل گرفته‌اند.

                </p>

                <div className="projects-line mt-7 h-1.5 w-24 rounded-full bg-linear-to-r from-[#b08b38] to-[#d4af5a]"></div>

              </div>

              <div className="project-counter flex shrink-0 items-center gap-4 rounded-2xl border border-gray-200 bg-white px-6 py-5 shadow-sm">

                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-[#b08b38] to-[#d4af5a] text-xl font-black text-white shadow-lg shadow-[#b08b38]/20">

                  <span className="project-number">
                    00
                  </span>

                </div>

                <div className="flex flex-col">

                  <span className="text-xs font-medium text-gray-400">
                    پروژه‌های نمایش داده شده
                  </span>

                  <span className="mt-1 text-sm font-black text-gray-800">
                    منتخب معماری شیراز ملک
                  </span>

                </div>

              </div>

            </div>

            <div className="projects-grid grid w-full grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3">

              <div className="project-card-animation perspective-[1400px]">
                <ProductCard />
              </div>

              <div className="project-card-animation perspective-[1400px]">
                <ProductCard />
              </div>

              <div className="project-card-animation perspective-[1400px]">
                <ProductCard />
              </div>

              <div className="project-card-animation perspective-[1400px]">
                <ProductCard />
              </div>

              <div className="project-card-animation perspective-[1400px]">
                <ProductCard />
              </div>

              <div className="project-card-animation perspective-[1400px]">
                <ProductCard />
              </div>

            </div>

            <div className="projects-cta mt-14 flex justify-center">

              <button className="group flex items-center gap-3 rounded-xl border border-gray-300 bg-white px-7 py-3.5 text-sm font-bold text-gray-700 shadow-sm transition-colors duration-300 hover:border-[#d4af5a]/50 hover:shadow-xl">

                <span>
                  مشاهده تمام پروژه‌ها
                </span>

                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100 transition-colors duration-300 group-hover:bg-linear-to-r group-hover:from-[#b08b38] group-hover:to-[#d4af5a] group-hover:text-white">
                  ←
                </span>

              </button>

            </div>

          </div>
        </section>

        {/* =====================================================
            TEAM
        ===================================================== */}

        <div className="team-section-animation">
          <TeamSection />
        </div>

        {/* =====================================================
            FAQ
        ===================================================== */}

        <div className="faq-section-animation">
          <FAQSection />
        </div>

        {/* =====================================================
            BLOG
        ===================================================== */}

        <section
          dir="rtl"
          className="blog-section relative w-full overflow-hidden bg-white py-24 lg:py-32"
        >

          <div className="pointer-events-none absolute inset-0 overflow-hidden">

            <div className="blog-grid-bg absolute inset-[-15%] opacity-[0.022]">
              <div
                className="h-full w-full"
                style={{
                  backgroundImage:
                    "linear-gradient(#b08b38 1px, transparent 1px), linear-gradient(90deg, #b08b38 1px, transparent 1px)",
                  backgroundSize: "90px 90px",
                }}
              ></div>
            </div>

            <div className="blog-orb-one floating-orb absolute -left-48 top-20 h-lg w-lg rounded-full bg-[#d4af5a]/10 blur-3xl"></div>

            <div className="blog-orb-two floating-orb absolute -right-48 bottom-0 h-xl w-xl rounded-full bg-[#b08b38]/10 blur-3xl"></div>

            <div className="absolute right-[15%] top-20 h-28 w-28 rotate-45 rounded-4xl border border-[#d4af5a]/10"></div>

            <div className="absolute left-[10%] bottom-20 h-24 w-24 rounded-full border border-[#b08b38]/10"></div>

          </div>

          <div className="relative mx-auto w-full max-w-360 px-5 lg:px-10">

            <div className="mb-16 flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">

              <div className="blog-header-content max-w-4xl">

                <div className="blog-label mb-6 flex w-fit items-center gap-3 rounded-full border border-[#d4af5a]/30 bg-[#d4af5a]/10 px-5 py-2.5">

                  <span className="h-2.5 w-2.5 rounded-full bg-linear-to-r from-[#b08b38] to-[#d4af5a]"></span>

                  <span className="text-sm font-bold text-[#9a772d]">
                    مجله شیراز ملک
                  </span>

                </div>

                <h2 className="blog-title text-3xl font-black leading-[1.8] text-gray-900 md:text-4xl lg:text-5xl">

                  تازه‌ترین مطالب{" "}

                  <span className="mx-2 bg-linear-to-r from-[#b08b38] to-[#d4af5a] bg-clip-text text-transparent">
                    معماری و دکوراسیون
                  </span>{" "}

                  را بخوانید

                </h2>

                <p className="blog-description mt-5 max-w-3xl text-sm font-medium leading-8 text-gray-500 md:text-base">

                  ایده‌ها، نکات کاربردی و مطالب تخصصی درباره معماری، طراحی
                  داخلی، دکوراسیون و سبک زندگی را در مجله شیراز ملک دنبال کنید.

                </p>

                <div className="blog-line mt-7 h-1.5 w-24 rounded-full bg-linear-to-r from-[#b08b38] to-[#d4af5a]"></div>

              </div>

              <button className="blog-cta group flex w-fit shrink-0 items-center gap-3 rounded-2xl border border-gray-200 bg-gray-50 px-6 py-4 text-sm font-bold text-gray-700 transition-colors duration-300 hover:border-[#d4af5a]/40 hover:bg-white hover:shadow-xl">

                <span>
                  مشاهده همه مقالات
                </span>

                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-gray-500 shadow-sm transition-colors duration-300 group-hover:bg-linear-to-r group-hover:from-[#b08b38] group-hover:to-[#d4af5a] group-hover:text-white">
                  ←
                </span>

              </button>

            </div>

            <div className="blog-cards grid w-full grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3">

              <div className="blog-card-animation perspective-[1400px]">
                <BlogCard />
              </div>

              <div className="blog-card-animation perspective-[1400px]">
                <BlogCard />
              </div>

              <div className="blog-card-animation perspective-[1400px]">
                <BlogCard />
              </div>

            </div>

          </div>
        </section>
      </main>

      {/* =======================================================
          FOOTER
      ======================================================= */}

      <div className="footer-animation">
        <SiteFooter />
      </div>
    </div>
  )
}