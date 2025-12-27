import {
  CircleRounded as CircleRoundedIcon,
  HomeRounded as HomeRoundedIcon,
  SchoolRounded as SchoolRoundedIcon,
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
      label: "Blog",
      href: "/blog",
      icon: CircleRoundedIcon,
    },
    {
      label: "About",
      href: "/about",
      icon: CircleRoundedIcon,
    },
  ],
  links: {
    github: "https://github.com/Wectornanime/portfolio-back",
  },
};
