import CertificatesPage from "@/pages/certificates";
import IndexPage from "@/pages/index";
import HabiliteisPage from "@/pages/habiliteis";
import NotFoundPage from "@/pages/notFound";
import ProjectsPage from "@/pages/projects";

export const routes = {
  "/": IndexPage,
  "/certificates": CertificatesPage,
  "/certificates/:id": CertificatesPage,
  "/habiliteis": HabiliteisPage,
  "/habiliteis/:id": HabiliteisPage,
  "/projects": ProjectsPage,
  "/projects/:id": ProjectsPage,
  "*": NotFoundPage,
};
