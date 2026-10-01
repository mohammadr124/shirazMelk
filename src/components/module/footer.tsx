export default function SiteFooter() {
  return (
    <footer
      dir="rtl"
      className="relative w-full overflow-x-clip overflow-y-hidden bg-[#171717] text-white"
    >
      <div className="pointer-events-none absolute -left-40 top-0 h-96 w-96 rounded-full bg-[#d4af5a]/10 blur-3xl"></div>

      <div className="pointer-events-none absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-[#b08b38]/10 blur-3xl"></div>

      <div className="relative mx-auto w-full max-w-360 px-5 pt-16 lg:px-10 lg:pt-20">
        <div className="grid w-full grid-cols-1 gap-12 border-b border-white/10 pb-14 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-linear-to-br from-[#b08b38] to-[#d4af5a] text-lg font-black text-white shadow-lg shadow-[#b08b38]/20">
                ش
              </div>

              <div className="flex min-w-0 flex-col">
                <span className="text-lg font-black">شیراز ملک</span>

                <span className="text-xs font-medium text-white/40">
                  دفتر طراحی و معماری
                </span>
              </div>
            </div>

            <p className="max-w-sm text-sm font-medium leading-8 text-white/55">
              شیراز ملک با تمرکز بر معماری، طراحی و زیباسازی فضا، تلاش می‌کند
              تجربه‌ای متفاوت و حرفه‌ای برای ساخت و زندگی بهتر ایجاد کند.
            </p>

            <div className="mt-7 flex items-center gap-3">
              <a
                href="#"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-sm font-bold text-white/70 transition-all duration-300 hover:border-[#d4af5a]/40 hover:bg-[#d4af5a] hover:text-white"
              >
                این
              </a>

              <a
                href="#"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-sm font-bold text-white/70 transition-all duration-300 hover:border-[#d4af5a]/40 hover:bg-[#d4af5a] hover:text-white"
              >
                IG
              </a>

              <a
                href="#"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-sm font-bold text-white/70 transition-all duration-300 hover:border-[#d4af5a]/40 hover:bg-[#d4af5a] hover:text-white"
              >
                IN
              </a>
            </div>
          </div>

          <div className="min-w-0">
            <h3 className="mb-6 text-base font-black">دسترسی سریع</h3>

            <div className="flex flex-col gap-4">
              <a
                href="#"
                className="text-sm font-medium text-white/50 transition-colors duration-300 hover:text-[#d4af5a]"
              >
                صفحه اصلی
              </a>

              <a
                href="#"
                className="text-sm font-medium text-white/50 transition-colors duration-300 hover:text-[#d4af5a]"
              >
                درباره ما
              </a>

              <a
                href="#"
                className="text-sm font-medium text-white/50 transition-colors duration-300 hover:text-[#d4af5a]"
              >
                پروژه‌ها
              </a>

              <a
                href="#"
                className="text-sm font-medium text-white/50 transition-colors duration-300 hover:text-[#d4af5a]"
              >
                خدمات
              </a>

              <a
                href="#"
                className="text-sm font-medium text-white/50 transition-colors duration-300 hover:text-[#d4af5a]"
              >
                وبلاگ
              </a>
            </div>
          </div>

          <div className="min-w-0">
            <h3 className="mb-6 text-base font-black">خدمات ما</h3>

            <div className="flex flex-col gap-4">
              <a
                href="#"
                className="text-sm font-medium text-white/50 transition-colors duration-300 hover:text-[#d4af5a]"
              >
                طراحی معماری
              </a>

              <a
                href="#"
                className="text-sm font-medium text-white/50 transition-colors duration-300 hover:text-[#d4af5a]"
              >
                طراحی داخلی
              </a>

              <a
                href="#"
                className="text-sm font-medium text-white/50 transition-colors duration-300 hover:text-[#d4af5a]"
              >
                دکوراسیون
              </a>

              <a
                href="#"
                className="text-sm font-medium text-white/50 transition-colors duration-300 hover:text-[#d4af5a]"
              >
                بازسازی ساختمان
              </a>

              <a
                href="#"
                className="text-sm font-medium text-white/50 transition-colors duration-300 hover:text-[#d4af5a]"
              >
                مشاوره معماری
              </a>
            </div>
          </div>

          <div className="min-w-0">
            <h3 className="mb-6 text-base font-black">ارتباط با ما</h3>

            <div className="flex flex-col gap-5">
              <div className="flex min-w-0 items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/5 text-[#d4af5a]">
                  ت
                </div>

                <div className="flex min-w-0 flex-col gap-1">
                  <span className="text-xs text-white/35">تلفن تماس</span>

                  <span className="wrap-break-words text-sm font-bold text-white/80">
                    ۰۷۱-۳۶۲۹XXXX
                  </span>
                </div>
              </div>

              <div className="flex min-w-0 items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/5 text-[#d4af5a]">
                  م
                </div>

                <div className="flex min-w-0 flex-col gap-1">
                  <span className="text-xs text-white/35">ایمیل</span>

                  <span className="break-all text-sm font-bold text-white/80">
                    info@shirazmelk.ir
                  </span>
                </div>
              </div>

              <div className="flex min-w-0 items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/5 text-[#d4af5a]">
                  آ
                </div>

                <div className="flex min-w-0 flex-col gap-1">
                  <span className="text-xs text-white/35">آدرس</span>

                  <span className="wrap-break-words text-sm font-medium leading-7 text-white/70">
                    شیراز، ایران
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex min-w-0 flex-col gap-5 py-6 md:flex-row md:items-center md:justify-between">
          <p className="text-xs font-medium text-white/35">
            © ۱۴۰۵ شیراز ملک. تمامی حقوق محفوظ است.
          </p>

          <div className="flex min-w-0 items-center gap-2">
            <span className="text-xs text-white/30">طراحی و توسعه با</span>

            <span className="font-black text-[#d4af5a]">دقت و خلاقیت</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
