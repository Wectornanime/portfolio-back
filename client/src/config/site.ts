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
  defaultAssets: {
    imageFallbackSrc:
      "https://static.vecteezy.com/ti/vetor-gratis/p1/5720408-icone-imagem-cruzado-imagem-nao-disponivel-excluir-imagem-simbolo-gratis-vetor.jpg",
  },
};
