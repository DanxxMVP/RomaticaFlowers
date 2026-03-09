import { useState, useRef, useEffect } from "react";
import IntroScreen from "./components/IntroScreen";
import ExitModal from "./components/ExitModal";
import HeartExitButton from "./components/HeartExitButton";
import { petalSongs, flowerMessages, bouquetFlowers } from "./data";
import "./App.css";

export default function App() {
  const [started, setStarted] = useState(false);
  const [activeSong, setActiveSong] = useState(null);
  const [activeMessage, setActiveMessage] = useState(null);
  const audioRef = useRef(null);
  const bgAudioRef = useRef(null);
  const rocketRef = useRef(null);
  const [isMobile, setIsMobile] = useState(() => typeof window !== "undefined" && window.innerWidth <= 700);
  const [showExitModal, setShowExitModal] = useState(false);
  const [exitCountdown, setExitCountdown] = useState(null);
  const [exitReady, setExitReady] = useState(false);
  const firstLoopDone = useRef(false);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth <= 700);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    if (!started) {
      setExitCountdown(null);
      setExitReady(false);
      firstLoopDone.current = false;
      return;
    }
    const audio = bgAudioRef.current;
    if (!audio) return;

    const onTimeUpdate = () => {
      if (firstLoopDone.current) return;
      const { duration, currentTime } = audio;
      if (!duration || isNaN(duration)) return;
      const remaining = Math.ceil(duration - currentTime);
      if (remaining <= 30) {
        setExitCountdown(remaining <= 0 ? 0 : remaining);
      }
    };

    const onLoop = () => {
      if (!firstLoopDone.current) {
        firstLoopDone.current = true;
        setExitCountdown(0);
        setExitReady(true);
        audio.removeEventListener("timeupdate", onTimeUpdate);
      }
    };

    // 'seeking' fires when looping back to 0
    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("seeking", onLoop);
    return () => {
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("seeking", onLoop);
    };
  }, [started]);

  const handleStart = () => {
    if (bgAudioRef.current) {
      bgAudioRef.current.volume = 0.4;
      bgAudioRef.current.play().catch(() => {});
    }
    setStarted(true);
    setShowExitModal(false);
  };

  const handleExit = () => {
    if (bgAudioRef.current) bgAudioRef.current.pause();
    if (audioRef.current) audioRef.current.pause();
    window.close();
    // fallback if window.close() is blocked by browser
    document.body.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;height:100vh;color:#f7dce8;font-family:Georgia,serif;font-size:1.4rem;background:#0a0a1a">💖 Hasta pronto 💖</div>';
  };

  const handleReplay = () => {
    if (bgAudioRef.current) { bgAudioRef.current.pause(); bgAudioRef.current.currentTime = 0; }
    if (audioRef.current) { audioRef.current.pause(); audioRef.current.currentTime = 0; }
    setActiveSong(null);
    setActiveMessage(null);
    setShowExitModal(false);
    setStarted(false);
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
            <span className="hintText">Haz clic en los pétalos chula luego espera a que termine la cancion</span> <br /> 
                  
            <div className="exit-area">
              {exitCountdown !== null && exitCountdown > 0 && !exitReady && (
                <div className="exit-countdown">
                  <span>{exitCountdown}s</span>
                </div>
              )}
              {(exitCountdown === 0 || exitReady) && (
                <HeartExitButton onClick={() => setShowExitModal(true)} />
              )}
            </div>
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

          {showExitModal && (
            <ExitModal onExit={handleExit} onReplay={handleReplay} />
          )}
        </div>
      )}
    </>
  );
}
