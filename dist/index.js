import { createRoot } from 'react-dom/client';
import { useState } from 'react';
import { jsx, jsxs } from 'react/jsx-runtime';

// src/index.tsx
var TITLE = "SI Units and Basic Calculations";
var QUESTIONS = [
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
    "prompt": "Convert 5 kilometers to meters using the formula: distance (m) = distance (km) \xD7 1000.",
    "choices": [
      "500 m",
      "5000 m",
      "50,000 m",
      "5 m"
    ],
    "answerIndex": 1
  },
  {
    "prompt": "If a car travels 120 meters in 6 seconds, what is its speed in meters per second? Use the formula: speed = distance \xF7 time.",
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
function QuizApp({ context }) {
  const [selections, setSelections] = useState(
    () => Object.fromEntries(QUESTIONS.map((_, index) => [index, null]))
  );
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(null);
  const answeredCount = QUESTIONS.filter(
    (_, index) => selections[index] !== null
  ).length;
  const allAnswered = answeredCount === QUESTIONS.length;
  function handleSelect(questionIndex, choiceIndex) {
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
  return /* @__PURE__ */ jsxs("div", { className: "pl-g7-physics-si-units-3-root", children: [
    /* @__PURE__ */ jsx("h2", { className: "pl-g7-physics-si-units-3-title", children: TITLE }) ,
    /* @__PURE__ */ jsxs("p", { className: "pl-g7-physics-si-units-3-intro", children: [
      "Answer all ",
      QUESTIONS.length,
      " questions, then submit to check your work."
    ] }),
    QUESTIONS.map((question, questionIndex) => /* @__PURE__ */ jsxs(
      "section",
      {
        className: "pl-g7-physics-si-units-3-question",
        "aria-labelledby": `pl-g7-physics-si-units-3-q${questionIndex}-title`,
        children: [
          /* @__PURE__ */ jsx(
            "h3",
            {
              id: `pl-g7-physics-si-units-3-q${questionIndex}-title`,
              className: "pl-g7-physics-si-units-3-question-title",
              children: question.prompt
            }
          ),
          /* @__PURE__ */ jsx(
            "div",
            {
              className: "pl-g7-physics-si-units-3-options",
              role: "group",
              "aria-label": question.prompt,
              children: question.choices.map((choice, choiceIndex) => /* @__PURE__ */ jsx(
                "button",
                {
                  type: "button",
                  className: "pl-g7-physics-si-units-3-option",
                  "data-selected": selections[questionIndex] === choiceIndex,
                  "aria-pressed": selections[questionIndex] === choiceIndex,
                  onClick: () => handleSelect(questionIndex, choiceIndex),
                  children: choice
                },
                choiceIndex
              ))
            }
          )
        ]
      },
      questionIndex
    )),
    /* @__PURE__ */ jsxs("div", { className: "pl-g7-physics-si-units-3-actions", children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          className: "pl-g7-physics-si-units-3-submit",
          disabled: !allAnswered || submitted,
          onClick: handleSubmit,
          children: "Submit answers"
        }
      ),
      !allAnswered && !submitted ? /* @__PURE__ */ jsxs("p", { className: "pl-g7-physics-si-units-3-intro", children: [
        answeredCount,
        "/",
        QUESTIONS.length,
        " answered"
      ] }) : null
    ] }),
    submitted && score !== null ? /* @__PURE__ */ jsxs("p", { className: "pl-g7-physics-si-units-3-result", children: [
      "You scored ",
      score,
      " out of ",
      QUESTIONS.length,
      "."
    ] }) : null
  ] });
}
var roots = /* @__PURE__ */ new WeakMap();
function mount(root, context) {
  const reactRoot = createRoot(root);
  roots.set(root, reactRoot);
  reactRoot.render(/* @__PURE__ */ jsx(QuizApp, { context }));
  return () => {
    reactRoot.unmount();
    roots.delete(root);
  };
}

export { mount };
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map