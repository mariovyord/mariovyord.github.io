---
title: "How to enable format-on-save for Astro in VS Code"
description: "To enable format-on-save in VS Code for an Astro project, you need to add a few lines of configuration"
pubDate: "February 29 2024"
---

If you have an [Astro](https://astro.build/) project and your Prettier extension in VS Code isn't formatting files on save, fear not. There are just a few lines of configuration needed.

All you need do is to add the following to your `settings.json` in VS Code:

```js
  "prettier.documentSelectors": ["**/*.astro"],
  "[astro]": {
    "editor.defaultFormatter": "astro-build.astro-vscode"
  }
```

## How to open `settings.json`

Fastest way to open the file in VS Code is:

- Windows: press `Ctrl` + `Shift` + `P`
- Mac: press `⌘` + `Shift` + `P`
- Type `settings.json` into command palette and press `Enter`.

## Prerequisites

1. Make sure you have `Prettier` and `Astro` VS Code extentions installed.
2. In your VS Code Settings `Editor: Format On Save` should be enabled

   ![Editor: Format On Save screenshot](../../assets/how-to-enable-prettier-for-astro/settings.png)

3. Open `settings.json` and make sure `"editor.formatOnSave": true` is present.

4. Then if you add the astro/prettier config from the above, it should do the job.

And that's it! Go and try it out - `Prettier` should now format your `.astro` files on save.
