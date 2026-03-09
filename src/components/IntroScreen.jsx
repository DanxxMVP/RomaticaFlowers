const introHearts = Array.from({ length: 30 }, (_, i) => ({
  id: i,
  left: `${5 + ((i * 13) % 90)}%`,
  size: 10 + (i % 5) * 6,
  delay: (i % 8) * 0.6,
  duration: 3.5 + (i % 4) * 0.8,
  opacity: 0.3 + (i % 4) * 0.15,
}));

export default function IntroScreen({ onStart }) {
  return (
    <>
      <style>{`
        .intro {
          position: fixed;
          inset: 0;
          z-index: 100;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background:
            radial-gradient(circle at 50% 40%, rgba(180, 80, 140, 0.12), transparent 50%),
            linear-gradient(to bottom, #05081d 0%, #10082a 40%, #0d0620 100%);
          overflow: hidden;
        }

        .intro-heart {
          position: absolute;
          color: #e8659f;
          animation: introFloat ease-in-out infinite;
          pointer-events: none;
        }

        .intro-content {
          position: relative;
          z-index: 2;
          text-align: center;
          animation: introFadeIn 1.2s ease both;
        }

        .intro-content h1 {
          margin: 0;
          font-size: clamp(1.8rem, 4vw, 2.8rem);
          color: #f7dce8;
          font-weight: 700;
          text-shadow: 0 0 30px rgba(230, 140, 180, 0.3);
        }

        .intro-content p {
          margin: 16px 0 0;
          font-size: clamp(0.9rem, 2vw, 1.15rem);
          color: #d4a8c0;
          font-style: italic;
        }

        .intro-btn {
          margin-top: 32px;
          padding: 14px 48px;
          font-family: Georgia, serif;
          font-size: 1.15rem;
          color: #fff;
          background: linear-gradient(135deg, #d4609a, #b8407a);
          border: 1px solid rgba(255, 180, 210, 0.3);
          border-radius: 999px;
          cursor: pointer;
          box-shadow: 0 0 30px rgba(210, 100, 160, 0.3), 0 4px 16px rgba(0,0,0,0.3);
          transition: transform 0.2s, box-shadow 0.2s;
        }

        .intro-btn:hover {
          transform: scale(1.06);
          box-shadow: 0 0 44px rgba(210, 100, 160, 0.5), 0 6px 20px rgba(0,0,0,0.3);
        }

        .intro-hearts-row {
          margin-top: 22px;
          font-size: 18px;
          letter-spacing: 8px;
          color: #d88aaf;
          opacity: 0.7;
        }

        @keyframes introFloat {
          0% { transform: translateY(100vh) scale(0.6); opacity: 0; }
          15% { opacity: 1; }
          85% { opacity: 1; }
          100% { transform: translateY(-20vh) scale(1.1); opacity: 0; }
        }

        @keyframes introFadeIn {
          0% { opacity: 0; transform: translateY(24px); }
          100% { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div className="intro">
        {introHearts.map((h) => (
          <span
            key={h.id}
            className="intro-heart"
            style={{
              left: h.left,
              fontSize: `${h.size}px`,
              animationDuration: `${h.duration}s`,
              animationDelay: `${h.delay}s`,
              opacity: h.opacity,
            }}
          >
            ♥
          </span>
        ))}

        <div className="intro-content">
          <h1>Te tengo un regalo preciosa</h1>
          <p>Hecho con todo mi corazón</p>
          <div className="intro-hearts-row">♥ ♥ ♥ ♥ ♥</div>
          <button className="intro-btn" onClick={onStart}>
            Ver
          </button>
        </div>
      </div>
    </>
  );
}
