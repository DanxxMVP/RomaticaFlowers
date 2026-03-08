import './MessageCard.css'

/**
 * MessageCard — Elegant glass-morphism message box.
 * Props:
 *   delay — delay before the card appears (s)
 */
export default function MessageCard({ delay = 5.5 }) {
  return (
    <div className="message-card" style={{ animationDelay: `${delay}s` }}>
      <div className="message-card-inner">
        <h1 className="message-title">Para la mujer más bonita</h1>
        <div className="message-divider" />
        <p className="message-subtitle">Gracias por llegar a mi mundo</p>
        <span className="message-heart" aria-hidden="true">♥ ♥ ♥</span>
      </div>
    </div>
  )
}
