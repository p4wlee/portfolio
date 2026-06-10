import { useEffect, useRef } from 'react'

const COUNT = 90
const MAX_SCROLL = 3000

function lerp(a, b, t) {
  return a + (b - a) * t
}

export default function StarField() {
  const containerRef = useRef(null)
  const gradTopRef   = useRef(null)
  const gradBotRef   = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    const gradTop   = gradTopRef.current
    const gradBot   = gradBotRef.current

    /* ── crea le stelle ── */
    const stars = []

    const twinkleKF = [
      { opacity: 0.2,  transform: 'scale(0.75)' },
      { opacity: 1,    transform: 'scale(1.3)'  },
      { opacity: 0.2,  transform: 'scale(0.75)' },
    ]

    for (let i = 0; i < COUNT; i++) {
      const el = document.createElement('div')
      el.className = 'sf-star'

      const x        = Math.random() * 100
      const y        = Math.random() * 100
      const isStatic = Math.random() < 0.3
      const speed    = isStatic ? 0 : 0.2 + Math.random() * 0.6
      const size     = isStatic ? 1 + Math.random() * 0.6 : 1 + Math.random() * 2.2

      el.style.left   = x + '%'
      el.style.top    = y + '%'
      el.style.width  = size + 'px'
      el.style.height = size + 'px'
      el.style.opacity = isStatic ? '0.35' : '0.8'

      const dur   = (2 + Math.random() * 4) * 1000
      const delay = -(Math.random() * dur)
      el.animate(twinkleKF, { duration: dur, delay, iterations: Infinity, easing: 'ease-in-out' })

      container.appendChild(el)
      stars.push({ el, initialY: y, speed })
    }

    /* ── scroll con lerp ── */
    let currentScroll = 0
    let targetScroll  = 0
    let prevScroll    = 0
    let rafId         = null

    const onWheel = (e) => {
      targetScroll += e.deltaY
    }

    window.addEventListener('wheel', onWheel, { passive: true })

    /* touch support */
    let lastTouch = 0
    const onTouchStart = (e) => { lastTouch = e.touches[0].clientY }
    const onTouchMove  = (e) => {
      const dy = lastTouch - e.touches[0].clientY
      targetScroll += dy * 2
      lastTouch = e.touches[0].clientY
    }
    window.addEventListener('touchstart', onTouchStart, { passive: true })
    window.addEventListener('touchmove',  onTouchMove,  { passive: true })

    function loop() {
      currentScroll = lerp(currentScroll, targetScroll, 0.08)
      const velocity = currentScroll - prevScroll
      prevScroll = currentScroll

      /* stretch scaleY */
      const absVel  = Math.abs(velocity)
      const stretch = Math.max(1, Math.min(1 + absVel * 0.22, 6))

      /* gradienti */
      const ratio = Math.min(Math.max(currentScroll, 0), MAX_SCROLL) / MAX_SCROLL
      gradTop.style.opacity = (1 - ratio).toFixed(3)
      gradBot.style.opacity = ratio.toFixed(3)

      /* muovi le stelle */
      stars.forEach(({ el, initialY, speed }) => {
        if (speed === 0) return

        let pos = (initialY - currentScroll * speed * 0.05) % 100
        if (pos < 0) pos += 100
        el.style.top = pos + '%'
        el.style.transform = stretch > 1.05
          ? `scaleY(${stretch.toFixed(2)})`
          : ''
      })

      rafId = requestAnimationFrame(loop)
    }

    rafId = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchmove', onTouchMove)
      container.innerHTML = ''
    }
  }, [])

  return (
    <div className="sf-root" aria-hidden="true">
      <div ref={gradTopRef} className="sf-grad sf-grad-top" />
      <div ref={gradBotRef} className="sf-grad sf-grad-bot" />
      <div ref={containerRef} className="sf-container" />
    </div>
  )
}
