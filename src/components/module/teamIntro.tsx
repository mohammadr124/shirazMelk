import { useEffect, useRef, useState, type ChangeEvent } from "react";

/* =========================================================
   HELPERS
========================================================= */

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds)) {
    return "00:00";
  }

  const minutes = Math.floor(seconds / 60);

  const remainingSeconds = Math.floor(seconds % 60);

  return `${String(minutes).padStart(2, "0")}:${String(
    remainingSeconds,
  ).padStart(2, "0")}`;
}

/* =========================================================
   VIDEO PLAYER
========================================================= */

function VideoPlayer() {
  const videoRef = useRef<HTMLVideoElement>(null);

  const containerRef = useRef<HTMLDivElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);

  const [isMuted, setIsMuted] = useState(false);

  const [currentTime, setCurrentTime] = useState(0);

  const [duration, setDuration] = useState(0);

  const [progress, setProgress] = useState(0);

  const [volume, setVolume] = useState(0.8);

  const [videoError, setVideoError] = useState(false);

  /* =======================================================
     PLAY / PAUSE
  ======================================================= */

  const togglePlay = async () => {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    if (video.paused) {
      try {
        await video.play();
        setIsPlaying(true);
      } catch {
        setIsPlaying(false);
      }

      return;
    }

    video.pause();
    setIsPlaying(false);
  };

  /* =======================================================
     TIME UPDATE
  ======================================================= */

  const handleTimeUpdate = () => {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    const current = video.currentTime;
    const total = video.duration || 0;

    setCurrentTime(current);

    setProgress(total ? (current / total) * 100 : 0);
  };

  /* =======================================================
     METADATA
  ======================================================= */

  const handleLoadedMetadata = () => {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    setDuration(video.duration);

    video.volume = volume;
  };

  /* =======================================================
     PROGRESS
  ======================================================= */

  const handleProgressChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);

    const video = videoRef.current;

    if (!video || !video.duration) {
      return;
    }

    video.currentTime = (value / 100) * video.duration;

    setProgress(value);
  };

  /* =======================================================
     MUTE
  ======================================================= */

  const toggleMute = () => {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    video.muted = !video.muted;

    setIsMuted(video.muted);
  };

  /* =======================================================
     VOLUME
  ======================================================= */

  const handleVolumeChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);

    const video = videoRef.current;

    if (!video) {
      return;
    }

    video.volume = value;
    video.muted = value === 0;

    setVolume(value);
    setIsMuted(video.muted);
  };

  /* =======================================================
     FULLSCREEN
  ======================================================= */

  const toggleFullscreen = async () => {
    const container = containerRef.current;

    if (!container) {
      return;
    }

    try {
      if (!document.fullscreenElement) {
        await container.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch {
      // مرورگر ممکن است Fullscreen را مسدود کند
    }
  };

  /* =======================================================
     KEYBOARD
  ======================================================= */

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;

      if (
        event.code === "Space" &&
        target?.tagName !== "INPUT" &&
        target?.tagName !== "TEXTAREA"
      ) {
        event.preventDefault();
        togglePlay();
      }

      if (event.key.toLowerCase() === "m") {
        toggleMute();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  });

  /* =======================================================
     ERROR
  ======================================================= */

  if (videoError) {
    return (
      <div
        dir="rtl"
        className="flex w-full items-center justify-center overflow-hidden rounded-4xl border border-neutral-200 bg-neutral-950 py-24 text-center"
      >
        <div className="px-6">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-[#d4af5a]">
            <svg
              viewBox="0 0 24 24"
              className="h-7 w-7"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M12 8v5" strokeLinecap="round" />

              <path d="M12 17h.01" strokeLinecap="round" />

              <path
                d="M10.3 3.8 2.7 17a2 2 0 0 0 1.7 3h15.2a2 2 0 0 0 1.7-3L13.7 3.8a2 2 0 0 0-3.4 0Z"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <p className="mt-4 text-sm font-bold text-white">
            ویدئو بارگذاری نشد
          </p>

          <p className="mt-2 text-xs text-white/40">
            مسیر فایل ویدئو را بررسی کنید
          </p>

          <p dir="ltr" className="mt-3 text-[10px] text-[#d4af5a]">
            /videos/hiraz-melk.mp4
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      dir="ltr"
      className="group relative w-full overflow-hidden rounded-4xl border border-neutral-200 bg-neutral-950 shadow-[0_25px_80px_rgba(0,0,0,0.12)]"
    >
      {/* ===================================================
         VIDEO
      =================================================== */}

      <video
        ref={videoRef}
        src="/videos/hiraz-melk.mp4"
        preload="metadata"
        playsInline
        onClick={togglePlay}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={() => {
          setIsPlaying(false);
          setProgress(0);
          setCurrentTime(0);
        }}
        onError={() => setVideoError(true)}
        className="block w-full cursor-pointer object-cover"
      />

      <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/85 via-black/10 to-black/20" />

      {/* ===================================================
         TOP INFO
      =================================================== */}

      <div className="pointer-events-none absolute left-5 right-5 top-5 flex items-start justify-between text-white md:left-7 md:right-7 md:top-7">
        <div>
          <span className="block text-[8px] font-bold tracking-[0.35em] text-[#d4af5a] md:text-[9px]">
            SHIRAZ MELK
          </span>

          <h3 className="mt-1 text-sm font-black md:text-base">
            معماری از زاویه‌ای دیگر
          </h3>
        </div>

        <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-[8px] font-bold text-white backdrop-blur-md md:text-[9px]">
          VIDEO
        </span>
      </div>

      {/* ===================================================
         CENTER PLAY
      =================================================== */}

      <button
        type="button"
        onClick={togglePlay}
        aria-label={isPlaying ? "توقف ویدئو" : "پخش ویدئو"}
        className={`absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-white/15 text-white shadow-[0_15px_50px_rgba(0,0,0,0.3)] backdrop-blur-xl transition-all duration-500 ${
          isPlaying
            ? "h-14 w-14 opacity-0 group-hover:opacity-100 md:h-16 md:w-16"
            : "h-18 w-18 opacity-100 md:h-22 md:w-22"
        }`}
      >
        {isPlaying ? (
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
            <rect x="7" y="5" width="4" height="14" rx="1" />

            <rect x="13" y="5" width="4" height="14" rx="1" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" className="ml-1 h-8 w-8" fill="currentColor">
            <path d="M8 5.5C8 4.67 8.94 4.18 9.63 4.63L18.13 10.13C18.77 10.55 18.77 11.45 18.13 11.87L9.63 17.37C8.94 17.82 8 17.33 8 16.5V5.5Z" />
          </svg>
        )}
      </button>

      {/* ===================================================
         CONTROLS
      =================================================== */}

      <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
        <input
          type="range"
          min="0"
          max="100"
          step="0.1"
          value={progress}
          onChange={handleProgressChange}
          aria-label="پیشرفت ویدئو"
          className="mb-4 h-1 w-full cursor-pointer appearance-none rounded-full accent-[#b08b38]"
          style={{
            background: `linear-gradient(to right, #b08b38 ${progress}%, rgba(255,255,255,0.2) ${progress}%)`,
          }}
        />

        <div className="flex items-center justify-between gap-4 text-white">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={togglePlay}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-neutral-900 transition-all duration-300 hover:scale-105 hover:bg-[#d4af5a]"
            >
              {isPlaying ? (
                <svg
                  viewBox="0 0 24 24"
                  className="h-4 w-4"
                  fill="currentColor"
                >
                  <rect x="7" y="5" width="4" height="14" rx="1" />

                  <rect x="13" y="5" width="4" height="14" rx="1" />
                </svg>
              ) : (
                <svg
                  viewBox="0 0 24 24"
                  className="ml-0.5 h-4 w-4"
                  fill="currentColor"
                >
                  <path d="M8 5.5C8 4.67 8.94 4.18 9.63 4.63L18.13 10.13C18.77 10.55 18.77 11.45 18.13 11.87L9.63 17.37C8.94 17.82 8 17.33 8 16.5V5.5Z" />
                </svg>
              )}
            </button>

            <button
              type="button"
              onClick={toggleMute}
              aria-label="صدا"
              className="hidden text-white/80 transition-colors hover:text-white sm:block"
            >
              {isMuted || volume === 0 ? (
                <svg
                  viewBox="0 0 24 24"
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                >
                  <path
                    d="M5 9v6h4l5 4V5l-5 4H5Z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  <path d="M19 9l-4 6" strokeLinecap="round" />

                  <path d="M15 9l4 6" strokeLinecap="round" />
                </svg>
              ) : (
                <svg
                  viewBox="0 0 24 24"
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                >
                  <path
                    d="M5 9v6h4l5 4V5l-5 4H5Z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  <path d="M17 9.5c1.8 1.4 1.8 3.6 0 5" strokeLinecap="round" />

                  <path d="M19 7c3.2 2.6 3.2 7.4 0 10" strokeLinecap="round" />
                </svg>
              )}
            </button>

            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={isMuted ? 0 : volume}
              onChange={handleVolumeChange}
              aria-label="بلندی صدا"
              className="hidden h-1 w-16 cursor-pointer appearance-none rounded-full accent-[#b08b38] sm:block"
            />

            <span className="text-[10px] tabular-nums text-white/80">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
          </div>

          <button
            type="button"
            onClick={toggleFullscreen}
            aria-label="تمام صفحه"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition-all duration-300 hover:bg-white/20"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
            >
              <path
                d="M8 3H3v5M16 3h5v5M8 21H3v-5M21 16v5h-5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   ABOUT SECTION
========================================================= */

export default function AboutSection() {
  const [imageError, setImageError] = useState(false);

  return (
    <section dir="rtl" className="w-full space-y-16 py-12 lg:px-20">
      {/* ===================================================
         ABOUT
      =================================================== */}

      <section className="w-full">
        <div className="w-full overflow-hidden rounded-4xl border border-neutral-200 bg-neutral-50 p-3 shadow-[0_20px_70px_rgba(0,0,0,0.06)] md:p-5">
          <div className="flex w-full flex-col-reverse gap-4 md:flex-row md:items-stretch md:gap-5">
            {/* IMAGE */}
            <div className="group relative w-full overflow-hidden rounded-2xl bg-linear-to-br from-neutral-100 via-neutral-200 to-neutral-300 md:w-1/2">
              {!imageError ? (
                <img
                  src="https://www.shirazmelk.org/Uploads/Setting/8d181097-787a-4711-8a12-17db5fa370e7.png"
                  alt="شیراز ملک"
                  loading="lazy"
                  onError={() => setImageError(true)}
                  className="block w-full object-cover opacity-80 transition-all duration-700 group-hover:scale-105 group-hover:opacity-90"
                />
              ) : (
                <div className="flex min-h-80 w-full items-center justify-center bg-linear-to-br from-neutral-200 via-neutral-300 to-neutral-400 md:min-h-full">
                  <div className="flex flex-col items-center text-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/20 bg-white/10 text-white shadow-xl backdrop-blur-md">
                      <svg
                        viewBox="0 0 24 24"
                        className="h-7 w-7"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.4"
                      >
                        <path d="M3 21h18" strokeLinecap="round" />

                        <path
                          d="M5 21V9l7-6 7 6v12"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />

                        <path
                          d="M9 21v-6h6v6"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>

                    <span className="mt-4 text-xs font-bold tracking-[0.25em] text-white">
                      SHIRAZ MELK
                    </span>

                    <span className="mt-2 text-[10px] text-white/60">
                      معماری، طراحی و اجرای متفاوت
                    </span>
                  </div>
                </div>
              )}

              <div className="absolute inset-0 bg-linear-to-t from-neutral-950/75 via-neutral-950/10 to-transparent" />

              {!imageError && (
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 transition-all duration-500 group-hover:opacity-100">
                  <div className="flex flex-col items-center text-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/20 bg-white/10 text-white shadow-xl backdrop-blur-md">
                      <svg
                        viewBox="0 0 24 24"
                        className="h-7 w-7"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.4"
                      >
                        <path d="M3 21h18" strokeLinecap="round" />

                        <path
                          d="M5 21V9l7-6 7 6v12"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />

                        <path
                          d="M9 21v-6h6v6"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>

                    <span className="mt-4 text-xs font-bold tracking-[0.25em] text-white">
                      SHIRAZ MELK
                    </span>

                    <span className="mt-2 text-[10px] text-white/60">
                      معماری، طراحی و اجرای متفاوت
                    </span>
                  </div>
                </div>
              )}

              <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between">
                <div>
                  <span className="block text-[9px] tracking-[0.3em] text-white/60">
                    EST. 1382
                  </span>

                  <h3 className="mt-1 text-lg font-black text-white">
                    شیراز ملک
                  </h3>
                </div>

                <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-[9px] font-bold text-white backdrop-blur-md">
                  معماری مدرن
                </span>
              </div>
            </div>

            {/* CONTENT */}
            <div className="flex w-full flex-col justify-between rounded-2xl bg-white p-6 md:w-1/2 md:p-8 lg:p-10">
              <div>
                <div className="mb-5 flex items-center gap-3">
                  <span className="h-px w-10 bg-[#b08b38]" />

                  <span className="text-[9px] font-bold tracking-[0.35em] text-[#b08b38]">
                    ABOUT SHIRAZ MELK
                  </span>
                </div>

                <h2 className="max-w-xl text-3xl font-black leading-[1.35] tracking-tight text-neutral-900 md:text-4xl">
                  جایی که
                  <span className="text-[#b08b38]"> معماری </span>
                  با زندگی ترکیب می‌شود
                </h2>

                <p className="mt-5 max-w-xl text-sm leading-8 text-neutral-500">
                  ما در شیراز ملک تلاش می‌کنیم فضاهایی خلق کنیم که فقط زیبا
                  نباشند، بلکه بخشی از سبک زندگی شما شوند. از طراحی اولیه تا
                  اجرای نهایی، هر جزئیات با دقت و وسواس انتخاب می‌شود.
                </p>
              </div>

              <div className="mt-10">
                <div className="grid grid-cols-3 gap-2 border-y border-neutral-100 py-5 md:gap-4">
                  <div>
                    <span className="block text-xl font-black text-neutral-900 md:text-2xl">
                      ۲۲+
                    </span>

                    <span className="mt-1 block text-[9px] text-neutral-400">
                      سال تجربه
                    </span>
                  </div>

                  <div>
                    <span className="block text-xl font-black text-neutral-900 md:text-2xl">
                      ۸۵۰+
                    </span>

                    <span className="mt-1 block text-[9px] text-neutral-400">
                      پروژه
                    </span>
                  </div>

                  <div>
                    <span className="block text-xl font-black text-neutral-900 md:text-2xl">
                      ۳۸
                    </span>

                    <span className="mt-1 block text-[9px] text-neutral-400">
                      متخصص
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  className="group mt-6 flex items-center gap-3 text-sm font-bold text-neutral-900"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-900 text-white transition-all duration-300 group-hover:bg-[#b08b38]">
                    <svg
                      viewBox="0 0 24 24"
                      className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                    >
                      <path d="M5 12h13" strokeLinecap="round" />

                      <path
                        d="M13 6l6 6-6 6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>

                  <span>بیشتر درباره ما</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================
         VIDEO
      =================================================== */}

      <section className="w-full">
        <div className="mb-7 flex items-end justify-between gap-5">
          <div>
            <div className="mb-4 flex items-center gap-3">
              <span className="h-px w-10 bg-[#b08b38]" />

              <span className="text-[9px] font-bold tracking-[0.35em] text-[#b08b38]">
                OUR VISION
              </span>
            </div>

            <h2 className="text-2xl font-black tracking-tight text-neutral-900 md:text-3xl">
              معماری را
              <span className="text-[#b08b38]"> تجربه کنید</span>
            </h2>
          </div>

          <p className="hidden max-w-sm text-left text-xs leading-6 text-neutral-400 md:block">
            نگاهی کوتاه به نگاه ما به طراحی، معماری و خلق فضاهای متفاوت.
          </p>
        </div>

        <VideoPlayer />
      </section>
    </section>
  );
}
