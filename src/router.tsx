import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

export const getRouter = () => {
  const queryClient = new QueryClient();

  const router = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
    // Prerender requests arrive with a trailing slash; stripping it via a
    // redirect makes the static prerenderer follow a loop and skip the page.
    trailingSlash: "preserve",
  });

  return router;
};
