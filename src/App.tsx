import BlogCard from "./components/module/blogCard";
import FAQSection from "./components/module/faqSection";
import SiteFooter from "./components/module/footer";
import SiteHeader from "./components/module/header";
import IntroCard from "./components/module/introCard";
import ProductCard from "./components/module/productCard";
import TeamSection from "./components/module/teamSection";
import AboutSection from "./components/module/teamIntro";

export default function App() {
  return (
    <div className="min-h-screen w-full overflow-x-clip bg-gray-100">
      {/* =================================================
          HEADER
      ================================================= */}

      <SiteHeader />

      <main className="w-full overflow-x-clip">
        {/* =================================================
            3D HERO
        ================================================= */}

        <section className="relative w-full overflow-x-clip">
          {/* <AnimationContainer /> */}
        </section>

        {/* =================================================
            INTRO + ABOUT
        ================================================= */}

        <section className="w-full overflow-x-clip bg-gray-100 px-5 py-20 lg:px-0 lg:py-24">
          <div className="mx-auto w-full max-w-360">
            {/* Intro Cards */}

            <section className="grid w-full grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
              <IntroCard />
              <IntroCard />
              <IntroCard />
            </section>

            {/* About */}

            <section className="mt-10 w-full overflow-x-clip lg:px-20">
              <AboutSection />
            </section>
          </div>
        </section>

        {/* =================================================
            SERVICES
        ================================================= */}

        <section
          dir="rtl"
          className="relative w-full overflow-x-clip bg-white py-20 lg:py-28"
        >
          <div className="pointer-events-none absolute -left-32 top-10 h-80 w-80 rounded-full bg-[#b08b38]/10 blur-3xl"></div>

          <div className="pointer-events-none absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-[#d4af5a]/10 blur-3xl"></div>

          <div className="relative mx-auto flex w-full max-w-360 flex-col gap-14 px-5 lg:px-10">
            {/* Services Header */}

            <div className="flex w-full flex-col items-center text-center">
              <div className="mb-5 flex items-center gap-3 rounded-full border border-[#d4af5a]/30 bg-[#d4af5a]/10 px-5 py-2.5">
                <span className="h-2.5 w-2.5 rounded-full bg-linear-to-r from-[#b08b38] to-[#d4af5a]"></span>

                <p className="text-sm font-bold text-[#9a772d]">
                  خدمات تخصصی شیراز ملک
                </p>
              </div>

              <h2 className="text-3xl font-black leading-12 text-gray-900 md:text-4xl lg:text-5xl">
                به دنبال چه چیزی{" "}
                <span className="mr-2 bg-linear-to-r from-[#b08b38] to-[#d4af5a] bg-clip-text text-transparent">
                  می‌گردید؟
                </span>
              </h2>

              <p className="mt-5 max-w-2xl text-sm font-medium leading-8 text-gray-500 md:text-base">
                خدمات تخصصی شیراز ملک برای طراحی، بازسازی و زیباسازی فضاهای
                داخلی و خارجی، با تمرکز بر کیفیت، جزئیات و سلیقه شما.
              </p>

              <div className="mt-6 h-1.5 w-20 rounded-full bg-linear-to-r from-[#b08b38] to-[#d4af5a]"></div>
            </div>

            {/* Services Cards */}

            <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              <ProductCard />
              <ProductCard />
              <ProductCard />
            </div>

            <div className="flex justify-center">
              <div className="flex items-center gap-3 rounded-full border border-gray-200 bg-gray-50 px-6 py-3 shadow-sm">
                <span className="h-2.5 w-2.5 rounded-full bg-linear-to-r from-[#b08b38] to-[#d4af5a]"></span>

                <p className="text-sm font-bold text-gray-600">
                  طراحی، اجرا و مشاوره در کنار شما
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* =================================================
            PROJECTS
        ================================================= */}

        <section
          dir="rtl"
          className="relative w-full overflow-x-clip bg-[#f8f8f6] py-20 lg:py-28"
        >
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -left-32 top-10 h-72 w-72 rounded-full bg-[#d4af5a]/10 blur-3xl"></div>

            <div className="absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-[#b08b38]/10 blur-3xl"></div>
          </div>

          <div className="relative mx-auto w-full max-w-360 px-5 lg:px-10">
            {/* Projects Header */}

            <div className="mb-14 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
              <div className="flex max-w-4xl flex-col">
                <div className="mb-5 flex w-fit items-center gap-3 rounded-full border border-[#d4af5a]/30 bg-white px-5 py-2.5 shadow-sm">
                  <span className="h-2.5 w-2.5 rounded-full bg-linear-to-r from-[#b08b38] to-[#d4af5a] shadow-[0_0_10px_rgba(176,139,56,0.35)]"></span>

                  <p className="text-sm font-bold text-[#9a772d]">
                    پروژه‌های اخیر
                  </p>
                </div>

                <h2 className="text-3xl font-black leading-[1.8] text-gray-900 md:text-4xl lg:text-5xl">
                  نگاهی به{" "}
                  <span className="mx-2 bg-linear-to-r from-[#b08b38] to-[#d4af5a] bg-clip-text text-transparent">
                    پروژه‌های اجرا{" "}
                  </span>
                  توسط شیراز ملک
                </h2>

                <p className="mt-5 max-w-3xl text-sm font-medium leading-8 text-gray-500 md:text-base">
                  مجموعه‌ای از پروژه‌های طراحی و معماری که با تمرکز بر جزئیات،
                  کیفیت اجرا و هویت منحصربه‌فرد هر فضا شکل گرفته‌اند.
                </p>

                <div className="mt-6 h-1.5 w-24 rounded-full bg-linear-to-r from-[#b08b38] to-[#d4af5a]"></div>
              </div>

              {/* Project Counter */}

              <div className="flex shrink-0 items-center gap-4 rounded-2xl border border-gray-200 bg-white px-6 py-5 shadow-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-[#b08b38] to-[#d4af5a] text-xl font-black text-white">
                  06
                </div>

                <div className="flex flex-col">
                  <span className="text-xs font-medium text-gray-400">
                    پروژه‌های نمایش داده شده
                  </span>

                  <span className="mt-1 text-sm font-black text-gray-800">
                    منتخب معماری شیراز ملک
                  </span>
                </div>
              </div>
            </div>

            {/* Projects Grid */}

            <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              <ProductCard />
              <ProductCard />
              <ProductCard />
              <ProductCard />
              <ProductCard />
              <ProductCard />
            </div>

            {/* Projects CTA */}

            <div className="mt-12 flex justify-center">
              <button className="group flex items-center gap-3 rounded-xl border border-gray-300 bg-white px-7 py-3.5 text-sm font-bold text-gray-700 shadow-sm transition-all duration-300 hover:border-[#d4af5a]/50 hover:shadow-md">
                <span>مشاهده تمام پروژه‌ها</span>

                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100 transition-all duration-300 group-hover:bg-linear-to-r group-hover:from-[#b08b38] group-hover:to-[#d4af5a] group-hover:text-white">
                  ←
                </span>
              </button>
            </div>
          </div>
        </section>

        {/* =================================================
            TEAM
        ================================================= */}

        <TeamSection />

        {/* =================================================
            FAQ
        ================================================= */}

        <FAQSection />

        {/* =================================================
            BLOG
        ================================================= */}

        <section
          dir="rtl"
          className="relative w-full overflow-x-clip bg-white py-20 lg:py-28"
        >
          <div className="pointer-events-none absolute -left-40 top-20 h-80 w-80 rounded-full bg-[#d4af5a]/10 blur-3xl"></div>

          <div className="pointer-events-none absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-[#b08b38]/10 blur-3xl"></div>

          <div className="relative mx-auto w-full max-w-360 px-5 lg:px-10">
            {/* Blog Header */}

            <div className="mb-14 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-4xl">
                <div className="mb-5 flex w-fit items-center gap-3 rounded-full border border-[#d4af5a]/30 bg-[#d4af5a]/10 px-5 py-2.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-linear-to-r from-[#b08b38] to-[#d4af5a]"></span>

                  <span className="text-sm font-bold text-[#9a772d]">
                    مجله شیراز ملک
                  </span>
                </div>

                <h2 className="text-3xl font-black leading-[1.8] text-gray-900 md:text-4xl lg:text-5xl">
                  تازه‌ترین مطالب{" "}
                  <span className="mx-2 bg-linear-to-r from-[#b08b38] to-[#d4af5a] bg-clip-text text-transparent">
                    معماری و دکوراسیون{" "}
                  </span>
                  را بخوانید
                </h2>

                <p className="mt-5 max-w-3xl text-sm font-medium leading-8 text-gray-500 md:text-base">
                  ایده‌ها، نکات کاربردی و مطالب تخصصی درباره معماری، طراحی
                  داخلی، دکوراسیون و سبک زندگی را در مجله شیراز ملک دنبال کنید.
                </p>

                <div className="mt-6 h-1.5 w-24 rounded-full bg-linear-to-r from-[#b08b38] to-[#d4af5a]"></div>
              </div>

              {/* Blog CTA */}

              <button className="group flex w-fit shrink-0 items-center gap-3 rounded-2xl border border-gray-200 bg-gray-50 px-6 py-4 text-sm font-bold text-gray-700 transition-all duration-300 hover:border-[#d4af5a]/40 hover:bg-white hover:shadow-lg">
                <span>مشاهده همه مقالات</span>

                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-gray-500 shadow-sm transition-all duration-300 group-hover:bg-linear-to-r group-hover:from-[#b08b38] group-hover:to-[#d4af5a] group-hover:text-white">
                  ←
                </span>
              </button>
            </div>

            {/* Blog Cards */}

            <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              <BlogCard />
              <BlogCard />
              <BlogCard />
            </div>
          </div>
        </section>
      </main>

      {/* =================================================
          FOOTER
      ================================================= */}

      <SiteFooter />
    </div>
  );
}
