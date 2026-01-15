import CertificatesPage from "@/pages/certificates";
import IndexPage from "@/pages/index";
import TestePage from "@/pages/teste";
import NotFoundPage from "@/pages/notFound";
import ProjectsPage from "@/pages/projects";

export const routes = {
  "/": IndexPage,
  "/projects": ProjectsPage,
  "/projects/:id": ProjectsPage,
  "/certificates": CertificatesPage,
  "/certificates/:id": CertificatesPage,
  "/teste": TestePage,
  "/teste/:id": TestePage,
  "*": NotFoundPage,
};
