export type PluginLocale = 'en' | 'sr-latn' | 'sr-cyrl';

export type QuizQuestion = {
  prompt: string;
  choices: readonly string[];
  answerIndex: number;
  emoji?: string;
};

export type PluginI18n = {
  getLocale: () => PluginLocale;
  subscribe: (listener: () => void) => () => void;
};

export type PluginProgressPayload = {
  score: number;
  completed: boolean;
};

export type PluginContext = {
  lectureId: string;
  grade: number;
  subject: string;
  reportProgress: (payload: PluginProgressPayload) => void;
  i18n: PluginI18n;
};
