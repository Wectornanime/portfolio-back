import IndexPage from "@/pages/index";
import ProjectsPage from "@/pages/projects";

export const routes = {
  "/": IndexPage,
  "/projects": ProjectsPage,
  "/projects/:id": IndexPage,
};
