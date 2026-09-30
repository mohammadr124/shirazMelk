import { useEffect, useRef, useState, type MouseEvent } from "react";
import { NavLink } from "react-router-dom";
import { CiMobile2 } from "react-icons/ci";
import { IoIosArrowDown } from "react-icons/io";
import { HiMenu, HiX } from "react-icons/hi";
import { GoLocation } from "react-icons/go";

/* =========================================================
   TYPES
========================================================= */

type NavChild = {
  label: string;
  href: string;
};

type NavItem = {
  id: string;
  label: string;
  href: string;
  hasDropdown?: boolean;
  children?: NavChild[];
};

/* =========================================================
   DATA
========================================================= */

const servicesChildren: NavChild[] = [
  { label: "طراحی و معماری نما", href: "/services/facade" },
  { label: "طراحی و معماری داخلی", href: "/services/interior" },
  { label: "طراحی باغ ویلا و فضای سبز", href: "/services/garden" },
];

const navLinks: NavItem[] = [
  { id: "home", label: "خانه", href: "/" },
  {
    id: "services",
    label: "خدمات تخصصی",
    href: "/services",
    hasDropdown: true,
    children: servicesChildren,
  },
  { id: "projects", label: "پروژه‌ها", href: "/projects" },
  {
    id: "pricing",
    label: "تعرفه خدمات",
    href: "/pricing",
    hasDropdown: true,
    children: [
      { label: "طراحی نمای ساختمان", href: "/pricing/building-facade" },
      { label: "طراحی دکوراسیون داخلی", href: "/pricing/interior-design" },
      { label: "طراحی عمارت", href: "/pricing/mansion" },
      { label: "طراحی فضای سبز", href: "/pricing/landscape" },
      {
        label: "مشاوره دکوراسیون داخلی",
        href: "/pricing/interior-consulting",
      },
    ],
  },
  {
    id: "blog",
    label: "وبلاگ",
    href: "/blog",
    hasDropdown: true,
    children: servicesChildren,
  },
  {
    id: "articles",
    label: "مقالات",
    href: "/articles",
    hasDropdown: true,
    children: servicesChildren,
  },
  { id: "about", label: "درباره ما", href: "/about" },
  { id: "contact", label: "تماس با ما", href: "/contact" },
];

const linkBase =
  "relative flex h-full items-center gap-2 px-4 text-[13px] font-medium text-white transition-all duration-300 hover:text-[#d4af5a]";


export default function SiteHeader() {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const navRef = useRef<HTMLElement | null>(null);


  useEffect(() => {
    const handleClickOutside = (e: globalThis.MouseEvent): void => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ===== بستن با Escape =====
  useEffect(() => {
    const handleEsc = (e: globalThis.KeyboardEvent): void => {
      if (e.key === "Escape") {
        setOpenDropdown(null);
        setMobileOpen(false);
        setMobileExpanded(null);
      }
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, []);

  // ===== قفل اسکرول وقتی منوی موبایل بازه =====
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  // ===== کلاس NavLink =====
  const navLinkClass = ({ isActive }: { isActive: boolean }): string =>
    `${linkBase} ${
      isActive
        ? "text-[#d4af5a] after:absolute after:bottom-0 after:right-1/2 after:h-[2px] after:w-8 after:translate-x-1/2 after:rounded-full after:bg-gradient-to-l after:from-[#d4af5a] after:to-[#b08b38]"
        : "after:absolute after:bottom-0 after:right-1/2 after:h-[2px] after:w-0 after:translate-x-1/2 after:rounded-full after:bg-[#d4af5a] after:transition-all after:duration-300 hover:after:w-8"
    }`;

  // ===== کلیک روی آیتم‌های دارای زیرمنو در دسکتاپ =====
  const handleDesktopLinkClick = (
    e: MouseEvent<HTMLAnchorElement>,
    item: NavItem
  ): void => {
    if (item.hasDropdown) {
      e.preventDefault();
      setOpenDropdown((prev) => (prev === item.id ? null : item.id));
    }
  };

  return (
    <>
      {/* =====================================================
          HEADER SECTION (بالای نوار)
      ===================================================== */}
      <section className="relative w-full bg-white">
        <div className="mx-auto flex h-24 w-full max-w-360 items-center justify-between px-6">
          <div className="flex h-full items-center">
            <img
              src="/images/logo.png"
              alt="شیراز ملک"
              className="h-[82%] w-auto object-contain transition-transform duration-500 hover:scale-105"
            />

            <div className="relative mr-3 hidden h-[55%] items-center px-5 text-[11px] tracking-[0.2em] text-gray-500 sm:flex">
              <span className="absolute right-0 top-1/2 h-6 w-px -translate-y-1/2 bg-linear-to-b from-transparent via-[#b08b38]/40 to-transparent" />
              God Is In The Detail's
            </div>
          </div>

          <div className="hidden h-full items-center gap-10 md:flex">
            <a
              href="tel:09170063004"
              className="group flex items-center gap-3 transition"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-linear-to-br from-[#b08b38]/10 to-[#b08b38]/5 ring-1 ring-[#b08b38]/20 transition-all duration-300 group-hover:from-[#b08b38] group-hover:to-[#8a6d2c] group-hover:ring-[#b08b38]">
                <CiMobile2
                  size={24}
                  className="text-[#b08b38] transition-colors duration-300 group-hover:text-white"
                />
              </div>
              <div className="text-gray-700">
                <p className="text-[13px] font-black">09170063004</p>
                <p className="mt-0.5 text-[10px] tracking-wide text-gray-400">
                  سوالی دارید؟
                </p>
              </div>
            </a>

            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-linear-to-br from-[#b08b38]/10 to-[#b08b38]/5 ring-1 ring-[#b08b38]/20">
                <GoLocation size={22} className="text-[#b08b38]" />
              </div>
              <div className="text-gray-700">
                <p className="text-[13px] font-black">شیراز</p>
                <p className="mt-0.5 text-[10px] tracking-wide text-gray-400">
                  میدان آزادی
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          NAVBAR
      ===================================================== */}
      <nav
        ref={navRef}
        className="sticky top-0 z-50 w-full bg-gray-800 text-white backdrop-blur-xl transition-all duration-500"
        aria-label="منوی اصلی"
      >
        {/* نوار نازک طلایی بالای منو */}
        <div className="h-0.5 w-full bg-linear-to-l from-transparent via-[#b08b38] to-transparent opacity-60" />

        <div className="mx-auto flex h-15 w-full max-w-360 items-center justify-between px-6">
          {/* ============ منوی دسکتاپ ============ */}
          <ul dir="rtl" className="hidden h-full items-center gap-0.5 md:flex">
            {navLinks.map((item) => (
              <li
                key={item.id}
                className="relative h-full"
                onMouseEnter={() => {
                  if (item.hasDropdown) setOpenDropdown(item.id);
                }}
                onMouseLeave={() => {
                  if (item.hasDropdown) setOpenDropdown(null);
                }}
              >
                <NavLink
                  to={item.href}
                  className={navLinkClass}
                  onClick={(e) => handleDesktopLinkClick(e, item)}
                  aria-haspopup={item.hasDropdown ? true : undefined}
                  aria-expanded={
                    item.hasDropdown ? openDropdown === item.id : undefined
                  }
                  end={!item.hasDropdown}
                >
                  {item.label}
                  {item.hasDropdown && (
                    <IoIosArrowDown
                      size={12}
                      className={`transition-transform duration-300 ${
                        openDropdown === item.id ? "rotate-180" : ""
                      }`}
                    />
                  )}
                </NavLink>

                {item.hasDropdown && item.children && (
                  <div
                    className={`absolute right-0 top-full w-64 origin-top overflow-hidden rounded-b-2xl bg-white/95 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.3)] backdrop-blur-xl transition-all duration-300 ${
                      openDropdown === item.id
                        ? "visible translate-y-0 scale-100 opacity-100"
                        : "invisible translate-y-1 scale-95 opacity-0"
                    }`}
                  >
                    <div className="h-0.5 w-full bg-linear-to-l from-transparent via-[#b08b38] to-transparent" />

                    <div className="py-2">
                      {item.children.map((child) => (
                        <NavLink
                          key={child.href}
                          to={child.href}
                          className={({ isActive }) =>
                            `group/item relative block px-5 py-3.5 text-right text-[12px] transition-all duration-300 ${
                              isActive
                                ? "text-[#b08b38]"
                                : "text-gray-600 hover:text-[#b08b38]"
                            }`
                          }
                        >
                          {({ isActive }) => (
                            <>
                              <span
                                className={`absolute right-0 top-1/2 h-5 w-0.75 -translate-y-1/2 rounded-l-full bg-linear-to-b from-[#d4af5a] to-[#b08b38] transition-all duration-300 ${
                                  isActive
                                    ? "opacity-100"
                                    : "opacity-0 group-hover/item:opacity-100"
                                }`}
                              />
                              <span className="block pr-3 transition-transform duration-300 group-hover/item:pr-4">
                                {child.label}
                              </span>
                            </>
                          )}
                        </NavLink>
                      ))}
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>

          {/* ============ دکمه منوی موبایل ============ */}
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-xl text-white transition-all duration-300 hover:bg-white/10 active:scale-95 md:hidden"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? "بستن منو" : "باز کردن منو"}
            aria-expanded={mobileOpen}
          >
            <span className="relative block h-6 w-6">
              {mobileOpen ? <HiX size={24} /> : <HiMenu size={24} />}
            </span>
          </button>

          {/* ============ دکمه مشاوره ============ */}
          <NavLink
            to="/consult"
            className="group relative hidden overflow-hidden rounded-xl bg-linear-to-l from-[#b08b38] to-[#d4af5a] px-6 py-2.5 text-[12px] font-bold text-white shadow-lg shadow-[#b08b38]/25 transition-all duration-300 hover:shadow-xl hover:shadow-[#b08b38]/40 active:scale-95 md:inline-block"
          >
            <span className="absolute inset-0 -translate-x-full bg-linear-to-l from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            <span className="relative">درخواست مشاوره</span>
          </NavLink>
        </div>

        {/* =====================================================
            MOBILE MENU
        ===================================================== */}
        <div
          className={`overflow-hidden bg-gray-800/95 backdrop-blur-xl transition-[max-height] duration-500 ease-in-out md:hidden ${
            mobileOpen ? "max-h-[80vh]" : "max-h-0"
          }`}
        >
          <ul dir="rtl" className="flex flex-col px-3 py-3">
            {navLinks.map((item) => (
              <li
                key={item.id}
                className="overflow-hidden rounded-xl transition-colors duration-300 hover:bg-white/5"
              >
                <div className="flex items-center justify-between">
                  <NavLink
                    to={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={({ isActive }) =>
                      `flex-1 px-5 py-4 text-[13px] font-medium transition ${
                        isActive ? "text-[#d4af5a]" : "text-white/85"
                      }`
                    }
                    end={!item.hasDropdown}
                  >
                    {item.label}
                  </NavLink>

                  {item.hasDropdown && (
                    <button
                      type="button"
                      className={`flex h-9 w-9 items-center justify-center rounded-lg transition-all duration-300 ${
                        mobileExpanded === item.id
                          ? "bg-[#b08b38]/20 text-[#d4af5a]"
                          : "text-white/70 hover:bg-white/10"
                      }`}
                      onClick={() =>
                        setMobileExpanded((prev) =>
                          prev === item.id ? null : item.id
                        )
                      }
                      aria-label="باز کردن زیرمنو"
                      aria-expanded={mobileExpanded === item.id}
                    >
                      <IoIosArrowDown
                        size={14}
                        className={`transition-transform duration-300 ${
                          mobileExpanded === item.id ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                  )}
                </div>

                {item.hasDropdown && item.children && (
                  <ul
                    className={`overflow-hidden transition-[max-height] duration-500 ease-in-out ${
                      mobileExpanded === item.id ? "max-h-96" : "max-h-0"
                    }`}
                  >
                    {item.children.map((child) => (
                      <NavLink
                        key={child.href}
                        to={child.href}
                        onClick={() => setMobileOpen(false)}
                        className="relative block px-9 py-3 text-right text-[12px] text-white/60 transition-colors duration-300 hover:text-[#d4af5a]"
                      >
                        <span className="absolute right-6 top-1/2 h-1 w-1 -translate-y-1/2 rounded-full bg-[#d4af5a]/60" />
                        {child.label}
                      </NavLink>
                    ))}
                  </ul>
                )}
              </li>
            ))}

            <li className="mt-3">
              <NavLink
                to="/consult"
                onClick={() => setMobileOpen(false)}
                className="group relative block w-full overflow-hidden rounded-xl bg-linear-to-l from-[#b08b38] to-[#d4af5a] px-5 py-3.5 text-center text-[12px] font-bold text-white shadow-lg shadow-[#b08b38]/25 transition-all duration-300 active:scale-95"
              >
                <span className="absolute inset-0 -translate-x-full bg-linear-to-l from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                <span className="relative">درخواست مشاوره</span>
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}