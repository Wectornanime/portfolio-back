import { Link } from "@heroui/link";
import {
  Navbar as HeroUINavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@heroui/navbar";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
} from "@heroui/drawer";
import { Avatar, useDisclosure } from "@heroui/react";
import { Button } from "@heroui/button";
import {
  KeyboardDoubleArrowRightRounded as KeyboardDoubleArrowRightRoundedIcon,
  KeyboardDoubleArrowLeftRounded as KeyboardDoubleArrowLeftRoundedIcon,
  LogoutRounded as LogoutRoundedIcon,
  SettingsRounded as SettingsRoundedIcon,
} from "@mui/icons-material";
import { useLocation } from "react-router-dom";

import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
import { GithubIcon } from "@/components/icons";

export const Navbar = () => {
  const location = useLocation();
  const pathname = location.pathname;
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <HeroUINavbar maxWidth="xl" position="sticky">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand className="gap-3 max-w-fit">
          <Button isIconOnly variant="light" onPress={onOpen}>
            <KeyboardDoubleArrowRightRoundedIcon />
          </Button>
          <Drawer
            hideCloseButton
            isOpen={isOpen}
            placement="left"
            size="xs"
            onOpenChange={onOpenChange}
          >
            <DrawerContent>
              {(onClose) => (
                <>
                  <DrawerHeader className="flex-row-reverse">
                    <Button isIconOnly variant="light" onPress={onClose}>
                      <KeyboardDoubleArrowLeftRoundedIcon />
                    </Button>
                  </DrawerHeader>
                  <DrawerBody className="flex justify-between pb-4">
                    <div>
                      {siteConfig.navItems.map((item) => {
                        const isHome = item.href === "/";
                        const active = pathname.startsWith(item.href);
                        const isActive = isHome
                          ? location.pathname === "/"
                          : active;

                        return (
                          <Link
                            key={item.href}
                            className={`flex items-center gap-2 py-2 px-1 rounded-lg ${isActive ? "font-semibold bg-white/10 hover:bg-white/30" : "hover:bg-white/10"}`}
                            color="foreground"
                            href={item.href}
                            onClick={onClose}
                          >
                            <item.icon />
                            {item.label}
                          </Link>
                        );
                      })}
                    </div>
                    <div>
                      <Link
                        className="flex items-center gap-2 py-2"
                        color="foreground"
                        href="#"
                        onClick={onClose}
                      >
                        <SettingsRoundedIcon />
                        Preferencias
                      </Link>
                      <Link
                        className="flex items-center gap-2 py-2"
                        color="danger"
                        href="#"
                        onClick={onClose}
                      >
                        <LogoutRoundedIcon />
                        Log out
                      </Link>
                    </div>
                  </DrawerBody>
                </>
              )}
            </DrawerContent>
          </Drawer>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="flex basis-1/5 sm:basis-full" justify="end">
        <NavbarItem className="flex gap-2 basis-1 pl-4">
          <Link isExternal href={siteConfig.links.github} title="GitHub">
            <GithubIcon className="text-default-500" />
          </Link>
          <ThemeSwitch />
          <Link href="/user">
            <Avatar size="sm" />
          </Link>
        </NavbarItem>
      </NavbarContent>
    </HeroUINavbar>
  );
};
