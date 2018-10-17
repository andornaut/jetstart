import { repeat } from 'lit-html/directives/repeat';

import { createTemplateContainer } from './utils';

export * from 'lit-html/directives/async-append';
export * from 'lit-html/directives/async-replace';
export * from 'lit-html/directives/guard';
export * from 'lit-html/directives/if-defined';
export * from 'lit-html/directives/repeat';
export * from 'lit-html/directives/unsafe-html';
export * from 'lit-html/directives/until';
export * from 'lit-html/directives/when';

export const repeatView = (items, keyFn, view) => {
  if (!view) {
    // `repeat()` will use create a default `keyFn`.
    view = keyFn;
    keyFn = null;
  }
  return repeat(items, keyFn, (item) => {
    const partialView = view(item);
    const container = createTemplateContainer();
    partialView(container);
    return container.templateResult;
  });
};
