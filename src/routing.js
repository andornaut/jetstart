import page from 'page';
import { subscribe } from 'statezero';

import { isView, isViewPartial } from './utils';
import { renderViewWithoutSubscribing } from './view';

export const router = (routerContainer, ...routes) => {
  let el;

  for (const exps of routes) {
    const lastIdx = exps.length - 1;

    page(
      // eslint-disable-next-line no-loop-func
      ...exps.map((exp, i) => {
        if (!isView(exp) && !isViewPartial(exp)) {
          return exp;
        }
        return (context, next) => {
          // A single subscription is registered below; it always renders the current view.
          el = renderViewWithoutSubscribing(exp());
          routerContainer.innerHTML = '';
          routerContainer.appendChild(el);
          if (i < lastIdx) {
            next();
          }
        };
      }),
    );
  }

  subscribe(() => {
    // If we've not rendered a view yet, then ``el.render` may be undefined, because it is
    // created by `renderViewWithoutSubscribing`.
    if (el && el.render) {
      el.render();
    }
  });
  return page;
};
