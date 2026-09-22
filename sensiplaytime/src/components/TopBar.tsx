import { SITE, TOP_BAR_MESSAGES } from "@/data/site";
import { InstagramIcon, TikTokIcon } from "@/components/SocialIcons";

export function TopBar() {
  return (
    <div className="hidden bg-brand-mint/40 text-xs text-brand-dark sm:block">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-2 lg:px-8">
        <ul className="flex items-center gap-5">
          {TOP_BAR_MESSAGES.map((msg) => (
            <li key={msg} className="whitespace-nowrap">
              {msg}
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-3">
          <span>Síguenos</span>
          <a
            href={SITE.social.instagram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="SensiPlayTime en Instagram"
            className="transition-colors hover:text-brand-turquoise"
          >
            <InstagramIcon className="h-4 w-4" />
          </a>
          <a
            href={SITE.social.tiktok}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="SensiPlayTime en TikTok"
            className="transition-colors hover:text-brand-turquoise"
          >
            <TikTokIcon className="h-4 w-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
