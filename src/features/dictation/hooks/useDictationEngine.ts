'use client';

import { useMemo } from 'react';

interface CharResult {
  char: string;
  isCorrect: boolean | null; // null = not yet typed
}

/**
 * Compares user input against the original text character-by-character.
 * Case-insensitive comparison, ignores trailing punctuation.
 */
export function useDictationEngine(userText: string, originalText: string) {
  const charResults: CharResult[] = useMemo(() => {
    const normalizedOriginal = originalText.trimEnd();
    const results: CharResult[] = [];

    for (let i = 0; i < normalizedOriginal.length; i++) {
      if (i >= userText.length) {
        // Not yet typed
        results.push({ char: normalizedOriginal[i], isCorrect: null });
      } else {
        const isCorrect =
          userText[i].toLowerCase() === normalizedOriginal[i].toLowerCase();
        results.push({ char: normalizedOriginal[i], isCorrect });
      }
    }

    return results;
  }, [userText, originalText]);

  const totalChars = originalText.trimEnd().length;
  const typedChars = Math.min(userText.length, totalChars);
  const correctChars = charResults.filter((r) => r.isCorrect === true).length;

  const accuracy = typedChars > 0 ? (correctChars / typedChars) * 100 : 0;
  const isComplete = typedChars >= totalChars;

  return {
    charResults,
    accuracy,
    isComplete,
    typedChars,
    totalChars,
    correctChars,
  };
}
