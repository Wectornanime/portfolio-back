import { WorkRounded as WorkRoundedIcon } from "@mui/icons-material";

import CreateProjectsPage from "./createProjects";
import ListProjectsPage from "./listProjects";
import InfoProjectsPage from "./infoProjects";

import MailLayout from "@/layouts/mail";

export default function ProjectsPage() {
  return (
    <MailLayout
      createPage={<CreateProjectsPage />}
      icon={WorkRoundedIcon}
      infoPage={<InfoProjectsPage />}
      list={<ListProjectsPage />}
      tittle="Projetos"
    />
  );
}
