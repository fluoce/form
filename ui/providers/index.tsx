"use client";

import { ThemeProvider } from "@/components/ui/ThemeBtn";
import { ReactNode } from "react";
import ReduxProvider from "./redux/redux-provider";
import AppRouterNProgress, { ProgressProvider } from "@/utils/js-loader";
import { TanstackProvider } from "./tanstack/tanstack-provider";
import { Toaster } from "@/components/ui/sonner";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ReduxProvider>
      <TanstackProvider>
        <ProgressProvider>
          <AppRouterNProgress />
          <ThemeProvider>{children} </ThemeProvider>
          <Toaster position="top-right" />
        </ProgressProvider>
      </TanstackProvider>
    </ReduxProvider>
  );
}
