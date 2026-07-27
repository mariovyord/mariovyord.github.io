---
title: "Dynamic Import in JavaScript"
description: "Using dynamic import() for lazy-loading in JavaScript."
pubDate: "January 13 2026"
tags: ["javascript", "frontend"]
status: "evergreen"
---

Modern JavaScript applications can greatly benefit from dynamic `import()`, a feature that allows you to load modules only when needed. While static import works well for core dependencies, dynamic `import()` is perfect for improving performance and reducing the initial load time of large apps.

## Static import

A traditional static import loads the module when the script runs, and looks like this:

```javascript
import { doStuff } from "./utils.mjs";
doStuff();
```

This is great for essential code that should be loaded upfront. But what if you want to load something only when the user needs it?

## Dynamic import() to the Rescue

Dynamic `import()` lets you load code on demand. It returns a Promise, which resolves to the module object:

```javascript
const module = await import("./utils.mjs");
module.doStuff();
```

You can even use this pattern to load modules based on user actions or runtime conditions.

## Real-World Examples

1. **Navigation-based Lazy-Loading**

   In single-page applications (SPAs), you can load content modules only when the user navigates. Like in Angular you can do:

```javascript
{
    path: 'my-route',
    loadComponent: () =>
        import('./components/my-component/my-component.component')
            .then((m) => m.MyComponent,),
},
```

2.  **Lazy-Loading a Component**

    You can defer loading component’s code until it is rendered for the first time. In React you can use the `lazy` function:

```javascript
import { lazy } from "react";
const MarkdownPreview = lazy(() => import("./MarkdownPreview.js"));
```

3. **Lazy-Loading a Large Third Party Library**

   In one of my projects, I have used dynamic `import()` to load a large emoji library only when the user opened the emoji picker:

```javascript
button.addEventListener("click", async () => {
  const emojiLib = await import("./big-emoji-lib.js");
  emojiLib.showPicker();
});
```

This pattern significantly improved performance by avoiding the loading cost of the emoji package on the initial page load.

## Browser Support

Supported in all major browsers and NodeJS.

## Links

- [V8 Dynamic import()](https://v8.dev/features/dynamic-import)
- [Angular Lazy Loading](https://angular.dev/api/router/Route#lazy-loading)
- [React Lazy Function](https://react.dev/reference/react/lazy)
