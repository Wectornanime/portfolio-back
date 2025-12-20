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
import { Card, CardBody, useDisclosure } from "@heroui/react";
import { Button } from "@heroui/button";
import {
  KeyboardDoubleArrowRightRounded as KeyboardDoubleArrowRightRoundedIcon,
  KeyboardDoubleArrowLeftRounded as KeyboardDoubleArrowLeftRoundedIcon,
} from "@mui/icons-material";

import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
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
                          <Link color="foreground" href={item.href}>
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
        </NavbarBrand>
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
