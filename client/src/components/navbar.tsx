import clsx from "clsx";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import { Card, CardBody } from "@heroui/card";
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
} from "@heroui/drawer";
import {
  Navbar as HeroUINavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@heroui/navbar";
import { link as linkStyles } from "@heroui/theme";
import { useDisclosure } from "@heroui/react";
import {
  KeyboardDoubleArrowLeftRounded as KeyboardDoubleArrowLeftRoundedIcon,
  KeyboardDoubleArrowRightRounded as KeyboardDoubleArrowRightRoundedIcon,
} from "@mui/icons-material";

import { ThemeSwitch } from "@/components/theme-switch";
import { siteConfig } from "@/config/site";
import { GithubIcon } from "@/components/icons";

export const Navbar = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <HeroUINavbar maxWidth="xl" position="sticky">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand className="gap-3 max-w-fit">
          <Button isIconOnly variant="light" onPress={onOpen}>
            <KeyboardDoubleArrowRightRoundedIcon />
          </Button>
        </NavbarBrand>

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
                <DrawerBody>
                  {siteConfig.navItems.map((item) => (
                    <Card key={item.href}>
                      <CardBody>
                        <Link
                          className={clsx(
                            linkStyles({ color: "foreground" }),
                            "data-[active=true]:text-primary data-[active=true]:font-medium",
                          )}
                          color="foreground"
                          href={item.href}
                        >
                          {item.label}
                        </Link>
                      </CardBody>
                    </Card>
                  ))}
                </DrawerBody>
              </>
            )}
          </DrawerContent>
        </Drawer>
      </NavbarContent>

      <NavbarContent className="flex basis-1/5 sm:basis-full" justify="end">
        <NavbarItem className="flex gap-2 basis-1 pl-4">
          <Link isExternal href={siteConfig.links.github} title="GitHub">
            <GithubIcon className="text-default-500" />
          </Link>
          <ThemeSwitch />
        </NavbarItem>
      </NavbarContent>
    </HeroUINavbar>
  );
};
