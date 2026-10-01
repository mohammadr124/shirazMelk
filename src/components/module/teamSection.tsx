const teamMembers = [
  {
    name: "محمد رحمانی",
    role: "مدیر و معمار ارشد",
    image: "/images/team-1.jpg",
  },
  {
    name: "سارا احمدی",
    role: "طراح داخلی",
    image: "/images/team-2.jpg",
  },
  {
    name: "امیر رضایی",
    role: "مهندس و ناظر پروژه",
    image: "/images/team-3.jpg",
  },
];

export default function TeamSection() {
  return (
    <section
      dir="rtl"
      className="relative w-full overflow-x-clip bg-white py-20 lg:py-28"
    >
      <div className="pointer-events-none absolute -left-40 top-0 h-80 w-80 rounded-full bg-[#d4af5a]/10 blur-3xl"></div>
      <div className="pointer-events-none absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-[#b08b38]/10 blur-3xl"></div>

      <div className="relative mx-auto w-full max-w-360 px-5 lg:px-10">
        <div className="mb-14 flex flex-col items-center text-center">
          <div className="mb-5 flex items-center gap-3 rounded-full border border-[#d4af5a]/30 bg-[#d4af5a]/10 px-5 py-2.5">
            <span className="h-2.5 w-2.5 rounded-full bg-linear-to-r from-[#b08b38] to-[#d4af5a]"></span>

            <span className="text-sm font-bold text-[#9a772d]">
              تیم شیراز ملک
            </span>
          </div>

          <h2 className="text-3xl font-black leading-[1.8] text-gray-900 md:text-4xl lg:text-5xl">
            پشت هر پروژه،
            <span className="mx-2 bg-linear-to-r from-[#b08b38] to-[#d4af5a] bg-clip-text text-transparent">
              یک تیم حرفه‌ای{" "}
            </span>
            ایستاده است
          </h2>

          <p className="mt-5 max-w-2xl text-sm font-medium leading-8 text-gray-500 md:text-base">
            مجموعه شیراز ملک با همراهی متخصصان حوزه معماری، طراحی داخلی و اجرای
            پروژه، تلاش می‌کند ایده‌ها را به فضاهایی ماندگار تبدیل کند.
          </p>

          <div className="mt-6 h-1.5 w-24 rounded-full bg-linear-to-r from-[#b08b38] to-[#d4af5a]"></div>
        </div>

        <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {teamMembers.map((member) => (
            <article
              key={member.name}
              className="group overflow-hidden rounded-3xl border border-gray-200 bg-[#f8f8f6] transition-all duration-500 hover:-translate-y-2 hover:shadow-xl"
            >
              <div className="relative h-105 w-full overflow-hidden bg-gray-200">
                <img
                  src={member.image}
                  alt={member.name}
                  className="h-full w-full object-cover grayscale transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
                />

                <div className="absolute inset-0 bg-linear-to-t from-black/65 via-black/10 to-transparent opacity-80"></div>

                <div className="absolute bottom-5 right-5 left-5 flex items-end justify-between">
                  <div>
                    <h3 className="text-xl font-black text-white">
                      {member.name}
                    </h3>

                    <p className="mt-1 text-sm font-medium text-white/70">
                      {member.role}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between px-6 py-5">
                <span className="text-xs font-bold text-gray-400">
                  SHIRAZ MELK
                </span>

                <span className="h-1.5 w-12 rounded-full bg-linear-to-r from-[#b08b38] to-[#d4af5a] transition-all duration-300 group-hover:w-20"></span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
