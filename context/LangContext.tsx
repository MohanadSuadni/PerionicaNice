"use client";

import { createContext, useContext, useState } from "react";

type Lang = "sr" | "en" | "ru";

const LangContext = createContext<any>(null);

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>("sr");

  return (
    <LangContext.Provider value={{ lang, setLang }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  return useContext(LangContext);
}