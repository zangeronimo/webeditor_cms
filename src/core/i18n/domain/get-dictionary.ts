import { Dictionary } from '../contracts/dictionary';
import enUS from '../locales/en-US';
import ptBR from '../locales/pt-BR';
import { DEFAULT_LOCALE, Locale } from './locale';

const dictionaries = {
  'en-US': enUS,
  'pt-BR': ptBR,
};

export const getDictionary = (locale: Locale): Dictionary => {
  return dictionaries[locale] ?? dictionaries[DEFAULT_LOCALE];
};
