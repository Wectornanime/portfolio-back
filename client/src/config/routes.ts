import CertificatesPage from "@/pages/certificates";
import HabiliteisPage from "@/pages/habiliteis";
import IndexPage from "@/pages/index";
import NotFoundPage from "@/pages/notFound";
import ProfilePage from "@/pages/profile";
import ProjectsPage from "@/pages/projects";

export const routes = {
  "/": IndexPage,
  "/certificates": CertificatesPage,
  "/certificates/:id": CertificatesPage,
  "/habiliteis": HabiliteisPage,
  "/habiliteis/:id": HabiliteisPage,
  "/projects": ProjectsPage,
  "/projects/:id": ProjectsPage,
  "/profile": ProfilePage,
  "*": NotFoundPage,
};
