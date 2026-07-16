import { readFile } from 'node:fs/promises';
import path from 'node:path';

import { describe, expect, it } from 'vitest';

import { pluginMessages } from './messages';

const locales = ['en', 'sr-latn', 'sr-cyrl'] as const;

describe('si units localization', () => {
  it('has complete catalogs without migration placeholders', () => {
    const referenceKeys = Object.keys(pluginMessages.en).sort();

    for (const locale of locales) {
      expect(Object.keys(pluginMessages[locale]).sort()).toEqual(referenceKeys);
      expect(JSON.stringify(pluginMessages[locale])).not.toContain('TODO');
    }
  });

  it('contains localized controls in both Serbian scripts', () => {
    expect(pluginMessages['sr-latn'].playAgain).toBe('Igraj ponovo');
    expect(pluginMessages['sr-cyrl'].playAgain).toBe('Играј поново');
  });

  it('contains locale-keyed questions in both Serbian scripts', async () => {
    const source = await readFile(
      path.join(process.cwd(), 'src/content.ts'),
      'utf8'
    );

    expect(source).toMatch(/jedinica/i);
    expect(source).toMatch(/јединица/i);
  });

  it('renders through the live plugin locale channel', async () => {
    const source = await readFile(
      path.join(process.cwd(), 'src/QuizApp.tsx'),
      'utf8'
    );

    expect(source).toContain('usePluginLocale(context.i18n)');
    expect(source).toContain('usePluginTranslations(context.i18n)');
    expect(source).not.toMatch(/context\.i18n\.getLocale\(\)/);
    expect(source).toContain('QUESTIONS_BY_LOCALE');
    expect(source).not.toContain('Submit answers');
  });

  it('packages message catalogs with the release artifacts', async () => {
    const source = await readFile(
      path.join(process.cwd(), 'scripts/package-github.mjs'),
      'utf8'
    );

    expect(source).toContain("path.join(repoRoot, 'src/i18n/messages')");
    expect(source).toContain("path.join(distDir, 'messages')");
  });
});
