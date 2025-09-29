import React from 'react';
import { useLanguage } from './i18n/languageProvider';
import { Button } from "@/components/ui/button";
import { Globe } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const languageNames = {
  en: 'English',
  ru: 'Русский',
  uz: 'Oʻzbekcha'
};

export default function LanguageSwitcher() {
  const { language, setLanguage, availableLanguages } = useLanguage();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="w-full justify-start gap-2 text-slate-600">
          <Globe className="w-4 h-4" />
          <span>{languageNames[language]}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        {availableLanguages.map(lang => (
          <DropdownMenuItem key={lang} onClick={() => setLanguage(lang)}>
            {languageNames[lang]}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};