import * as litHtml from 'lit-html';
import { getState, subscribe } from 'statezero';

import {
  createTemplateContainer, isTemplateContainer, isView, markView, markViewPartial, onlyOnce,
} from './utils';

const renderViewToEl = (view, el) => {
  if (el === undefined) {
    el = document.createDocumentFragment();
  }
  if (!(el instanceof Element || el instanceof DocumentFragment)) {
    throw new Error(`jetstart: renderView() must be called with a DocumentFragment, Element or undefined, not: ${el}`);
  }
  el.render = () => view(el);
  el.render();
  return el;
};

const toTemplateResult = (view) => {
  // views are not required to return anything, instead they should call `render()`. This function is part of a
  // mechanism for retrieving the templateResult produced by `render()`.
  const container = createTemplateContainer();
  view(container);
  return container.templateResult;
};

export const html = (strings, ...exps) =>
  litHtml.html.bind(litHtml)(strings, ...exps.map(exp => (isView(exp) ? toTemplateResult(exp) : exp)));

export const svg = (strings, ...exps) =>
  litHtml.svg(strings, ...exps.map(exp => (isView(exp) ? toTemplateResult(exp) : exp)));

const createRender = (elOrContainer) => {
  const shouldUseContainer = isTemplateContainer(elOrContainer);

  // `render` should only appear once within a view definition, because the behaviour with
  // multiple `render` calls with nested child views hasn't been validated.
  return onlyOnce((strings, ...exps) => {
    exps = exps.map(exp => (isView(exp) ? toTemplateResult(exp) : exp));

    const templateResult = html(strings, ...exps);
    if (shouldUseContainer) {
      elOrContainer.templateResult = templateResult;
      return templateResult;
    }
    litHtml.render(templateResult, elOrContainer);
    return elOrContainer;
  });
};

export const renderView = (view, el) => {
  el = renderViewToEl(view, el);
  subscribe(el.render);
  return el;
};

export const renderViewWithoutSubscribing = renderViewToEl;

export const view = fn =>
  markViewPartial((...args) => markView(el => fn({ render: createRender(el), state: getState() }, ...args)));
