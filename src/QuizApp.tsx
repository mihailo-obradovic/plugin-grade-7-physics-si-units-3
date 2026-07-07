import { useState } from 'react';

import type { PluginContext } from './types';

type Question = {
  prompt: string;
  choices: string[];
  answerIndex: number;
};

const TITLE = 'SI Units and Basic Calculations';

const QUESTIONS: Question[] = [
  {
    "prompt": "Which of the following is the correct SI unit for length?",
    "choices": [
      "centimeter (cm)",
      "meter (m)",
      "kilometer (km)",
      "mile (mi)"
    ],
    "answerIndex": 1
  },
  {
    "prompt": "Convert 5 kilometers to meters using the formula: distance (m) = distance (km) × 1000.",
    "choices": [
      "500 m",
      "5000 m",
      "50,000 m",
      "5 m"
    ],
    "answerIndex": 1
  },
  {
    "prompt": "If a car travels 120 meters in 6 seconds, what is its speed in meters per second? Use the formula: speed = distance ÷ time.",
    "choices": [
      "14 m/s",
      "20 m/s",
      "720 m/s",
      "0.05 m/s"
    ],
    "answerIndex": 1
  },
  {
    "prompt": "Which of the following is NOT an SI base unit?",
    "choices": [
      "kilogram (kg) for mass",
      "second (s) for time",
      "kilometer (km) for distance",
      "ampere (A) for electric current"
    ],
    "answerIndex": 2
  }
];

type Props = {
  context: PluginContext;
};

export default function QuizApp({ context }: Props) {
  const [selections, setSelections] = useState<Record<number, number | null>>(() =>
    Object.fromEntries(QUESTIONS.map((_, index) => [index, null]))
  );
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState<number | null>(null);

  const answeredCount = QUESTIONS.filter(
    (_, index) => selections[index] !== null
  ).length;
  const allAnswered = answeredCount === QUESTIONS.length;

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

    const nextScore = QUESTIONS.reduce((total, question, index) => {
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
      {TITLE ? <h2 className="pl-g7-physics-si-units-3-title">{TITLE}</h2> : null}

      <p className="pl-g7-physics-si-units-3-intro">
        Answer all {QUESTIONS.length} questions, then submit to check your work.
      </p>

      {QUESTIONS.map((question, questionIndex) => (
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
          Submit answers
        </button>

        {!allAnswered && !submitted ? (
          <p className="pl-g7-physics-si-units-3-intro">
            {answeredCount}/{QUESTIONS.length} answered
          </p>
        ) : null}
      </div>

      {submitted && score !== null ? (
        <p className="pl-g7-physics-si-units-3-result">
          You scored {score} out of {QUESTIONS.length}.
        </p>
      ) : null}
    </div>
  );
}
