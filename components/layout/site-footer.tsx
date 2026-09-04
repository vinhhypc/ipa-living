import Link from "next/link";
import { Mail, MapPin, Phone, ShoppingBag } from "lucide-react";

import { routes } from "@/lib/routes";
import {
  FacebookIcon,
  LinkedinIcon,
  YoutubeIcon,
} from "@/components/icons/social-icons";
import { IpaLivingMark } from "@/components/brand/ipaliving-mark";

const ECOSYSTEM_LINKS = [
  { href: routes.veIpaLiving, label: "Về IPA Living" },
  { href: routes.sucKhoe, label: "Anvie — Sức khỏe & Đời sống" },
  { href: routes.thinhVuong, label: "VNDGO — Đầu tư & Đời sống" },
  { href: routes.baoAn, label: "PTICare — Bảo hiểm & Đời sống" },
];

const DSTATION_LINKS = [
  { href: `${routes.diemCham}#dstation`, label: "Tọa độ kết nối" },
  { href: `${routes.diemCham}#workshop`, label: "Workshop & Sự kiện" },
  { href: routes.triThuc, label: "Tri thức Wellbeing" },
];

const DONE_LINKS = [
  { href: `${routes.dOne}#member`, label: "Đăng ký thành viên" },
  { href: `${routes.dOne}#supplier`, label: "Đăng ký nhà cung cấp" },
];

const DCARE_LINKS = [
  { href: routes.dCare, label: "Chuyên gia & Đặt lịch" },
  { href: routes.tuyenDungCa, label: "Gia nhập đội ngũ" },
];

const SOCIALS = [
  { label: "Facebook", Icon: FacebookIcon },
  { label: "LinkedIn", Icon: LinkedinIcon },
  { label: "YouTube", Icon: YoutubeIcon },
];

export function SiteFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      id="main-footer"
      className="border-t border-brand-navy-light bg-brand-navy pb-8 pt-14 font-sans text-white"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
          {/* Brand + contact */}
          <div className="space-y-4 sm:col-span-2 lg:col-span-2">
            <Link
              href={routes.home}
              className="inline-flex items-center rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
            >
              <IpaLivingMark
                aria-label="IPA Living"
                role="img"
                className="h-14 w-auto shrink-0 -translate-y-3"
              />
            </Link>

            <p className="max-w-sm text-xs leading-relaxed text-white/80">
              Người bạn đồng hành cho cuộc sống trọn vẹn — Kết nối Thân khỏe
              (Anvie), Tài chính vững vàng (VNDGO) và Bình an tâm trí (PTICare).
            </p>

            <div className="space-y-2 text-xs text-white">
              <p className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-gold" />
                <span>
                  Số 1 Nguyễn Thượng Hiền, P. Nguyễn Du, Q. Hai Bà Trưng, Hà Nội
                </span>
              </p>
              <p className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 shrink-0 text-brand-gold" />
                <span>1900 5454 09 (Tổng đài hỗ trợ toàn quốc)</span>
              </p>
              <p className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 shrink-0 text-brand-gold" />
                <span>contact@ipaliving.vn</span>
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <a
                href="https://homefood.com.vn"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-xl bg-brand-gold px-3.5 py-1.5 text-xs font-bold text-white shadow-sm transition-all hover:bg-brand-gold-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
              >
                <ShoppingBag className="h-3.5 w-3.5 transition-transform group-hover:scale-110" />
                <span>Cửa hàng Homefood</span>
              </a>

              <div className="flex items-center gap-2">
                {SOCIALS.map(({ label, Icon }) => (
                  <a
                    key={label}
                    href="#"
                    aria-label={label}
                    className="rounded-xl bg-white/5 p-2 text-white transition-colors hover:bg-brand-gold hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
                  >
                    <Icon className="h-3.5 w-3.5" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <FooterColumn title="Về IPA Living" links={ECOSYSTEM_LINKS} />
          <FooterColumn title="Dstation" links={DSTATION_LINKS} />
          <FooterColumn title="D-One" links={DONE_LINKS} />
          <FooterColumn title="D-Care" links={DCARE_LINKS} />
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/5 pt-6 text-xs text-white/70 md:flex-row">
          <p>
            &copy; {currentYear} IPA Living. Toàn bộ nội dung và quyền sở hữu
            được bảo lưu.
          </p>
          <div className="flex gap-6">
            <a href="#" className="transition-colors hover:text-white">
              Điều khoản dịch vụ
            </a>
            <a href="#" className="transition-colors hover:text-white">
              Chính sách bảo mật
            </a>
            <a href="#" className="transition-colors hover:text-white">
              Quy chế hoạt động
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { href: string; label: string }[];
}) {
  return (
    <div>
      <h4 className="mb-4 border-b border-white/10 pb-2 font-display text-xs font-bold uppercase tracking-widest text-white">
        {title}
      </h4>
      <ul className="space-y-2.5 text-xs text-white">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="rounded transition-colors hover:text-brand-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
