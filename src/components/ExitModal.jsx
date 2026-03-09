export default function ExitModal({ onExit, onReplay }) {
  return (
    <>
      <style>{`
        .exit-overlay {
          position: fixed;
          inset: 0;
          z-index: 200;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(5, 8, 29, 0.85);
          backdrop-filter: blur(6px);
          animation: exitFadeIn 0.4s ease both;
        }

        .exit-modal {
          position: relative;
          background: linear-gradient(145deg, #1a0e2e, #2a1040);
          border: 1px solid rgba(255, 180, 210, 0.2);
          border-radius: 24px;
          padding: 40px 36px 32px;
          max-width: 380px;
          width: 90%;
          text-align: center;
          box-shadow: 0 0 60px rgba(210, 80, 140, 0.2), 0 8px 32px rgba(0,0,0,0.5);
          animation: exitSlideUp 0.5s ease both;
        }

        .exit-modal-emoji {
          font-size: 48px;
          margin-bottom: 16px;
          display: block;
          animation: exitHeartPulse 1.5s ease-in-out infinite;
        }

        .exit-modal-text {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: 1.25rem;
          color: #f7dce8;
          line-height: 1.6;
          margin: 0 0 28px;
          font-weight: 500;
        }

        .exit-modal-buttons {
          display: flex;
          flex-direction: column;
          gap: 14px;
          align-items: center;
        }

        .exit-btn-replay {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 12px 32px;
          font-family: Georgia, serif;
          font-size: 1.05rem;
          color: #fff;
          background: linear-gradient(135deg, #d4609a, #b8407a);
          border: 1px solid rgba(255, 180, 210, 0.3);
          border-radius: 999px;
          cursor: pointer;
          box-shadow: 0 0 24px rgba(210, 100, 160, 0.3), 0 4px 14px rgba(0,0,0,0.3);
          transition: transform 0.2s, box-shadow 0.2s;
        }

        .exit-btn-replay:hover {
          transform: scale(1.06);
          box-shadow: 0 0 36px rgba(210, 100, 160, 0.5), 0 6px 18px rgba(0,0,0,0.3);
        }

        .exit-btn-replay .flower-icon {
          font-size: 1.2rem;
        }

        .exit-btn-close {
          padding: 10px 28px;
          font-family: Georgia, serif;
          font-size: 0.95rem;
          color: #d4a8c0;
          background: transparent;
          border: 1px solid rgba(212, 168, 192, 0.3);
          border-radius: 999px;
          cursor: pointer;
          transition: all 0.2s;
        }

        .exit-btn-close:hover {
          color: #fff;
          border-color: rgba(255, 180, 210, 0.5);
          background: rgba(255, 255, 255, 0.05);
        }

        @keyframes exitFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes exitSlideUp {
          from { opacity: 0; transform: translateY(30px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }

        @keyframes exitHeartPulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.15); }
        }
      `}</style>

      <div className="exit-overlay" onClick={onExit}>
        <div className="exit-modal" onClick={(e) => e.stopPropagation()}>
          <span className="exit-modal-emoji">💖</span>
          <p className="exit-modal-text">
            Espero te haya encantado<br />como me encantas tú a mí
          </p>
          <div className="exit-modal-buttons">
            <button className="exit-btn-replay" onClick={onReplay}>
              <span className="flower-icon">🌸</span>
              Volver a ver
            </button>
            <button className="exit-btn-close" onClick={onExit}>
              Salir
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
