export default function ProductCard() {
  return (
    <article
      dir="rtl"
      className="group w-full overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-[0_10px_35px_rgba(0,0,0,0.06)] transition-all duration-500 hover:-translate-y-1 hover:border-[#b08b38]/40 hover:shadow-[0_20px_55px_rgba(0,0,0,0.1)]"
    >
      {/* Image */}
      <div className="relative h-64 w-full overflow-hidden bg-neutral-100">
        <img
          src="/images/house-1.jpg"
          alt="ویلای مدرن"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-black/65 via-black/5 to-transparent" />

        {/* Top Badge */}
        <div className="absolute right-4 top-4">
          <span className="rounded-full border border-white/20 bg-white/15 px-3 py-1.5 text-[10px] font-bold text-white backdrop-blur-md">
            فروش ویژه
          </span>
        </div>

        {/* Favorite */}
        <button
          type="button"
          className="absolute left-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition-all duration-300 hover:bg-white hover:text-neutral-900"
          aria-label="افزودن به علاقه‌مندی"
        >
          <svg
            viewBox="0 0 24 24"
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
          >
            <path
              d="M20.8 8.6c0 5.5-8.8 10.2-8.8 10.2S3.2 14.1 3.2 8.6A4.6 4.6 0 0 1 12 6a4.6 4.6 0 0 1 8.8 2.6Z"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {/* Bottom Image Info */}
        <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
          <div>
            <span className="block text-[9px] tracking-[0.25em] text-white/60">
              PROJECT 01
            </span>

            <h3 className="mt-1 text-lg font-black text-white">
              ویلای مدرن آراد
            </h3>
          </div>

          <span className="rounded-full bg-white/90 px-3 py-1.5 text-[9px] font-bold text-neutral-900">
            شیراز
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Category */}
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-[#b08b38]" />

          <span className="text-[9px] font-bold tracking-[0.25em] text-[#b08b38]">
            MODERN VILLA
          </span>
        </div>

        {/* Description */}
        <p className="mt-3 line-clamp-2 text-xs leading-6 text-neutral-500">
          ویلای مدرن با طراحی مینیمال، فضای سبز اختصاصی و متریال ممتاز برای یک
          سبک زندگی متفاوت.
        </p>

        {/* Features */}
        <div className="mt-5 grid grid-cols-3 divide-x divide-x-reverse divide-neutral-100 rounded-2xl bg-neutral-50 py-3">
          <div className="text-center">
            <span className="block text-sm font-black text-neutral-900">
              ۳۲۰
            </span>

            <span className="mt-1 block text-[8px] text-neutral-400">متر</span>
          </div>

          <div className="text-center">
            <span className="block text-sm font-black text-neutral-900">۴</span>

            <span className="mt-1 block text-[8px] text-neutral-400">اتاق</span>
          </div>

          <div className="text-center">
            <span className="block text-sm font-black text-neutral-900">۲</span>

            <span className="mt-1 block text-[8px] text-neutral-400">
              پارکینگ
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-5 flex items-center justify-between border-t border-neutral-100 pt-4">
          <div>
            <span className="block text-[8px] text-neutral-400">قیمت</span>

            <span className="mt-1 block text-base font-black text-neutral-900">
              ۱۲ میلیارد تومان
            </span>
          </div>

          <button
            type="button"
            className="group/button flex h-11 w-11 items-center justify-center rounded-full bg-neutral-900 text-white transition-all duration-300 hover:bg-[#b08b38]"
            aria-label="مشاهده پروژه"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-4 w-4 transition-transform duration-300 group-hover/button:-translate-x-1"
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
          </button>
        </div>
      </div>
    </article>
  );
}
