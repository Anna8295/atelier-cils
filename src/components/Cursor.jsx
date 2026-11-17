import { useEffect, useRef, useState } from 'react'
import { prefersReducedMotion } from '../lib/motion.js'

// Trailing dot that grows into a label over [data-cursor] elements.
// Fine pointers only; touch devices never see it.
export default function Cursor() {
  const ref = useRef(null)
  const [label, setLabel] = useState('')

  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches || prefersReducedMotion()) return
    const el = ref.current
    let x = window.innerWidth / 2
    let y = window.innerHeight / 2
    let cx = x
    let cy = y
    let raf
    const onMove = (e) => {
      x = e.clientX
      y = e.clientY
      el.style.opacity = 1
    }
    const onLeave = () => { el.style.opacity = 0 }
    const onOver = (e) => setLabel(e.target.closest('[data-cursor]')?.dataset.cursor ?? '')
    const loop = () => {
      cx += (x - cx) * 0.2
      cy += (y - cy) * 0.2
      el.style.transform = `translate(${cx}px, ${cy}px)`
      raf = requestAnimationFrame(loop)
    }
    loop()
    window.addEventListener('pointermove', onMove)
    document.addEventListener('pointerleave', onLeave)
    document.addEventListener('pointerover', onOver)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerleave', onLeave)
      document.removeEventListener('pointerover', onOver)
    }
  }, [])

  return (
    <div className={`cursor${label ? ' big' : ''}`} ref={ref} aria-hidden="true">
      <span>{label}</span>
    </div>
  )
}
