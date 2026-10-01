export default function IntroCard() {
  return (
    <article dir="rtl" className="group flex min-h-30 w-full gap-4 overflow-hidden rounded-2xl border border-neutral-200 bg-white p-3 shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-all duration-300 hover:-translate-y-1 hover:border-[#b08b38]/30 hover:shadow-[0_14px_40px_rgba(0,0,0,0.1)]">
      {/* image */}
      <div className="relative h-full w-28 shrink-0 overflow-hidden rounded-xl bg-neutral-100">
        <img
          src="/images/house.jpg"
          alt="ملک"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />

        <div className="absolute inset-0 bg-linear-to-t from-black/35 via-transparent to-transparent" />

        <span className="absolute bottom-2 right-2 rounded-full bg-white/90 px-2 py-1 text-[9px] font-bold text-neutral-800 backdrop-blur-sm">
          ویژه
        </span>
      </div>

      {/* main content */}
      <div className="flex min-w-0 flex-1 flex-col justify-between py-1">
        <div>
          <div className="mb-1 flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#b08b38]" />

            <span className="text-[9px] font-semibold tracking-[0.2em] text-[#b08b38]">
              SHIRAZ MELK
            </span>
          </div>

          <h3 className="truncate text-sm font-black text-neutral-900 transition-colors duration-300 group-hover:text-[#8a6d2c]">
            ویلای مدرن و لوکس
          </h3>

          <p className="mt-1 line-clamp-2 text-[10px] leading-5 text-neutral-500">
            طراحی مدرن، فضای سبز اختصاصی و متریال باکیفیت
          </p>
        </div>

        <div className="flex items-center justify-between border-t border-neutral-100 pt-2">
          <div>
            <span className="block text-[8px] text-neutral-400">
              موقعیت
            </span>

            <span className="text-[10px] font-bold text-neutral-800">
              شیراز، معالی‌آباد
            </span>
          </div>

          <button className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-neutral-900 text-white transition-all duration-300 group-hover:bg-[#b08b38] rotate-180">
            <svg
              viewBox="0 0 24 24"
              className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-0.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <path
                d="M5 12h13"
                strokeLinecap="round"
              />

              <path
                d="M13 6l6 6-6 6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </article>
  )
}