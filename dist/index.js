import { createRoot } from 'react-dom/client';
import { useState, useCallback, useSyncExternalStore } from 'react';
import { jsx, jsxs } from 'react/jsx-runtime';

// src/index.tsx

// src/content.ts
var QUESTIONS_BY_LOCALE = {
  en: [
    {
      prompt: "Which of the following is the correct SI unit for length?",
      choices: ["centimeter (cm)", "meter (m)", "kilometer (km)", "mile (mi)"],
      answerIndex: 1
    },
    {
      prompt: "Convert 5 kilometers to meters using the formula: distance (m) = distance (km) \xD7 1000.",
      choices: ["500 m", "5000 m", "50,000 m", "5 m"],
      answerIndex: 1
    },
    {
      prompt: "If a car travels 120 meters in 6 seconds, what is its speed in meters per second? Use the formula: speed = distance \xF7 time.",
      choices: ["14 m/s", "20 m/s", "720 m/s", "0.05 m/s"],
      answerIndex: 1
    },
    {
      prompt: "Which of the following is NOT an SI base unit?",
      choices: [
        "kilogram (kg) for mass",
        "second (s) for time",
        "kilometer (km) for distance",
        "ampere (A) for electric current"
      ],
      answerIndex: 2
    }
  ],
  "sr-latn": [
    {
      prompt: "Koja od sljede\u0107ih je ispravna SI jedinica za du\u017Einu?",
      choices: ["centimetar (cm)", "metar (m)", "kilometar (km)", "milja (mi)"],
      answerIndex: 1
    },
    {
      prompt: "Pretvorite 5 kilometara u metre koriste\u0107i formulu: udaljenost (m) = udaljenost (km) \xD7 1000.",
      choices: ["500 m", "5000 m", "50.000 m", "5 m"],
      answerIndex: 1
    },
    {
      prompt: "Ako automobil pre\u0111e 120 metara za 6 sekundi, koja mu je brzina u metrima po sekundi? Koristite formulu: brzina = udaljenost \xF7 vrijeme.",
      choices: ["14 m/s", "20 m/s", "720 m/s", "0,05 m/s"],
      answerIndex: 1
    },
    {
      prompt: "Koja od sljede\u0107ih NIJE osnovna SI jedinica?",
      choices: [
        "kilogram (kg) za masu",
        "sekunda (s) za vrijeme",
        "kilometar (km) za udaljenost",
        "amper (A) za elektri\u010Dnu struju"
      ],
      answerIndex: 2
    }
  ],
  "sr-cyrl": [
    {
      prompt: "\u041A\u043E\u0458\u0430 \u043E\u0434 \u0441\u0459\u0435\u0434\u0435\u045B\u0438\u0445 \u0458\u0435 \u0438\u0441\u043F\u0440\u0430\u0432\u043D\u0430 SI \u0458\u0435\u0434\u0438\u043D\u0438\u0446\u0430 \u0437\u0430 \u0434\u0443\u0436\u0438\u043D\u0443?",
      choices: ["\u0446\u0435\u043D\u0442\u0438\u043C\u0435\u0442\u0430\u0440 (cm)", "\u043C\u0435\u0442\u0430\u0440 (m)", "\u043A\u0438\u043B\u043E\u043C\u0435\u0442\u0430\u0440 (km)", "\u043C\u0438\u0459\u0430 (mi)"],
      answerIndex: 1
    },
    {
      prompt: "\u041F\u0440\u0435\u0442\u0432\u043E\u0440\u0438\u0442\u0435 5 \u043A\u0438\u043B\u043E\u043C\u0435\u0442\u0430\u0440\u0430 \u0443 \u043C\u0435\u0442\u0440\u0435 \u043A\u043E\u0440\u0438\u0441\u0442\u0435\u045B\u0438 \u0444\u043E\u0440\u043C\u0443\u043B\u0443: \u0443\u0434\u0430\u0459\u0435\u043D\u043E\u0441\u0442 (m) = \u0443\u0434\u0430\u0459\u0435\u043D\u043E\u0441\u0442 (km) \xD7 1000.",
      choices: ["500 m", "5000 m", "50.000 m", "5 m"],
      answerIndex: 1
    },
    {
      prompt: "\u0410\u043A\u043E \u0430\u0443\u0442\u043E\u043C\u043E\u0431\u0438\u043B \u043F\u0440\u0435\u0452\u0435 120 \u043C\u0435\u0442\u0430\u0440\u0430 \u0437\u0430 6 \u0441\u0435\u043A\u0443\u043D\u0434\u0438, \u043A\u043E\u0458\u0430 \u043C\u0443 \u0458\u0435 \u0431\u0440\u0437\u0438\u043D\u0430 \u0443 \u043C\u0435\u0442\u0440\u0438\u043C\u0430 \u043F\u043E \u0441\u0435\u043A\u0443\u043D\u0434\u0438? \u041A\u043E\u0440\u0438\u0441\u0442\u0438\u0442\u0435 \u0444\u043E\u0440\u043C\u0443\u043B\u0443: \u0431\u0440\u0437\u0438\u043D\u0430 = \u0443\u0434\u0430\u0459\u0435\u043D\u043E\u0441\u0442 \xF7 \u0432\u0440\u0438\u0458\u0435\u043C\u0435.",
      choices: ["14 m/s", "20 m/s", "720 m/s", "0,05 m/s"],
      answerIndex: 1
    },
    {
      prompt: "\u041A\u043E\u0458\u0430 \u043E\u0434 \u0441\u0459\u0435\u0434\u0435\u045B\u0438\u0445 \u041D\u0418\u0408\u0415 \u043E\u0441\u043D\u043E\u0432\u043D\u0430 SI \u0458\u0435\u0434\u0438\u043D\u0438\u0446\u0430?",
      choices: [
        "\u043A\u0438\u043B\u043E\u0433\u0440\u0430\u043C (kg) \u0437\u0430 \u043C\u0430\u0441\u0443",
        "\u0441\u0435\u043A\u0443\u043D\u0434\u0430 (s) \u0437\u0430 \u0432\u0440\u0438\u0458\u0435\u043C\u0435",
        "\u043A\u0438\u043B\u043E\u043C\u0435\u0442\u0430\u0440 (km) \u0437\u0430 \u0443\u0434\u0430\u0459\u0435\u043D\u043E\u0441\u0442",
        "\u0430\u043C\u043F\u0435\u0440 (A) \u0437\u0430 \u0435\u043B\u0435\u043A\u0442\u0440\u0438\u0447\u043D\u0443 \u0441\u0442\u0440\u0443\u0458\u0443"
      ],
      answerIndex: 2
    }
  ]
};

// src/i18n/messages/en.json
var en_default = {
  title: "SI Units and Basic Calculations",
  intro: "Answer all {count} questions, then submit to check your work.",
  submit: "Submit answers",
  progress: "{answered}/{total} answered",
  result: "You scored {score} out of {total}."
};

// src/i18n/messages/sr-cyrl.json
var sr_cyrl_default = {
  title: "SI \u0458\u0435\u0434\u0438\u043D\u0438\u0446\u0435 \u0438 \u043E\u0441\u043D\u043E\u0432\u043D\u0438 \u043F\u0440\u043E\u0440\u0430\u0447\u0443\u043D\u0438",
  intro: "\u041E\u0434\u0433\u043E\u0432\u043E\u0440\u0438\u0442\u0435 \u043D\u0430 \u0441\u0432\u0438\u0445 {count} \u043F\u0438\u0442\u0430\u045A\u0430, \u043F\u0430 \u043F\u043E\u0448\u0430\u0459\u0438\u0442\u0435 \u043E\u0434\u0433\u043E\u0432\u043E\u0440\u0435.",
  submit: "\u041F\u043E\u0448\u0430\u0459\u0438 \u043E\u0434\u0433\u043E\u0432\u043E\u0440\u0435",
  progress: "{answered}/{total} \u043E\u0434\u0433\u043E\u0432\u043E\u0440\u0435\u043D\u043E",
  result: "\u041E\u0441\u0432\u043E\u0458\u0438\u043B\u0438 \u0441\u0442\u0435 {score} \u043E\u0434 {total} \u0431\u043E\u0434\u043E\u0432\u0430."
};

// src/i18n/messages/sr-latn.json
var sr_latn_default = {
  title: "SI jedinice i osnovni prora\u010Duni",
  intro: "Odgovorite na svih {count} pitanja, pa po\u0161aljite odgovore.",
  submit: "Po\u0161alji odgovore",
  progress: "{answered}/{total} odgovoreno",
  result: "Osvojili ste {score} od {total} bodova."
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
function QuizApp({ context }) {
  const t = usePluginTranslations(context.i18n);
  const locale = usePluginLocale(context.i18n);
  const questions = QUESTIONS_BY_LOCALE[locale];
  const [selections, setSelections] = useState(
    () => Object.fromEntries(questions.map((_, index) => [index, null]))
  );
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(null);
  const answeredCount = questions.filter(
    (_, index) => selections[index] !== null
  ).length;
  const allAnswered = answeredCount === questions.length;
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
  return /* @__PURE__ */ jsxs("div", { className: "pl-g7-physics-si-units-3-root", children: [
    /* @__PURE__ */ jsx("h2", { className: "pl-g7-physics-si-units-3-title", children: t("title") }),
    /* @__PURE__ */ jsx("p", { className: "pl-g7-physics-si-units-3-intro", children: t("intro", { count: questions.length }) }),
    questions.map((question, questionIndex) => /* @__PURE__ */ jsxs(
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
          children: t("submit")
        }
      ),
      !allAnswered && !submitted ? /* @__PURE__ */ jsx("p", { className: "pl-g7-physics-si-units-3-intro", children: t("progress", {
        answered: answeredCount,
        total: questions.length
      }) }) : null
    ] }),
    submitted && score !== null ? /* @__PURE__ */ jsx("p", { className: "pl-g7-physics-si-units-3-result", children: t("result", { score, total: questions.length }) }) : null
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