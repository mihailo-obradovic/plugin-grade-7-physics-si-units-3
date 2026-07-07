import { createRoot } from 'react-dom/client';

import QuizApp from './QuizApp';

import type { PluginContext } from './types';
import type { Root } from 'react-dom/client';

const roots = new WeakMap<HTMLElement, Root>();

export function mount(
  root: HTMLElement,
  context: PluginContext
): () => void {
  const reactRoot = createRoot(root);
  roots.set(root, reactRoot);
  reactRoot.render(<QuizApp context={context} />);

  return () => {
    reactRoot.unmount();
    roots.delete(root);
  };
}
