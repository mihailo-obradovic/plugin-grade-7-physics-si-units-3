import { useCallback, useEffect, useRef, useState } from 'react';

import { QUESTIONS_BY_LOCALE } from './content';
import {
  usePluginLocale,
  usePluginTranslations
} from './i18n/usePluginTranslations';

import type { PluginContext, QuizQuestion } from './types';
import type { CSSProperties } from 'react';

// Slide-based, animation-first quiz: one question per slide with staggered
// entrances. A wrong pick shakes, turns red, and stays disabled — the student
// keeps trying until the correct choice, which celebrates with confetti and
// auto-advances after a short beat. Score is partial credit per question.

const CELEBRATE_MS = 1500; // beat before auto-advancing

const cx = (...names: string[]) => names.filter(Boolean).join(' ');

/** A staggered `--pl-i` index lets CSS delay each element's entrance. */
function stepStyle(i: number): CSSProperties {
  return { ['--pl-i' as string]: i } as CSSProperties;
}

type ConfettiProps = { pieces?: number };

function Confetti({ pieces = 28 }: ConfettiProps) {
  return (
    <div className="pl-g7-physics-si-units-3-confetti" aria-hidden="true">
      {Array.from({ length: pieces }).map((_, i) => {
        const style = {
          ['--pl-x' as string]: `${(i * 37) % 100}%`,
          ['--pl-hue' as string]: (i * 47) % 360,
          ['--pl-delay' as string]: `${(i % 7) * 90}ms`,
          ['--pl-dur' as string]: `${1400 + ((i * 53) % 900)}ms`
        } as CSSProperties;

        return (
          <span key={i} className="pl-g7-physics-si-units-3-confetti-piece" style={style} />
        );
      })}
    </div>
  );
}

type SlideViewProps = {
  question: QuizQuestion;
  index: number;
  total: number;
  points: number;
  t: ReturnType<typeof usePluginTranslations>;
  onSolved: (index: number, earned: number) => void;
};

function SlideView({
  question,
  index,
  total,
  points,
  t,
  onSolved
}: SlideViewProps) {
  const { prompt, choices, answerIndex, emoji } = question;

  const [wrong, setWrong] = useState<Set<number>>(() => new Set());
  const [wrongCount, setWrongCount] = useState(0);
  const [solvedIndex, setSolvedIndex] = useState<number | null>(null);
  const solved = solvedIndex !== null;

  const handlePick = (choiceIndex: number) => {
    if (solved || wrong.has(choiceIndex)) {
      return;
    }

    if (choiceIndex === answerIndex) {
      // Exhausting every distractor earns 0 for the question.
      const earned = Math.max(
        0,
        points * (1 - wrongCount / (choices.length - 1))
      );
      setSolvedIndex(choiceIndex);
      onSolved(index, earned);
      return;
    }

    setWrong((prev) => new Set(prev).add(choiceIndex));
    setWrongCount((count) => count + 1);
  };

  const feedback = solved ? t('correct') : wrongCount > 0 ? t('wrong') : '';

  return (
    <div
      className={cx(
        'pl-g7-physics-si-units-3-slide',
        solved ? 'pl-g7-physics-si-units-3-slide-solved' : ''
      )}
    >
      {emoji ? (
        <span className="pl-g7-physics-si-units-3-emoji" aria-hidden="true">
          {emoji}
        </span>
      ) : null}

      <h3 className="pl-g7-physics-si-units-3-prompt">{prompt}</h3>

      <div className="pl-g7-physics-si-units-3-options">
        {choices.map((choice, choiceIndex) => {
          const isWrong = wrong.has(choiceIndex);
          const isRight = solvedIndex === choiceIndex;

          return (
            <button
              key={choiceIndex}
              type="button"
              className={cx(
                'pl-g7-physics-si-units-3-option',
                isWrong ? 'pl-g7-physics-si-units-3-option-wrong' : '',
                isRight ? 'pl-g7-physics-si-units-3-option-right' : ''
              )}
              style={stepStyle(choiceIndex)}
              onClick={() => handlePick(choiceIndex)}
              disabled={solved || isWrong}
            >
              {choice}
            </button>
          );
        })}
      </div>

      <p className="pl-g7-physics-si-units-3-sr-only" aria-live="polite">
        {feedback}
      </p>

      <p className="pl-g7-physics-si-units-3-step">
        {t('progress', { done: index + 1, total })}
      </p>

      {solved ? <Confetti /> : null}
    </div>
  );
}

type Props = {
  context: PluginContext;
};

export default function QuizApp({ context }: Props) {
  const t = usePluginTranslations(context.i18n);
  const locale = usePluginLocale(context.i18n);
  const questions = QUESTIONS_BY_LOCALE[locale];
  const total = questions.length;
  const points = 100 / total;

  const [slideIndex, setSlideIndex] = useState(0);
  const [completed, setCompleted] = useState(false);

  const earnedRef = useRef(0);
  const advanceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearAdvance = () => {
    if (advanceTimer.current) {
      clearTimeout(advanceTimer.current);
      advanceTimer.current = null;
    }
  };

  useEffect(() => clearAdvance, []);

  const handleSolved = useCallback(
    (index: number, earned: number) => {
      earnedRef.current += earned;
      const isLast = index === total - 1;
      context.reportProgress({
        score: Math.round(earnedRef.current),
        completed: isLast
      });

      clearAdvance();
      advanceTimer.current = setTimeout(() => {
        if (isLast) {
          setCompleted(true);
        } else {
          setSlideIndex(index + 1);
        }
      }, CELEBRATE_MS);
    },
    [context, total]
  );

  const restart = () => {
    clearAdvance();
    earnedRef.current = 0;
    setSlideIndex(0);
    setCompleted(false);
  };

  // The scaffolder enforces the same question count across locales; clamp
  // anyway so a mid-exercise locale switch can never overflow the list.
  const safeIndex = Math.min(slideIndex, total - 1);

  if (completed) {
    return (
      <div className="pl-g7-physics-si-units-3-root">
        <div className="pl-g7-physics-si-units-3-complete">
          <div className="pl-g7-physics-si-units-3-parade" aria-hidden="true">
            {questions.map((question, i) => (
              <span
                key={i}
                className="pl-g7-physics-si-units-3-parade-obj"
                style={stepStyle(i)}
              >
                {question.emoji ?? '⭐'}
              </span>
            ))}
          </div>
          <h2 className="pl-g7-physics-si-units-3-complete-title">{t('completeTitle')}</h2>
          <p className="pl-g7-physics-si-units-3-complete-body">
            {t('completeBody', { count: total })}
          </p>
          <button
            type="button"
            className="pl-g7-physics-si-units-3-play-again"
            onClick={restart}
          >
            {t('playAgain')}
          </button>
        </div>
        <Confetti pieces={40} />
      </div>
    );
  }

  return (
    <div className="pl-g7-physics-si-units-3-root">
      <h2 className="pl-g7-physics-si-units-3-title">{t('title')}</h2>

      <div className="pl-g7-physics-si-units-3-trail" aria-hidden="true">
        {questions.map((question, i) => (
          <span
            key={i}
            className={cx(
              'pl-g7-physics-si-units-3-trail-icon',
              i < safeIndex ? 'pl-g7-physics-si-units-3-trail-done' : '',
              i === safeIndex ? 'pl-g7-physics-si-units-3-trail-active' : ''
            )}
          >
            {question.emoji ?? i + 1}
          </span>
        ))}
      </div>

      <div className="pl-g7-physics-si-units-3-stage">
        <SlideView
          key={safeIndex}
          question={questions[safeIndex]}
          index={safeIndex}
          total={total}
          points={points}
          t={t}
          onSolved={handleSolved}
        />
      </div>
    </div>
  );
}
