"use client";
import {
  FaInstagram,
  FaLinkedinIn,
  FaFacebookF,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6";
import clsx from "clsx";
export default function FooterSection({ footerData, quickLinks, socialLinks, loading }) {
  const socialIcons = {
    instagram: FaInstagram,
    linkedin: FaLinkedinIn,
    facebook: FaFacebookF,
    twitter: FaXTwitter,
    youtube: FaYoutube,
  };
  
  return (
    <footer className="relative pt-28 pb-20 bg-[#f6f4ef] border-t border-black/10" id="footer__section">
      <div className="max-w-7xl mx-auto px-8 grid lg:grid-cols-3 gap-24">
        {/* LEFT BRAND */}
        <div>
          <span className="text-xs uppercase tracking-[0.35em] text-indigo-600">
            {footerData?.footer_brand_name}
          </span>

          <h2 className="mt-6 text-4xl font-semibold text-[#111] tracking-tight">
            {footerData?.footer_brand_name_left} <span className="text-indigo-600">{footerData?.footer_brand_name_right}</span>
          </h2>

          <div className="w-16 h-[1px] bg-black/30 mt-8"></div>

          <p className="mt-8 text-sm text-[#555] leading-relaxed max-w-sm">
            {footerData?.copyright_description || "Crafted with care by Frontier Insights Team."}
          </p>
        </div>

        {/* SOCIAL + CONTACT */}
        <div>
          <h3 className="text-lg font-semibold text-[#111] uppercase tracking-widest">
            Social
          </h3>

          <div className="w-12 h-[1px] bg-black/30 mt-4 mb-8"></div>

          <div className="flex gap-5">
            {socialLinks?.map((link, i) => {
              const Icon = socialIcons[link?.platform];
              if (!Icon || !link?.url) return null; // Skip if no matching icon or missing URL
              return (
                <a
                  key={i}
                  href={link?.url}
                  className={clsx(
                    "w-12 h-12 rounded-full border border-black/20 flex items-center justify-center text-[#111] hover:bg-[#111] hover:text-white transition duration-300"
                  )}
                >
                  <Icon size={14} />
                </a>
              );
            })}
          </div>

          <div className="mt-10 text-sm text-[#555] space-y-3">
            <p>
              Reach us at{" "}
              <a
                href={`mailto:${footerData?.contact_email}`}
                className="text-indigo-600 hover:underline"
              >
                {footerData?.contact_email}
              </a>
            </p>
          </div>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h3 className="text-lg font-semibold text-[#111] uppercase tracking-widest">
            Explore
          </h3>

          <div className="w-12 h-[1px] bg-black/30 mt-4 mb-8"></div>

          <div className="grid grid-cols-2 gap-y-4 text-sm text-[#555]">
            {quickLinks?.map((item, i) => (
              <a
                key={i}
                href={item.href}
                className="relative w-fit hover:text-[#111] transition duration-300 group cursor-pointer"
              >
                {item.name}
                <span className="absolute left-0 -bottom-1 h-[1px] w-0 bg-[#111] transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-20 border-t border-black/10 pt-8 text-center text-xs text-[#666] tracking-wide">
        {footerData?.footer_micro_label || "Crafted with care by Frontier Insights Team."}
      </div>

      {/* Scroll To Top */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-8 right-8 w-12 h-12 rounded-full bg-[#111]/20 text-white shadow-xl hover:bg-[#111] hover:scale-105 transition duration-300 flex items-center justify-center"
      >
        ↑
      </button>
    </footer>
  );
}
