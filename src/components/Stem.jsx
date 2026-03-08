import './Stem.css'

/**
 * Stem — Animated growing plant stem with small leaves.
 * Props:
 *   x        — horizontal position (CSS value)
 *   height   — stem height in px
 *   delay    — animation delay in seconds
 *   color    — stem color
 *   sway     — sway intensity in degrees
 *   leaves   — array of { side: 'left'|'right', bottom: number (%) }
 */
export default function Stem({
  x = '50%',
  height = 200,
  delay = 0,
  color = '#2d6e3f',
  sway = 1.5,
  leaves = [],
}) {
  return (
    <div
      className={`stem-group sway`}
      style={{
        left: x,
        '--sway-amount': `${sway}deg`,
        animationDelay: `${delay + 2}s`,
      }}
    >
      <div
        className="stem-line"
        style={{
          '--stem-height': `${height}px`,
          background: `linear-gradient(to top, ${color}, ${color}cc)`,
          animationDelay: `${delay}s`,
        }}
      >
        {leaves.map((leaf, i) => (
          <div
            key={i}
            className={`stem-leaf ${leaf.side}`}
            style={{
              bottom: `${leaf.bottom}%`,
              animationDelay: `${delay + 1.4 + i * 0.25}s`,
            }}
          />
        ))}
      </div>
    </div>
  )
}
