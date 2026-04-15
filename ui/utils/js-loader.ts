"use client";

import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { ReactNode, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { usePathname, useSearchParams } from "next/navigation";

export function ProgressProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const lastPathnameRef = useRef(pathname);

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
        const url = args[0];
        let nextPath = "";
        if (typeof url === "string") {
          nextPath = url.split("?")[0];
        } else if (url && typeof url === "object" && "pathname" in url) {
          nextPath = url.pathname;
        }
        if (nextPath && nextPath !== lastPathnameRef.current) {
          start();
          originals[method](...args);
          setTimeout(() => {
            done();
          }, 400);
        } else {
          originals[method](...args);
        }
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

  useEffect(() => {
    lastPathnameRef.current = pathname;
  }, [pathname]);

  return children;
}

export default function AppRouterNProgress() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const lastPathnameRef = useRef(pathname);

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
        try {
          const anchorUrl = new URL(anchor.href, window.location.origin);
          const currentUrl = new URL(window.location.href);

          if (anchorUrl.pathname !== currentUrl.pathname) {
            NProgress.start();
          }
        } catch {}
      }
    };

    document.addEventListener("click", handleAnchorClick);

    return () => {
      document.removeEventListener("click", handleAnchorClick);
    };
  }, []);

  useEffect(() => {
    if (lastPathnameRef.current !== pathname) {
      NProgress.done();
      lastPathnameRef.current = pathname;
    }
  }, [pathname]);

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
