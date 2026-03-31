"use client";

import { createContext, useContext, useState } from "react";

type FormThemeContextType = {
  theme: string;
  setTheme: (theme: string) => void;
};

const FormThemeContext = createContext<FormThemeContextType | null>(null);

export function FormThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState("theme-blue");

  return (
    <FormThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </FormThemeContext.Provider>
  );
}

export function useFormTheme() {
  const context = useContext(FormThemeContext);
  if (!context)
    throw new Error(
      "useFormThemeContext must be used inside FormThemeProvider",
    );
  return context;
}
