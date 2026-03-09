import { useState, useRef, useEffect } from "react";
import IntroScreen from "./components/IntroScreen";

export default function App() {
  const [started, setStarted] = useState(false);
  const [activeSong, setActiveSong] = useState(null);
  const [activeMessage, setActiveMessage] = useState(null);
  const audioRef = useRef(null);
  const bgAudioRef = useRef(null);
  const rocketRef = useRef(null);
  const [isMobile, setIsMobile] = useState(() => typeof window !== "undefined" && window.innerWidth <= 700);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth <= 700);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const handleStart = () => {
    if (bgAudioRef.current) {
      bgAudioRef.current.volume = 0.4;
      bgAudioRef.current.play().catch(() => {});
    }
    setStarted(true);
  };

  useEffect(() => {
    if (activeSong && activeSong.audioUrl) {
      if (bgAudioRef.current) bgAudioRef.current.pause();
      audioRef.current?.play();
    } else {
      if (bgAudioRef.current) bgAudioRef.current.play().catch(() => {});
    }
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, [activeSong]);

  useEffect(() => {
    if (!started) return;
    let rafId;
    const vbW = isMobile ? 1000 : 1000;
    const vbH = isMobile ? 1000 : 700;
    const timer = setTimeout(() => {
      const pathEl = document.getElementById("rocketFlightPath");
      const el = rocketRef.current;
      if (!pathEl || !el) return;
      const totalLen = pathEl.getTotalLength();
      const dur = 7000;
      let s = null;
      const step = (ts) => {
        if (!s) s = ts;
        const raw = Math.min((ts - s) / dur, 1);
        const t = raw < 0.5 ? 4*raw*raw*raw : 1 - Math.pow(-2*raw+2, 3)/2;
        const pt = pathEl.getPointAtLength(t * totalLen);
        const d = 1;
        const p1 = pathEl.getPointAtLength(Math.max(0, t*totalLen - d));
        const p2 = pathEl.getPointAtLength(Math.min(totalLen, t*totalLen + d));
        const angle = Math.atan2(p2.y - p1.y, p2.x - p1.x) * 180 / Math.PI;
        let op = 1;
        if (raw < 0.08) op = raw / 0.08;
        else if (raw > 0.88) op = Math.max(0, (1 - raw) / 0.12);
        el.style.left = `${(pt.x / vbW) * 100}%`;
        el.style.top = `${(pt.y / vbH) * 100}%`;
        el.style.transform = `translate(-50%,-50%) rotate(${angle + 90}deg)`;
        el.style.opacity = String(op);
        if (raw < 1) rafId = requestAnimationFrame(step);
      };
      rafId = requestAnimationFrame(step);
    }, 1500);
    return () => { clearTimeout(timer); cancelAnimationFrame(rafId); };
  }, [started, isMobile]);

  const closeSong = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setActiveSong(null);
  };

  const closeMessage = () => setActiveMessage(null);

  const petalSongs = [
    { petal: "tLeft", title: "Soy Todo Tuyo", artist: "Los Tucanes de Tijuana", lyric: "Me encantas cuando sonríes\nte ves de lo más hermosa\nestoy tan enamorado\nque hasta enojado te veo preciosa", audioUrl: "/Songs/soy-todo-tuyo-clip.mp3" },
    { petal: "tRight", title: "Ya Borracho", artist: "", lyric: "Pa enamorarte, las flores no son tan caras\nPero llevan todo el cariño de mi alma\nQue pa en febrero vendré frente a ti\nCon mis preguntas y digas que sí", audioUrl: "/Songs/ya-borracho-clip.mp3" },
    { petal: "tCenter", title: "Vamos Tarde", artist: "Pepe Aguilar", lyric: "Si te hubiera conocido hace tiempo\nSi te hubiera conocido de hace tiempo\nCuántas noches, tantas citas con tu cuerpo\nImagina todo lo que nos debemos\n\nAquí estoy haciendo cuentas\nY tendría que darte un millón de besos\nPa' ponernos al parejo\nDame luz verde y empiezo", audioUrl: "/Songs/vamos-tarde-clip.mp3" },
  ];

  const flowerMessages = [
    { id: 2, phrase: "La belleza de una mujer no está en su rostro, está en su corazón." },
    { id: 3, phrase: "Eres la prueba de que Dios tiene favoritas." },
    { id: 4, phrase: "Tu sonrisa ilumina hasta la noche más oscura." },
    { id: 5, phrase: "No necesitas alas para ser un ángel." },
    { id: 6, phrase: "La mujer más bonita es la que sonríe con el alma." },
    { id: 7, phrase: "Tus ojos tienen más estrellas que el cielo." },
    { id: 8, phrase: "Eres poesía hecha mujer." },
    { id: 9, phrase: "Cada vez que sonríes, el mundo se detiene." },
    { id: 10, phrase: "Dios se tomó su tiempo cuando te creó." },
    { id: 11, phrase: "Bonita por fuera, hermosa por dentro." },
    { id: 12, phrase: "Eres ese tipo de magia que no se puede explicar." },
    { id: 13, phrase: "Si la belleza fuera tiempo, tú serías la eternidad." },
  ];

  const bouquetFlowers = [
    { id: 1, left: "50%", height: 200, scale: 1.20, delay: 0.2, sway: 5.6, type: "tulip" },
    { id: 2, left: "42%", height: 160, scale: 1.04, delay: 0.4, sway: 6.1 },
    { id: 3, left: "58%", height: 158, scale: 1.04, delay: 0.5, sway: 6.2 },
    { id: 4, left: "46%", height: 150, scale: 1.0, delay: 0.6, sway: 6.3 },
    { id: 5, left: "54%", height: 148, scale: 1.0, delay: 0.65, sway: 6.4 },
    { id: 6, left: "34%", height: 140, scale: 0.96, delay: 0.75, sway: 6.6 },
    { id: 7, left: "66%", height: 138, scale: 0.96, delay: 0.8, sway: 6.7 },
    { id: 8, left: "26%", height: 128, scale: 0.90, delay: 0.95, sway: 7.0 },
    { id: 9, left: "74%", height: 126, scale: 0.90, delay: 1.05, sway: 7.1 },
    { id: 10, left: "18%", height: 115, scale: 0.84, delay: 1.15, sway: 7.3 },
    { id: 11, left: "82%", height: 113, scale: 0.84, delay: 1.25, sway: 7.5 },
    { id: 12, left: "10%", height: 102, scale: 0.78, delay: 1.35, sway: 7.7 },
    { id: 13, left: "90%", height: 100, scale: 0.78, delay: 1.45, sway: 7.9 },
  ];

  const hearts = bouquetFlowers.flatMap((flower, fi) =>
    [0, 1, 2].map((j) => ({
      id: fi * 3 + j,
      left: flower.left,
      bottom: flower.height - 10,
      size: 12 + (j % 3) * 4,
      delay: 2.5 + flower.delay + j * 1.8,
      duration: 4.2 + (j % 3) * 0.6,
    }))
  );



  const stars = Array.from({ length: 80 }, (_, i) => ({
    id: i,
    left: `${(Math.sin(i * 3.7) * 48 + 50).toFixed(1)}%`,
    top: `${(Math.cos(i * 2.3) * 33 + 35 + Math.sin(i * 5.1) * 8).toFixed(1)}%`,
    size: 1 + (i % 4),
    delay: `${((i * 0.37) % 3.5).toFixed(2)}s`,
    duration: `${2.2 + (i % 5) * 0.5}s`,
  }));

  const rocketCurve = isMobile
    ? "M 120 900 C 200 700, 350 400, 750 80"
    : "M 70 620 C 260 520, 520 320, 900 100";

  return (
    <>
      <style>{`
        {
          box-sizing: border-box;
        }

        html, body, #root {
          margin: 0;
          padding: 0;
          width: 100%;
          min-height: 100%;
        }

        body {
          font-family: Georgia, "Times New Roman", serif;
          background: #070b23;
        }



        /* ========== MAIN SCENE ========== */
        .scene {
          position: relative;
          min-height: 100vh;
          overflow: hidden;
          background:
            radial-gradient(circle at 86% 10%, rgba(255,255,220,0.08), transparent 10%),
            radial-gradient(circle at 50% 55%, rgba(101, 83, 255, 0.08), transparent 30%),
            linear-gradient(to bottom, #05081d 0%, #0a0f38 55%, #0b1238 100%);
        }

        /* ========== BIGGER MOON ========== */
        .moonGlow {
          position: absolute;
          top: 20px;
          right: 80px;
          width: 180px;
          height: 180px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(255,248,228,0.32), rgba(255,248,228,0.04) 55%, transparent 72%);
          filter: blur(6px);
          animation: moonPulse 6s ease-in-out infinite;
        }

        .moon {
          position: absolute;
          top: 38px;
          right: 108px;
          width: 90px;
          height: 90px;
          border-radius: 50%;
          background: radial-gradient(circle at 35% 35%, #fffdf5 0%, #f3eee0 58%, #d8d2c4 100%);
          box-shadow: 0 0 40px rgba(255, 247, 220, 0.4), 0 0 80px rgba(255, 247, 220, 0.15);
        }

        .moon::after {
          content: "";
          position: absolute;
          top: 16px;
          left: 18px;
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: rgba(40, 40, 40, 0.14);
          filter: blur(4px);
        }

        @keyframes moonPulse {
          0%, 100% { opacity: 0.8; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.04); }
        }

        /* ========== ROCKET (offset-path) ========== */
        .flight-svg {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 4;
        }

        .rocket-wrap {
          position: absolute;
          z-index: 10;
          pointer-events: none;
          opacity: 0;
        }

        .rocket-body {
          position: relative;
          width: 30px;
          height: 70px;
          filter: drop-shadow(0 0 14px rgba(255, 180, 100, 0.5));
        }

        /* Nose cone */
        .rocket-nose {
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 0;
          height: 0;
          border-left: 12px solid transparent;
          border-right: 12px solid transparent;
          border-bottom: 24px solid #e8e8f0;
        }

        /* Fuselage */
        .rocket-fuselage {
          position: absolute;
          top: 22px;
          left: 50%;
          transform: translateX(-50%);
          width: 24px;
          height: 38px;
          border-radius: 3px 3px 4px 4px;
          background: linear-gradient(135deg, #f0f0f8 0%, #c8c8d8 50%, #a8a8c0 100%);
          box-shadow: inset 2px 0 4px rgba(255,255,255,0.3), inset -2px 0 4px rgba(0,0,0,0.1);
        }

        /* Window */
        .rocket-window {
          position: absolute;
          top: 30px;
          left: 50%;
          transform: translateX(-50%);
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: radial-gradient(circle, #6ec6ff, #3a8fd4);
          border: 1px solid rgba(255,255,255,0.4);
          z-index: 2;
        }

        /* Fins */
        .rocket-fin-l, .rocket-fin-r {
          position: absolute;
          bottom: 8px;
          width: 0;
          height: 0;
        }
        .rocket-fin-l {
          left: -5px;
          border-top: 10px solid transparent;
          border-right: 10px solid #d44040;
          border-bottom: 8px solid #d44040;
        }
        .rocket-fin-r {
          right: -5px;
          border-top: 10px solid transparent;
          border-left: 10px solid #d44040;
          border-bottom: 8px solid #d44040;
        }

        /* Flame trail */
        .rocket-trail {
          position: absolute;
          bottom: -22px;
          left: 50%;
          transform: translateX(-50%);
          width: 12px;
          height: 28px;
          background: linear-gradient(to bottom, #ffaa30, #ff6020 50%, rgba(255,60,20,0.3), transparent);
          border-radius: 0 0 50% 50%;
          filter: blur(2px);
          animation: trailFlicker 0.12s ease-in-out infinite alternate;
        }

        .rocket-trail::before {
          content: "";
          position: absolute;
          top: 2px;
          left: 50%;
          transform: translateX(-50%);
          width: 6px;
          height: 20px;
          background: linear-gradient(to bottom, #ffe880, #ffaa30, transparent);
          border-radius: 0 0 50% 50%;
        }

        @keyframes trailFlicker {
          0% { height: 22px; opacity: 0.7; }
          100% { height: 32px; opacity: 1; }
        }

        /* Heart hint that drops at mid-flight */
        .rocketHint {
          position: absolute;
          left: 50%;
          top: 42%;
          transform: translateX(-50%) translateY(-50%);
          z-index: 12;
          pointer-events: none;
          opacity: 0;
          animation: hintAppear 7s ease-in-out 1.5s both;
        }

        .rocketHint .hintHeart {
          font-size: 28px;
          color: #e83050;
          text-shadow: 0 0 16px rgba(232, 48, 80, 0.5);
          display: block;
          text-align: center;
          animation: hintPulse 1.2s ease-in-out infinite;
        }

        .rocketHint .hintText {
          margin-top: 6px;
          font-size: 0.85rem;
          color: #f0c8d8;
          font-style: italic;
          text-align: center;
          white-space: nowrap;
          text-shadow: 0 0 12px rgba(200, 100, 150, 0.4);
        }

        @keyframes hintAppear {
          0%, 35% { opacity: 0; transform: translateX(-50%) translateY(-30px); }
          45%, 100% { opacity: 1; transform: translateX(-50%) translateY(0); }
        }

        @keyframes hintPulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.15); }
        }

        .star {
          position: absolute;
          border-radius: 50%;
          background: rgba(255,255,255,0.9);
          animation: twinkle ease-in-out infinite;
        }



        .message {
          position: absolute;
          top: 18%;
          left: 50%;
          transform: translateX(-50%);
          width: min(360px, calc(100vw - 32px));
          padding: 22px 24px 18px;
          border-radius: 20px;
          background: rgba(10, 10, 30, 0.26);
          border: 1px solid rgba(255, 215, 235, 0.12);
          backdrop-filter: blur(8px);
          box-shadow: 0 0 40px rgba(156, 120, 255, 0.08);
          text-align: center;
          color: #f8e7f0;
          animation: messageIn 1.2s ease 3s both;
          z-index: 5;
        }

        .message h1 {
          margin: 0;
          font-size: clamp(2rem, 3vw, 2.6rem);
          line-height: 1.02;
          font-weight: 700;
          color: #f7dce8;
        }

        .message p {
          margin: 14px 0 0;
          font-size: clamp(1rem, 1.8vw, 1.25rem);
          line-height: 1.4;
          color: #ebcfdc;
          font-style: italic;
        }

        .miniHearts {
          margin-top: 14px;
          font-size: 10px;
          letter-spacing: 10px;
          color: #d69cb8;
          opacity: 0.8;
        }

        /* ========== BOUQUET ========== */
        .bouquetWrap {
          position: absolute;
          left: 0;
          bottom: 0;
          width: 100%;
          height: min(720px, 82vh);
        }



        .flowerItem {
          position: absolute;
          left: 50%;
          bottom: 0;
          transform-origin: bottom center;
        }

        .flowerSway {
          position: relative;
          width: 0;
          height: 100%;
          transform-origin: bottom center;
        }

        .stem {
          position: absolute;
          left: 50%;
          bottom: 0;
          width: 4px;
          border-radius: 999px;
          background: linear-gradient(to top, #14532d, #1fae55 65%, #2cc56b);
          transform: translateX(-50%);
          transform-origin: bottom center;
          box-shadow: 0 0 6px rgba(73, 255, 143, 0.1);
          animation: growStem 1.2s ease-out both;
        }

        .leaf {
          position: absolute;
          width: 12px;
          height: 32px;
          background: linear-gradient(to bottom, #29c264, #166534);
          border-radius: 100% 0 100% 0;
          opacity: 0.9;
          transform-origin: bottom center;
          animation: leafIn 0.8s ease-out both;
        }

        .leaf.left1 {
          left: 50%;
          bottom: 36px;
          transform: translateX(-55%) rotate(-18deg);
        }

        .leaf.right1 {
          left: 50%;
          bottom: 65px;
          transform: translateX(-42%) rotate(16deg) scaleX(-1);
        }

        .bloom {
          position: absolute;
          left: 50%;
          bottom: 0;
          transform: translateX(-50%);
        }

        .budCore {
          position: absolute;
          left: 50%;
          bottom: 0;
          width: 18px;
          height: 38px;
          transform: translateX(-50%);
          border-radius: 55% 55% 40% 40%;
          background: linear-gradient(to bottom, #f7b9d4, #ee84b4);
          box-shadow: 0 0 12px rgba(255, 178, 216, 0.26);
          animation: budAppear 0.7s ease-out both;
        }

        .petal {
          position: absolute;
          bottom: 8px;
          background: linear-gradient(to bottom, #ffe8f0 0%, #f7bfd8 60%, #ef9ac0 100%);
          border: 1px solid rgba(255,255,255,0.14);
          box-shadow: 0 0 14px rgba(255, 184, 219, 0.18);
        }

        .petal.left {
          left: 50%;
          width: 28px;
          height: 52px;
          border-radius: 100% 100% 0 100%;
          transform-origin: bottom right;
        }

        .petal.right {
          left: 50%;
          width: 28px;
          height: 52px;
          border-radius: 100% 100% 100% 0;
          transform-origin: bottom left;
        }

        .petal.center {
          left: 50%;
          width: 22px;
          height: 48px;
          border-radius: 999px;
          transform-origin: bottom center;
        }

        .petal.backLeft {
          left: 50%;
          width: 22px;
          height: 44px;
          opacity: 0.72;
          border-radius: 100% 100% 0 100%;
          transform-origin: bottom right;
        }

        .petal.backRight {
          left: 50%;
          width: 22px;
          height: 44px;
          opacity: 0.72;
          border-radius: 100% 100% 100% 0;
          transform-origin: bottom left;
        }

        .pollen {
          position: absolute;
          left: 50%;
          bottom: 12px;
          width: 10px;
          height: 10px;
          transform: translateX(-50%);
          border-radius: 50%;
          background: radial-gradient(circle, #ffd76f, #f5bb3d);
          box-shadow: 0 0 10px rgba(255, 214, 112, 0.4);
          animation: pollenIn 0.5s ease-out both;
        }

        /* ========== TULIP ========== */
        .tulipBud {
          position: absolute;
          left: 50%;
          bottom: 0;
          width: 22px;
          height: 48px;
          transform: translateX(-50%);
          border-radius: 48% 48% 38% 38%;
          background: linear-gradient(to bottom, #e83a6e, #d42d5e 40%, #b52550);
          box-shadow: 0 0 18px rgba(230, 60, 110, 0.3);
          animation: budAppear 0.8s ease-out both;
          z-index: 2;
        }

        .tulipPetal {
          position: absolute;
          bottom: 4px;
          width: 26px;
          height: 56px;
          background: linear-gradient(to top, #f04878 0%, #e83a6e 40%, #ff6b96 100%);
          border: 1px solid rgba(255,255,255,0.1);
          box-shadow: 0 0 16px rgba(240, 72, 120, 0.2);
          z-index: 1;
        }

        .tulipPetal.tLeft {
          left: 50%;
          border-radius: 80% 100% 10% 80%;
          transform-origin: bottom right;
        }

        .tulipPetal.tRight {
          left: 50%;
          border-radius: 100% 80% 80% 10%;
          transform-origin: bottom left;
        }

        .tulipPetal.tCenter {
          left: 50%;
          width: 22px;
          height: 60px;
          border-radius: 50% 50% 30% 30%;
          transform-origin: bottom center;
          z-index: 3;
        }

        .tulipPetal.tBackLeft {
          left: 50%;
          width: 22px;
          height: 50px;
          opacity: 0.7;
          border-radius: 80% 100% 10% 80%;
          transform-origin: bottom right;
        }

        .tulipPetal.tBackRight {
          left: 50%;
          width: 22px;
          height: 50px;
          opacity: 0.7;
          border-radius: 100% 80% 80% 10%;
          transform-origin: bottom left;
        }

        .tulipPollen {
          position: absolute;
          left: 50%;
          bottom: 18px;
          width: 8px;
          height: 8px;
          transform: translateX(-50%);
          border-radius: 50%;
          background: radial-gradient(circle, #ffe066, #f5c518);
          box-shadow: 0 0 12px rgba(255, 220, 60, 0.5);
          animation: pollenIn 0.5s ease-out both;
          z-index: 4;
        }

        @keyframes tulipOpenLeft {
          0% { transform: translateX(-100%) rotate(0deg) scaleY(0.25); opacity: 0.3; }
          100% { transform: translateX(-100%) rotate(-38deg) scaleY(1); opacity: 1; }
        }

        @keyframes tulipOpenRight {
          0% { transform: translateX(0%) rotate(0deg) scaleY(0.25); opacity: 0.3; }
          100% { transform: translateX(0%) rotate(38deg) scaleY(1); opacity: 1; }
        }

        @keyframes tulipOpenCenter {
          0% { transform: translateX(-50%) rotate(0deg) scaleY(0.25); opacity: 0.3; }
          100% { transform: translateX(-50%) rotate(-1deg) scaleY(1); opacity: 1; }
        }

        @keyframes tulipOpenBackLeft {
          0% { transform: translateX(-100%) rotate(-6deg) scaleY(0.2); opacity: 0; }
          100% { transform: translateX(-100%) rotate(-58deg) scaleY(1); opacity: 0.7; }
        }

        @keyframes tulipOpenBackRight {
          0% { transform: translateX(0%) rotate(6deg) scaleY(0.2); opacity: 0; }
          100% { transform: translateX(0%) rotate(58deg) scaleY(1); opacity: 0.7; }
        }

        .heart {
          position: absolute;
          color: #f2a6c7;
          text-shadow: 0 0 10px rgba(242, 166, 199, 0.35);
          animation-name: floatHeart;
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
          opacity: 0;
          z-index: 4;
        }



        @keyframes twinkle {
          0%, 100% { opacity: 0.25; transform: scale(0.8); }
          50% { opacity: 0.95; transform: scale(1.2); }
        }



        @keyframes growStem {
          0% { transform: translateX(-50%) scaleY(0); opacity: 0.2; }
          100% { transform: translateX(-50%) scaleY(1); opacity: 1; }
        }

        @keyframes leafIn {
          0% { opacity: 0; transform-origin: bottom center; }
          100% { opacity: 0.9; }
        }

        @keyframes budAppear {
          0% { transform: translateX(-50%) scale(0.35); opacity: 0; }
          100% { transform: translateX(-50%) scale(1); opacity: 1; }
        }

        @keyframes openLeft {
          0% { transform: translateX(-100%) rotate(0deg) scaleY(0.2); opacity: 0.35; }
          100% { transform: translateX(-100%) rotate(-32deg) scaleY(1); opacity: 1; }
        }

        @keyframes openRight {
          0% { transform: translateX(0%) rotate(0deg) scaleY(0.2); opacity: 0.35; }
          100% { transform: translateX(0%) rotate(32deg) scaleY(1); opacity: 1; }
        }

        @keyframes openCenter {
          0% { transform: translateX(-50%) rotate(0deg) scaleY(0.2); opacity: 0.35; }
          100% { transform: translateX(-50%) rotate(-2deg) scaleY(1); opacity: 1; }
        }

        @keyframes openBackLeft {
          0% { transform: translateX(-100%) rotate(-8deg) scaleY(0.2); opacity: 0; }
          100% { transform: translateX(-100%) rotate(-54deg) scaleY(1); opacity: 0.72; }
        }

        @keyframes openBackRight {
          0% { transform: translateX(0%) rotate(8deg) scaleY(0.2); opacity: 0; }
          100% { transform: translateX(0%) rotate(54deg) scaleY(1); opacity: 0.72; }
        }

        @keyframes pollenIn {
          0% { transform: translateX(-50%) scale(0); opacity: 0; }
          100% { transform: translateX(-50%) scale(1); opacity: 1; }
        }

        @keyframes swayFlower {
          0%, 100% { transform: rotate(-2.3deg); }
          50% { transform: rotate(2.3deg); }
        }

        @keyframes floatHeart {
          0% {
            transform: translateY(0) scale(0.75);
            opacity: 0;
          }
          18% {
            opacity: 0.85;
          }
          100% {
            transform: translateY(-130px) scale(1.1);
            opacity: 0;
          }
        }

        @keyframes messageIn {
          0% {
            opacity: 0;
            transform: translateX(-50%) translateY(16px);
          }
          100% {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
          }
        }

        /* ========== SONG OVERLAY ========== */
        .songOverlay {
          position: fixed;
          inset: 0;
          z-index: 200;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(5, 5, 20, 0.75);
          backdrop-filter: blur(6px);
          animation: songFadeIn 0.4s ease both;
        }

        .songCard {
          position: relative;
          width: min(380px, calc(100vw - 40px));
          padding: 32px 28px 28px;
          border-radius: 24px;
          background: linear-gradient(145deg, rgba(30, 15, 40, 0.92), rgba(20, 10, 30, 0.95));
          border: 1px solid rgba(255, 180, 220, 0.18);
          box-shadow: 0 0 60px rgba(200, 100, 160, 0.2), 0 8px 32px rgba(0,0,0,0.4);
          text-align: center;
          animation: songCardIn 0.5s ease 0.1s both;
        }

        .songCard .songNote {
          font-size: 28px;
          margin-bottom: 12px;
        }

        .songCard .songTitle {
          margin: 0;
          font-size: 1.3rem;
          color: #f7dce8;
          font-weight: 700;
        }

        .songCard .songArtist {
          margin: 6px 0 0;
          font-size: 0.9rem;
          color: #d4a8c0;
        }

        .songCard .songLyric {
          margin: 18px 0 0;
          font-size: 1.05rem;
          line-height: 1.5;
          color: #ebcfdc;
          font-style: italic;
        }

        .songCard .songClose {
          margin-top: 22px;
          padding: 10px 36px;
          font-family: Georgia, serif;
          font-size: 1rem;
          color: #fff;
          background: linear-gradient(135deg, #d4609a, #b8407a);
          border: 1px solid rgba(255, 180, 210, 0.3);
          border-radius: 999px;
          cursor: pointer;
          box-shadow: 0 0 20px rgba(210, 100, 160, 0.25);
          transition: transform 0.2s;
        }

        .songCard .songClose:hover {
          transform: scale(1.06);
        }

        .tulipPetal { cursor: pointer; transition: filter 0.2s; }
        .tulipPetal:hover { filter: brightness(1.2); }
        .bloom.clickable { cursor: pointer; }
        .bloom.clickable:hover .petal,
        .bloom.clickable:hover .budCore,
        .bloom.clickable:hover .pollen { filter: brightness(1.2); }

        @keyframes songFadeIn {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }

        @keyframes songCardIn {
          0% { opacity: 0; transform: scale(0.85) translateY(20px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }

        @media (max-width: 700px) {
          .moonGlow {
            right: 20px;
            top: 16px;
            width: 130px;
            height: 130px;
          }

          .moon {
            right: 36px;
            top: 28px;
            width: 66px;
            height: 66px;
          }

          .moon::after {
            top: 12px;
            left: 14px;
            width: 42px;
            height: 42px;
          }

          .message {
            top: 15%;
            width: min(320px, calc(100vw - 24px));
            padding: 18px 18px 16px;
          }

          .bouquetWrap {
            height: 60vh;
          }

          .rocket-body {
            width: 22px;
            height: 52px;
          }
          .rocket-nose {
            border-left: 9px solid transparent;
            border-right: 9px solid transparent;
            border-bottom: 18px solid #e8e8f0;
          }
          .rocket-fuselage {
            width: 18px;
            height: 28px;
            top: 16px;
          }
          .rocket-window {
            top: 22px;
            width: 7px;
            height: 7px;
          }
          .rocketHint .hintText {
            font-size: 0.75rem;
          }
        }
      `}</style>

      {!started && <IntroScreen onStart={handleStart} />}

      <audio ref={bgAudioRef} src="/Songs/bien-servida.mp3" loop preload="auto" />

      {/* ========== MAIN SCENE ========== */}
      {started && (
        <div className="scene">
          <div className="moonGlow" />
          <div className="moon" />

          {/* SVG flight path */}
          <svg className="flight-svg" viewBox={isMobile ? "0 0 1000 1000" : "0 0 1000 700"} preserveAspectRatio="none">
            <path
              id="rocketFlightPath"
              d={rocketCurve}
              fill="none"
              stroke="rgba(255,200,220,0.14)"
              strokeWidth="2"
              strokeDasharray="10 14"
              strokeLinecap="round"
            />
          </svg>

          {/* Rocket following the path */}
          <div ref={rocketRef} className="rocket-wrap">
            <div className="rocket-body">
              <div className="rocket-nose" />
              <div className="rocket-fuselage" />
              <div className="rocket-window" />
              <div className="rocket-fin-l" />
              <div className="rocket-fin-r" />
              <div className="rocket-trail" />
            </div>
          </div>

          {/* Heart hint at mid-flight */}
          <div className="rocketHint">
            <span className="hintHeart">{"\u2764"}</span>
            <span className="hintText">Haz clic en los pétalos chula</span>
          </div>

          {stars.map((star) => (
            <span
              key={star.id}
              className="star"
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



          <div className="message">
            <h1>Para la mujer más bonita</h1>
            <p>Gracias por llegar a mi mundo</p>
            <div className="miniHearts">♥ ♥ ♥</div>
          </div>

          <div className="bouquetWrap">

            {bouquetFlowers.map((flower) => {
              const bloomDelay = 1.2 + flower.delay;
              const petalDelay = 1.9 + flower.delay;
              const isTulip = flower.type === "tulip";

              return (
                <div
                  key={flower.id}
                  className="flowerItem"
                  style={{
                    left: flower.left,
                    transform: `translateX(-50%) scale(${flower.scale})`,
                  }}
                >
                  <div
                    className="flowerSway"
                    style={{
                      animation: `swayFlower ${flower.sway}s ease-in-out ${flower.delay}s infinite`,
                    }}
                  >
                    <div
                      className="stem"
                      style={{
                        height: `${flower.height}px`,
                        animationDelay: `${flower.delay}s`,
                      }}
                    />

                    {!isTulip && (
                      <>
                        <div
                          className="leaf left1"
                          style={{ animationDelay: `${0.45 + flower.delay}s` }}
                        />
                        <div
                          className="leaf right1"
                          style={{ animationDelay: `${0.7 + flower.delay}s` }}
                        />
                      </>
                    )}

                    <div
                      className={`bloom${!isTulip ? ' clickable' : ''}`}
                      style={{ bottom: `${flower.height - 8}px` }}
                      onClick={!isTulip ? () => setActiveMessage(flowerMessages.find(m => m.id === flower.id)) : undefined}
                    >
                      {isTulip ? (
                        <>
                          <div
                            className="tulipBud"
                            style={{ animationDelay: `${bloomDelay}s` }}
                          />
                          <div
                            className="tulipPetal tBackLeft"
                            style={{ animation: `tulipOpenBackLeft 1s ease-out ${petalDelay}s both` }}
                          />
                          <div
                            className="tulipPetal tBackRight"
                            style={{ animation: `tulipOpenBackRight 1s ease-out ${petalDelay}s both` }}
                          />
                          <div
                            className="tulipPetal tLeft"
                            onClick={() => setActiveSong(petalSongs.find(s => s.petal === "tLeft"))}
                            style={{ animation: `tulipOpenLeft 1.1s ease-out ${petalDelay + 0.15}s both` }}
                          />
                          <div
                            className="tulipPetal tRight"
                            onClick={() => setActiveSong(petalSongs.find(s => s.petal === "tRight"))}
                            style={{ animation: `tulipOpenRight 1.1s ease-out ${petalDelay + 0.15}s both` }}
                          />
                          <div
                            className="tulipPetal tCenter"
                            onClick={() => setActiveSong(petalSongs.find(s => s.petal === "tCenter"))}
                            style={{ animation: `tulipOpenCenter 1s ease-out ${petalDelay + 0.3}s both` }}
                          />
                          <div
                            className="tulipPollen"
                            style={{ animationDelay: `${petalDelay + 0.5}s` }}
                          />
                        </>
                      ) : (
                        <>
                          <div
                            className="budCore"
                            style={{ animationDelay: `${bloomDelay}s` }}
                          />
                          <div
                            className="petal backLeft"
                            style={{ animation: `openBackLeft 0.85s ease-out ${petalDelay}s both` }}
                          />
                          <div
                            className="petal backRight"
                            style={{ animation: `openBackRight 0.85s ease-out ${petalDelay}s both` }}
                          />
                          <div
                            className="petal left"
                            style={{ animation: `openLeft 0.9s ease-out ${petalDelay + 0.12}s both` }}
                          />
                          <div
                            className="petal right"
                            style={{ animation: `openRight 0.9s ease-out ${petalDelay + 0.12}s both` }}
                          />
                          <div
                            className="petal center"
                            style={{ animation: `openCenter 0.82s ease-out ${petalDelay + 0.24}s both` }}
                          />
                          <div
                            className="pollen"
                            style={{ animationDelay: `${petalDelay + 0.35}s` }}
                          />
                        </>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}

            {hearts.map((heart) => (
              <div
                key={heart.id}
                className="heart"
                style={{
                  left: heart.left,
                  bottom: `${heart.bottom}px`,
                  fontSize: `${heart.size}px`,
                  animationDelay: `${heart.delay}s`,
                  animationDuration: `${heart.duration}s`,
                }}
              >
                ♥
              </div>
            ))}
          </div>

          {activeSong && (
            <div className="songOverlay" onClick={closeSong}>
              <div className="songCard" onClick={(e) => e.stopPropagation()}>
                <div className="songNote">🎵</div>
                <h2 className="songTitle">{activeSong.title}</h2>
                <p className="songArtist">{activeSong.artist}</p>
                <p className="songLyric">"{activeSong.lyric}"</p>
                {activeSong.audioUrl && (
                  <audio ref={audioRef} src={activeSong.audioUrl} />
                )}
                <button className="songClose" onClick={closeSong}>Cerrar</button>
              </div>
            </div>
          )}

          {activeMessage && (
            <div className="songOverlay" onClick={closeMessage}>
              <div className="songCard" onClick={(e) => e.stopPropagation()}>
                <div className="songNote">🌸</div>
                <p className="songLyric">"{activeMessage.phrase}"</p>
                <button className="songClose" onClick={closeMessage}>Cerrar</button>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}
