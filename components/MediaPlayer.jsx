import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiPlay, HiPause, HiVolumeUp, HiVolumeOff } from 'react-icons/hi';

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

  const audioRef = useRef(null);
  const progressRef = useRef(null);

  // Библиотека треков - добавьте свои треки здесь
  const playlist = [
    {
      src: '/demo-track.mp3',
      title: 'Демонстрационный трек',
      artist: 'Портфолио'
    },
    {
      src: '/background-music.mp3',
      title: 'Фоновая музыка',
      artist: 'Портфолио'
    },
    // {
    //   src: '/track1.mp3',
    //   title: 'Трек 1',
    //   artist: 'Исполнитель'
    // },
    // {
    //   src: '/ambient-chill.mp3',
    //   title: 'Ambient Chill',
    //   artist: 'Relax Music'
    // },
    // {
    //   src: '/upbeat-pop.mp3',
    //   title: 'Upbeat Pop',
    //   artist: 'Modern Beats'
    // }
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
              className="fixed left-0 top-1/2 -translate-y-1/2 w-80 h-96 bg-primary/90 backdrop-blur-md border border-white/10 rounded-r-2xl shadow-2xl z-50"
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
                <div className="flex-1 bg-gradient-to-br from-accent/20 to-primary rounded-lg mb-4 flex items-center justify-center">
                  <div className="w-16 h-16 bg-accent/30 rounded-full flex items-center justify-center">
                    <div className="w-8 h-8 bg-accent rounded-full"></div>
                  </div>
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
      <motion.button
        initial={{ x: 0 }}
        animate={{ x: isOpen ? 0 : 0 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-accent hover:bg-accent/80 rounded-r-full flex items-center justify-center text-white shadow-lg z-40 transition-colors"
        title={isOpen ? 'Закрыть плеер' : 'Открыть плеер'}
      >
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {isOpen ? '‹' : '›'}
        </motion.div>
      </motion.button>
    </>
  );
};

export default MediaPlayer;
