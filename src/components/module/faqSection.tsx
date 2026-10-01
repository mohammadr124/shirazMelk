import { useState } from "react";
import { ChevronDown, MessageCircleQuestion } from "lucide-react";

const faqItems = [
  {
    question: "شیراز ملک چه خدماتی ارائه می‌دهد؟",
    answer:
      "شیراز ملک در زمینه طراحی معماری، طراحی داخلی، دکوراسیون، بازسازی و مشاوره تخصصی پروژه‌های ساختمانی فعالیت می‌کند.",
  },
  {
    question: "آیا امکان مشاوره برای پروژه قبل از شروع کار وجود دارد؟",
    answer:
      "بله. پیش از شروع پروژه می‌توانید برای بررسی شرایط، نیازها، بودجه و ایده‌های طراحی با تیم شیراز ملک مشورت کنید.",
  },
  {
    question: "طراحی پروژه‌ها به صورت اختصاصی انجام می‌شود؟",
    answer:
      "بله. طراحی هر پروژه متناسب با ویژگی‌های فضا، نیازهای کارفرما، سبک موردنظر و شرایط اجرایی انجام می‌شود.",
  },
  {
    question: "آیا خدمات بازسازی ساختمان هم ارائه می‌شود؟",
    answer:
      "بله. خدمات بازسازی می‌تواند شامل طراحی مجدد فضا، تغییرات داخلی، انتخاب متریال و هماهنگی مراحل اجرایی باشد.",
  },
  {
    question: "چطور می‌توانم برای پروژه خود درخواست ثبت کنم؟",
    answer:
      "می‌توانید از طریق راه‌های ارتباطی موجود در سایت با ما تماس بگیرید و اطلاعات اولیه پروژه خود را ارسال کنید.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      dir="rtl"
      className="relative w-full overflow-x-clip bg-[#f8f8f6] py-20 lg:py-28"
    >
      <div className="pointer-events-none absolute -left-40 top-10 h-80 w-80 rounded-full bg-[#d4af5a]/10 blur-3xl"></div>
      <div className="pointer-events-none absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-[#b08b38]/10 blur-3xl"></div>

      <div className="relative mx-auto grid w-full max-w-360 grid-cols-1 gap-12 px-5 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20 lg:px-10">
        <div className="flex flex-col justify-center">
          <div className="mb-5 flex w-fit items-center gap-3 rounded-full border border-[#d4af5a]/30 bg-white px-5 py-2.5 shadow-sm">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-linear-to-br from-[#b08b38] to-[#d4af5a] text-white">
              <MessageCircleQuestion size={17} />
            </span>

            <span className="text-sm font-bold text-[#9a772d]">
              سوالات متداول
            </span>
          </div>

          <h2 className="max-w-2xl text-3xl font-black leading-[1.8] text-gray-900 md:text-4xl lg:text-5xl">
            پاسخ سوالات شما
            <span className="mx-2 bg-linear-to-r from-[#b08b38] to-[#d4af5a] bg-clip-text text-transparent">
              همین‌جاست
            </span>
          </h2>

          <p className="mt-5 max-w-xl text-sm font-medium leading-8 text-gray-500 md:text-base">
            پاسخ تعدادی از سوالات رایج درباره خدمات، طراحی، بازسازی و روند
            همکاری با تیم شیراز ملک را در این بخش مشاهده کنید.
          </p>

          <div className="mt-6 h-1.5 w-24 rounded-full bg-linear-to-r from-[#b08b38] to-[#d4af5a]"></div>

          <div className="mt-10 rounded-3xl border border-[#d4af5a]/20 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#d4af5a]/10 text-[#b08b38]">
                <MessageCircleQuestion size={22} />
              </div>

              <div>
                <p className="text-sm font-black text-gray-900">
                  سوال دیگری دارید؟
                </p>

                <p className="mt-1 text-xs font-medium text-gray-400">
                  تیم ما آماده پاسخگویی به شماست.
                </p>
              </div>
            </div>

            <button className="mt-6 w-full rounded-xl bg-linear-to-r from-[#b08b38] to-[#d4af5a] px-5 py-3.5 text-sm font-black text-white shadow-lg shadow-[#b08b38]/10 transition-all duration-300 hover:brightness-105">
              ارتباط با ما
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          {faqItems.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={item.question}
                className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="flex w-full items-center justify-between gap-5 px-6 py-5 text-right"
                >
                  <span className="text-sm font-black leading-7 text-gray-800 md:text-base">
                    {item.question}
                  </span>

                  <span
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-all duration-300 ${
                      isOpen
                        ? "bg-linear-to-r from-[#b08b38] to-[#d4af5a] text-white"
                        : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    <ChevronDown
                      size={18}
                      className={`transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </span>
                </button>

                <div
                  className={`grid transition-all duration-300 ${
                    isOpen
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="min-h-0 overflow-hidden">
                    <p className="border-t border-gray-100 px-6 pb-6 pt-4 text-sm font-medium leading-8 text-gray-500">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
