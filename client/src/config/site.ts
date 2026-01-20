import {
  HomeRounded as HomeRoundedIcon,
  SchoolRounded as SchoolRoundedIcon,
  StarRounded as StarRoundedIcon,
  EmojiEmotionsRounded as EmojiEmotionsRoundedIcon,
  WorkRounded as WorkRoundedIcon,
} from "@mui/icons-material";

export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Vite + HeroUI",
  description: "Make beautiful websites regardless of your design experience.",
  navItems: [
    {
      label: "Home",
      href: "/",
      icon: HomeRoundedIcon,
    },
    {
      label: "Projects",
      href: "/projects",
      icon: WorkRoundedIcon,
    },
    {
      label: "Certificates",
      href: "/certificates",
      icon: SchoolRoundedIcon,
    },
    {
      label: "Habiliteis",
      href: "/habiliteis",
      icon: StarRoundedIcon,
    },
    {
      label: "Profile",
      href: "/profile",
      icon: EmojiEmotionsRoundedIcon,
    },
  ],
  links: {
    github: "https://github.com/Wectornanime/portfolio-back",
  },
};
