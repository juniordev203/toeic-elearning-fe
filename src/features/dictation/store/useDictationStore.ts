import { create } from 'zustand';

interface SentenceResult {
  sentenceId: string;
  userInput: string;
}

interface DictationState {
  currentSentenceIndex: number;
  userInputs: Record<number, string>;
  results: SentenceResult[];
  startedAt: string | null;
  isCompleted: boolean;

  setInput: (index: number, text: string) => void;
  nextSentence: (totalSentences: number) => void;
  prevSentence: () => void;
  complete: (results: SentenceResult[]) => void;
  reset: () => void;
}

export const useDictationStore = create<DictationState>((set) => ({
  currentSentenceIndex: 0,
  userInputs: {},
  results: [],
  startedAt: null,
  isCompleted: false,

  setInput: (index, text) =>
    set((state) => ({
      userInputs: { ...state.userInputs, [index]: text },
      startedAt: state.startedAt ?? new Date().toISOString(),
    })),

  nextSentence: (totalSentences) =>
    set((state) => ({
      currentSentenceIndex: Math.min(
        state.currentSentenceIndex + 1,
        totalSentences - 1,
      ),
    })),

  prevSentence: () =>
    set((state) => ({
      currentSentenceIndex: Math.max(state.currentSentenceIndex - 1, 0),
    })),

  complete: (results) => set({ results, isCompleted: true }),

  reset: () =>
    set({
      currentSentenceIndex: 0,
      userInputs: {},
      results: [],
      startedAt: null,
      isCompleted: false,
    }),
}));
