import type { NavigateOptions } from "react-router-dom";

import { HeroUIProvider } from "@heroui/system";
import { ToastProvider } from "@heroui/react";
import { useHref, useNavigate } from "react-router-dom";
import { useEffect } from "react";

import { AuthProvider } from "./contexts/auth.context";
import { navigationBridge } from "./bridges/navigate.bridge";

declare module "@react-types/shared" {
  interface RouterConfig {
    routerOptions: NavigateOptions;
  }
}

export function Provider({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();

  useEffect(() => {
    navigationBridge.navigate = navigate;

    return () => {
      navigationBridge.navigate = null;
    };
  }, [navigate]);

  return (
    <HeroUIProvider navigate={navigate} useHref={useHref}>
      <ToastProvider placement="top-right" />
      <AuthProvider>{children}</AuthProvider>
    </HeroUIProvider>
  );
}
