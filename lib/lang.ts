import sr from "@/messages/sr.json";
import en from "@/messages/en.json";
import ru from "@/messages/ru.json";

import type { Dict, Locale } from "@/types/dict";

const dicts = {
  sr,
  en,
  ru,
} satisfies Record<Locale, Dict>;

export function getDict(locale: Locale): Dict {
  return dicts[locale];
}