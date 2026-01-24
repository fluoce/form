"use client";

import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { usePathname, useSearchParams } from "next/navigation";

export function ProgressProvider({ children }: { children: ReactNode }) {
    const router = useRouter();

    useEffect(() => {
        NProgress.configure({
            showSpinner: false,
            trickleSpeed: 80,
        });

        const start = () => NProgress.start();
        const done = () => NProgress.done();

        const methodsToWrap = ["push", "replace", "refresh"] as const;
        const originals: Partial<Record<(typeof methodsToWrap)[number], any>> = {};

        methodsToWrap.forEach((method) => {
            originals[method] = (router as any)[method];

            (router as any)[method] = (...args: any) => {
                start();

                originals[method](...args);
                setTimeout(() => {
                    done();
                }, 400);

                return;
            };
        });

        return () => {
            methodsToWrap.forEach((method) => {
                (router as any)[method] = originals[method];
            });

            done();
        };
    }, [router]);

    return <>{children}</>;
}

export default function AppRouterNProgress() {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    useEffect(() => {
        NProgress.configure({
            showSpinner: false,
            trickleSpeed: 80,
        });

        const handleAnchorClick = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const anchor = target.closest("a");

            if (target.closest(".no-loader")) {
                return;
            }

            if (anchor && anchor.href) {
                if (anchor.href !== window.location.href) {
                    NProgress.start();
                }
            }
        };

        document.addEventListener("click", handleAnchorClick);

        return () => {
            document.removeEventListener("click", handleAnchorClick);
        };
    }, []);

    useEffect(() => {
        NProgress.done();
    }, [pathname, searchParams]);

    useEffect(() => {
        const handleVisibility = () => {
            if (document.visibilityState === "hidden") {
                NProgress.done();
            }
        };

        document.addEventListener("visibilitychange", handleVisibility);

        return () => {
            document.removeEventListener("visibilitychange", handleVisibility);
        };
    }, []);

    return null;
}
