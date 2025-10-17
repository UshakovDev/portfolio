import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiPlay, HiPause, HiVolumeUp, HiVolumeOff } from 'react-icons/hi';

// Аудио-реактивная визуализация на canvas (Web Audio API + AnalyserNode)
function AudioEqualizer({ audioRef, height = 96, bars = 24, gap = 2 }) {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);
  const audioCtxRef = useRef(null);
  const analyserRef = useRef(null);
  const silentGainRef = useRef(null);
  const wrapperRef = useRef(null);

  useEffect(() => {
    const audioEl = audioRef?.current;
    if (!audioEl) return;

    let cleanupInner;
    const setup = async () => {
      if (!audioCtxRef.current) {
        const ExistingCtx = (typeof window !== 'undefined') && window.__GLOBAL_AUDIO_CTX;
        if (ExistingCtx) {
          audioCtxRef.current = ExistingCtx;
        } else {
          audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
          if (typeof window !== 'undefined') {
            window.__GLOBAL_AUDIO_CTX = audioCtxRef.current;
          }
        }
      }
      const audioCtx = audioCtxRef.current;

      // Создаем MediaElementSource один раз на элемент
      if (!audioEl._mediaNode) {
        try {
          audioEl._mediaNode = audioCtx.createMediaElementSource(audioEl);
        } catch (_) {
          // В некоторых браузерах повторное создание вызовет ошибку
        }
      }
      // Всегда обеспечиваем маршрут звука к выходу независимо от наличия визуализации
      if (audioEl._mediaNode && !audioEl._connectedToDestination) {
        try {
          audioEl._mediaNode.connect(audioCtx.destination);
          audioEl._connectedToDestination = true;
        } catch (_) {}
      }

      // Создаем/получаем глобальный анализатор и тихий gain
      if (!analyserRef.current) {
        const globalAnalyser = (typeof window !== 'undefined') && window.__GLOBAL_ANALYSER;
        if (globalAnalyser) {
          analyserRef.current = globalAnalyser;
        } else {
          const analyser = audioCtx.createAnalyser();
          analyser.fftSize = 128; // 64 частотных бина
          analyser.smoothingTimeConstant = 0.85;
          analyserRef.current = analyser;
          if (typeof window !== 'undefined') {
            window.__GLOBAL_ANALYSER = analyser;
          }
        }

        if (!silentGainRef.current) {
          const globalSilent = (typeof window !== 'undefined') && window.__GLOBAL_SILENT_GAIN;
          if (globalSilent) {
            silentGainRef.current = globalSilent;
          } else {
            const gain = audioCtx.createGain();
            gain.gain.value = 0; // полная тишина, но узел в графе
            silentGainRef.current = gain;
            if (typeof window !== 'undefined') {
              window.__GLOBAL_SILENT_GAIN = gain;
            }
          }
        }
        try {
          if (!analyserRef.current._connectedToSilent && silentGainRef.current) {
            analyserRef.current.connect(silentGainRef.current);
            silentGainRef.current.connect(audioCtx.destination);
            analyserRef.current._connectedToSilent = true;
          }
        } catch (_) {}
      }

      // Подключаем источник к анализатору (однократно)
      try {
        if (audioEl._mediaNode && !audioEl._connectedToAnalyser && analyserRef.current) {
          audioEl._mediaNode.connect(analyserRef.current);
          audioEl._connectedToAnalyser = true;
        }
      } catch (_) {}

      const resumeOnPlay = () => {
        if (audioCtx.state === 'suspended') {
          audioCtx.resume().catch(() => {});
        }
      };
      // Если уже играет — пробуем резюмировать сразу, иначе подпишемся на ближайший play
      if (!audioEl.paused) {
        resumeOnPlay();
      } else {
        audioEl.addEventListener('play', resumeOnPlay, { once: true });
      }

      const canvas = canvasRef.current;
      const wrapper = wrapperRef.current;
      if (!canvas || !wrapper) return;
      const ctx = canvas.getContext('2d');
      const analyser = analyserRef.current;
      const data = new Uint8Array(analyser.frequencyBinCount);

      const resizeCanvas = () => {
        const rect = wrapper.getBoundingClientRect();
        const cssW = Math.max(1, rect.width);
        const cssH = Math.max(1, rect.height);
        const pixelRatio = Math.max(1, Math.floor(window.devicePixelRatio || 1));
        canvas.width = cssW * pixelRatio;
        canvas.height = cssH * pixelRatio;
        ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      };

      // Первичная инициализация размеров: если контейнер ещё 0px (анимация), попробуем на ближайших кадрах
      let sizeTries = 0;
      const ensureSize = () => {
        sizeTries += 1;
        resizeCanvas();
        const hasSize = canvas.width > 0 && canvas.height > 0;
        if (!hasSize && sizeTries < 10) {
          requestAnimationFrame(ensureSize);
        }
      };
      ensureSize();

      // Наблюдаем за изменением размеров контейнера
      let ro;
      if (typeof ResizeObserver !== 'undefined') {
        ro = new ResizeObserver(() => resizeCanvas());
        ro.observe(wrapper);
      }
      const onWindowResize = () => resizeCanvas();
      window.addEventListener('resize', onWindowResize);

      const render = () => {
        rafRef.current = requestAnimationFrame(render);
        analyser.getByteFrequencyData(data);

        const w = canvas.width;
        const h = canvas.height;
        ctx.clearRect(0, 0, w, h);

        const barCount = Math.min(bars, data.length);
        const barGap = gap;
        const barWidth = (w - barGap * (barCount - 1)) / barCount;

        for (let i = 0; i < barCount; i++) {
          const v = data[i];
          const bassBoost = i < barCount * 0.2 ? 1.2 : 1.0;
          const magnitude = Math.min(1, (v / 255) * bassBoost);
          const barHeight = magnitude * h;

          const grd = ctx.createLinearGradient(0, h - barHeight, 0, h);
          grd.addColorStop(0, 'rgba(241,48,36,0.95)');
          grd.addColorStop(1, 'rgba(241,48,36,0.4)');

          const x = i * (barWidth + barGap);
          const y = h - barHeight;

          ctx.fillStyle = grd;
          ctx.fillRect(x, y, barWidth, barHeight);
          ctx.fillStyle = 'rgba(255,255,255,0.2)';
          ctx.fillRect(x, y, barWidth, 2);
        }
      };

      render();

      cleanupInner = () => {
        cancelAnimationFrame(rafRef.current);
        window.removeEventListener('resize', onWindowResize);
        try { ro && ro.disconnect(); } catch (_) {}
        // Не отключаем аудио-граф, чтобы не ломать цепочку между открытиями
      };

      return cleanupInner;
    };

    let disposed = false;
    setup();

    return () => {
      disposed = true;
      if (cleanupInner) cleanupInner();
    };
  }, [audioRef, bars, height]);

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
  const [currentTrack, setCurrentTrack] = useState({ title: '', artist: '' });
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [audioSrc, setAudioSrc] = useState('/demo-track.mp3');
  const [dragX, setDragX] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const audioRef = useRef(null);
  const progressRef = useRef(null);
  const buttonRef = useRef(null);
  const ringOuterRef = useRef(null);
  const ringInnerRef = useRef(null);

  // Определяем, является ли устройство мобильным
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Библиотека треков - добавьте свои треки здесь
  // Префикс для GitHub Pages / статического экспорта
  const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || '';
  const withBase = (p) => `${BASE_PATH}${p}`;
  const playlist = [
    {
      src: withBase('/demo-track.mp3'),
      title: 'Демонстрационный трек',
      artist: 'Портфолио'
    },
    {
      src: withBase('/track1.mp3'),
      title: 'Тtrack1',
      artist: 'Портфолио'
    },
    {
      src: withBase('/track2.mp3'),
      title: 'Тtrack2',
      artist: 'Портфолио'
    },
    {
      src: withBase('/track3.mp3'),
      title: 'Тtrack3',
      artist: 'Портфолио'
    },
    {
      src: withBase('/track4.mp3'),
      title: 'Тtrack4',
      artist: 'Портфолио'
    },
    {
      src: withBase('/track5.mp3'),
      title: 'Тtrack5',
      artist: 'Портфолио'
    },
    {
      src: withBase('/track6.mp3'),
      title: 'Тtrack6',
      artist: 'Портфолио'
    },
  ];

  // Функция для получения информации о текущем треке
  const getCurrentTrack = () => {
    return playlist[currentTrackIndex] || { src: '', title: 'Неизвестный трек', artist: '' };
  };

  // Функция для переключения на следующий трек
  const nextTrack = (autoPlay = false) => {
    if (playlist.length <= 1) return;
    const nextIndex = (currentTrackIndex + 1) % playlist.length;
    setCurrentTrackIndex(nextIndex);
    // Автозапуск только если явно указано или если это автопереключение при окончании трека
    if (autoPlay) {
      setTimeout(() => {
        const audio = audioRef.current;
        if (audio) {
          audio.play().catch(e => console.error('Ошибка автозапуска:', e));
        }
      }, 100);
    }
  };

  // Функция для переключения на предыдущий трек
  const prevTrack = (autoPlay = false) => {
    if (playlist.length <= 1) return;
    const prevIndex = currentTrackIndex === 0 ? playlist.length - 1 : currentTrackIndex - 1;
    setCurrentTrackIndex(prevIndex);
    // Автозапуск только если явно указано или если это автопереключение при окончании трека
    if (autoPlay) {
      setTimeout(() => {
        const audio = audioRef.current;
        if (audio) {
          audio.play().catch(e => console.error('Ошибка автозапуска:', e));
        }
      }, 100);
    }
  };

  // Эффект для обновления информации о треке при изменении индекса
  useEffect(() => {
    const track = getCurrentTrack();
    setCurrentTrack(track);
    setAudioSrc(track.src);
    // Сбрасываем состояние воспроизведения при смене трека (кроме автопереключения)
    setProgress(0);
  }, [currentTrackIndex]);

  // Инициализация первого трека при монтировании компонента
  useEffect(() => {
    const track = getCurrentTrack();
    setCurrentTrack(track);
    setAudioSrc(track.src);
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      const updateProgress = () => {
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
      };

      const handleLoadStart = () => {
        setIsLoading(true);
      };

      const handleError = (e) => {
        console.error('Ошибка загрузки аудио:', e);
        setIsLoading(false);
      };

      audio.addEventListener('timeupdate', updateProgress);
      audio.addEventListener('loadedmetadata', updateDuration);
      audio.addEventListener('canplay', handleCanPlay);
      audio.addEventListener('loadeddata', handleCanPlay);
      audio.addEventListener('loadstart', handleLoadStart);
      audio.addEventListener('error', handleError);
      audio.addEventListener('play', () => setIsPlaying(true));
      audio.addEventListener('pause', () => setIsPlaying(false));
      audio.addEventListener('ended', () => {
        // Автоматически переключаем на следующий трек когда текущий закончился
        if (playlist.length > 1) {
          setTimeout(() => {
            nextTrack(true); // Автозапуск следующего трека
          }, 500); // Небольшая пауза перед переключением
        } else {
          setIsPlaying(false);
        }
      });

      // Также попробуем получить длительность сразу после установки src
      if (audio.readyState >= 1) {
        updateDuration();
      }

      return () => {
        audio.removeEventListener('timeupdate', updateProgress);
        audio.removeEventListener('loadedmetadata', updateDuration);
        audio.removeEventListener('canplay', handleCanPlay);
        audio.removeEventListener('loadeddata', handleCanPlay);
        audio.removeEventListener('loadstart', handleLoadStart);
        audio.removeEventListener('error', handleError);
        audio.removeEventListener('play', () => setIsPlaying(true));
        audio.removeEventListener('pause', () => setIsPlaying(false));
        audio.removeEventListener('ended', () => setIsPlaying(false));
      };
    }
  }, [isPlaying, audioSrc]);

  // Неоновые кольца вокруг кнопки (реагируют на бас только во время воспроизведения)
  useEffect(() => {
    const btnEl = buttonRef.current;
    const outer = ringOuterRef.current;
    const inner = ringInnerRef.current;
    if (!btnEl || !outer || !inner) return;

    let raf;
    const analyser = typeof window !== 'undefined' ? window.__GLOBAL_ANALYSER : null;
    const data = analyser ? new Uint8Array(analyser.frequencyBinCount) : null;

    const loop = () => {
      raf = requestAnimationFrame(loop);

      let intensity = 0;
      if (analyser && data && isPlaying) {
        analyser.getByteFrequencyData(data);
        const n = Math.max(1, Math.floor(data.length * 0.18));
        let sum = 0;
        for (let i = 0; i < n; i++) sum += data[i];
        intensity = Math.min(1, (sum / n) / 255);
      }

      if (!isPlaying || !analyser) {
        outer.style.opacity = '0';
        inner.style.opacity = '0';
        return;
      }

      const outerScale = 1 + intensity * 0.8;
      const innerScale = 1 + intensity * 0.5;

      outer.style.transform = `scale(${outerScale})`;
      inner.style.transform = `scale(${innerScale})`;

      outer.style.opacity = String(0.18 + intensity * 0.55);
      inner.style.opacity = String(0.12 + intensity * 0.45);
    };

    // Сбросим возможное предыдущее свечение
    btnEl.style.boxShadow = '';
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      outer.style.opacity = '0';
      inner.style.opacity = '0';
    };
  }, [isPlaying]);

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (audio) {
      if (isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
      setIsPlaying(!isPlaying);
    }
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

  const handleProgressClick = (e) => {
    const audio = audioRef.current;
    if (audio && progressRef.current) {
      const rect = progressRef.current.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const newProgress = (clickX / rect.width) * 100;
      const newTime = (newProgress / 100) * audio.duration;
      audio.currentTime = newTime;
      setProgress(newProgress);
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
      <audio ref={audioRef} src={audioSrc} preload="metadata" controls={false} />

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
              className="fixed left-0 w-80 h-96 bg-primary/90 backdrop-blur-md border border-white/10 rounded-r-2xl shadow-2xl z-50"
              style={{
                bottom: 'calc(var(--bottom-bar-height, 0px) + 0px)'
              }}
            >
              <div className="flex flex-col h-full p-6">
                {/* Заголовок */}
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-white font-semibold text-lg">Медиа плеер</h3>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-white/60 hover:text-white transition-colors"
                  >
                    ✕
                  </button>
                </div>

                {/* Обложка/визуализация */}
                <div className="flex-1 bg-gradient-to-br from-accent/20 to-primary rounded-lg mb-4 flex items-center justify-center p-3">
                  {/* На мобильных делаем больше полос с меньшим зазором */}
                  <AudioEqualizer audioRef={audioRef} height={72} bars={50} gap={3} />
                </div>

                {/* Название трека и номер в плейлисте */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-white font-semibold text-base truncate">
                      {currentTrack.title}
                    </h4>
                    <span className="text-white/60 text-xs">
                      {currentTrackIndex + 1} / {playlist.length}
                    </span>
                  </div>
                  <p className="text-white/70 text-sm">{currentTrack.artist}</p>
                </div>

                {/* Прогресс бар */}
                <div className="mb-4">
                  <div
                    ref={progressRef}
                    className="w-full h-2 bg-white/20 rounded-full cursor-pointer relative"
                    onClick={handleProgressClick}
                  >
                    <motion.div
                      className="h-full bg-accent rounded-full"
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
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </button>

                  {/* Play/Pause */}
                  <button
                    onClick={togglePlayPause}
                    disabled={isLoading}
                    className={`w-12 h-12 ${isLoading ? 'bg-accent/50' : 'bg-accent hover:bg-accent/80'} rounded-full flex items-center justify-center text-white transition-colors ${isLoading ? 'cursor-not-allowed' : ''}`}
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
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                  </button>

                  {/* Громкость */}
                  <button
                    onClick={toggleMute}
                    className="text-white/60 hover:text-white transition-colors"
                  >
                    {isMuted || volume === 0 ? <HiVolumeOff size={20} /> : <HiVolumeUp size={20} />}
                  </button>
                </div>

                {/* Ползунок громкости */}
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
                  />
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Кнопка для открытия плеера */}
      <div className="fixed left-0 top-1/2 -translate-y-1/2 z-40">
        <motion.button
            ref={buttonRef}
            drag={isMobile ? "x" : false}
            dragConstraints={{ left: 0, right: 24 }}
            dragElastic={0}
            dragMomentum={false}
            dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
            onDrag={(e, info) => {
                // Только на мобильных устройствах
                if (isMobile) {
                // Если вытянули больше чем на 20px - открываем плеер сразу во время перетаскивания
                if (info.offset.x > 20) {
                    setIsOpen(true);
                }
                }
            }}
            onDragEnd={(e, info) => {
                // Возвращаем кнопку обратно
                setDragX(0);
            }}
            animate={{ x: isOpen ? 0 : dragX }}
            initial={{ x: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            whileHover={{ scale: 1.05, x: 0 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(!isOpen)}
            className="relative -left-6 md:hover:left-0 w-12 h-12 md:w-16 md:h-16 bg-accent hover:bg-accent/80 rounded-r-full flex items-center justify-center text-white shadow-lg md:transition-all md:duration-300 touch-none overflow-visible"
            title={isOpen ? 'Закрыть плеер' : (isPlaying ? 'Плеер (воспроизводится)' : 'Открыть плеер')}
            >
            {/* Неоновые кольца (визуальный слой) - реагируют на бас музыки */}
            <div className="absolute inset-0 -m-4 pointer-events-none" aria-hidden>
                {/* 
                  ВНЕШНЕЕ КОЛЬЦО
                  Настройки:
                  - border: '3px solid rgba(R, G, B, A)' - толщина и цвет
                    * 3px - толщина обводки (можно: 1px-10px)
                    * R, G, B - цвет (0-255 для каждого канала)
                    * A - прозрачность (0.0-1.0)
                  - filter: 'blur(2px)' - размытие для эффекта свечения (0px-10px)
                  - -m-4 в родителе - отступ кольца от кнопки (можно менять на -m-2, -m-6 и т.д.)
                */}
                <span
                    ref={ringOuterRef}
                    className="absolute inset-0 rounded-r-full opacity-0 transition-[opacity] duration-150 will-change-transform"
                    style={{ 
                        transform: 'scale(1)',
                        border: '3px solid rgba(244, 4, 224, 0.5)',
                        filter: 'blur(2px)'
                    }}
                />
                {/* 
                  ВНУТРЕННЕЕ КОЛЬЦО
                  Настройки:
                  - border: '2px solid rgba(R, G, B, A)' - толщина и цвет
                    * 2px - тоньше внешнего (рекомендуется 1px-3px)
                    * rgba(...) - цвет, обычно похож на внешнее, но может отличаться
                  - filter: 'blur(6px)' - больше размытие для мягкого свечения (2px-12px)
                  
                  Примеры цветов (rgba):
                  - Красный:     rgba(241, 48, 36, 0.8)
                  - Синий:       rgba(59, 130, 246, 0.8)
                  - Зелёный:     rgba(34, 197, 94, 0.8)
                  - Фиолетовый:  rgba(147, 51, 234, 0.8)
                  - Голубой:     rgba(14, 165, 233, 0.8)
                  - Белый:       rgba(255, 255, 255, 0.7)
                */}
                <span
                    ref={ringInnerRef}
                    className="absolute inset-0 rounded-r-full opacity-0 transition-[opacity] duration-150 will-change-transform"
                    style={{ 
                        transform: 'scale(1)',
                        border: '2px solid rgba(208, 0, 255, 0.56)',
                        filter: 'blur(6px)'
                    }}
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
