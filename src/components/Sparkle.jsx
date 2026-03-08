import './Sparkle.css'

/**
 * Sparkles — Twinkling lights and soft bubbles scattered throughout.
 * Props:
 *   sparkles — number of twinkle sparkles
 *   bubbles  — number of floating bubbles
 *   delay    — base delay before sparkles appear
 */
export default function Sparkles({ sparkles = 18, bubbles = 6, delay = 4 }) {
  const sparkleItems = Array.from({ length: sparkles }, (_, i) => ({
    id: `s-${i}`,
    left: `${5 + Math.random() * 90}%`,
    bottom: `${5 + Math.random() * 75}%`,
    size: 2 + Math.random() * 4,
    duration: 2 + Math.random() * 3,
    animDelay: delay + Math.random() * 4,
    opacity: 0.4 + Math.random() * 0.5,
    color: [
      'rgba(255, 255, 255, 0.8)',
      'rgba(230, 200, 255, 0.7)',
      'rgba(255, 220, 240, 0.7)',
      'rgba(200, 230, 255, 0.6)',
    ][Math.floor(Math.random() * 4)],
    glow: [
      'rgba(255, 255, 255, 0.15)',
      'rgba(220, 180, 240, 0.12)',
      'rgba(255, 200, 220, 0.12)',
    ][Math.floor(Math.random() * 3)],
  }))

  const bubbleItems = Array.from({ length: bubbles }, (_, i) => ({
    id: `b-${i}`,
    left: `${10 + Math.random() * 80}%`,
    bottom: `${10 + Math.random() * 40}%`,
    size: 8 + Math.random() * 14,
    animDelay: delay + 1 + Math.random() * 5,
  }))

  return (
    <>
      {sparkleItems.map((s) => (
        <div
          key={s.id}
          className="sparkle"
          style={{
            left: s.left,
            bottom: s.bottom,
            width: `${s.size}px`,
            height: `${s.size}px`,
            background: s.color,
            '--sparkle-duration': `${s.duration}s`,
            '--sparkle-opacity': s.opacity,
            '--sparkle-glow': s.glow,
            animationDelay: `${s.animDelay}s`,
          }}
        />
      ))}
      {bubbleItems.map((b) => (
        <div
          key={b.id}
          className="sparkle bubble"
          style={{
            left: b.left,
            bottom: b.bottom,
            width: `${b.size}px`,
            height: `${b.size}px`,
            animationDelay: `${b.animDelay}s`,
          }}
        />
      ))}
    </>
  )
}
