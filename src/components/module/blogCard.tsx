export default function BlogCard() {
  return (
    <article
      dir="rtl"
      className="group w-full overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-xl"
    >
      <div className="relative h-60 w-full overflow-hidden">
        <img
          src="/images/blog-1.jpg"
          alt="طراحی داخلی مدرن"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />

        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/10 to-transparent"></div>

        <div className="absolute right-5 top-5 rounded-full border border-white/20 bg-white/90 px-4 py-2 backdrop-blur-md">
          <span className="text-xs font-bold text-[#9a772d]">
            معماری و طراحی
          </span>
        </div>

        <div className="absolute bottom-5 right-5 left-5 flex items-center justify-between text-white">
          <span className="text-xs font-medium">۲۸ شهریور ۱۴۰۵</span>

          <span className="text-xs font-medium">۵ دقیقه مطالعه</span>
        </div>
      </div>

      <div className="flex flex-col p-6">
        <h3 className="text-xl font-black leading-9 text-gray-900 transition-colors duration-300 group-hover:text-[#b08b38]">
          ایده‌های جذاب برای طراحی یک خانه مدرن و لوکس
        </h3>

        <p className="mt-3 line-clamp-2 text-sm font-medium leading-7 text-gray-500">
          با چند تغییر هوشمندانه می‌توان فضای خانه را مدرن‌تر، کاربردی‌تر و
          هماهنگ با سبک زندگی امروز طراحی کرد.
        </p>

        <div className="mt-6 flex items-center justify-between border-t border-gray-100 pt-5">
          <button className="group/button flex items-center gap-2 text-sm font-bold text-[#9a772d]">
            <span>مطالعه مقاله</span>

            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#b08b38]/10 transition-all duration-300 group-hover/button:bg-linear-to-r group-hover/button:from-[#b08b38] group-hover/button:to-[#d4af5a] group-hover/button:text-white">
              ←
            </span>
          </button>

          <div className="h-1.5 w-10 rounded-full bg-linear-to-r from-[#b08b38] to-[#d4af5a]"></div>
        </div>
      </div>
    </article>
  );
}
