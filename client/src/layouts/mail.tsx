import type { SvgIconComponent } from "@mui/icons-material";

import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useHotkeys } from "react-hotkeys-hook";
import { Divider, ScrollShadow } from "@heroui/react";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import {
  CircleRounded as CircleRoundedIcon,
  CloseRounded as CloseRoundedIcon,
  ModeRounded as ModeRoundedIcon,
} from "@mui/icons-material";

interface MailLayoutProps {
  createPage: React.ReactNode;
  icon?: SvgIconComponent;
  infoPage: React.ReactNode;
  list: React.ReactNode;
  tittle: string;
}

export default function MailLayout({
  createPage,
  infoPage,
  list,
  tittle,
  icon: Icon = CircleRoundedIcon,
}: MailLayoutProps) {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const path = location.pathname;
  const pathParent = path.substring(0, path.lastIndexOf("/"));

  const openCreateMode = () => {
    if (id) {
      navigate(`${pathParent}/new`);
    } else {
      navigate("new");
    }
  };

  const closeContent = () => {
    navigate(pathParent);
  };

  useHotkeys("esc", closeContent);

  return (
    <main className="flex gap-3 w-full h-full">
      <section
        className={`flex-col w-full md:w-[45%] h-full gap-2 ${id ? "hidden sm:flex" : "flex"}`}
      >
        <h1 className="font-bold text-4xl">{tittle}</h1>

        <div className="flex gap-1 mb-2 w-full">
          <Input label="Buscar" size="sm" type="text" />
          <Button
            isIconOnly
            color="primary"
            size="lg"
            onClickCapture={openCreateMode}
          >
            <ModeRoundedIcon />
          </Button>
        </div>
        <ScrollShadow hideScrollBar className="[&>*]:mb-2 pb-5">
          {list}
        </ScrollShadow>
      </section>

      <Divider className="w-1 hidden sm:flex" orientation="vertical" />

      <section className={`w-full h-full sm:flex ${id ? "flex" : "hidden"}`}>
        {id ? (
          <div className="flex full flex-col">
            <div className="flex gap-2 mb-2">
              <Button
                isIconOnly
                color="primary"
                size="md"
                onClickCapture={closeContent}
              >
                <CloseRoundedIcon />
              </Button>

              <h1 className="font-bold text-4xl mb-2">Title</h1>
            </div>
            <div className="flex full">
              {id === "new" ? createPage : infoPage}
            </div>
          </div>
        ) : (
          <div className="flex full justify-center items-center">
            <Icon className="text-foreground/30" sx={{ fontSize: 96 }} />
          </div>
        )}
      </section>
    </main>
  );
}
