"use client";

import Link from "next/link";
import { Bird, Briefcase, Camera, Code2, PlayCircle } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface Props {
  className?: string;
  iconClassName?: string;
  tooltipClassName?: string;
}

/** Lucide v1.9+ n’expose plus les pictos « marque » ; on utilise des icônes proches sémantiquement. */
const socialMediaData = [
  { title: "YouTube", href: "https://www.youtube.com/trustshop", Icon: PlayCircle },
  { title: "Instagram", href: "https://www.instagram.com/trustshop", Icon: Camera },
  { title: "Twitter", href: "https://www.twitter.com/trustshop", Icon: Bird },
  { title: "LinkedIn", href: "https://www.linkedin.com/company/trustshop", Icon: Briefcase },
  { title: "GitHub", href: "https://www.github.com/trustshop", Icon: Code2 },
] as const;

const SocialMedia = ({
  className,
  iconClassName,
  tooltipClassName,
}: Props) => {
  return (
    <TooltipProvider>
      <div className={cn("flex items-center gap-3.5", className)}>
        {socialMediaData.map((item) => {
          const Icon = item.Icon;
          return (
            <Tooltip key={item.title}>
              <TooltipTrigger
                render={
                  <Link
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      "rounded-full border p-2 text-muted-foreground hoverEffect hover:text-white transition-colors hover:border-shop_light_green",
                      iconClassName,
                    )}
                  >
                    <Icon className="size-5" aria-hidden />
                  </Link>
                }
              />
              <TooltipContent className={cn("bg-white text-darkColor font-semibold ",tooltipClassName)}>
                <p>{item.title}</p>
              </TooltipContent>
            </Tooltip>
          );
        })}
      </div>
    </TooltipProvider>
  );
};

export default SocialMedia;
