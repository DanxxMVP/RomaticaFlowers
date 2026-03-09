import { useState, useEffect } from "react";
import "./IntroScreen.css";

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
          <p>Hecho con todo mi cariño, espero te guste (Usa Audifonos o bajale el volumen)</p>
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
