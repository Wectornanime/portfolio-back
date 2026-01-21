import CertificatesPage from "@/pages/certificates";
import HabiliteisPage from "@/pages/habiliteis";
import IndexPage from "@/pages/index";
import LoginPage from "@/pages/login";
import NotFoundPage from "@/pages/notFound";
import ProfilePage from "@/pages/profile";
import ProjectsPage from "@/pages/projects";
import RegisterPage from "@/pages/register";

export const routes = {
  "/": IndexPage,
  "/certificates": CertificatesPage,
  "/certificates/:id": CertificatesPage,
  "/habiliteis": HabiliteisPage,
  "/habiliteis/:id": HabiliteisPage,
  "/login": LoginPage,
  "/projects": ProjectsPage,
  "/projects/:id": ProjectsPage,
  "/profile": ProfilePage,
  "/register": RegisterPage,
  "*": NotFoundPage,
};
