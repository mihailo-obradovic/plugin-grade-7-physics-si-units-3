import { createRoot } from 'react-dom/client';
import { useState, useRef, useEffect, useCallback, useSyncExternalStore } from 'react';
import { jsx, jsxs } from 'react/jsx-runtime';

// src/index.tsx

// src/content.ts
var QUESTIONS_BY_LOCALE = {
  "en": [
    {
      "prompt": "Which of the following is the correct SI unit for length?",
      "choices": [
        "centimeter (cm)",
        "meter (m)",
        "kilometer (km)",
        "mile (mi)"
      ],
      "answerIndex": 1,
      "emoji": "\u{1F4CF}"
    },
    {
      "prompt": "Convert 5 kilometers to meters using the formula: distance (m) = distance (km) \xD7 1000.",
      "choices": [
        "500 m",
        "5000 m",
        "50,000 m",
        "5 m"
      ],
      "answerIndex": 1,
      "emoji": "\u{1F6E3}\uFE0F"
    },
    {
      "prompt": "If a car travels 120 meters in 6 seconds, what is its speed in meters per second? Use the formula: speed = distance \xF7 time.",
      "choices": [
        "14 m/s",
        "20 m/s",
        "720 m/s",
        "0.05 m/s"
      ],
      "answerIndex": 1,
      "emoji": "\u{1F697}"
    },
    {
      "prompt": "Which of the following is NOT an SI base unit?",
      "choices": [
        "kilogram (kg) for mass",
        "second (s) for time",
        "kilometer (km) for distance",
        "ampere (A) for electric current"
      ],
      "answerIndex": 2,
      "emoji": "\u2696\uFE0F"
    }
  ],
  "sr-latn": [
    {
      "prompt": "Koja od sljede\u0107ih je ispravna SI jedinica za du\u017Einu?",
      "choices": [
        "centimetar (cm)",
        "metar (m)",
        "kilometar (km)",
        "milja (mi)"
      ],
      "answerIndex": 1,
      "emoji": "\u{1F4CF}"
    },
    {
      "prompt": "Pretvorite 5 kilometara u metre koriste\u0107i formulu: udaljenost (m) = udaljenost (km) \xD7 1000.",
      "choices": [
        "500 m",
        "5000 m",
        "50.000 m",
        "5 m"
      ],
      "answerIndex": 1,
      "emoji": "\u{1F6E3}\uFE0F"
    },
    {
      "prompt": "Ako automobil pre\u0111e 120 metara za 6 sekundi, koja mu je brzina u metrima po sekundi? Koristite formulu: brzina = udaljenost \xF7 vrijeme.",
      "choices": [
        "14 m/s",
        "20 m/s",
        "720 m/s",
        "0,05 m/s"
      ],
      "answerIndex": 1,
      "emoji": "\u{1F697}"
    },
    {
      "prompt": "Koja od sljede\u0107ih NIJE osnovna SI jedinica?",
      "choices": [
        "kilogram (kg) za masu",
        "sekunda (s) za vrijeme",
        "kilometar (km) za udaljenost",
        "amper (A) za elektri\u010Dnu struju"
      ],
      "answerIndex": 2,
      "emoji": "\u2696\uFE0F"
    }
  ],
  "sr-cyrl": [
    {
      "prompt": "\u041A\u043E\u0458\u0430 \u043E\u0434 \u0441\u0459\u0435\u0434\u0435\u045B\u0438\u0445 \u0458\u0435 \u0438\u0441\u043F\u0440\u0430\u0432\u043D\u0430 SI \u0458\u0435\u0434\u0438\u043D\u0438\u0446\u0430 \u0437\u0430 \u0434\u0443\u0436\u0438\u043D\u0443?",
      "choices": [
        "\u0446\u0435\u043D\u0442\u0438\u043C\u0435\u0442\u0430\u0440 (cm)",
        "\u043C\u0435\u0442\u0430\u0440 (m)",
        "\u043A\u0438\u043B\u043E\u043C\u0435\u0442\u0430\u0440 (km)",
        "\u043C\u0438\u0459\u0430 (mi)"
      ],
      "answerIndex": 1,
      "emoji": "\u{1F4CF}"
    },
    {
      "prompt": "\u041F\u0440\u0435\u0442\u0432\u043E\u0440\u0438\u0442\u0435 5 \u043A\u0438\u043B\u043E\u043C\u0435\u0442\u0430\u0440\u0430 \u0443 \u043C\u0435\u0442\u0440\u0435 \u043A\u043E\u0440\u0438\u0441\u0442\u0435\u045B\u0438 \u0444\u043E\u0440\u043C\u0443\u043B\u0443: \u0443\u0434\u0430\u0459\u0435\u043D\u043E\u0441\u0442 (m) = \u0443\u0434\u0430\u0459\u0435\u043D\u043E\u0441\u0442 (km) \xD7 1000.",
      "choices": [
        "500 m",
        "5000 m",
        "50.000 m",
        "5 m"
      ],
      "answerIndex": 1,
      "emoji": "\u{1F6E3}\uFE0F"
    },
    {
      "prompt": "\u0410\u043A\u043E \u0430\u0443\u0442\u043E\u043C\u043E\u0431\u0438\u043B \u043F\u0440\u0435\u0452\u0435 120 \u043C\u0435\u0442\u0430\u0440\u0430 \u0437\u0430 6 \u0441\u0435\u043A\u0443\u043D\u0434\u0438, \u043A\u043E\u0458\u0430 \u043C\u0443 \u0458\u0435 \u0431\u0440\u0437\u0438\u043D\u0430 \u0443 \u043C\u0435\u0442\u0440\u0438\u043C\u0430 \u043F\u043E \u0441\u0435\u043A\u0443\u043D\u0434\u0438? \u041A\u043E\u0440\u0438\u0441\u0442\u0438\u0442\u0435 \u0444\u043E\u0440\u043C\u0443\u043B\u0443: \u0431\u0440\u0437\u0438\u043D\u0430 = \u0443\u0434\u0430\u0459\u0435\u043D\u043E\u0441\u0442 \xF7 \u0432\u0440\u0438\u0458\u0435\u043C\u0435.",
      "choices": [
        "14 m/s",
        "20 m/s",
        "720 m/s",
        "0,05 m/s"
      ],
      "answerIndex": 1,
      "emoji": "\u{1F697}"
    },
    {
      "prompt": "\u041A\u043E\u0458\u0430 \u043E\u0434 \u0441\u0459\u0435\u0434\u0435\u045B\u0438\u0445 \u041D\u0418\u0408\u0415 \u043E\u0441\u043D\u043E\u0432\u043D\u0430 SI \u0458\u0435\u0434\u0438\u043D\u0438\u0446\u0430?",
      "choices": [
        "\u043A\u0438\u043B\u043E\u0433\u0440\u0430\u043C (kg) \u0437\u0430 \u043C\u0430\u0441\u0443",
        "\u0441\u0435\u043A\u0443\u043D\u0434\u0430 (s) \u0437\u0430 \u0432\u0440\u0438\u0458\u0435\u043C\u0435",
        "\u043A\u0438\u043B\u043E\u043C\u0435\u0442\u0430\u0440 (km) \u0437\u0430 \u0443\u0434\u0430\u0459\u0435\u043D\u043E\u0441\u0442",
        "\u0430\u043C\u043F\u0435\u0440 (A) \u0437\u0430 \u0435\u043B\u0435\u043A\u0442\u0440\u0438\u0447\u043D\u0443 \u0441\u0442\u0440\u0443\u0458\u0443"
      ],
      "answerIndex": 2,
      "emoji": "\u2696\uFE0F"
    }
  ]
};

// src/i18n/messages/en.json
var en_default = {
  title: "SI Units and Basic Calculations",
  progress: "Question {done} of {total}",
  correct: "Great job!",
  wrong: "Not yet \u2014 try again!",
  completeTitle: "You did it!",
  completeBody: "You answered all {count} questions!",
  playAgain: "Play again"
};

// src/i18n/messages/sr-cyrl.json
var sr_cyrl_default = {
  title: "SI \u0458\u0435\u0434\u0438\u043D\u0438\u0446\u0435 \u0438 \u043E\u0441\u043D\u043E\u0432\u043D\u0438 \u043F\u0440\u043E\u0440\u0430\u0447\u0443\u043D\u0438",
  progress: "\u041F\u0438\u0442\u0430\u045A\u0435 {done} \u043E\u0434 {total}",
  correct: "\u0411\u0440\u0430\u0432\u043E!",
  wrong: "\u0408\u043E\u0448 \u043D\u0435 \u2014 \u043F\u043E\u043A\u0443\u0448\u0430\u0458 \u043F\u043E\u043D\u043E\u0432\u043E!",
  completeTitle: "\u0421\u0458\u0430\u0458\u043D\u043E!",
  completeBody: "\u0420\u0438\u0458\u0435\u0448\u0435\u043D\u0430 \u0441\u0443 \u0441\u0432\u0430 \u043F\u0438\u0442\u0430\u045A\u0430 \u2014 \u0441\u0432\u0438\u0445 {count}!",
  playAgain: "\u0418\u0433\u0440\u0430\u0458 \u043F\u043E\u043D\u043E\u0432\u043E"
};

// src/i18n/messages/sr-latn.json
var sr_latn_default = {
  title: "SI jedinice i osnovni prora\u010Duni",
  progress: "Pitanje {done} od {total}",
  correct: "Bravo!",
  wrong: "Jo\u0161 ne \u2014 poku\u0161aj ponovo!",
  completeTitle: "Sjajno!",
  completeBody: "Rije\u0161ena su sva pitanja \u2014 svih {count}!",
  playAgain: "Igraj ponovo"
};

// src/i18n/messages.ts
var pluginMessages = {
  en: en_default,
  "sr-latn": sr_latn_default,
  "sr-cyrl": sr_cyrl_default
};

// src/i18n/usePluginTranslations.ts
function formatMessage(template, values) {
  if (!values) {
    return template;
  }
  return template.replace(/\{(\w+)\}/g, (_, key) => {
    const value = values[key];
    return value === void 0 ? `{${key}}` : String(value);
  });
}
function usePluginLocale(i18n) {
  return useSyncExternalStore(i18n.subscribe, i18n.getLocale, i18n.getLocale);
}
function usePluginTranslations(i18n) {
  const locale = usePluginLocale(i18n);
  const catalog = pluginMessages[locale];
  return useCallback(
    (key, values) => formatMessage(catalog[key], values),
    [catalog]
  );
}
var CELEBRATE_MS = 1500;
var LONG_CHOICE_CHARS = 28;
var cx = (...names) => names.filter(Boolean).join(" ");
function optionsLayout(choices) {
  if (choices.some((choice) => choice.length > LONG_CHOICE_CHARS)) {
    return "column";
  }
  return choices.length === 3 ? "row" : "grid";
}
function stepStyle(i) {
  return { ["--pl-i"]: i };
}
function Confetti({ pieces = 28 }) {
  return /* @__PURE__ */ jsx("div", { className: "pl-g7-physics-si-units-3-confetti", "aria-hidden": "true", children: Array.from({ length: pieces }).map((_, i) => {
    const style = {
      ["--pl-x"]: `${i * 37 % 100}%`,
      ["--pl-hue"]: i * 47 % 360,
      ["--pl-delay"]: `${i % 7 * 90}ms`,
      ["--pl-dur"]: `${1400 + i * 53 % 900}ms`
    };
    return /* @__PURE__ */ jsx("span", { className: "pl-g7-physics-si-units-3-confetti-piece", style }, i);
  }) });
}
function SlideView({
  question,
  index,
  total,
  points,
  t,
  onSolved
}) {
  const { prompt, choices, answerIndex, emoji } = question;
  const [wrong, setWrong] = useState(() => /* @__PURE__ */ new Set());
  const [wrongCount, setWrongCount] = useState(0);
  const [solvedIndex, setSolvedIndex] = useState(null);
  const solved = solvedIndex !== null;
  const handlePick = (choiceIndex) => {
    if (solved || wrong.has(choiceIndex)) {
      return;
    }
    if (choiceIndex === answerIndex) {
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
  const feedback = solved ? t("correct") : wrongCount > 0 ? t("wrong") : "";
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: cx(
        "pl-g7-physics-si-units-3-slide",
        solved ? "pl-g7-physics-si-units-3-slide-solved" : ""
      ),
      children: [
        emoji ? /* @__PURE__ */ jsx("span", { className: "pl-g7-physics-si-units-3-emoji", "aria-hidden": "true", children: emoji }) : null,
        /* @__PURE__ */ jsx("h3", { className: "pl-g7-physics-si-units-3-prompt", children: prompt }),
        /* @__PURE__ */ jsx("div", { className: "pl-g7-physics-si-units-3-options", "data-layout": optionsLayout(choices), children: choices.map((choice, choiceIndex) => {
          const isWrong = wrong.has(choiceIndex);
          const isRight = solvedIndex === choiceIndex;
          return /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              className: cx(
                "pl-g7-physics-si-units-3-option",
                isWrong ? "pl-g7-physics-si-units-3-option-wrong" : "",
                isRight ? "pl-g7-physics-si-units-3-option-right" : ""
              ),
              style: stepStyle(choiceIndex),
              onClick: () => handlePick(choiceIndex),
              disabled: solved || isWrong,
              children: choice
            },
            choiceIndex
          );
        }) }),
        /* @__PURE__ */ jsx("p", { className: "pl-g7-physics-si-units-3-sr-only", "aria-live": "polite", children: feedback }),
        /* @__PURE__ */ jsx("p", { className: "pl-g7-physics-si-units-3-step", children: t("progress", { done: index + 1, total }) }),
        solved ? /* @__PURE__ */ jsx(Confetti, {}) : null
      ]
    }
  );
}
function QuizApp({ context }) {
  const t = usePluginTranslations(context.i18n);
  const locale = usePluginLocale(context.i18n);
  const questions = QUESTIONS_BY_LOCALE[locale];
  const total = questions.length;
  const points = 100 / total;
  const [slideIndex, setSlideIndex] = useState(0);
  const [completed, setCompleted] = useState(false);
  const earnedRef = useRef(0);
  const advanceTimer = useRef(null);
  const clearAdvance = () => {
    if (advanceTimer.current) {
      clearTimeout(advanceTimer.current);
      advanceTimer.current = null;
    }
  };
  useEffect(() => clearAdvance, []);
  const handleSolved = useCallback(
    (index, earned) => {
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
  const safeIndex = Math.min(slideIndex, total - 1);
  if (completed) {
    return /* @__PURE__ */ jsxs("div", { className: "pl-g7-physics-si-units-3-root", children: [
      /* @__PURE__ */ jsxs("div", { className: "pl-g7-physics-si-units-3-complete", children: [
        /* @__PURE__ */ jsx("div", { className: "pl-g7-physics-si-units-3-parade", "aria-hidden": "true", children: questions.map((question, i) => /* @__PURE__ */ jsx(
          "span",
          {
            className: "pl-g7-physics-si-units-3-parade-obj",
            style: stepStyle(i),
            children: question.emoji ?? "\u2B50"
          },
          i
        )) }),
        /* @__PURE__ */ jsx("h2", { className: "pl-g7-physics-si-units-3-complete-title", children: t("completeTitle") }),
        /* @__PURE__ */ jsx("p", { className: "pl-g7-physics-si-units-3-complete-body", children: t("completeBody", { count: total }) }),
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            className: "pl-g7-physics-si-units-3-play-again",
            onClick: restart,
            children: t("playAgain")
          }
        )
      ] }),
      /* @__PURE__ */ jsx(Confetti, { pieces: 40 })
    ] });
  }
  return /* @__PURE__ */ jsxs("div", { className: "pl-g7-physics-si-units-3-root", children: [
    /* @__PURE__ */ jsx("h2", { className: "pl-g7-physics-si-units-3-title", children: t("title") }),
    /* @__PURE__ */ jsx("div", { className: "pl-g7-physics-si-units-3-trail", "aria-hidden": "true", children: questions.map((question, i) => /* @__PURE__ */ jsx(
      "span",
      {
        className: cx(
          "pl-g7-physics-si-units-3-trail-icon",
          i < safeIndex ? "pl-g7-physics-si-units-3-trail-done" : "",
          i === safeIndex ? "pl-g7-physics-si-units-3-trail-active" : ""
        ),
        children: question.emoji ?? i + 1
      },
      i
    )) }),
    /* @__PURE__ */ jsx("div", { className: "pl-g7-physics-si-units-3-stage", children: /* @__PURE__ */ jsx(
      SlideView,
      {
        question: questions[safeIndex],
        index: safeIndex,
        total,
        points,
        t,
        onSolved: handleSolved
      },
      safeIndex
    ) })
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