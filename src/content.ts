export const QUESTIONS_BY_LOCALE = {
  en: [
    {
      prompt: 'Which of the following is the correct SI unit for length?',
      choices: ['centimeter (cm)', 'meter (m)', 'kilometer (km)', 'mile (mi)'],
      answerIndex: 1
    },
    {
      prompt:
        'Convert 5 kilometers to meters using the formula: distance (m) = distance (km) × 1000.',
      choices: ['500 m', '5000 m', '50,000 m', '5 m'],
      answerIndex: 1
    },
    {
      prompt:
        'If a car travels 120 meters in 6 seconds, what is its speed in meters per second? Use the formula: speed = distance ÷ time.',
      choices: ['14 m/s', '20 m/s', '720 m/s', '0.05 m/s'],
      answerIndex: 1
    },
    {
      prompt: 'Which of the following is NOT an SI base unit?',
      choices: [
        'kilogram (kg) for mass',
        'second (s) for time',
        'kilometer (km) for distance',
        'ampere (A) for electric current'
      ],
      answerIndex: 2
    }
  ],
  'sr-latn': [
    {
      prompt: 'Koja od sljedećih je ispravna SI jedinica za dužinu?',
      choices: ['centimetar (cm)', 'metar (m)', 'kilometar (km)', 'milja (mi)'],
      answerIndex: 1
    },
    {
      prompt:
        'Pretvorite 5 kilometara u metre koristeći formulu: udaljenost (m) = udaljenost (km) × 1000.',
      choices: ['500 m', '5000 m', '50.000 m', '5 m'],
      answerIndex: 1
    },
    {
      prompt:
        'Ako automobil pređe 120 metara za 6 sekundi, koja mu je brzina u metrima po sekundi? Koristite formulu: brzina = udaljenost ÷ vrijeme.',
      choices: ['14 m/s', '20 m/s', '720 m/s', '0,05 m/s'],
      answerIndex: 1
    },
    {
      prompt: 'Koja od sljedećih NIJE osnovna SI jedinica?',
      choices: [
        'kilogram (kg) za masu',
        'sekunda (s) za vrijeme',
        'kilometar (km) za udaljenost',
        'amper (A) za električnu struju'
      ],
      answerIndex: 2
    }
  ],
  'sr-cyrl': [
    {
      prompt: 'Која од сљедећих је исправна SI јединица за дужину?',
      choices: ['центиметар (cm)', 'метар (m)', 'километар (km)', 'миља (mi)'],
      answerIndex: 1
    },
    {
      prompt:
        'Претворите 5 километара у метре користећи формулу: удаљеност (m) = удаљеност (km) × 1000.',
      choices: ['500 m', '5000 m', '50.000 m', '5 m'],
      answerIndex: 1
    },
    {
      prompt:
        'Ако аутомобил пређе 120 метара за 6 секунди, која му је брзина у метрима по секунди? Користите формулу: брзина = удаљеност ÷ вријеме.',
      choices: ['14 m/s', '20 m/s', '720 m/s', '0,05 m/s'],
      answerIndex: 1
    },
    {
      prompt: 'Која од сљедећих НИЈЕ основна SI јединица?',
      choices: [
        'килограм (kg) за масу',
        'секунда (s) за вријеме',
        'километар (km) за удаљеност',
        'ампер (A) за електричну струју'
      ],
      answerIndex: 2
    }
  ]
} as const;
