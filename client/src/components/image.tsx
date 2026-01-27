import { twMerge } from "tailwind-merge";

import { siteConfig } from "@/config/site";

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackSrc?: string;
}

export default function Image({
  alt,
  className,
  fallbackSrc = siteConfig.defaultAssets.imageFallbackSrc,
  src,
  ...props
}: ImageProps) {
  return (
    <div
      className={twMerge(
        "aspect-video w-full overflow-hidden rounded-small",
        className,
      )}
    >
      <img
        alt={alt}
        className="h-full w-full object-cover"
        src={src || fallbackSrc}
        {...props}
      />
    </div>
  );
}
