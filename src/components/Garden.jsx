import { useMemo } from 'react'
import Stem from './Stem'
import Flower from './Flower'
import FloatingHearts from './Heart'
import Sparkles from './Sparkle'
import MessageCard from './MessageCard'
import './Garden.css'

/**
 * Garden — Main scene composition that orchestrates the animation sequence:
 *  1. Stems grow        (0–2.5s)
 *  2. Buds appear       (2–3s)
 *  3. Flowers open      (3–5s)
 *  4. Hearts float      (5s+)
 *  5. Message appears   (5.5s)
 */
export default function Garden() {
  /* ----- Stars ----- */
  const stars = useMemo(
    () =>
      Array.from({ length: 40 }, (_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 55}%`,
        size: 1 + Math.random() * 2,
        duration: 3 + Math.random() * 4,
        delay: Math.random() * 5,
        opacity: 0.3 + Math.random() * 0.5,
      })),
    []
  )

  /* ----- Plant definitions ----- */
  const plants = [
    // Left cluster
    {
      stem: { x: '12%', height: 260, delay: 0, color: '#2a6b3a', sway: 2, leaves: [{ side: 'left', bottom: 30 }, { side: 'right', bottom: 55 }] },
      flower: { x: '12%', bottom: '260px', bloomDelay: 3.2, size: '', petalColor: '#e0a0c0', petalTip: '#f0c8da' },
    },
    {
      stem: { x: '8%', height: 180, delay: 0.3, color: '#256834', sway: 1.8, leaves: [{ side: 'right', bottom: 40 }] },
      flower: { x: '8%', bottom: '180px', bloomDelay: 3.5, size: 'small', petalColor: '#d898b8', petalTip: '#ecc0d5' },
    },
    // Center-left
    {
      stem: { x: '28%', height: 300, delay: 0.2, color: '#2e7040', sway: 1.2, leaves: [{ side: 'left', bottom: 25 }, { side: 'right', bottom: 50 }, { side: 'left', bottom: 70 }] },
      flower: { x: '28%', bottom: '300px', bloomDelay: 3, size: 'large', petalColor: '#e8a8c8', petalTip: '#f5d0e2' },
    },
    {
      stem: { x: '35%', height: 220, delay: 0.5, color: '#2a6535', sway: 1.5, leaves: [{ side: 'right', bottom: 35 }] },
      flower: { x: '35%', bottom: '220px', bloomDelay: 3.8, size: '', petalColor: '#dca0be', petalTip: '#f0c5d8' },
    },
    // Center
    {
      stem: { x: '50%', height: 280, delay: 0.15, color: '#307542', sway: 1, leaves: [{ side: 'left', bottom: 28 }, { side: 'right', bottom: 58 }] },
      flower: { x: '50%', bottom: '280px', bloomDelay: 3.1, size: 'large', petalColor: '#ebb0ce', petalTip: '#f8d8e8' },
    },
    // Center-right
    {
      stem: { x: '65%', height: 240, delay: 0.35, color: '#2c6d3c', sway: 1.6, leaves: [{ side: 'left', bottom: 45 }, { side: 'right', bottom: 68 }] },
      flower: { x: '65%', bottom: '240px', bloomDelay: 3.4, size: '', petalColor: '#e5a5c5', petalTip: '#f2cede' },
    },
    {
      stem: { x: '72%', height: 190, delay: 0.6, color: '#276336', sway: 1.9, leaves: [{ side: 'right', bottom: 38 }] },
      flower: { x: '72%', bottom: '190px', bloomDelay: 3.7, size: 'small', petalColor: '#d99cba', petalTip: '#edc2d6' },
    },
    // Right cluster
    {
      stem: { x: '88%', height: 270, delay: 0.1, color: '#2b6e3b', sway: 1.4, leaves: [{ side: 'left', bottom: 32 }, { side: 'right', bottom: 60 }] },
      flower: { x: '88%', bottom: '270px', bloomDelay: 3.3, size: '', petalColor: '#e2a3c2', petalTip: '#f3cce0' },
    },
    {
      stem: { x: '93%', height: 200, delay: 0.45, color: '#266433', sway: 2.1, leaves: [{ side: 'left', bottom: 42 }] },
      flower: { x: '93%', bottom: '200px', bloomDelay: 3.9, size: 'small', petalColor: '#d696b5', petalTip: '#ebbed4' },
    },
    // Extra accent stems (no flowers — just green)
    {
      stem: { x: '18%', height: 140, delay: 0.7, color: '#1f5a2d', sway: 2.3, leaves: [{ side: 'right', bottom: 50 }] },
      flower: null,
    },
    {
      stem: { x: '42%', height: 150, delay: 0.55, color: '#225e30', sway: 2.0, leaves: [{ side: 'left', bottom: 45 }] },
      flower: null,
    },
    {
      stem: { x: '78%', height: 130, delay: 0.65, color: '#1e582c', sway: 2.2, leaves: [] },
      flower: null,
    },
  ]

  return (
    <div className="garden">
      {/* Stars background */}
      <div className="garden-stars">
        {stars.map((s) => (
          <div
            key={s.id}
            className="star"
            style={{
              left: s.left,
              top: s.top,
              width: `${s.size}px`,
              height: `${s.size}px`,
              '--star-duration': `${s.duration}s`,
              '--star-opacity': s.opacity,
              animationDelay: `${s.delay}s`,
            }}
          />
        ))}
      </div>

      {/* Crescent moon */}
      <div className="garden-moon" />

      {/* Ambient ground light */}
      <div className="garden-ambient" />

      {/* Stems & Flowers */}
      {plants.map((p, i) => (
        <div key={i}>
          <Stem {...p.stem} />
          {p.flower && <Flower {...p.flower} />}
        </div>
      ))}

      {/* Ground gradient */}
      <div className="garden-ground" />

      {/* Sparkles & bubbles */}
      <Sparkles sparkles={20} bubbles={7} delay={3.5} />

      {/* Floating hearts */}
      <FloatingHearts startDelay={5} count={14} />

      {/* Message card */}
      <MessageCard delay={5.5} />
    </div>
  )
}
