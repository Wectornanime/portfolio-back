import IndexPage from "@/pages/index";
import ProjectsPage from "@/pages/projects";

export const routes = {
  "/": IndexPage,
  "/:id": IndexPage,
  "/projects": ProjectsPage,
};
