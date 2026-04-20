"use client";

import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  useMemo,
  ComponentPropsWithoutRef,
} from "react";
import { cn } from "@/lib/utils";
import { Button } from "./button";
import { Switch } from "./switch";
import { Label } from "./label";
import { ButtonGroup } from "./button-group";
import { Moon, Sun } from "lucide-react";

export function changeTheme(theme: "dark" | "light") {
  if (typeof document === "undefined" || typeof window === "undefined") return;
  if (theme === "dark") {
    document.documentElement.classList.add("dark");
    localStorage.setItem("theme", "dark");
  } else {
    document.documentElement.classList.remove("dark");
    localStorage.setItem("theme", "light");
  }
}

type ThemeBtnMode = "switch" | "button" | "group";

interface ThemeContextValue {
  isDark: boolean;
  setTheme: (dark: boolean) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within a ThemeProvider");
  return ctx;
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const savedTheme =
      typeof window !== "undefined" ? localStorage.getItem("theme") : null;
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
      setIsDark(true);
    } else {
      document.documentElement.classList.remove("dark");
      setIsDark(false);
      if (!savedTheme) {
        localStorage.setItem("theme", "light");
      }
    }

    const updateTheme = () => {
      setIsDark(document.documentElement.classList.contains("dark"));
    };
    updateTheme();
    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  const setTheme = useCallback((dark: boolean) => {
    changeTheme(dark ? "dark" : "light");
    setIsDark(dark);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(!isDark);
  }, [isDark, setTheme]);

  const value = useMemo(
    () => ({ isDark, setTheme, toggleTheme }),
    [isDark, setTheme, toggleTheme],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

interface ThemeBtnProps extends ComponentPropsWithoutRef<"button"> {
  mode?: ThemeBtnMode;
}

export const ThemeBtn = ({
  className,
  mode = "button",
  ...props
}: ThemeBtnProps) => {
  const { isDark, setTheme, toggleTheme } = useTheme();
  const buttonRef = useRef<HTMLButtonElement>(null);

  return (
    <>
      {mode === "switch" && (
        <div className="flex items-center gap-2">
          <Switch
            id="theme-toggle"
            checked={isDark}
            onCheckedChange={toggleTheme}
            aria-label="Toggle theme"
          />
          <Label
            htmlFor="theme-toggle"
            className="text-muted-foreground text-xs font-semibold"
          >
            Theme Toggle
          </Label>
        </div>
      )}

      {mode === "button" && (
        <Button
          ref={buttonRef}
          onClick={toggleTheme}
          className={cn(className)}
          {...props}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="size-4.5"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"></path>
            <path d="M12 3l0 18"></path>
            <path d="M12 9l4.65 -4.65"></path>
            <path d="M12 14.3l7.37 -7.37"></path>
            <path d="M12 19.6l8.85 -8.85"></path>
          </svg>
          <span className="sr-only">Toggle theme</span>
          {isDark ? "Dark" : "Light"}
        </Button>
      )}

      {mode === "group" && (
        <ButtonGroup>
          <Button
            className={isDark ? "pointer-events-none" : undefined}
            variant={isDark ? "default" : "secondary"}
            onClick={() => setTheme(true)}
          >
            <Moon /> Dark
          </Button>
          <Button
            className={!isDark ? "pointer-events-none" : undefined}
            variant={isDark ? "secondary" : "default"}
            onClick={() => setTheme(false)}
          >
            <Sun /> Light
          </Button>
        </ButtonGroup>
      )}
    </>
  );
};
