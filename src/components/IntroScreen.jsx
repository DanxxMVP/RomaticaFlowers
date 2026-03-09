import { useState } from "react";

const introHearts = Array.from({ length: 25 }, (_, i) => {
  const seed = Math.sin(i * 7.3 + 2.1) * 10000;
  const rand = seed - Math.floor(seed);
  return {
    id: i,
    left: `${(Math.sin(i * 4.7) * 45 + 50).toFixed(1)}%`,
    size: 8 + Math.round(rand * 28),
    delay: ((i * 0.53 + rand * 2) % 5).toFixed(2),
    duration: (4 + rand * 4).toFixed(1),
    opacity: 0.4 + rand * 0.5,
  };
});

const introStars = Array.from({ length: 60 }, (_, i) => ({
  id: i,
  left: `${(Math.sin(i * 3.7) * 48 + 50).toFixed(1)}%`,
  top: `${(Math.cos(i * 2.3) * 33 + 35 + Math.sin(i * 5.1) * 8).toFixed(1)}%`,
  size: 1 + (i % 4),
  delay: `${((i * 0.37) % 3.5).toFixed(2)}s`,
  duration: `${2.2 + (i % 5) * 0.5}s`,
}));

export default function IntroScreen({ onStart }) {
  const [leaving, setLeaving] = useState(false);

  const handleClick = () => {
    setLeaving(true);
    setTimeout(() => onStart(), 1200);
  };

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
          top: -40px;
          color: #e83050;
          animation: introFloat ease-in-out infinite;
          pointer-events: none;
        }

        .intro-star {
          position: absolute;
          border-radius: 50%;
          background: rgba(255,255,255,0.9);
          animation: introTwinkle ease-in-out infinite;
          pointer-events: none;
        }

        .intro-moonGlow {
          position: absolute;
          top: 20px;
          right: 20px;
          width: 150px;
          height: 150px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(255,248,228,0.32), rgba(255,248,228,0.04) 55%, transparent 72%);
          filter: blur(6px);
          animation: introMoonPulse 6s ease-in-out infinite;
          z-index: 1;
        }

        .intro-moon {
          position: absolute;
          top: 35px;
          right: 40px;
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background: radial-gradient(circle at 35% 35%, #fffdf5 0%, #f3eee0 58%, #d8d2c4 100%);
          box-shadow: 0 0 40px rgba(255, 247, 220, 0.4), 0 0 80px rgba(255, 247, 220, 0.15);
          z-index: 1;
        }

        .intro-moon::after {
          content: "";
          position: absolute;
          top: 14px;
          left: 16px;
          width: 52px;
          height: 52px;
          border-radius: 50%;
          background: rgba(40, 40, 40, 0.14);
          filter: blur(4px);
        }

        @keyframes introMoonPulse {
          0%, 100% { opacity: 0.8; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.04); }
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
          color: #e83050;
          opacity: 0.9;
        }

        @keyframes introFloat {
          0% { transform: translateY(0) scale(0.7); opacity: 0; }
          10% { opacity: 1; }
          80% { opacity: 0.8; }
          100% { transform: translateY(120vh) scale(1.15); opacity: 0; }
        }

        @keyframes introTwinkle {
          0%, 100% { opacity: 0.25; transform: scale(0.8); }
          50% { opacity: 0.95; transform: scale(1.2); }
        }

        @keyframes introFadeIn {
          0% { opacity: 0; transform: translateY(24px); }
          100% { opacity: 1; transform: translateY(0); }
        }

        /* ========== OSITO ========== */
        .intro-bear {
          position: absolute;
          bottom: 40px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 3;
          animation: bearBounce 2s ease-in-out infinite;
        }

        .intro-bear.leaving {
          animation: bearWalkUp 1.2s ease-in forwards;
        }

        .bear-body {
          position: relative;
          width: 120px;
          height: 110px;
        }

        /* Head */
        .bear-head {
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 72px;
          height: 64px;
          border-radius: 50%;
          background: radial-gradient(circle at 40% 35%, #c4956a, #a07050);
          z-index: 2;
        }

        /* Ears */
        .bear-ear-l, .bear-ear-r {
          position: absolute;
          top: -6px;
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: #a07050;
          z-index: 1;
        }
        .bear-ear-l { left: 50%; transform: translateX(-44px); }
        .bear-ear-r { left: 50%; transform: translateX(16px); }

        .bear-ear-inner-l, .bear-ear-inner-r {
          position: absolute;
          top: -2px;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #d4a882;
          z-index: 2;
        }
        .bear-ear-inner-l { left: 50%; transform: translateX(-38px); }
        .bear-ear-inner-r { left: 50%; transform: translateX(22px); }

        /* Eyes */
        .bear-eye-l, .bear-eye-r {
          position: absolute;
          top: 22px;
          width: 10px;
          height: 12px;
          border-radius: 50%;
          background: #2a1a0a;
          z-index: 3;
        }
        .bear-eye-l { left: 50%; transform: translateX(-24px); }
        .bear-eye-r { left: 50%; transform: translateX(14px); }

        /* Nose */
        .bear-nose {
          position: absolute;
          top: 34px;
          left: 50%;
          transform: translateX(-50%);
          width: 16px;
          height: 10px;
          border-radius: 50%;
          background: #3a2010;
          z-index: 3;
        }

        /* Mouth */
        .bear-mouth {
          position: absolute;
          top: 42px;
          left: 50%;
          transform: translateX(-50%);
          width: 20px;
          height: 10px;
          border-bottom: 3px solid #3a2010;
          border-radius: 0 0 50% 50%;
          z-index: 3;
        }

        /* Torso */
        .bear-torso {
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 68px;
          height: 60px;
          border-radius: 40% 40% 50% 50%;
          background: radial-gradient(circle at 40% 30%, #c4956a, #a07050);
        }

        /* Belly */
        .bear-belly {
          position: absolute;
          bottom: 10px;
          left: 50%;
          transform: translateX(-50%);
          width: 40px;
          height: 32px;
          border-radius: 50%;
          background: #d4b896;
          z-index: 1;
        }

        /* Arms */
        .bear-arm-l {
          position: absolute;
          bottom: 20px;
          left: 50%;
          transform: translateX(-46px) rotate(12deg);
          width: 22px;
          height: 38px;
          border-radius: 50%;
          background: #a07050;
          animation: bearWaveArm 1.5s ease-in-out infinite;
          transform-origin: top center;
        }
        .bear-arm-r {
          position: absolute;
          bottom: 20px;
          left: 50%;
          transform: translateX(24px) rotate(-12deg);
          width: 22px;
          height: 38px;
          border-radius: 50%;
          background: #a07050;
        }

        /* Feet */
        .bear-foot-l, .bear-foot-r {
          position: absolute;
          bottom: -8px;
          width: 28px;
          height: 16px;
          border-radius: 50%;
          background: #8a6040;
        }
        .bear-foot-l { left: 50%; transform: translateX(-34px); }
        .bear-foot-r { left: 50%; transform: translateX(6px); }

        /* Heart on bear belly */
        .bear-heart {
          position: absolute;
          bottom: 12px;
          left: 50%;
          transform: translateX(-50%);
          font-size: 24px;
          color: #e83050;
          animation: bearHeartPulse 1.2s ease-in-out infinite;
          z-index: 4;
        }

        @keyframes bearBounce {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50% { transform: translateX(-50%) translateY(-6px); }
        }

        @keyframes bearWaveArm {
          0%, 100% { transform: translateX(-46px) rotate(12deg); }
          50% { transform: translateX(-46px) rotate(-10deg); }
        }

        @keyframes bearHeartPulse {
          0%, 100% { transform: translateX(-50%) scale(1); }
          50% { transform: translateX(-50%) scale(1.2); }
        }

        @keyframes bearWalkUp {
          0% { transform: translateX(-50%) translateY(0); opacity: 1; }
          100% { transform: translateX(-50%) translateY(-110vh); opacity: 0.6; }
        }

        /* Fade out whole intro */
        .intro.leaving {
          animation: introFadeOut 1.2s ease forwards;
        }

        @keyframes introFadeOut {
          0% { opacity: 1; }
          100% { opacity: 0; }
        }
      `}</style>

      <div className={`intro${leaving ? ' leaving' : ''}`}>
        <div className="intro-moonGlow" />
        <div className="intro-moon" />

        {introStars.map((star) => (
          <span
            key={star.id}
            className="intro-star"
            style={{
              left: star.left,
              top: star.top,
              width: `${star.size}px`,
              height: `${star.size}px`,
              animationDuration: star.duration,
              animationDelay: star.delay,
            }}
          />
        ))}

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
          <h1>Te tengo un detalle preciosa</h1>
          <p>Hecho con todo mi corazón, espero te guste</p>
          <div className="intro-hearts-row">♥ ♥ ♥ ♥ ♥</div>
          <button className="intro-btn" onClick={handleClick}>
            Ver
          </button>
        </div>

        <div className={`intro-bear${leaving ? ' leaving' : ''}`}>
          <div className="bear-body">
            <div className="bear-ear-l" />
            <div className="bear-ear-r" />
            <div className="bear-ear-inner-l" />
            <div className="bear-ear-inner-r" />
            <div className="bear-head">
              <div className="bear-eye-l" />
              <div className="bear-eye-r" />
              <div className="bear-nose" />
              <div className="bear-mouth" />
            </div>
            <div className="bear-torso" />
            <div className="bear-belly" />
            <div className="bear-arm-l" />
            <div className="bear-arm-r" />
            <div className="bear-foot-l" />
            <div className="bear-foot-r" />
            <div className="bear-heart">❤</div>
          </div>
        </div>
      </div>
    </>
  );
}
