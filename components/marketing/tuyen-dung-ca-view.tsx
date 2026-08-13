import Image from "next/image";
import { Users } from "lucide-react";

import { localImage } from "@/lib/images";
import { RegistrationForm } from "@/components/marketing/registration-form";

const PILLARS = [
  {
    no: "01",
    tone: "bg-emerald-50 text-emerald-600",
    title: "Đào Tạo Đa Trụ Cột",
    desc: "Được tiếp thu có hệ thống tri thức Y học lối sống (AnVie), Quản trị gia sản (VNDIRECT) và Bảo vệ phòng vệ (PTI).",
  },
  {
    no: "02",
    tone: "bg-amber-50 text-amber-600",
    title: "Trạm Dstation Sang Trọng",
    desc: "Làm việc tại môi trường Dstation tiêu chuẩn 5 sao, tiếp đón khách hàng và tổ chức các workshop chuyên đề đẳng cấp.",
  },
  {
    no: "03",
    tone: "bg-blue-50 text-blue-600",
    title: "Thu Nhập Vượt Trội",
    desc: "Lương cứng cạnh tranh, cơ chế thưởng kinh doanh mở rộng không giới hạn cùng chính sách chăm sóc sức khỏe toàn diện.",
  },
  {
    no: "04",
    tone: "bg-purple-50 text-purple-600",
    title: "Thăng Tiến Rõ Ràng",
    desc: "Lộ trình sự nghiệp minh bạch từ Client Advisor lên Trưởng nhóm, Giám đốc Trạm Dstation hoặc Chuyên gia tư vấn cao cấp.",
  },
];

const TESTIMONIALS = [
  {
    tag: "CA Senior — Dstation Hà Nội",
    tagTone: "text-brand-green",
    quote:
      "Tôi tìm thấy giá trị công việc đích thực khi làm Bạn Đồng Hành tại IPA Living",
    body: "Từ một chuyên viên tư vấn tài chính truyền thống, khi gia nhập đội ngũ CA của IPA Living, tôi được đào tạo mở rộng kiến thức về Y học lối sống AnVie và Bảo hiểm PTI. Giờ đây tôi tự tin giúp khách hàng vừa tích sản kỷ luật vừa phòng vệ sức khỏe toàn diện.",
    name: "Anh Nguyễn Hải Nam",
    role: "Chuyên viên Client Advisor (Gia nhập 2023)",
    avatar: localImage(
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100",
    ),
  },
  {
    tag: "CA Team Lead — Dstation TP.HCM",
    tagTone: "text-brand-gold-dark",
    quote:
      "Không gian Dstation & Văn hóa gieo hạt là bệ phóng sự nghiệp tuyệt vời",
    body: "Môi trường làm việc chuyên nghiệp tại các Trạm Dstation giúp tôi dễ dàng tiếp đón khách hàng và tổ chức các buổi chia sẻ tài chính - sức khỏe. Thu nhập của tôi đã tăng gấp 3 lần sau 2 năm gắn bó cùng cơ hội quản lý nhóm CA trẻ trung đầy nhiệt huyết.",
    name: "Chị Lê Minh Anh",
    role: "Trưởng nhóm Client Advisor (Gia nhập 2022)",
    avatar: localImage(
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=100",
    ),
  },
];

export function TuyenDungCaView() {
  return (
    <div className="min-h-screen bg-neutral-50 pb-20 font-sans">
      <section className="relative overflow-hidden bg-gradient-to-b from-brand-navy via-brand-navy-light to-brand-navy py-16 text-white sm:py-24">
        <div className="bg-glow-gold-center pointer-events-none absolute inset-0" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <span className="mb-4 inline-flex items-center rounded-full border border-brand-gold/20 bg-brand-gold/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-brand-gold">
            <Users className="mr-1.5 h-3.5 w-3.5" /> Cơ hội nghề nghiệp &amp;
            Phát triển sự nghiệp
          </span>
          <h1 className="mx-auto mb-6 max-w-4xl font-display text-3xl font-black leading-tight text-white sm:text-4xl lg:text-5xl">
            Tuyển Dụng Đội Ngũ Đồng Hành{" "}
            <span className="text-brand-gold">(Client Advisor - CA)</span>
          </h1>
          <p className="mx-auto max-w-3xl text-sm font-light leading-relaxed text-slate-300 sm:text-base md:text-lg">
            Hệ sinh thái IPA Living liên tục chiêu mộ các nhân sự tâm huyết, am
            hiểu và khao khát phát triển sự nghiệp để trở thành những Bạn Đồng
            Hành (CA) chuyên nghiệp — lực lượng nòng cốt thiết kế bản đồ Wellbeing
            bền vững cho hàng triệu gia đình Việt.
          </p>
        </div>
      </section>

      <div className="relative z-20 mx-auto -mt-8 max-w-7xl space-y-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PILLARS.map((pillar) => (
            <div
              key={pillar.no}
              className="rounded-2xl border border-neutral-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <span
                className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl text-xl font-bold ${pillar.tone}`}
              >
                {pillar.no}
              </span>
              <h2 className="mb-2 font-display text-base font-bold text-brand-navy">
                {pillar.title}
              </h2>
              <p className="text-xs font-light leading-relaxed text-neutral-500">
                {pillar.desc}
              </p>
            </div>
          ))}
        </div>

        <div className="mx-auto max-w-5xl space-y-6">
          <div className="text-center">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-gold">
              Chia sẻ từ đội ngũ
            </span>
            <h2 className="mt-1 font-display text-2xl font-bold text-brand-navy">
              Trải Nghiệm Phát Triển Sự Nghiệp Của Nhân Sự CA
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {TESTIMONIALS.map((item) => (
              <figure
                key={item.name}
                className="flex flex-col justify-between rounded-3xl border border-neutral-100 bg-white p-6 shadow-md md:p-8"
              >
                <div className="space-y-4">
                  <figcaption
                    className={`text-xs font-semibold uppercase tracking-wider ${item.tagTone}`}
                  >
                    {item.tag}
                  </figcaption>
                  <blockquote className="font-display text-lg font-bold text-neutral-800">
                    {`“${item.quote}”`}
                  </blockquote>
                  <p className="text-xs font-light leading-relaxed text-neutral-600">
                    {`“${item.body}”`}
                  </p>
                </div>
                <div className="mt-6 flex items-center gap-3 border-t border-neutral-50 pt-4">
                  <Image
                    src={item.avatar}
                    alt={item.name}
                    width={40}
                    height={40}
                    className="h-10 w-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-xs font-bold text-neutral-800">
                      {item.name}
                    </p>
                    <p className="text-xs uppercase text-neutral-500">
                      {item.role}
                    </p>
                  </div>
                </div>
              </figure>
            ))}
          </div>
        </div>

        <div id="registration-form-anchor" className="mx-auto max-w-5xl pt-4">
          <RegistrationForm />
        </div>
      </div>
    </div>
  );
}
