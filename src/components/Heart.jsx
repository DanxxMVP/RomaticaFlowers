import { useState, useEffect } from 'react'
import './Heart.css'

/**
 * FloatingHearts — Spawns continuous floating heart particles.
 * Props:
 *   startDelay — delay before hearts start appearing (s)
 *   count      — max hearts visible at once
 */
export default function FloatingHearts({ startDelay = 5, count = 12 }) {
  const [hearts, setHearts] = useState([])
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setStarted(true), startDelay * 1000)
    return () => clearTimeout(timer)
  }, [startDelay])

  useEffect(() => {
    if (!started) return

    let id = 0
    const spawn = () => {
      const heart = {
        id: id++,
        left: `${15 + Math.random() * 70}%`,
        bottom: `${10 + Math.random() * 35}%`,
        size: 6 + Math.random() * 10,
        duration: 5 + Math.random() * 4,
        driftX: -25 + Math.random() * 50,
        driftEnd: -15 + Math.random() * 30,
        opacity: 0.3 + Math.random() * 0.4,
        color: [
          'rgba(230, 140, 180, 0.7)',
          'rgba(220, 120, 160, 0.6)',
          'rgba(240, 170, 200, 0.5)',
          'rgba(200, 130, 170, 0.65)',
          'rgba(245, 190, 215, 0.55)',
        ][Math.floor(Math.random() * 5)],
        delay: Math.random() * 0.5,
      }

      setHearts((prev) => {
        const next = [...prev, heart]
        return next.length > count ? next.slice(-count) : next
      })
    }

    // Spawn a batch initially
    for (let i = 0; i < 5; i++) setTimeout(spawn, i * 400)

    const interval = setInterval(spawn, 1800 + Math.random() * 1200)
    return () => clearInterval(interval)
  }, [started, count])

  return (
    <>
      {hearts.map((h) => (
        <div
          key={h.id}
          className="heart"
          style={{
            left: h.left,
            bottom: h.bottom,
            '--heart-size': `${h.size}px`,
            '--float-duration': `${h.duration}s`,
            '--drift-x': `${h.driftX}px`,
            '--drift-end': `${h.driftEnd}px`,
            '--heart-opacity': h.opacity,
            '--heart-color': h.color,
            animationDelay: `${h.delay}s`,
          }}
        >
          <div className="heart-shape" />
        </div>
      ))}
    </>
  )
}
