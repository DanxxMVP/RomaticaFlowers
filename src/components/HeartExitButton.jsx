export default function HeartExitButton({ onClick }) {
  return (
    <>
      <style>{`
        .heart-exit-wrapper {
          display: flex;
          justify-content: center;
          margin-top: 12px;
          animation: heartBtnFadeIn 0.6s ease both;
        }

        .heart-exit-btn {
          position: relative;
          width: 80px;
          height: 74px;
          background: none;
          border: none;
          cursor: pointer;
          filter: drop-shadow(0 0 12px rgba(220, 80, 130, 0.5));
          transition: transform 0.25s ease, filter 0.25s ease;
        }

        .heart-exit-btn:hover {
          transform: scale(1.12);
          filter: drop-shadow(0 0 20px rgba(220, 80, 130, 0.7));
        }

        .heart-exit-btn:active {
          transform: scale(0.95);
        }

        .heart-exit-btn svg {
          width: 100%;
          height: 100%;
        }

        .heart-exit-btn .heart-label {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          padding-bottom: 6px;
          font-family: Georgia, serif;
          font-size: 0.85rem;
          font-weight: 600;
          color: #fff;
          letter-spacing: 0.5px;
          pointer-events: none;
          text-shadow: 0 1px 3px rgba(0,0,0,0.4);
        }

        @keyframes heartBtnFadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div className="heart-exit-wrapper">
        <button className="heart-exit-btn" onClick={onClick} aria-label="Salir">
          <svg viewBox="0 0 100 90" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="heartGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#e8507a" />
                <stop offset="100%" stopColor="#c43060" />
              </linearGradient>
            </defs>
            <path
              d="M50 85 C25 65, 0 45, 0 25 A25 25 0 0 1 50 15 A25 25 0 0 1 100 25 C100 45, 75 65, 50 85Z"
              fill="url(#heartGrad)"
            />
          </svg>
          <span className="heart-label">Salir</span>
        </button>
      </div>
    </>
  );
}
