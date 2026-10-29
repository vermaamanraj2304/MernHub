import React, { createContext, useContext, useEffect, useState } from 'react';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  // 'en' = English, 'hi' = Hinglish, 'both' = Side-by-side bilingual
  const [language, setLanguage] = useState(() => {
    try {
      const saved = localStorage.getItem('mern_language');
      if (saved === 'en' || saved === 'hi' || saved === 'both') {
        return saved;
      }
      return 'both'; // Default to 'both' to showcase the dual-language value proposition!
    } catch {
      return 'both';
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('mern_language', language);
    } catch (e) {
      console.warn('Failed to save language to localStorage', e);
    }
  }, [language]);

  /**
   * Helper to resolve bilingual text objects: { en: "...", hi: "..." }
   * If string is passed, returns as-is.
   */
  const resolveText = (textObj, forcedLang = null) => {
    if (!textObj) return '';
    if (typeof textObj === 'string') return textObj;

    const target = forcedLang || language;
    if (target === 'hi') {
      return textObj.hi || textObj.en || '';
    }
    if (target === 'en') {
      return textObj.en || textObj.hi || '';
    }
    // For 'both', return { en: textObj.en, hi: textObj.hi }
    return textObj;
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        isEnglish: language === 'en',
        isHinglish: language === 'hi',
        isBoth: language === 'both',
        resolveText,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
