import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiPlay, HiPause, HiVolumeUp, HiVolumeOff } from 'react-icons/hi';

// Префикс для GitHub Pages / статического экспорта
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || '';

// Определение iOS (включая iPadOS, который маскируется под macOS)
function detectIOS() {
  if (typeof navigator === 'undefined') return false;
  const ua = navigator.userAgent || '';
  const iOS = /iPad|iPhone|iPod/.test(ua);
  const iPadOS = navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1;
  return iOS || iPadOS;
}

// Единая инициализация аудио-графа Web Audio API (идемпотентна).
// Создаётся один раз на элемент и переиспользуется между открытиями панели.
function ensureAudioGraph(audioEl) {
  if (typeof window === 'undefined' || !audioEl) return null;

  if (!window.__GLOBAL_AUDIO_CTX) {
    try {
      window.__GLOBAL_AUDIO_CTX = new (window.AudioContext || window.webkitAudioContext)();
    } catch (_) {
      return null;
    }
  }
  const ctx = window.__GLOBAL_AUDIO_CTX;

  // Источник из <audio> — только один раз на элемент
  if (!audioEl._mediaNode) {
    try {
      audioEl._mediaNode = ctx.createMediaElementSource(audioEl);
    } catch (_) {}
  }
  // Прямой маршрут к выходу (звук)
  if (audioEl._mediaNode && !audioEl._connectedToDestination) {
    try {
      audioEl._mediaNode.connect(ctx.destination);
      audioEl._connectedToDestination = true;
    } catch (_) {}
  }

  // Глобальный анализатор + тихий gain (держит анализатор в графе без дублирования звука)
  if (!window.__GLOBAL_ANALYSER) {
    const analyser = ctx.createAnalyser();
    analyser.fftSize = 128; // 64 частотных бина
    analyser.smoothingTimeConstant = 0.85;
    window.__GLOBAL_ANALYSER = analyser;

    const gain = ctx.createGain();
    gain.gain.value = 0;
    window.__GLOBAL_SILENT_GAIN = gain;
    try {
      analyser.connect(gain);
      gain.connect(ctx.destination);
    } catch (_) {}
  }
  const analyser = window.__GLOBAL_ANALYSER;

  if (audioEl._mediaNode && !audioEl._connectedToAnalyser) {
    try {
      audioEl._mediaNode.connect(analyser);
      audioEl._connectedToAnalyser = true;
    } catch (_) {}
  }

  return { ctx, analyser };
}

// Возобновление AudioContext (обязательно на пользовательском жесте, особенно iOS)
function resumeAudioCtx() {
  const ctx = typeof window !== 'undefined' ? window.__GLOBAL_AUDIO_CTX : null;
  if (ctx && ctx.state === 'suspended') {
    ctx.resume().catch(() => {});
  }
}

// Аудио-реактивная визуализация на canvas (использует общий анализатор)
function AudioEqualizer({ audioRef, height = 96, bars = 24, gap = 2 }) {
  const canvasRef = useRef(null);
  const wrapperRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    const audioEl = audioRef?.current;
    const canvas = canvasRef.current;
    const wrapper = wrapperRef.current;
    if (!audioEl || !canvas || !wrapper) return;

    // Гарантируем готовность графа и получаем анализатор
    const graph = ensureAudioGraph(audioEl);
    const analyser = graph?.analyser || (typeof window !== 'undefined' ? window.__GLOBAL_ANALYSER : null);
    const ctx2d = canvas.getContext('2d');
    if (!analyser || !ctx2d) return;

    const data = new Uint8Array(analyser.frequencyBinCount);

    const resizeCanvas = () => {
      const rect = wrapper.getBoundingClientRect();
      const cssW = Math.max(1, rect.width);
      const cssH = Math.max(1, rect.height);
      const pixelRatio = Math.max(1, Math.floor(window.devicePixelRatio || 1));
      canvas.width = cssW * pixelRatio;
      canvas.height = cssH * pixelRatio;
      ctx2d.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    };

    let sizeTries = 0;
    const ensureSize = () => {
      sizeTries += 1;
      resizeCanvas();
      const hasSize = canvas.width > 0 && canvas.height > 0;
      if (!hasSize && sizeTries < 10) requestAnimationFrame(ensureSize);
    };
    ensureSize();

    let ro;
    if (typeof ResizeObserver !== 'undefined') {
      ro = new ResizeObserver(() => resizeCanvas());
      ro.observe(wrapper);
    }
    const onWindowResize = () => resizeCanvas();
    window.addEventListener('resize', onWindowResize);

    const draw = () => {
      rafRef.current = requestAnimationFrame(draw);
      analyser.getByteFrequencyData(data);

      const w = canvas.width;
      const h = canvas.height;
      const pr = Math.max(1, Math.floor(window.devicePixelRatio || 1));
      // Рисуем в CSS-пикселях (трансформация уже учитывает pixelRatio)
      const cw = w / pr;
      const ch = h / pr;
      ctx2d.clearRect(0, 0, cw, ch);

      const barCount = Math.min(bars, data.length);
      const barGap = gap;
      const barWidth = (cw - barGap * (barCount - 1)) / barCount;

      for (let i = 0; i < barCount; i++) {
        const v = data[i];
        const bassBoost = i < barCount * 0.2 ? 1.2 : 1.0;
        const magnitude = Math.min(1, (v / 255) * bassBoost);
        const barHeight = magnitude * ch;

        const grd = ctx2d.createLinearGradient(0, ch - barHeight, 0, ch);
        grd.addColorStop(0, 'rgba(241,48,36,0.95)');
        grd.addColorStop(1, 'rgba(241,48,36,0.4)');

        const x = i * (barWidth + barGap);
        const y = ch - barHeight;

        ctx2d.fillStyle = grd;
        ctx2d.fillRect(x, y, barWidth, barHeight);
        ctx2d.fillStyle = 'rgba(255,255,255,0.2)';
        ctx2d.fillRect(x, y, barWidth, 2);
      }
    };

    const clearCanvas = () => {
      const pr = Math.max(1, Math.floor(window.devicePixelRatio || 1));
      ctx2d.clearRect(0, 0, canvas.width / pr, canvas.height / pr);
    };

    const start = () => {
      if (rafRef.current == null && !audioEl.paused && !document.hidden) {
        rafRef.current = requestAnimationFrame(draw);
      }
    };
    const stop = () => {
      if (rafRef.current != null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      clearCanvas();
    };
    const onVisibility = () => {
      if (document.hidden) stop();
      else start();
    };

    audioEl.addEventListener('play', start);
    audioEl.addEventListener('pause', stop);
    document.addEventListener('visibilitychange', onVisibility);

    if (!audioEl.paused) start();

    return () => {
      stop();
      audioEl.removeEventListener('play', start);
      audioEl.removeEventListener('pause', stop);
      document.removeEventListener('visibilitychange', onVisibility);
      try { ro && ro.disconnect(); } catch (_) {}
      window.removeEventListener('resize', onWindowResize);
    };
  }, [audioRef, bars, gap]);

  return (
    <div ref={wrapperRef} className="w-full overflow-hidden rounded-md bg-black/20 border border-white/10" style={{ height }}>
      <canvas ref={canvasRef} style={{ width: '100%', height: '100%' }} />
    </div>
  );
}

const MediaPlayer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [currentTrack, setCurrentTrack] = useState({ title: '', artist: '' });
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [audioSrc, setAudioSrc] = useState(`${BASE_PATH}/demo-track.mp3`);
  const [dragX, setDragX] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isTouch, setIsTouch] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  const audioRef = useRef(null);
  const progressRef = useRef(null);
  const buttonRef = useRef(null);
  const ringOuterRef = useRef(null);
  const ringInnerRef = useRef(null);

  const shouldAutoPlayRef = useRef(false);
  const isSeekingRef = useRef(false);
  const nextTrackRef = useRef(null);
  const prevTrackRef = useRef(null);

  const withBase = (p) => `${BASE_PATH}${p}`;
  const playlist = [
    { src: withBase('/demo-track.mp3'), title: 'Demo Track', artist: 'Ushakov Portfolio' },
    { src: withBase('/track1.mp3'), title: 'Track 1', artist: 'Ushakov Portfolio' },
    { src: withBase('/track2.mp3'), title: 'Track 2', artist: 'Ushakov Portfolio' },
    { src: withBase('/track3.mp3'), title: 'Track 3', artist: 'Ushakov Portfolio' },
    { src: withBase('/track4.mp3'), title: 'Track 4', artist: 'Ushakov Portfolio' },
    { src: withBase('/track5.mp3'), title: 'Track 5', artist: 'Ushakov Portfolio' },
    { src: withBase('/track6.mp3'), title: 'Track 6', artist: 'Ushakov Portfolio' },
  ];
  const playlistLength = playlist.length;

  // Определение платформы (после монтирования, SSR-safe)
  useEffect(() => {
    const check = () => {
      setIsMobile(window.innerWidth < 768);
    };
    check();
    window.addEventListener('resize', check);
    setIsIOS(detectIOS());
    if (typeof window.matchMedia === 'function') {
      setIsTouch(window.matchMedia('(hover: none)').matches);
    }
    return () => window.removeEventListener('resize', check);
  }, []);

  // Переключение треков (функциональный setState — без устаревших замыканий)
  const nextTrack = useCallback((autoPlay = false) => {
    if (playlistLength <= 1) return;
    if (autoPlay) shouldAutoPlayRef.current = true;
    setCurrentTrackIndex((i) => (i + 1) % playlistLength);
  }, [playlistLength]);

  const prevTrack = useCallback((autoPlay = false) => {
    if (playlistLength <= 1) return;
    if (autoPlay) shouldAutoPlayRef.current = true;
    setCurrentTrackIndex((i) => (i === 0 ? playlistLength - 1 : i - 1));
  }, [playlistLength]);

  // Держим актуальные ссылки для использования внутри mount-эффекта и Media Session
  nextTrackRef.current = nextTrack;
  prevTrackRef.current = prevTrack;

  // Обновление данных трека при смене индекса
  useEffect(() => {
    const track = playlist[currentTrackIndex] || { src: '', title: 'Неизвестный трек', artist: '' };
    setCurrentTrack(track);
    setAudioSrc(track.src);
    setProgress(0);
    setHasError(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentTrackIndex]);

  // Слушатели аудио — навешиваются один раз, снимаются корректно (без утечки)
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
      if (isSeekingRef.current) return;
      if (audio.duration && audio.duration > 0) {
        setProgress((audio.currentTime / audio.duration) * 100);
      }
    };
    const updateDuration = () => {
      if (audio.duration && audio.duration > 0) {
        setDuration(audio.duration);
        setIsLoading(false);
      }
    };
    const handleCanPlay = () => {
      if (audio.duration && audio.duration > 0) {
        setDuration(audio.duration);
        setIsLoading(false);
      }
      // Автозапуск нового трека — только когда он готов
      if (shouldAutoPlayRef.current) {
        shouldAutoPlayRef.current = false;
        resumeAudioCtx();
        audio.play().catch(() => {});
      }
    };
    const handleLoadStart = () => {
      setIsLoading(true);
      setHasError(false);
    };
    const handleError = () => {
      setIsLoading(false);
      setHasError(true);
    };
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleEnded = () => {
      if (playlistLength > 1) {
        nextTrackRef.current?.(true);
      } else {
        setIsPlaying(false);
      }
    };

    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('canplay', handleCanPlay);
    audio.addEventListener('loadeddata', handleCanPlay);
    audio.addEventListener('loadstart', handleLoadStart);
    audio.addEventListener('error', handleError);
    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('ended', handleEnded);

    if (audio.readyState >= 1) updateDuration();

    return () => {
      audio.removeEventListener('timeupdate', updateProgress);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('canplay', handleCanPlay);
      audio.removeEventListener('loadeddata', handleCanPlay);
      audio.removeEventListener('loadstart', handleLoadStart);
      audio.removeEventListener('error', handleError);
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [playlistLength]);

  // Синхронизация громкости (на iOS игнорируется системой, но не мешает)
  useEffect(() => {
    const audio = audioRef.current;
    if (audio) audio.volume = isMuted ? 0 : volume;
  }, [volume, isMuted]);

  // Неоновые кольца вокруг кнопки — работают только во время воспроизведения и видимой вкладки
  useEffect(() => {
    const outer = ringOuterRef.current;
    const inner = ringInnerRef.current;
    if (!outer || !inner) return;

    if (!isPlaying) {
      outer.style.opacity = '0';
      inner.style.opacity = '0';
      return;
    }

    const analyser = typeof window !== 'undefined' ? window.__GLOBAL_ANALYSER : null;
    const data = analyser ? new Uint8Array(analyser.frequencyBinCount) : null;
    let raf = null;

    const loop = () => {
      raf = requestAnimationFrame(loop);
      let intensity = 0;
      if (analyser && data) {
        analyser.getByteFrequencyData(data);
        const n = Math.max(1, Math.floor(data.length * 0.18));
        let sum = 0;
        for (let i = 0; i < n; i++) sum += data[i];
        intensity = Math.min(1, (sum / n) / 255);
      }
      outer.style.transform = `scale(${1 + intensity * 0.8})`;
      inner.style.transform = `scale(${1 + intensity * 0.5})`;
      outer.style.opacity = String(0.18 + intensity * 0.55);
      inner.style.opacity = String(0.12 + intensity * 0.45);
    };

    const start = () => {
      if (raf == null && !document.hidden) raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      if (raf != null) {
        cancelAnimationFrame(raf);
        raf = null;
      }
      outer.style.opacity = '0';
      inner.style.opacity = '0';
    };
    const onVisibility = () => {
      if (document.hidden) stop();
      else start();
    };

    document.addEventListener('visibilitychange', onVisibility);
    start();

    return () => {
      stop();
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [isPlaying]);

  // Media Session API — метаданные для локскрина / шторки уведомлений
  useEffect(() => {
    if (typeof navigator === 'undefined' || !('mediaSession' in navigator)) return;
    const track = playlist[currentTrackIndex];
    if (!track) return;
    try {
      // eslint-disable-next-line no-undef
      navigator.mediaSession.metadata = new MediaMetadata({
        title: track.title,
        artist: track.artist,
        album: 'Портфолио',
        artwork: [
          { src: withBase('/player-cover.png'), sizes: '96x96', type: 'image/png' },
          { src: withBase('/player-cover.png'), sizes: '256x256', type: 'image/png' },
          { src: withBase('/player-cover.png'), sizes: '512x512', type: 'image/png' },
        ],
      });
    } catch (_) {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentTrackIndex]);

  // Media Session API — обработчики нативных кнопок
  useEffect(() => {
    if (typeof navigator === 'undefined' || !('mediaSession' in navigator)) return;
    const ms = navigator.mediaSession;
    const setHandler = (action, handler) => {
      try { ms.setActionHandler(action, handler); } catch (_) {}
    };
    setHandler('play', () => {
      const a = audioRef.current;
      if (a) { resumeAudioCtx(); a.play().catch(() => {}); }
    });
    setHandler('pause', () => { audioRef.current?.pause(); });
    setHandler('previoustrack', () => prevTrackRef.current?.(true));
    setHandler('nexttrack', () => nextTrackRef.current?.(true));

    return () => {
      setHandler('play', null);
      setHandler('pause', null);
      setHandler('previoustrack', null);
      setHandler('nexttrack', null);
    };
  }, []);

  // Media Session — статус воспроизведения
  useEffect(() => {
    if (typeof navigator !== 'undefined' && 'mediaSession' in navigator) {
      try { navigator.mediaSession.playbackState = isPlaying ? 'playing' : 'paused'; } catch (_) {}
    }
  }, [isPlaying]);

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (!audio) return;
    // Инициализация графа и резюме контекста строго на пользовательском жесте (важно для iOS)
    ensureAudioGraph(audio);
    resumeAudioCtx();
    if (audio.paused) {
      audio.play().catch(() => {});
    } else {
      audio.pause();
    }
    // Состояние обновят события play/pause
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (audio) {
      audio.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    const audio = audioRef.current;
    if (audio) {
      audio.volume = newVolume;
      setVolume(newVolume);
      setIsMuted(newVolume === 0);
    }
  };

  // Перемотка: тап + перетаскивание (pointer events работают и на тач)
  const seekFromClientX = (clientX) => {
    const audio = audioRef.current;
    const el = progressRef.current;
    if (!audio || !el || !audio.duration) return;
    const rect = el.getBoundingClientRect();
    let ratio = (clientX - rect.left) / rect.width;
    ratio = Math.min(1, Math.max(0, ratio));
    audio.currentTime = ratio * audio.duration;
    setProgress(ratio * 100);
  };
  const handlePointerDown = (e) => {
    isSeekingRef.current = true;
    try { e.currentTarget.setPointerCapture?.(e.pointerId); } catch (_) {}
    seekFromClientX(e.clientX);
  };
  const handlePointerMove = (e) => {
    if (isSeekingRef.current) seekFromClientX(e.clientX);
  };
  const handlePointerUp = (e) => {
    isSeekingRef.current = false;
    try { e.currentTarget.releasePointerCapture?.(e.pointerId); } catch (_) {}
  };
  const handleProgressKeyDown = (e) => {
    const audio = audioRef.current;
    if (!audio || !audio.duration) return;
    if (e.key === 'ArrowRight') {
      audio.currentTime = Math.min(audio.duration, audio.currentTime + 5);
    } else if (e.key === 'ArrowLeft') {
      audio.currentTime = Math.max(0, audio.currentTime - 5);
    }
  };

  const formatTime = (time) => {
    if (isNaN(time) || !isFinite(time) || time < 0) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <>
      {/* Аудио элемент (скрытый) */}
      <audio ref={audioRef} src={audioSrc} preload="metadata" controls={false} playsInline />

      {/* Выдвижная панель медиа-плеера */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay для закрытия при клике вне плеера */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
              onClick={() => setIsOpen(false)}
            />

            {/* Основная панель плеера */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed w-[min(20rem,92vw)] h-[26rem] max-h-[80dvh] bg-primary/90 backdrop-blur-md border border-white/10 rounded-r-2xl shadow-2xl z-50"
              style={{
                left: 'env(safe-area-inset-left, 0px)',
                bottom: 'calc(var(--bottom-bar-height, 0px) + env(safe-area-inset-bottom, 0px))',
              }}
            >
              <div className="flex flex-col h-full p-6 overflow-y-auto">
                {/* Заголовок */}
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-white font-semibold text-lg">Медиа плеер</h3>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-white/60 hover:text-white transition-colors"
                    aria-label="Закрыть плеер"
                  >
                    ✕
                  </button>
                </div>

                {/* Обложка/визуализация */}
                <div className="flex-1 min-h-[80px] bg-gradient-to-br from-accent/20 to-primary rounded-lg mb-4 flex items-center justify-center p-3">
                  <AudioEqualizer audioRef={audioRef} height={72} bars={isMobile ? 26 : 50} gap={3} />
                </div>

                {/* Название трека и номер в плейлисте */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-white font-semibold text-base truncate">
                      {currentTrack.title}
                    </h4>
                    <span className="text-white/60 text-xs shrink-0 ml-2">
                      {currentTrackIndex + 1} / {playlist.length}
                    </span>
                  </div>
                  <p className="text-white/70 text-sm">{currentTrack.artist}</p>
                  {hasError && (
                    <p className="text-accent text-xs mt-1" role="alert">
                      Не удалось загрузить трек. Попробуйте следующий.
                    </p>
                  )}
                </div>

                {/* Прогресс бар (тап + перетаскивание + клавиши) */}
                <div className="mb-4">
                  <div
                    ref={progressRef}
                    className="w-full h-2 bg-white/20 rounded-full cursor-pointer relative touch-none"
                    onPointerDown={handlePointerDown}
                    onPointerMove={handlePointerMove}
                    onPointerUp={handlePointerUp}
                    onKeyDown={handleProgressKeyDown}
                    role="slider"
                    tabIndex={0}
                    aria-label="Перемотка трека"
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-valuenow={Math.round(progress)}
                  >
                    <motion.div
                      className="h-full bg-accent rounded-full pointer-events-none"
                      style={{ width: `${progress}%` }}
                      transition={{ duration: 0.1 }}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-white/60 mt-1">
                    <span>{formatTime((progress / 100) * duration)}</span>
                    <span>{isLoading ? 'Загрузка...' : formatTime(duration)}</span>
                  </div>
                </div>

                {/* Элементы управления */}
                <div className="flex items-center justify-center space-x-4 mb-4">
                  {/* Предыдущий трек */}
                  <button
                    onClick={() => prevTrack(isPlaying)}
                    disabled={playlist.length <= 1}
                    className={`w-10 h-10 ${playlist.length <= 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-white/10'} rounded-full flex items-center justify-center text-white transition-colors`}
                    title="Предыдущий трек"
                    aria-label="Предыдущий трек"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden>
                      <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </button>

                  {/* Play/Pause */}
                  <button
                    onClick={togglePlayPause}
                    disabled={isLoading}
                    className={`w-12 h-12 ${isLoading ? 'bg-accent/50' : 'bg-accent hover:bg-accent/80'} rounded-full flex items-center justify-center text-white transition-colors ${isLoading ? 'cursor-not-allowed' : ''}`}
                    aria-label={isPlaying ? 'Пауза' : 'Воспроизвести'}
                  >
                    {isLoading ? (
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                    ) : isPlaying ? (
                      <HiPause size={24} />
                    ) : (
                      <HiPlay size={24} />
                    )}
                  </button>

                  {/* Следующий трек */}
                  <button
                    onClick={() => nextTrack(isPlaying)}
                    disabled={playlist.length <= 1}
                    className={`w-10 h-10 ${playlist.length <= 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-white/10'} rounded-full flex items-center justify-center text-white transition-colors`}
                    title="Следующий трек"
                    aria-label="Следующий трек"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden>
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                  </button>

                  {/* Громкость (mute) — на iOS скрыто, т.к. регулируется системой */}
                  {!isIOS && (
                    <button
                      onClick={toggleMute}
                      className="text-white/60 hover:text-white transition-colors"
                      aria-label={isMuted || volume === 0 ? 'Включить звук' : 'Выключить звук'}
                    >
                      {isMuted || volume === 0 ? <HiVolumeOff size={20} /> : <HiVolumeUp size={20} />}
                    </button>
                  )}
                </div>

                {/* Ползунок громкости или подсказка для iOS */}
                {isIOS ? (
                  <p className="text-white/40 text-xs text-center">
                    Громкость регулируется кнопками устройства
                  </p>
                ) : (
                  <div className="flex items-center space-x-3">
                    <span className="text-white/60 text-sm">Громкость:</span>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.1"
                      value={isMuted ? 0 : volume}
                      onChange={handleVolumeChange}
                      className="flex-1 h-1 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
                      aria-label="Громкость"
                    />
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Кнопка для открытия плеера */}
      <div
        className="fixed left-0 top-1/2 -translate-y-1/2 z-40"
        style={{ paddingLeft: 'env(safe-area-inset-left, 0px)' }}
      >
        <motion.button
          ref={buttonRef}
          drag={isTouch ? 'x' : false}
          dragConstraints={{ left: 0, right: 24 }}
          dragElastic={0}
          dragMomentum={false}
          dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
          onDrag={(e, info) => {
            if (isTouch && info.offset.x > 20) setIsOpen(true);
          }}
          onDragEnd={() => setDragX(0)}
          animate={{ x: isOpen ? 0 : dragX }}
          initial={{ x: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          whileHover={{ scale: 1.05, x: 0 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(!isOpen)}
          className="relative -left-4 md:hover:left-0 w-12 h-12 md:w-16 md:h-16 bg-accent hover:bg-accent/80 rounded-r-full flex items-center justify-center text-white shadow-lg md:transition-all md:duration-300 touch-none overflow-visible"
          title={isOpen ? 'Закрыть плеер' : (isPlaying ? 'Плеер (воспроизводится)' : 'Открыть плеер')}
          aria-label={isOpen ? 'Закрыть плеер' : 'Открыть плеер'}
        >
          {/* Неоновые кольца (реагируют на бас музыки) */}
          <div className="absolute inset-0 -m-4 pointer-events-none" aria-hidden>
            <span
              ref={ringOuterRef}
              className="absolute inset-0 rounded-r-full opacity-0 transition-[opacity] duration-150 will-change-transform"
              style={{ transform: 'scale(1)', border: '10px solid rgba(99, 2, 235, 0.53)', filter: 'blur(2px)' }}
            />
            <span
              ref={ringInnerRef}
              className="absolute inset-0 rounded-r-full opacity-0 transition-[opacity] duration-150 will-change-transform"
              style={{ transform: 'scale(1)', border: '15px solid rgba(80, 44, 240, 0.62)', filter: 'blur(6px)' }}
            />
          </div>
          <div className="ml-2 md:ml-0">
            {isPlaying ? (
              <HiPause className="w-5 h-5 md:w-7 md:h-7" />
            ) : (
              <HiPlay className="w-5 h-5 md:w-7 md:h-7" />
            )}
          </div>
        </motion.button>
      </div>
    </>
  );
};

export default MediaPlayer;
