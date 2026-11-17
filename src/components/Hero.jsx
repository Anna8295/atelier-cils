import { useEffect, useRef, useState } from 'react'
import { useLang } from '../i18n/LanguageContext.jsx'
import { gsap, prefersReducedMotion, splitChars } from '../lib/motion.js'
import heroMp4 from '../assets/video/hero.mp4'
import blinkMp4 from '../assets/video/blink.mp4'
import poster from '../assets/video/poster.jpg'

// blink clip speeds, picked at random so the idle loop never feels mechanical
const SPEEDS = [0.85, 1, 1.25, 1.5, 1.8]

// the intro plays once per visit; coming back from a detail page goes
// straight to the volume lashes and idle blinking
let introPlayed = false

/*
  Sequence:
  1. dark screen, the film opens from a thin line (like an eyelid)
  2. hero.mp4 plays once: natural lashes → blink → full volume
  3. copy reveals (headline char by char, row, badge)
  4. idle: blink.mp4 (starts and ends on hero.mp4's last frame) plays
     every few seconds at a random speed, sometimes twice in a row
*/
export default function Hero() {
  const { t, lang } = useLang()
  const heroRef = useRef(null)
  const filmRef = useRef(null)
  const vidRef = useRef(null)
  const blinkRef = useRef(null)
  const titleRef = useRef(null)

  const [pending, setPending] = useState(() => !prefersReducedMotion() && !introPlayed)
  const [idle, setIdle] = useState(() => introPlayed && !prefersReducedMotion())

  // video playback + idle blinking
  useEffect(() => {
    const vid = vidRef.current
    const bv = blinkRef.current
    const film = filmRef.current
    const reduced = prefersReducedMotion()
    let idleT
    let heroVisible = true

    const schedule = (delay) => {
      clearTimeout(idleT)
      idleT = setTimeout(doBlink, delay ?? 2600 + Math.random() * 4400)
    }
    const doBlink = () => {
      if (document.hidden || !heroVisible) return schedule(1500)
      bv.playbackRate = SPEEDS[Math.floor(Math.random() * SPEEDS.length)]
      bv.currentTime = 0
      bv.play().catch(() => {})
    }
    const onBlinkEnd = () => schedule(Math.random() < 0.22 ? 250 : undefined)
    const onEnded = () => {
      introPlayed = true
      setPending(false)
      if (reduced) return
      setIdle(true)
      schedule(1800)
    }
    const onError = () => setPending(false)
    const play = () => {
      clearTimeout(idleT)
      bv.pause()
      setIdle(false)
      vid.currentTime = 0
      // autoplay blocked (e.g. low-power mode): show the copy over the poster frame
      vid.play().catch(() => setPending(false))
    }

    vid.addEventListener('ended', onEnded)
    vid.addEventListener('error', onError)
    bv.addEventListener('ended', onBlinkEnd)
    const io = new IntersectionObserver(([e]) => { heroVisible = e.isIntersecting })
    io.observe(heroRef.current)
    const safety = setTimeout(() => setPending(false), 8000) // never leave the copy hidden

    // returning visit: park the intro on its last frame and start blinking
    const skipIntro = introPlayed && !reduced
    const parkOnLastFrame = () => { vid.currentTime = Math.max(0, vid.duration - 0.05) }
    if (skipIntro) {
      if (vid.readyState >= 1) parkOnLastFrame()
      else vid.addEventListener('loadedmetadata', parkOnLastFrame, { once: true })
      schedule(1200)
    }

    let ctx
    if (!reduced) {
      ctx = gsap.context(() => {
        if (!skipIntro) {
          gsap.fromTo(film, { clipPath: 'inset(50% 0% 50% 0%)' }, {
            clipPath: 'inset(0% 0% 0% 0%)', duration: 1.4, ease: 'expo.inOut', delay: 0.3,
            onComplete: () => { gsap.set(film, { clearProps: 'clipPath' }); play() },
          })
        }
        const st = { trigger: heroRef.current, start: 'top top', end: 'bottom top', scrub: true }
        gsap.to(vid.parentNode.querySelectorAll('video'), { yPercent: 12, ease: 'none', scrollTrigger: st })
        gsap.to('.hero-copy', { y: -60, ease: 'none', scrollTrigger: { ...st } })
      }, heroRef)
    }

    return () => {
      clearTimeout(idleT)
      clearTimeout(safety)
      vid.removeEventListener('ended', onEnded)
      vid.removeEventListener('error', onError)
      vid.removeEventListener('loadedmetadata', parkOnLastFrame)
      bv.removeEventListener('ended', onBlinkEnd)
      io.disconnect()
      ctx?.revert()
      vid.pause()
      bv.pause()
    }
  }, [])

  // copy reveal once the film has played (not on a returning visit: it's already there)
  const revealOnMount = useRef(!introPlayed)
  useEffect(() => {
    if (pending || prefersReducedMotion() || !revealOnMount.current) return
    const ctx = gsap.context(() => {
      gsap.timeline()
        .from(splitChars(titleRef.current), { yPercent: 70, opacity: 0, duration: 1.1, ease: 'expo.out', stagger: 0.022 })
        .from('.hero-row', { y: 18, opacity: 0, duration: 0.9, ease: 'power3.out' }, '-=.8')
        .from('.badge', { scale: 0, rotate: -90, duration: 0.9, ease: 'back.out(1.6)' }, '-=.7')
    }, heroRef)
    return () => ctx.revert()
  }, [pending])

  return (
    <section className={`hero${pending ? ' pending' : ''}`} id="hero" ref={heroRef}>
      <div className={`hero-film${idle ? ' idle' : ''}`} ref={filmRef}>
        <video ref={vidRef} id="heroVideo" muted playsInline preload="auto" poster={poster} src={heroMp4} aria-label={t.hero.videoLabel} />
        <video ref={blinkRef} id="blinkVideo" muted playsInline preload="auto" src={blinkMp4} aria-hidden="true" />
      </div>

      <div className="hero-copy wrap">
        <h1 ref={titleRef} key={lang}>
          {t.hero.titleA}
          <em>{t.hero.titleEm}</em>
          {t.hero.titleB}
        </h1>
        <div className="hero-row">
          <div className="hero-ctas">
            <a className="btn light" href="#book" data-cursor="Book">{t.hero.book}</a>
            <a className="btn outline-light" href="#services" data-cursor="View">{t.hero.prices}</a>
          </div>
        </div>
      </div>

      <a className="badge" href="#book" data-cursor="Book" aria-label={t.nav.book}>
        <svg className="ring" viewBox="0 0 100 100" aria-hidden="true">
          <defs>
            <path id="circ" d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" />
          </defs>
          <text>
            <textPath href="#circ">{t.hero.badge}</textPath>
          </text>
        </svg>
        <svg className="arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
          <path d="M5 19L19 5M8 5h11v11" />
        </svg>
      </a>
      <span className="scroll-cue" aria-hidden="true">{t.hero.scroll}</span>
    </section>
  )
}
