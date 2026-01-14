import CertificatesPage from "@/pages/certificates";
import IndexPage from "@/pages/index";
import MailPage from "@/pages/mail";
import NotFoundPage from "@/pages/notFound";
import ProjectsPage from "@/pages/projects";

export const routes = {
  "/": IndexPage,
  "/projects": ProjectsPage,
  "/projects/:id": ProjectsPage,
  "/certificates": CertificatesPage,
  "/certificates/:id": CertificatesPage,
  "/mail": MailPage,
  "/mail/:id": MailPage,
  "*": NotFoundPage,
};
