import { useState, useEffect } from "react";

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
  const [winW, setWinW] = useState(typeof window !== 'undefined' ? window.innerWidth : 400);

  useEffect(() => {
    const onResize = () => setWinW(window.innerWidth);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // Florecitas responsivas: azul, amarillo, rosa
  const flowerColors = ['#4a90d9', '#ffd700', '#ff8ec4'];
  const flowerOffsets = [];
  const spacing = 35;
  const half = winW / 2;
  // Lado izquierdo
  for (let x = -55; x >= -(half - 20); x -= spacing) flowerOffsets.unshift(x);
  // Lado derecho (saltar zona del regalo ~65-105)
  for (let x = 55; x <= half - 20; x += spacing) {
    if (x < 65 || x > 105) flowerOffsets.push(x);
  }

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
          bottom: 30px;
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
          width: 160px;
          height: 150px;
        }

        /* Head */
        .bear-head {
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 96px;
          height: 86px;
          border-radius: 50%;
          background: radial-gradient(circle at 40% 35%, #c4956a, #a07050);
          z-index: 2;
        }

        /* Ears */
        .bear-ear-l, .bear-ear-r {
          position: absolute;
          top: -8px;
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: #a07050;
          z-index: 1;
        }
        .bear-ear-l { left: 50%; transform: translateX(-58px); }
        .bear-ear-r { left: 50%; transform: translateX(20px); }

        .bear-ear-inner-l, .bear-ear-inner-r {
          position: absolute;
          top: -2px;
          width: 22px;
          height: 22px;
          border-radius: 50%;
          background: #d4a882;
          z-index: 2;
        }
        .bear-ear-inner-l { left: 50%; transform: translateX(-50px); }
        .bear-ear-inner-r { left: 50%; transform: translateX(28px); }

        /* Eyes */
        .bear-eye-l, .bear-eye-r {
          position: absolute;
          top: 30px;
          width: 13px;
          height: 16px;
          border-radius: 50%;
          background: #2a1a0a;
          z-index: 3;
        }
        .bear-eye-l { left: 50%; transform: translateX(-32px); }
        .bear-eye-r { left: 50%; transform: translateX(18px); }

        /* Nose */
        .bear-nose {
          position: absolute;
          top: 46px;
          left: 50%;
          transform: translateX(-50%);
          width: 22px;
          height: 14px;
          border-radius: 50%;
          background: #3a2010;
          z-index: 3;
        }

        /* Mouth */
        .bear-mouth {
          position: absolute;
          top: 56px;
          left: 50%;
          transform: translateX(-50%);
          width: 26px;
          height: 14px;
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
          width: 92px;
          height: 82px;
          border-radius: 40% 40% 50% 50%;
          background: radial-gradient(circle at 40% 30%, #c4956a, #a07050);
        }

        /* Belly */
        .bear-belly {
          position: absolute;
          bottom: 14px;
          left: 50%;
          transform: translateX(-50%);
          width: 54px;
          height: 44px;
          border-radius: 50%;
          background: #d4b896;
          z-index: 1;
        }

        /* Arms */
        .bear-arm-l {
          position: absolute;
          bottom: 28px;
          left: 50%;
          transform: translateX(-62px) rotate(12deg);
          width: 30px;
          height: 52px;
          border-radius: 50%;
          background: #a07050;
          animation: bearWaveArm 1.5s ease-in-out infinite;
          transform-origin: top center;
        }
        .bear-arm-r {
          position: absolute;
          bottom: 28px;
          left: 50%;
          transform: translateX(32px) rotate(-12deg);
          width: 30px;
          height: 52px;
          border-radius: 50%;
          background: #a07050;
        }

        /* Feet */
        .bear-foot-l, .bear-foot-r {
          position: absolute;
          bottom: -10px;
          width: 38px;
          height: 22px;
          border-radius: 50%;
          background: #8a6040;
        }
        .bear-foot-l { left: 50%; transform: translateX(-46px); }
        .bear-foot-r { left: 50%; transform: translateX(8px); }

        /* Heart on bear belly */
        .bear-heart {
          position: absolute;
          bottom: 16px;
          left: 50%;
          transform: translateX(-50%);
          font-size: 32px;
          color: #e83050;
          animation: bearHeartPulse 1.2s ease-in-out infinite;
          z-index: 4;
        }

        @keyframes bearBounce {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50% { transform: translateX(-50%) translateY(-6px); }
        }

        @keyframes bearWaveArm {
          0%, 100% { transform: translateX(-62px) rotate(12deg); }
          50% { transform: translateX(-62px) rotate(-10deg); }
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

        /* ========== CÉSPED ========== */
        .intro-grass-wrap {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 70px;
          z-index: 2;
          overflow: hidden;
        }

        .intro-grass-ground {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 28px;
          background: linear-gradient(to top, #0c2e16, #153f24 50%, #1a5530);
        }

        .intro-grass-svg {
          position: absolute;
          bottom: 22px;
          left: 0;
          width: 100%;
          height: 50px;
        }

        /* ========== FLORECITAS ========== */
        .intro-mini-flower {
          position: absolute;
          bottom: 30px;
          z-index: 3;
          animation: miniFlowerSway 3s ease-in-out infinite;
        }

        .mini-stem {
          width: 2px;
          height: 20px;
          background: #2cc56b;
          margin: 0 auto;
          border-radius: 2px;
        }

        .mini-petals {
          position: relative;
          width: 16px;
          height: 16px;
          margin: 0 auto -2px;
        }

        .mini-petal {
          position: absolute;
          width: 7px;
          height: 7px;
          border-radius: 50%;
        }
        .mini-petal.mp1 { top: 0; left: 50%; transform: translateX(-50%); }
        .mini-petal.mp2 { top: 4px; left: 0; }
        .mini-petal.mp3 { top: 4px; right: 0; }
        .mini-petal.mp4 { bottom: 0; left: 50%; transform: translateX(-50%); }

        .mini-petal-center {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #ffd76f;
        }

        @keyframes miniFlowerSway {
          0%, 100% { transform: rotate(-3deg); }
          50% { transform: rotate(3deg); }
        }

        /* ========== LUCIÉRNAGAS ========== */
        .intro-firefly {
          position: absolute;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(255,230,100,0.9), rgba(255,200,50,0.3) 60%, transparent 80%);
          animation: fireflyFloat ease-in-out infinite;
          pointer-events: none;
          z-index: 5;
        }

        @keyframes fireflyFloat {
          0% { transform: translate(0, 0) scale(0.8); opacity: 0.3; }
          25% { transform: translate(8px, -12px) scale(1.1); opacity: 1; }
          50% { transform: translate(-5px, -20px) scale(0.9); opacity: 0.6; }
          75% { transform: translate(10px, -8px) scale(1.2); opacity: 1; }
          100% { transform: translate(0, 0) scale(0.8); opacity: 0.3; }
        }

        /* ========== REGALO ========== */
        .intro-gift {
          position: absolute;
          bottom: 30px;
          left: 50%;
          transform: translateX(100px);
          z-index: 3;
          animation: giftBounce 2s ease-in-out infinite;
        }

        .gift-box {
          position: relative;
          width: 52px;
          height: 40px;
          background: linear-gradient(135deg, #e84080, #d43070);
          border-radius: 3px;
          box-shadow: 0 2px 8px rgba(200,50,100,0.3);
        }

        .gift-ribbon-v {
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 8px;
          height: 100%;
          background: #ffd700;
          border-radius: 1px;
        }

        .gift-ribbon-h {
          position: absolute;
          top: 50%;
          left: 0;
          transform: translateY(-50%);
          width: 100%;
          height: 8px;
          background: #ffd700;
          border-radius: 1px;
        }

        .gift-lid {
          position: absolute;
          top: -10px;
          left: -4px;
          width: 60px;
          height: 14px;
          background: linear-gradient(135deg, #f04888, #e04080);
          border-radius: 3px 3px 0 0;
          box-shadow: 0 -1px 4px rgba(200,50,100,0.2);
        }

        .gift-bow {
          position: absolute;
          top: -20px;
          left: 50%;
          transform: translateX(-50%);
          font-size: 18px;
        }

        @keyframes giftBounce {
          0%, 100% { transform: translateX(100px) translateY(0); }
          50% { transform: translateX(100px) translateY(-4px); }
        }

        /* ========== RESPONSIVE ========== */
        @media (max-width: 500px) {
          .intro-bear { bottom: 22px; }
          .bear-body { transform: scale(0.7); transform-origin: bottom center; }
          .intro-gift { bottom: 22px; transform: translateX(70px); }
          .gift-box { transform: scale(0.8); transform-origin: bottom center; }
          @keyframes giftBounce {
            0%, 100% { transform: translateX(70px) translateY(0); }
            50% { transform: translateX(70px) translateY(-4px); }
          }
          .intro-moon { width: 50px; height: 50px; top: 20px; right: 20px; }
          .intro-moonGlow { width: 90px; height: 90px; top: 10px; right: 10px; }
          .intro-mini-flower { bottom: 22px; }
          .intro-grass-wrap { height: 55px; }
          .intro-grass-ground { height: 22px; }
          .intro-grass-svg { height: 38px; bottom: 16px; }
          .intro-content h1 { font-size: 1.4rem; }
          .intro-content p { font-size: 0.85rem; }
          .intro-btn { padding: 10px 36px; font-size: 1rem; }
        }

        @media (max-width: 360px) {
          .intro-bear { bottom: 18px; }
          .bear-body { transform: scale(0.55); }
          .intro-gift { transform: translateX(55px); bottom: 18px; }
          .gift-box { transform: scale(0.65); }
          @keyframes giftBounce {
            0%, 100% { transform: translateX(55px) translateY(0); }
            50% { transform: translateX(55px) translateY(-4px); }
          }
          .intro-mini-flower { bottom: 18px; }
          .intro-grass-wrap { height: 45px; }
          .intro-grass-ground { height: 18px; }
          .intro-grass-svg { height: 30px; bottom: 14px; }
          .intro-moon { width: 40px; height: 40px; top: 15px; right: 12px; }
          .intro-moonGlow { width: 70px; height: 70px; top: 8px; right: 6px; }
        }

        @media (min-width: 1200px) {
          .bear-body { transform: scale(1.15); transform-origin: bottom center; }
          .gift-box { transform: scale(1.1); transform-origin: bottom center; }
          .intro-grass-wrap { height: 85px; }
          .intro-grass-ground { height: 34px; }
          .intro-grass-svg { height: 60px; bottom: 28px; }
          .intro-mini-flower { bottom: 38px; }
          .intro-bear { bottom: 38px; }
          .intro-gift { bottom: 38px; }
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
          <p>Hecho con todo mi corazón, espero te guste (Usa Audifonos o bajale el volumen)</p>
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

        {/* Regalo */}
        <div className="intro-gift">
          <div className="gift-box">
            <div className="gift-lid" />
            <div className="gift-ribbon-v" />
            <div className="gift-ribbon-h" />
            <div className="gift-bow">🎀</div>
          </div>
        </div>

        {/* Florecitas */}
        {flowerOffsets.map((offset, i) => {
          const c = flowerColors[i % 3];
          const sizes = [1, 0.7, 1.2, 0.6, 1.1, 0.8, 1.3, 0.65, 0.9, 1.15];
          const s = sizes[i % sizes.length];
          const stemH = Math.round(20 * s);
          return (
            <div key={i} className="intro-mini-flower" style={{ left: `calc(50% + ${offset}px)`, animationDelay: `${(i * 0.4) % 3}s`, transform: `scale(${s})`, transformOrigin: 'bottom center' }}>
              <div className="mini-petals">
                <div className="mini-petal mp1" style={{ background: c }} />
                <div className="mini-petal mp2" style={{ background: c }} />
                <div className="mini-petal mp3" style={{ background: c }} />
                <div className="mini-petal mp4" style={{ background: c }} />
                <div className="mini-petal-center" />
              </div>
              <div className="mini-stem" style={{ height: `${stemH}px` }} />
            </div>
          );
        })}

        {/* Luciérnagas */}
        {[{l:'20%',b:'12%',s:6,d:3,dl:0},{l:'75%',b:'15%',s:5,d:3.5,dl:0.8},{l:'35%',b:'18%',s:4,d:4,dl:1.5},{l:'60%',b:'10%',s:5,d:3.2,dl:0.4},{l:'45%',b:'20%',s:3,d:4.5,dl:2},{l:'80%',b:'13%',s:4,d:3.8,dl:1.2},{l:'12%',b:'16%',s:5,d:3.3,dl:0.6}].map((f, i) => (
          <span
            key={i}
            className="intro-firefly"
            style={{
              left: f.l,
              bottom: f.b,
              width: `${f.s}px`,
              height: `${f.s}px`,
              animationDuration: `${f.d}s`,
              animationDelay: `${f.dl}s`,
            }}
          />
        ))}

        {/* Césped realista */}
        <div className="intro-grass-wrap">
          <svg className="intro-grass-svg" viewBox="0 0 400 50" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
            {/* Capa trasera - pasto oscuro */}
            {Array.from({length: 160}, (_, i) => {
              const x = i * 2.5;
              const heights = [3,38,18,5,42,12,35,2,22,40,6,14,30,8,44,16,33,4,20,36,10,28,7,45,15];
              const top = heights[i % heights.length];
              const darkGreens = ['#1a5a2a','#165224','#1d6830','#18562a','#1b5e2c','#16522a','#1e6c32','#175828','#1a602e','#155026'];
              const fill = darkGreens[i % darkGreens.length];
              const mid = (50 + top) / 2;
              return <path key={`bg${i}`} d={`M${x},50 Q${x+0.5},${mid} ${x+0.8},${top} Q${x+1.1},${mid} ${x+1.6},50`} fill={fill} />;
            })}
            {/* Capa frontal - pasto claro */}
            {Array.from({length: 160}, (_, i) => {
              const x = i * 2.5 + 1.2;
              const heights = [5,32,15,42,8,25,3,36,20,44,10,28,6,40,13,34,2,24,38,7,30,18,46,11,22];
              const top = heights[i % heights.length];
              const lightGreens = ['#22882e','#2a9436','#248c32','#2c9838','#269034','#209030','#289436','#2a9234','#248e32','#2c9638'];
              const fill = lightGreens[i % lightGreens.length];
              const mid = (50 + top) / 2;
              const opacity = i % 2 === 0 ? 0.8 : 0.7;
              return <path key={`fg${i}`} d={`M${x},50 Q${x+0.5},${mid} ${x+0.8},${top} Q${x+1.1},${mid} ${x+1.6},50`} fill={fill} opacity={opacity} />;
            })}
          </svg>
          <div className="intro-grass-ground" />
        </div>
      </div>
    </>
  );
}
