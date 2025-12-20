import IndexPage from "@/pages/index";
import DocsPage from "@/pages/docs";

export const routes = {
  "/": IndexPage,
  "/:id": IndexPage,
  "/docs": DocsPage,
};
