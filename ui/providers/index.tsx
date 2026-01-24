"use client";

import { ThemeProvider } from "@/components/ui/ThemeBtn";
import { ReactNode } from "react";
import ReduxProvider from "./redux/redux-provider";
import AppRouterNProgress, { ProgressProvider } from "@/utils/js-loader";

export function Providers({ children }: { children: ReactNode }) {
    return (
        <ReduxProvider>
            <ProgressProvider>
                <AppRouterNProgress />
                <ThemeProvider>{children}</ThemeProvider>
            </ProgressProvider>
        </ReduxProvider>
    );
}
