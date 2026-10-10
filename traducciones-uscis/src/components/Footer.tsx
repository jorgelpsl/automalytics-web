import Link from "next/link";
import { SITE } from "@/data/site";
import { type Lang } from "@/i18n/config";
import { COMMON } from "@/i18n/copy/common";
import { Logo } from "@/components/Logo";
import { generalWhatsAppUrl } from "@/lib/whatsapp";

// "18329645305" → "(832) 964-5305"; any other shape is shown as stored.
function formatUsPhone(digits: string): string {
  const m = /^1?(\d{3})(\d{3})(\d{4})$/.exec(digits);
  return m ? `(${m[1]}) ${m[2]}-${m[3]}` : digits;
}

export function Footer({ lang }: { lang: Lang }) {
  const copy = COMMON[lang];
  return (
    <footer className="bg-ink text-paper">
      <div className="mx-auto grid w-full max-w-content gap-10 px-4 py-14 sm:px-6 md:grid-cols-12 lg:px-8">
        <div className="flex flex-col gap-4 md:col-span-5">
          <span className="w-fit rounded-soft bg-paper px-3 py-2">
            <Logo />
          </span>
          <p className="max-w-sm text-sm leading-relaxed text-paper/70">
            {copy.footer.disclaimer}
          </p>
        </div>

        <nav aria-label={copy.footer.sections} className="-my-3 flex flex-col text-sm md:col-span-3">
          {copy.nav.map((link) => (
            <a key={link.href} href={link.href} className="inline-flex min-h-[44px] w-fit items-center text-paper/80 hover:text-paper">
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex flex-col text-sm md:col-span-4">
          <p className="mb-1 font-medium">{copy.footer.contact}</p>
          <a
            href={generalWhatsAppUrl(lang)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[44px] w-fit items-center text-paper/80 hover:text-paper"
          >
            {copy.footer.whatsapp} {formatUsPhone(SITE.whatsappNumber)}
          </a>
          {SITE.email && (
            <a href={`mailto:${SITE.email}`} className="inline-flex min-h-[44px] w-fit items-center text-paper/80 hover:text-paper">
              {SITE.email}
            </a>
          )}
        </div>
      </div>
      <div className="border-t border-paper/15">
        <div className="mx-auto flex w-full max-w-content flex-col gap-3 px-4 py-6 text-xs text-paper/60 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p>
            © {new Date().getFullYear()} {SITE.name}
          </p>
          <nav aria-label={copy.footer.legalAria} className="flex flex-wrap gap-x-5">
            {copy.footer.legal.map((page) => (
              <Link key={page.href} href={page.href} className="inline-flex min-h-[44px] items-center hover:text-paper">
                {page.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
