import { client } from "@/lib/sanity";
import portfolioData from "@/data/portfolioData.json";
import QRCode from "react-qr-code";
import PrintButton from "@/components/PrintButton";

/* ─────────────────────────────────────────────────────────────
   Constants
───────────────────────────────────────────────────────────── */
const LIVE_URL = "https://portfolio-web-engine.onrender.com";

const DEFAULT_NAME  = "Tshibaza Kazi Christian";
const DEFAULT_TITLE = "Systems Specialist & Network Infrastructure Administrator";

/* ─────────────────────────────────────────────────────────────
   Sanity Data Fetch
───────────────────────────────────────────────────────────── */
async function getCardProfile(): Promise<{ name: string; title: string } | null> {
  if (!client) return null;
  try {
    return await client.fetch(
      `*[_type == "profile"][0]{ name, title }`,
      {},
      { next: { revalidate: 60 } }
    );
  } catch {
    return null;
  }
}

/* ─────────────────────────────────────────────────────────────
   Page — Async Server Component
───────────────────────────────────────────────────────────── */
export const metadata = {
  title: "Business Card — Tshibaza Kazi Christian",
  description: "Printable digital business card for Tshibaza Kazi Christian, Systems Specialist & Network Infrastructure Administrator.",
  robots: { index: false, follow: false },
};

export default async function CardPage() {
  const sanity = await getCardProfile();
  const staticProfile = portfolioData.profile;

  const name  = sanity?.name  ?? staticProfile.name  ?? DEFAULT_NAME;
  const title = sanity?.title ?? staticProfile.title  ?? DEFAULT_TITLE;
  const email = staticProfile.email;
  const phone = staticProfile.phone;
  const location = staticProfile.location;

  return (
    <div className="min-h-screen bg-zinc-100 flex flex-col items-center justify-center gap-8 p-8">

      {/* ── Print instruction banner (hidden when printing) ── */}
      <div className="print:hidden text-center space-y-2">
        <p className="text-zinc-500 text-xs font-mono uppercase tracking-widest">
          Business Card Preview
        </p>
        <p className="text-zinc-400 text-xs">
          Use your browser&apos;s Print function (Ctrl+P / ⌘P) to print this card.
          Set paper size to Custom (3.5in × 2in) with no margins.
        </p>
        <PrintButton />
      </div>

      {/* ── Card wrapper: exact physical print dimensions ── */}
      <div
        className="
          w-[3.5in] h-[2in]
          bg-white rounded-xl shadow-2xl shadow-zinc-300/60
          border border-zinc-200/80
          overflow-hidden relative
          flex flex-row
          print:shadow-none print:rounded-none print:bg-white print:border-none
        "
        style={{ fontFamily: "'Inter', 'Plus Jakarta Sans', system-ui, sans-serif" }}
      >

        {/* ── Left accent bar ── */}
        <div className="w-[6px] h-full bg-gradient-to-b from-indigo-500 via-violet-500 to-blue-500 flex-shrink-0" />

        {/* ── Main card body ── */}
        <div className="flex flex-row flex-1 items-stretch">

          {/* Left text column */}
          <div className="flex flex-col justify-between flex-1 px-5 py-4 min-w-0">

            {/* Top: Monogram + Name + Title */}
            <div className="space-y-1.5">
              {/* Monogram */}
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center mb-2 flex-shrink-0">
                <span className="text-white text-[11px] font-bold tracking-wide leading-none">CK</span>
              </div>

              <p
                className="text-zinc-900 font-extrabold leading-tight tracking-tight"
                style={{ fontSize: "13.5px" }}
              >
                {name}
              </p>

              <p
                className="text-indigo-600 font-semibold leading-snug"
                style={{ fontSize: "7.5px", letterSpacing: "0.01em" }}
              >
                {title}
              </p>
            </div>

            {/* Bottom: Contact details */}
            <div className="space-y-[3px]">
              <div className="flex items-center gap-1.5">
                <span
                  className="text-zinc-400 font-mono"
                  style={{ fontSize: "6px", letterSpacing: "0.12em", textTransform: "uppercase" }}
                >
                  Email
                </span>
                <span className="text-zinc-700 font-mono" style={{ fontSize: "7.5px" }}>
                  {email}
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <span
                  className="text-zinc-400 font-mono"
                  style={{ fontSize: "6px", letterSpacing: "0.12em", textTransform: "uppercase" }}
                >
                  Tel
                </span>
                <span className="text-zinc-700 font-mono" style={{ fontSize: "7.5px" }}>
                  {phone}
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <span
                  className="text-zinc-400 font-mono"
                  style={{ fontSize: "6px", letterSpacing: "0.12em", textTransform: "uppercase" }}
                >
                  Location
                </span>
                <span className="text-zinc-700 font-mono" style={{ fontSize: "7.5px" }}>
                  {location}
                </span>
              </div>
              <div className="flex items-center gap-1.5 pt-[2px]">
                <span
                  className="text-zinc-400 font-mono"
                  style={{ fontSize: "6px", letterSpacing: "0.12em", textTransform: "uppercase" }}
                >
                  Web
                </span>
                <span className="text-indigo-500 font-mono" style={{ fontSize: "7.5px" }}>
                  {LIVE_URL.replace("https://", "")}
                </span>
              </div>
            </div>
          </div>

          {/* Right QR column */}
          <div className="flex flex-col items-center justify-center px-4 py-4 bg-zinc-50/60 border-l border-zinc-100 flex-shrink-0 gap-1.5">
            <div className="bg-white p-2 rounded-lg border border-zinc-200 shadow-sm">
              <QRCode
                value={LIVE_URL}
                size={72}
                level="H"
                fgColor="#18181b"
                bgColor="#ffffff"
              />
            </div>
            <p
              className="text-zinc-400 font-mono text-center leading-tight"
              style={{ fontSize: "5.5px", letterSpacing: "0.14em", textTransform: "uppercase" }}
            >
              Scan to visit
              <br />
              portfolio
            </p>
          </div>
        </div>
      </div>

      {/* ── Front / Back toggle info (hidden when printing) ── */}
      <div className="print:hidden text-center">
        <p className="text-zinc-400 text-[11px] font-mono">
          Route: <span className="text-indigo-500">/card</span> · QR points to{" "}
          <a
            href={LIVE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            {LIVE_URL}
          </a>
        </p>
      </div>
    </div>
  );
}
