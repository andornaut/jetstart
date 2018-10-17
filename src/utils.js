const TEMPLATE_CONTAINER_MARKER = Symbol('jetstart: repeat marker');
const VIEW_MARKER = Symbol('jetstart: view marker');
const VIEW_PATIAL_MARKER = Symbol('jetstart: view partial marker');

export const isTemplateContainer = exp => !!exp[TEMPLATE_CONTAINER_MARKER];

export const isView = exp => typeof exp === 'function' && exp[VIEW_MARKER];

export const isViewPartial = exp => typeof exp === 'function' && exp[VIEW_PATIAL_MARKER];

export const createTemplateContainer = () => ({
  [TEMPLATE_CONTAINER_MARKER]: true,
});

export const markView = (fn) => {
  fn[VIEW_MARKER] = true;
  return fn;
};

export const markViewPartial = (fn) => {
  fn[VIEW_PATIAL_MARKER] = true;
  return fn;
};

export const onlyOnce = (fn) => {
  let called = false;
  return (...args) => {
    if (called) {
      throw new Error(`jetstart: Illegal attempt to call the following function more than once: ${fn}`);
    }
    called = true;
    return fn(...args);
  };
};
