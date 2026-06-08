import { client } from "@/lib/sanity";
import portfolioData from "@/data/portfolioData.json";
import cvData from "@/data/cvFullData.json";
import { PortfolioData } from "@/types/portfolio";
import DossierAccordion from "@/components/DossierAccordion";
import SaveContactsButton from "@/components/SaveContactsButton";
import {
  Download,
  MapPin,
  Mail,
  Phone,
  ExternalLink,
  Activity,
  Lock,
  Award,
  User,
} from "lucide-react";

/* ─────────────────────────────────────────────────────────────
   Sanity GROQ Data Pipeline
───────────────────────────────────────────────────────────── */
async function getProfileData() {
  if (!client) return null; // guard: project ID not yet configured
  try {
    return await client.fetch(
      `*[_type == "profile"][0]{name, title, biography, whatsappLink}`
    );
  } catch {
    return null; // graceful fallback on network/GROQ errors
  }
}

/* ─────────────────────────────────────────────────────────────
   Brand SVG Icons
───────────────────────────────────────────────────────────── */
const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const WhatsAppIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.704 1.459h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

/* ─────────────────────────────────────────────────────────────
   Sub-components
───────────────────────────────────────────────────────────── */

/** Thin horizontal rule with a faint glow */
const Rule = () => (
  <div className="w-full h-px bg-gradient-to-r from-transparent via-zinc-300/80 to-transparent my-8" />
);

/** Pill label */
const Label = ({ text }: { text: string }) => (
  <p className="font-mono text-[9px] tracking-[0.22em] uppercase text-zinc-500 mb-3">
    {text}
  </p>
);

/* ─────────────────────────────────────────────────────────────
   Page — Async Server Component
───────────────────────────────────────────────────────────── */
export default async function Page() {
  // ── Static fallback data (local JSON) ──
  const staticData: PortfolioData = portfolioData;
  const { profile: staticProfile, metrics, credentials, links, certifications, styledCertifications, professionalReferences } = staticData;

  // ── Live data from Sanity CMS (falls back gracefully if null) ──
  const sanityProfile = await getProfileData();

  // ── Resolved values: Sanity takes priority, JSON is the fallback ──
  const name        = sanityProfile?.name        ?? staticProfile.name;
  const title       = sanityProfile?.title       ?? staticProfile.title;
  const biography   = sanityProfile?.biography   ?? staticProfile.bio;
  const whatsappLink = sanityProfile?.whatsappLink ??
    "https://wa.me/256771286134?text=Hello%20Christian,%20I%20viewed%20your%20portfolio%20and%20would%20like%20to%20connect%20regarding%20a%20systems/networks%20initiative.";

  return (
    <div
      className="min-h-screen text-zinc-700 font-sans selection:bg-blue-200/40 selection:text-zinc-900"
      style={{
        background:
          "radial-gradient(ellipse 120% 80% at 0% 0%, rgba(219,234,254,0.55) 0%, rgba(250,250,250,0.97) 40%, rgba(254,243,199,0.3) 100%), #fafafa",
      }}
    >
      {/* ══════════════════════════════════════════
          TOP NAV BAR
      ══════════════════════════════════════════ */}
      <header className="sticky top-0 z-50 border-b border-blue-100/60 bg-white/85 backdrop-blur-2xl shadow-sm shadow-blue-50/40">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between gap-6">

          {/* Logo mark */}
          <a href="#" className="flex items-center gap-3 group flex-shrink-0" aria-label="Home">
            <span className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-brand-indigo to-brand-pink p-px shadow-sm">
              <span className="w-full h-full rounded-[10px] bg-white flex items-center justify-center text-xs font-mono font-bold text-zinc-800">
                CK
              </span>
            </span>
            <span className="font-sans text-sm font-bold tracking-wide text-zinc-800 group-hover:text-brand-indigo transition-colors">
              Christian Kazi
            </span>
          </a>

          {/* Nav links */}
          <nav className="hidden md:flex items-center gap-1" aria-label="Primary navigation">
            {["About", "Metrics", "Credentials", "Contact"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="px-4 py-2 rounded-lg text-sm font-medium text-zinc-600 hover:text-blue-600 hover:bg-blue-50 transition-all duration-150"
              >
                {item}
              </a>
            ))}
          </nav>

          {/* Email CTA */}
          <a
            href={`mailto:${staticProfile.email}`}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-indigo-600 hover:to-blue-700 transition-all duration-200 shadow-sm shadow-blue-200/50"
          >
            Email Me
          </a>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 pb-28">

        {/* ══════════════════════════════════════════
            HERO — Floated Portrait + Contour Text
        ══════════════════════════════════════════ */}
        <section id="about" className="pt-10 pb-0 scroll-mt-20 animate-fade-up">
          <div className="w-full max-w-5xl mx-auto pb-4 relative flow-root">

            {/* ── Portrait (Floated on Desktop, Block/Centered on Mobile) ── */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/tshibaza-kazi-christian-it-specialist.png"
              alt="H.E. Tshibaza Kazi Christian - Systems and Network Specialist Portfolio Photo"
              className="block w-52 sm:w-60 md:w-80 lg:w-[26rem] h-auto mx-auto md:mx-0 md:float-left md:mr-10 mb-6 md:mb-4 object-contain md:[shape-outside:url(/assets/tshibaza-kazi-christian-it-specialist.png)] md:[shape-margin:1.5rem] select-none"
              style={{
                filter: "drop-shadow(8px 12px 16px rgba(0,0,0,0.06)) drop-shadow(0 0 3px rgba(255,255,255,0.95)) drop-shadow(0 0 8px rgba(228,228,231,0.5))",
                WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 88%, rgba(0,0,0,0) 100%)",
                maskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 88%, rgba(0,0,0,0) 100%)",
              }}
            />

            {/* Spacer to push text content down to align nicely next to the photo silhouette (desktop only) */}
            <div className="hidden md:block md:h-20 lg:h-32" aria-hidden="true" />

            {/* Name */}
            <h1 className="text-zinc-900 text-3xl md:text-[2.6rem] font-extrabold tracking-tight leading-tight mb-2 text-center md:text-left font-heading">
              {name}
            </h1>

            {/* Title */}
            <p className="text-zinc-500 text-xs md:text-sm font-bold tracking-widest uppercase mb-3 text-center md:text-left font-sans">
              {title}
            </p>

            {/* Location row */}
            <div className="flex items-center justify-center md:justify-start gap-1.5 text-zinc-500 text-sm font-medium mb-4 font-sans">
              <MapPin className="w-4 h-4 flex-shrink-0" />
              {staticProfile.location}
            </div>

            {/* Status badge */}
            <div className="flex justify-center md:justify-start mb-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-brand-emerald/25 bg-brand-emerald/8 text-xs font-medium text-brand-emerald tracking-wide shadow-sm font-mono">
                <Activity className="w-3.5 h-3.5 animate-thin-pulse" />
                {staticProfile.status}
              </div>
            </div>

            {/* Biography / Executive Focus */}
            <p className="font-mono text-[9px] tracking-[0.22em] uppercase text-blue-400 mb-2 mt-4 text-center md:text-left">
              Executive Focus
            </p>
            <p className="text-base md:text-lg text-zinc-700 font-sans font-medium leading-relaxed text-left md:text-justify">
              {biography}
            </p>

          </div>
        </section>

        <Rule />

        {/* ══════════════════════════════════════════
            BUSINESS CARD — Glass container
        ══════════════════════════════════════════ */}
        <section id="contact" className="scroll-mt-20 animate-fade-up">
          <Label text="01. Digital Business Card" />

          <div className="relative rounded-2xl overflow-hidden">
            {/* Iridescent glow ring */}
            <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-br from-blue-300/50 via-violet-200/30 to-amber-200/50 blur-[2px] pointer-events-none" />
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-100/20 via-transparent to-amber-100/20 pointer-events-none" />

            <div
              className="relative rounded-2xl border border-white/80 p-7 sm:p-9 shadow-2xl shadow-blue-100/40"
              style={{
                background: "rgba(255,255,255,0.82)",
                backdropFilter: "blur(20px)",
              }}
            >
              {/* Card header row */}
              <div className="flex items-start justify-between flex-wrap gap-4 mb-7">
                <div className="space-y-1">
                  <p className="text-zinc-900 text-lg font-bold tracking-tight font-heading">{name}</p>
                  <p className="text-zinc-500 text-sm font-mono">{title}</p>
                </div>
                {/* Corner monogram */}
                <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-indigo to-brand-pink p-px flex-shrink-0">
                  <span className="w-full h-full rounded-xl bg-white flex items-center justify-center text-[11px] font-mono font-bold text-zinc-800">
                    CK
                  </span>
                </span>
              </div>

              {/* Contact detail rows */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                {[
                  {
                    icon: Mail,
                    label: "Email",
                    value: staticProfile.email,
                    href: `mailto:${staticProfile.email}`,
                    hoverClass: "hover:border-blue-200 hover:bg-blue-50/70",
                    iconColor: "text-zinc-400 group-hover:text-blue-600",
                    iconBg: "group-hover:bg-blue-100",
                  },
                  {
                    icon: WhatsAppIcon,
                    label: "WhatsApp",
                    value: staticProfile.phone,
                    href: whatsappLink,
                    hoverClass: "hover:border-emerald-200 hover:bg-emerald-50/70",
                    iconColor: "text-zinc-400 group-hover:text-emerald-600",
                    iconBg: "group-hover:bg-emerald-100",
                  },
                  ...(staticProfile.secondaryPhone
                    ? [
                        {
                          icon: Phone,
                          label: "Secondary Phone",
                          value: staticProfile.secondaryPhone,
                          href: `tel:${staticProfile.secondaryPhone}`,
                          hoverClass: "hover:border-blue-200 hover:bg-blue-50/70",
                          iconColor: "text-zinc-400 group-hover:text-blue-600",
                          iconBg: "group-hover:bg-blue-100",
                        },
                      ]
                    : []),
                  {
                    icon: MapPin,
                    label: "Location",
                    value: staticProfile.location,
                    href: "#",
                    hoverClass: "hover:border-amber-200 hover:bg-amber-50/70",
                    iconColor: "text-zinc-400 group-hover:text-amber-600",
                    iconBg: "group-hover:bg-amber-100",
                  },
                ].map(({ icon: Icon, label, value, href, hoverClass, iconColor, iconBg }) => (
                  <a
                    key={label}
                    href={href}
                    target={label === "WhatsApp" ? "_blank" : undefined}
                    rel={label === "WhatsApp" ? "noopener noreferrer" : undefined}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl bg-blue-50/40 border border-blue-100/60 transition-all duration-200 group shadow-sm ${hoverClass}`}
                  >
                    <span className={`w-8 h-8 rounded-lg bg-white flex items-center justify-center flex-shrink-0 transition-colors border border-blue-100 shadow-sm ${iconBg}`}>
                      <Icon className={`w-4 h-4 transition-colors ${iconColor}`} />
                    </span>
                    <div className="min-w-0">
                      <p className="text-[10px] font-mono uppercase tracking-wider text-zinc-500">{label}</p>
                      <p className="text-zinc-700 text-sm font-mono truncate">{value}</p>
                    </div>
                  </a>
                ))}
              </div>

              {/* Action buttons row */}
              <div className="flex flex-wrap gap-3">
                {/* Primary — Save to Contacts */}
                <SaveContactsButton />

                {/* LinkedIn */}
                <a
                  href={links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  id="link-linkedin"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-xs font-mono uppercase tracking-widest border border-blue-100 bg-white/90 text-zinc-600 hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 active:scale-[0.97] shadow-sm"
                >
                  <LinkedinIcon className="w-3.5 h-3.5" />
                  LinkedIn
                </a>

                {/* GitHub */}
                <a
                  href={links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  id="link-github"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-xs font-mono uppercase tracking-widest border border-zinc-200 bg-white/90 text-zinc-600 hover:border-zinc-400 hover:text-zinc-900 hover:bg-zinc-50 transition-all duration-200 active:scale-[0.97] shadow-sm"
                >
                  <GithubIcon className="w-3.5 h-3.5" />
                  GitHub
                </a>

                {/* CV */}
                <a
                  href={links.cvUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  id="link-cv"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-xs font-mono uppercase tracking-widest border border-amber-100 bg-white/90 text-zinc-600 hover:border-amber-400 hover:text-amber-600 hover:bg-amber-50 transition-all duration-200 active:scale-[0.97] shadow-sm"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  Résumé
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            PROFESSIONAL DOSSIER — Accordion (Client Component)
        ══════════════════════════════════════════ */}
        <DossierAccordion
          professionalProfile={cvData.professionalProfile}
          workExperience={cvData.workExperience}
          education={cvData.education}
          leadership={cvData.leadership}
          languages={cvData.languages}
        />

        {/* ══════════════════════════════════════════
            CREDENTIALS VAULT
        ══════════════════════════════════════════ */}
        {certifications && (
          <section id="credentials-vault" className="scroll-mt-20 mt-4">
            <div className="relative rounded-2xl overflow-hidden">
              {/* Iridescent border glow */}
              <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-br from-blue-200/40 via-violet-100/30 to-amber-100/40 blur-[2px] pointer-events-none" />

              <div
                className="relative rounded-2xl border border-white/80 p-7 sm:p-9 shadow-xl shadow-blue-50/40"
                style={{ background: "rgba(255,255,255,0.84)", backdropFilter: "blur(18px)" }}
              >
                {/* Header */}
                <div className="flex items-center gap-3 mb-6">
                  <span className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-sm flex-shrink-0">
                    <Award className="w-4 h-4 text-white" />
                  </span>
                  <div>
                    <p className="text-base font-bold text-zinc-900 tracking-tight">
                      Verified Technical Credentials
                    </p>
                    <p className="text-sm text-zinc-500">
                      Active Foundations · Strategic Vectors
                    </p>
                  </div>
                </div>

                {/* Two-column grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-7">

                  {/* Left — Completed / Active Foundations */}
                  <div>
                    <p className="text-sm font-mono uppercase tracking-widest text-blue-400 mb-3">
                      ✓ Active Foundations
                    </p>
                    <div className="space-y-2.5">
                      {certifications.completed.map((cert, i) => (
                        <div
                          key={i}
                          className="flex items-start justify-between gap-3 bg-white shadow-sm border border-zinc-200/60 px-4 py-3 rounded-xl group hover:border-blue-200 hover:shadow-md transition-all duration-200"
                        >
                          <div className="min-w-0">
                            <p className="text-base font-bold text-zinc-900 leading-snug font-heading">
                              {cert.name}
                            </p>
                            <p className="text-sm text-zinc-500">{cert.issuer}</p>
                          </div>
                          {cert.verified && (
                            <span className="flex-shrink-0 mt-0.5 inline-flex items-center gap-1 text-sm font-mono text-emerald-600 bg-emerald-50 border border-emerald-100 px-2.5 py-0.5 rounded-full">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                              Verified
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right — In-Progress / Strategic Vectors */}
                  <div>
                    <p className="text-sm font-mono uppercase tracking-widest text-amber-500 mb-3">
                      ⟳ Strategic Vectors
                    </p>
                    <div className="space-y-2.5">
                      {certifications.inProgress.map((cert, i) => (
                        <div
                          key={i}
                          className="flex items-start justify-between gap-3 bg-blue-50/50 border border-blue-100 px-4 py-3 rounded-xl group hover:border-blue-300 hover:bg-blue-50 transition-all duration-200"
                        >
                          <div className="min-w-0">
                            <p className="text-base text-blue-700 font-bold leading-snug font-heading">
                              {cert.name}
                            </p>
                          </div>
                          <span className="flex-shrink-0 mt-0.5 inline-flex items-center gap-1 text-sm font-mono text-amber-600 bg-amber-50 border border-amber-100 px-2.5 py-0.5 rounded-full whitespace-nowrap">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                            {cert.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Download bundle CTA */}
                <div className="border-t border-zinc-100 pt-5">
                  <a
                    href={certifications.verificationBundleUrl}
                    download
                    className="inline-flex items-center gap-2.5 px-5 py-3 rounded-xl text-sm font-mono uppercase tracking-widest border border-zinc-200 bg-white text-zinc-700 hover:border-blue-300 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 active:scale-[0.97] shadow-sm"
                  >
                    <Download className="w-4 h-4" />
                    Download Verification Bundle (.ZIP)
                  </a>
                </div>
              </div>
            </div>
          </section>
        )}

        <Rule />

        {/* ══════════════════════════════════════════
            METRICS GRID
        ══════════════════════════════════════════ */}
        <section id="metrics" className="scroll-mt-20 animate-fade-up">
          <Label text="02. Enterprise Metrics" />
          <h2 className="text-zinc-900 text-2xl font-bold tracking-tight mb-7 font-heading">
            Infrastructure at Scale
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {metrics.map((metric, index) => (
              <div
                key={index}
                className="relative rounded-xl border border-blue-100/60 bg-white/80 p-6 overflow-hidden group hover:border-blue-200 hover:bg-white hover:shadow-md hover:shadow-blue-100/30 transition-all duration-300 shadow-sm"
              >
                {/* Iridescent glow on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/0 to-amber-50/0 group-hover:from-blue-50/60 group-hover:to-amber-50/40 transition-all duration-500 pointer-events-none rounded-xl" />

                <p className="font-mono text-sm tracking-[0.2em] uppercase text-blue-400 mb-3">
                  {String(index + 1).padStart(2, "0")} / Stat
                </p>
                <p className="text-zinc-900 text-xl font-extrabold tracking-tight mb-1.5 font-heading">
                  {metric.value}
                </p>
                <p className="text-zinc-600 text-sm leading-relaxed font-mono">
                  {metric.label}
                </p>
              </div>
            ))}
          </div>
        </section>

        <Rule />

        {/* ══════════════════════════════════════════
            CREDENTIALS VAULT
        ══════════════════════════════════════════ */}
        <section id="credentials" className="scroll-mt-20 animate-fade-up">
          <Label text="03. Credentials" />
          <h2 className="text-zinc-900 text-2xl font-bold tracking-tight mb-7 font-heading">
            Certifications &amp; Expertise
          </h2>

          {/* Branded dynamic capsules from styledCertifications JSON */}
          {styledCertifications && styledCertifications.length > 0 ? (
            <div className="flex flex-wrap gap-3">
              {styledCertifications.map((cert) => (
                <span
                  key={cert.name}
                  className={`inline-flex items-center gap-2 border px-5 py-2.5 rounded-full text-base font-bold shadow-sm hover:shadow-md transition-all duration-200 font-heading ${cert.badgeClass}`}
                >
                  <span className="w-2 h-2 rounded-full bg-current opacity-60 flex-shrink-0" />
                  {cert.name}
                </span>
              ))}
            </div>
          ) : (
            /* Fallback to plain credential strings */
            <div className="flex flex-wrap gap-2.5">
              {credentials.map((cred) => (
                <span
                  key={cred}
                  className="inline-flex items-center gap-1.5 bg-white border border-violet-100 text-zinc-700 text-sm font-mono tracking-wide px-4 py-2 rounded-full hover:border-violet-300 hover:text-violet-700 hover:bg-violet-50 hover:shadow-sm shadow-sm transition-all duration-200"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-violet-400 flex-shrink-0" />
                  {cred}
                </span>
              ))}
            </div>
          )}
        </section>

        <Rule />

        {/* ══════════════════════════════════════════
            PROFESSIONAL ENDORSEMENTS
        ══════════════════════════════════════════ */}
        {professionalReferences && professionalReferences.length > 0 && (
          <section id="endorsements" className="scroll-mt-20 animate-fade-up">
            <Label text="04. Endorsements" />
            <h2 className="text-zinc-900 text-2xl font-bold tracking-tight mb-7 font-heading">
              Professional Endorsements
            </h2>

            {/* References 3-column responsive grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-9">
              {professionalReferences.map((ref, i) => (
                <div
                  key={i}
                  className="relative bg-white/90 border border-zinc-200 shadow-sm p-6 rounded-xl overflow-hidden group hover:shadow-md hover:border-zinc-300 transition-all duration-300"
                >
                  {/* Iridescent top accent bar */}
                  <div className="absolute top-0 inset-x-0 h-[3px] bg-gradient-to-r from-blue-400 via-violet-400 to-amber-300 opacity-70 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Avatar icon */}
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-50 to-violet-50 border border-blue-100 flex items-center justify-center mb-4 shadow-sm">
                    <User className="w-5 h-5 text-blue-400" />
                  </div>

                  <p className="text-lg font-extrabold text-zinc-900 leading-snug font-heading">{ref.name}</p>
                  <p className="text-base text-zinc-600 font-medium mt-1">{ref.title}</p>
                  <p className="text-base text-zinc-500 font-medium mt-0.5">{ref.institution}</p>
                </div>
              ))}
            </div>

            {/* Secure contact CTA */}
            <div className="flex justify-center">
              <a
                href="mailto:bawizchris@gmail.com?subject=Reference%20Contact%20Verification%20Request"
                id="btn-reference-contact"
                className="group inline-flex items-center gap-3 px-8 py-4 rounded-2xl text-sm font-mono uppercase tracking-widest text-white bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-900 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.35)] hover:shadow-[0_8px_32px_-4px_rgba(99,102,241,0.45)] hover:from-indigo-700 hover:via-blue-700 hover:to-indigo-800 transition-all duration-300 active:scale-[0.97]"
              >
                <span className="w-8 h-8 rounded-lg bg-white/15 flex items-center justify-center flex-shrink-0 group-hover:bg-white/25 transition-colors duration-200">
                  <Lock className="w-4 h-4" />
                </span>
                Request Direct Contact Access
                <span className="hidden sm:inline text-white/60 font-sans normal-case tracking-normal text-xs">
                  — Verified Inquiries Only
                </span>
              </a>
            </div>
          </section>
        )}

      </main>

      {/* ══════════════════════════════════════════
          FOOTER
      ══════════════════════════════════════════ */}
      <footer className="border-t border-blue-100/50 py-8 bg-white/60 backdrop-blur-sm">
        <div className="max-w-3xl mx-auto px-6 flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-zinc-500">
          <span>
            &copy; {new Date().getFullYear()} {name}. All rights reserved.
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
            Systems Online — Portfolio v6.0.0
          </span>
        </div>
      </footer>
    </div>
  );
}
