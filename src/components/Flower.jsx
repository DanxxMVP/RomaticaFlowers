import './Flower.css'

/**
 * Flower — Lily-like bloom with animated petals.
 * Props:
 *   x           — horizontal position
 *   bottomOffset— how high from the stem top (px)
 *   bloomDelay  — delay before opening (s)
 *   size        — 'small' | '' | 'large'
 *   petalColor  — main petal gradient start
 *   petalTip    — petal gradient end
 *   innerColor  — inner petal color
 */
export default function Flower({
  x = '50%',
  bottom = '200px',
  bloomDelay = 3,
  size = '',
  petalColor = '#e8a4c8',
  petalTip = '#f2c9dc',
  innerColor = '#f0d4e3',
}) {
  const budAppearDelay = bloomDelay - 0.8
  const budDisappearDelay = bloomDelay
  const centerDelay = bloomDelay + 0.9

  const petalStyle = (i) => ({
    background: `linear-gradient(to top, ${petalColor}, ${petalTip})`,
    animationDelay: `${bloomDelay + i * 0.1}s`,
  })

  const innerStyle = (i) => ({
    background: `linear-gradient(to top, ${innerColor}, #fff5f9)`,
    animationDelay: `${bloomDelay + 0.5 + i * 0.12}s`,
  })

  return (
    <div
      className="flower-wrapper"
      style={{ left: x, bottom }}
    >
      <div className={`flower-head ${size}`}>
        {/* Bud — appears first, then fades as petals bloom */}
        <div
          className="flower-bud"
          style={{
            animationDelay: `${budAppearDelay}s, ${budDisappearDelay}s`,
          }}
        />

        {/* Outer petals */}
        {[0, 1, 2, 3, 4].map((i) => (
          <div key={`p${i}`} className="petal" style={petalStyle(i)} />
        ))}

        {/* Inner petals */}
        {[0, 1].map((i) => (
          <div key={`ip${i}`} className="petal inner" style={innerStyle(i)} />
        ))}

        {/* Flower center */}
        <div
          className="flower-center"
          style={{ animationDelay: `${centerDelay}s` }}
        />

        {/* Soft glow */}
        <div
          className="flower-glow"
          style={{ animationDelay: `${bloomDelay + 0.5}s` }}
        />
      </div>
    </div>
  )
}
