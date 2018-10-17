# jetstart

Small, simple, functional JavaScript library for building web interfaces.

Jetstart integrates
[lit-html](https://github.com/Polymer/lit-html),
[page.js](https://github.com/visionmedia/page.js), and
[statezero](https://github.com/andornaut/statezero).

See the [jetstart-boilerplate](https://github.com/andornaut/jetstart-boilerplate) project to get started.

## Getting Started

Install from [npm](https://www.npmjs.com/package/jetstart).

```bash
npm install jetstart --save
```

Jetstart is packaged using the [Universal Module Definition](https://github.com/umdjs/umd) pattern, so it can be loaded
in various environments:

### Browser Global

```html
<script src="./node_modules/jetstart/dist/jetstart.js"></script>
<script>
  const { action, router, view } = window.jetstart;
</script>
```

### ES6 Module

```javascript
import { action, router, view } from 'jetstart';
```

### Node

```javascript
const { action, router, view } = require('jetstart');
```

## Concepts

### Views

Views are invoked with a `context` argument, which can be destructured like so:

```javascript
view(({ render, state }) => render`${state}`);
```

The `context` object contains all of the names exported by lit-html, including all of its
[directives](https://polymer.github.io/lit-html/guide/writing-templates.html#directives), as well as a few
Jetstart-specific properties:

| Name       | Type     | Description                                                                                       |
| ---------- | -------- | ------------------------------------------------------------------------------------------------- |
| html       | Function | Wraps lit-html's `html()` to add support for Jetstart views                                       |
| render     | Function | Views in jetstart typically return the result of calling `render` on a tagged template literal    |
| repeatView | Function | Like `repeat`, but called with a function that returns a view instead of a template               |
| state      | Object   | The result of calling [statezero's](https://github.com/andornaut/statezero) `getState()` function |

Views can also accept arbitrary parameters, such as the `text` parameter of the `span` view below:

```javascript
import { renderView, view } from 'jetstart';

const span = view(({ render }, text) => render`<span>${text}</span>`);

const header = view(({ render }, left, right) => render`<h1>${span(left)} ${span(right)}</h1>`);

renderView(header('hello', 'world'), document.body);
```

See [lit-html](https://github.com/Polymer/lit-html) for more information.

### State

Jetstart uses [statezero](https://github.com/andornaut/statezero) to manage a single, global, immutable state
graph. Changes to state can be applied by calling `commit(newState)`, which causes all views to be (efficiently)
re-rendered.

```javascript
import { action, renderView, view } from 'jetstart';

const time = view(({ render, state }, placeholder) => render`<time>${state.time || placeholder}</time>`);

const updateTime = action(({ commit, state }) => {
  state.time = new Date();
  commit(state);
});

renderView(time('Loading...'), document.body);

setInterval(updateTime);
```

See [statezero](https://github.com/andornaut/statezero) for more information.

### Routing

```javascript
import { router, view } from 'jetstart';

const foo = view(({ render }) => render`<h1>foo</h1><a href="/bar">bar</a>`);

const bar = view(({ render }) => render`<h1>bar</h1><a href="/foo">foo</a>`);

router(document.body, ['/', '/foo'], ['/foo', foo], ['/bar', bar]).start();
```

See [page.js](https://github.com/visionmedia/page.js) for more information.

## Developing

```
npm install
npm run build
```
