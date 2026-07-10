import { useState } from 'react';

import { QUESTIONS_BY_LOCALE } from './content';
import {
  usePluginLocale,
  usePluginTranslations
} from './i18n/usePluginTranslations';

import type { PluginContext } from './types';

type Props = {
  context: PluginContext;
};

export default function QuizApp({ context }: Props) {
  const t = usePluginTranslations(context.i18n);
  const locale = usePluginLocale(context.i18n);
  const questions = QUESTIONS_BY_LOCALE[locale];
  const [selections, setSelections] = useState<Record<number, number | null>>(() =>
    Object.fromEntries(questions.map((_, index) => [index, null]))
  );
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState<number | null>(null);

  const answeredCount = questions.filter(
    (_, index) => selections[index] !== null
  ).length;
  const allAnswered = answeredCount === questions.length;

  function handleSelect(questionIndex: number, choiceIndex: number) {
    if (submitted) {
      return;
    }

    setSelections((current) => ({
      ...current,
      [questionIndex]: choiceIndex
    }));
  }

  function handleSubmit() {
    if (!allAnswered || submitted) {
      return;
    }

    const nextScore = questions.reduce((total, question, index) => {
      if (selections[index] === question.answerIndex) {
        return total + 1;
      }

      return total;
    }, 0);

    setScore(nextScore);
    setSubmitted(true);

    context.reportProgress({
      score: nextScore,
      completed: true
    });
  }

  return (
    <div className="pl-g7-physics-si-units-3-root">
      <h2 className="pl-g7-physics-si-units-3-title">{t('title')}</h2>

      <p className="pl-g7-physics-si-units-3-intro">
        {t('intro', { count: questions.length })}
      </p>

      {questions.map((question, questionIndex) => (
        <section
          key={questionIndex}
          className="pl-g7-physics-si-units-3-question"
          aria-labelledby={`pl-g7-physics-si-units-3-q${questionIndex}-title`}
        >
          <h3
            id={`pl-g7-physics-si-units-3-q${questionIndex}-title`}
            className="pl-g7-physics-si-units-3-question-title"
          >
            {question.prompt}
          </h3>

          <div
            className="pl-g7-physics-si-units-3-options"
            role="group"
            aria-label={question.prompt}
          >
            {question.choices.map((choice, choiceIndex) => (
              <button
                key={choiceIndex}
                type="button"
                className="pl-g7-physics-si-units-3-option"
                data-selected={selections[questionIndex] === choiceIndex}
                aria-pressed={selections[questionIndex] === choiceIndex}
                onClick={() => handleSelect(questionIndex, choiceIndex)}
              >
                {choice}
              </button>
            ))}
          </div>
        </section>
      ))}

      <div className="pl-g7-physics-si-units-3-actions">
        <button
          type="button"
          className="pl-g7-physics-si-units-3-submit"
          disabled={!allAnswered || submitted}
          onClick={handleSubmit}
        >
          {t('submit')}
        </button>

        {!allAnswered && !submitted ? (
          <p className="pl-g7-physics-si-units-3-intro">
            {t('progress', {
              answered: answeredCount,
              total: questions.length
            })}
          </p>
        ) : null}
      </div>

      {submitted && score !== null ? (
        <p className="pl-g7-physics-si-units-3-result">
          {t('result', { score, total: questions.length })}
        </p>
      ) : null}
    </div>
  );
}
