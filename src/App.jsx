export default function App() {
  const bouquetFlowers = [
    { id: 1, left: "50%", height: 285, scale: 1.15, delay: 0.2, sway: 5.6 },
    { id: 2, left: "43%", height: 250, scale: 1.02, delay: 0.45, sway: 6.1 },
    { id: 3, left: "57%", height: 248, scale: 1.02, delay: 0.55, sway: 6.2 },
    { id: 4, left: "36%", height: 220, scale: 0.95, delay: 0.75, sway: 6.6 },
    { id: 5, left: "64%", height: 218, scale: 0.95, delay: 0.85, sway: 6.8 },
    { id: 6, left: "30%", height: 188, scale: 0.88, delay: 1.05, sway: 7.2 },
    { id: 7, left: "70%", height: 186, scale: 0.88, delay: 1.15, sway: 7.4 },
  ];

  const hearts = [
    { id: 1, left: "39%", bottom: 245, size: 16, delay: 2.6, duration: 4.8 },
    { id: 2, left: "47%", bottom: 330, size: 20, delay: 3.3, duration: 5.2 },
    { id: 3, left: "55%", bottom: 280, size: 18, delay: 4.0, duration: 4.9 },
    { id: 4, left: "61%", bottom: 350, size: 15, delay: 4.8, duration: 5.4 },
    { id: 5, left: "44%", bottom: 390, size: 13, delay: 5.2, duration: 5.1 },
  ];

  const stars = Array.from({ length: 34 }, (_, i) => ({
    id: i,
    left: `${3 + ((i * 17) % 94)}%`,
    top: `${2 + ((i * 11) % 58)}%`,
    size: 1 + (i % 3),
    delay: `${(i % 7) * 0.45}s`,
    duration: `${2.6 + (i % 4)}s`,
  }));

  const bubbles = Array.from({ length: 10 }, (_, i) => ({
    id: i,
    left: `${12 + i * 8}%`,
    top: `${38 + ((i * 9) % 30)}%`,
    size: 10 + (i % 3) * 8,
    delay: `${i * 0.5}s`,
    duration: `${3.2 + (i % 3)}s`,
  }));

  return (
    <div className="scene">
      <style>{`
        * {
          box-sizing: border-box;
        }

        html, body, #root {
          margin: 0;
          width: 100%;
          min-height: 100%;
        }

        body {
          font-family: Georgia, "Times New Roman", serif;
          background: #070b23;
        }

        .scene {
          position: relative;
          min-height: 100vh;
          overflow: hidden;
          background:
            radial-gradient(circle at 86% 10%, rgba(255,255,220,0.08), transparent 10%),
            radial-gradient(circle at 50% 55%, rgba(101, 83, 255, 0.08), transparent 30%),
            linear-gradient(to bottom, #05081d 0%, #0a0f38 55%, #0b1238 100%);
        }

        .moonGlow {
          position: absolute;
          top: 36px;
          right: 110px;
          width: 108px;
          height: 108px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(255,248,228,0.28), rgba(255,248,228,0.03) 58%, transparent 72%);
          filter: blur(4px);
        }

        .moon {
          position: absolute;
          top: 52px;
          right: 126px;
          width: 54px;
          height: 54px;
          border-radius: 50%;
          background: radial-gradient(circle at 35% 35%, #fffdf5 0%, #f3eee0 58%, #d8d2c4 100%);
          box-shadow: 0 0 22px rgba(255, 247, 220, 0.32);
        }

        .moon::after {
          content: "";
          position: absolute;
          inset: 14px;
          border-radius: 50%;
          background: rgba(40, 40, 40, 0.16);
          filter: blur(3px);
        }

        .star {
          position: absolute;
          border-radius: 50%;
          background: rgba(255,255,255,0.9);
          animation: twinkle ease-in-out infinite;
        }

        .bubble {
          position: absolute;
          border-radius: 50%;
          border: 1px solid rgba(255, 182, 213, 0.2);
          background: rgba(255,255,255,0.03);
          box-shadow: 0 0 16px rgba(255, 170, 210, 0.06);
          animation: pulseBubble ease-in-out infinite;
        }

        .groundGlow {
          position: absolute;
          bottom: -20px;
          left: 50%;
          transform: translateX(-50%);
          width: min(900px, 92vw);
          height: 200px;
          background: radial-gradient(ellipse at center, rgba(67, 255, 142, 0.12), rgba(67,255,142,0.03) 45%, transparent 70%);
          filter: blur(10px);
          pointer-events: none;
        }

        .message {
          position: absolute;
          top: 86px;
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

        .bouquetWrap {
          position: absolute;
          left: 50%;
          bottom: 0;
          transform: translateX(-50%);
          width: min(860px, 100vw);
          height: min(720px, 82vh);
        }

        .bouquetBase {
          position: absolute;
          left: 50%;
          bottom: 44px;
          transform: translateX(-50%);
          width: 150px;
          height: 54px;
          border-radius: 50%;
          background: radial-gradient(ellipse at center, rgba(0,0,0,0.24), rgba(0,0,0,0.03) 70%, transparent 75%);
          filter: blur(6px);
        }

        .paperWrap {
          position: absolute;
          left: 50%;
          bottom: 24px;
          transform: translateX(-50%);
          width: 290px;
          height: 200px;
          background: linear-gradient(to bottom, rgba(255,245,250,0.06), rgba(255,225,240,0.08));
          border: 1px solid rgba(255, 235, 245, 0.08);
          backdrop-filter: blur(3px);
          clip-path: polygon(12% 0%, 88% 0%, 100% 100%, 0% 100%);
          opacity: 0.75;
        }

        .ribbonCenter {
          position: absolute;
          left: 50%;
          bottom: 58px;
          transform: translateX(-50%);
          width: 90px;
          height: 18px;
          border-radius: 999px;
          background: linear-gradient(to right, #db7ca5, #c85d8e, #db7ca5);
          box-shadow: 0 0 12px rgba(214, 122, 171, 0.2);
        }

        .ribbonLeft,
        .ribbonRight {
          position: absolute;
          bottom: 28px;
          width: 34px;
          height: 58px;
          background: linear-gradient(to bottom, #d672a0, #a84c75);
          opacity: 0.92;
        }

        .ribbonLeft {
          left: calc(50% - 12px);
          clip-path: polygon(100% 0%, 0% 18%, 28% 100%, 100% 70%);
          transform: translateX(-100%);
        }

        .ribbonRight {
          left: calc(50% + 12px);
          clip-path: polygon(0% 0%, 100% 18%, 72% 100%, 0% 70%);
        }

        .flowerItem {
          position: absolute;
          left: 50%;
          bottom: 74px;
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
          width: 28px;
          height: 76px;
          background: linear-gradient(to bottom, #29c264, #166534);
          border-radius: 100% 0 100% 0;
          opacity: 0.9;
          transform-origin: bottom center;
          animation: leafIn 0.8s ease-out both;
        }

        .leaf.left1 {
          left: 50%;
          bottom: 62px;
          transform: translateX(-92%) rotate(-42deg);
        }

        .leaf.right1 {
          left: 50%;
          bottom: 108px;
          transform: translateX(-6%) rotate(40deg) scaleX(-1);
        }

        .leaf.left2 {
          left: 50%;
          bottom: 150px;
          width: 22px;
          height: 54px;
          transform: translateX(-90%) rotate(-28deg);
          opacity: 0.7;
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

        .frontGrass {
          position: absolute;
          left: 50%;
          bottom: 0;
          transform: translateX(-50%);
          width: min(1100px, 100vw);
          height: 130px;
          background:
            radial-gradient(ellipse at center, rgba(24, 255, 124, 0.06), transparent 60%),
            linear-gradient(to top, rgba(2,18,11,0.85), rgba(2,18,11,0));
          pointer-events: none;
        }

        @keyframes twinkle {
          0%, 100% { opacity: 0.25; transform: scale(0.8); }
          50% { opacity: 0.95; transform: scale(1.2); }
        }

        @keyframes pulseBubble {
          0%, 100% { opacity: 0.1; transform: scale(0.82); }
          50% { opacity: 0.45; transform: scale(1.08); }
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

        @media (max-width: 700px) {
          .moonGlow {
            right: 30px;
            top: 26px;
            width: 84px;
            height: 84px;
          }

          .moon {
            right: 44px;
            top: 40px;
            width: 42px;
            height: 42px;
          }

          .message {
            top: 76px;
            width: min(320px, calc(100vw - 24px));
            padding: 18px 18px 16px;
          }

          .bouquetWrap {
            height: 64vh;
          }

          .paperWrap {
            width: 220px;
            height: 150px;
          }
        }
      `}</style>

      <div className="moonGlow" />
      <div className="moon" />

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

      {bubbles.map((bubble) => (
        <span
          key={bubble.id}
          className="bubble"
          style={{
            left: bubble.left,
            top: bubble.top,
            width: `${bubble.size}px`,
            height: `${bubble.size}px`,
            animationDelay: bubble.delay,
            animationDuration: bubble.duration,
          }}
        />
      ))}

      <div className="message">
        <h1>Para la mujer más bonita</h1>
        <p>Gracias por llegar a mi mundo</p>
        <div className="miniHearts">♥ ♥ ♥</div>
      </div>

      <div className="groundGlow" />

      <div className="bouquetWrap">
        <div className="bouquetBase" />
        <div className="paperWrap" />
        <div className="ribbonCenter" />
        <div className="ribbonLeft" />
        <div className="ribbonRight" />

        {bouquetFlowers.map((flower) => {
          const bloomDelay = 1.2 + flower.delay;
          const petalDelay = 1.9 + flower.delay;

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

                <div
                  className="leaf left1"
                  style={{ animationDelay: `${0.45 + flower.delay}s` }}
                />
                <div
                  className="leaf right1"
                  style={{ animationDelay: `${0.7 + flower.delay}s` }}
                />
                <div
                  className="leaf left2"
                  style={{ animationDelay: `${0.95 + flower.delay}s` }}
                />

                <div
                  className="bloom"
                  style={{ bottom: `${flower.height - 8}px` }}
                >
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

      <div className="frontGrass" />
    </div>
  );
}
