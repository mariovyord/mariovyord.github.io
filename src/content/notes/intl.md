---
title: "Notes on... JavaScript Intl for Localization"
description: "Localizing dates, numbers, and lists."
pubDate: "March 18 2026"
---

JavaScript's `Intl` namespace (ECMA-402) helps you localize your app, no extra libraries required. It formats numbers, dates, lists, and
more according to local rules.

------------------------------------------------------------------------

## Format Numbers with `Intl.NumberFormat`

Numbers look different across regions -- commas, decimals, and currency
placement all vary. `Intl.NumberFormat` handles this automatically:

``` js
const number = 1234567.89;
new Intl.NumberFormat().format(number); 
// "1,234,567.89" in en-US

new Intl.NumberFormat('de-DE').format(number); 
// "1.234.567,89"

new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' })
  .format(42.5); 
// "42,50 €"
```

Use this to format numbers, currencies, and percentages in a way that feels natural to users worldwide.

------------------------------------------------------------------------

## Format Lists with `Intl.ListFormat`

Languages differ in how they join items. English: "A, B, and C." French:
"A, B et C." `Intl.ListFormat` handles this:

``` js
const fruits = ['apples', 'bananas', 'cherries'];

new Intl.ListFormat().format(fruits); 
// "apples, bananas, and cherries"
```

Use this to join arrays into natural-sounding lists for any language.

------------------------------------------------------------------------

## Format Dates with `Intl.DateTimeFormat`

Dates and times vary even more -- order, time zones, 12h vs 24h.
`Intl.DateTimeFormat` makes it consistent:

``` js
const date = new Date('2025-09-23T15:30:00Z');

new Intl.DateTimeFormat('en-US').format(date);  
// "9/23/2025"

new Intl.DateTimeFormat('en-GB').format(date);  
// "23/09/2025"

new Intl.DateTimeFormat('fr-FR', { dateStyle: 'full', timeStyle: 'short' })
  .format(date);
// "mardi 23 septembre 2025 à 17:30"
```

Format dates and times for any locale, including custom styles and time zones.


------------------------------------------------------------------------

## Format Relative Time with `Intl.RelativeTimeFormat`

For "in 2 hours" or "yesterday," use `Intl.RelativeTimeFormat`. It lets
you express differences relative to now:

``` js
const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });

rtf.format(-1, 'day');  
// "yesterday"

rtf.format(2, 'hour');  
// "in 2 hours"
```

Create phrases like "yesterday" or "in 2 hours" that adapt to the user's language.

------------------------------------------------------------------------

## Handle Plurals with `Intl.PluralRules`

Different languages form plurals differently. `Intl.PluralRules` gives
you the correct plural category:

``` js
const pr = new Intl.PluralRules('en-US');

pr.select(1); // "one"
pr.select(5); // "other"

// Example usage:
const messages = {
  one: "1 apple",
  other: "{count} apples"
};
const count = 5;
messages[pr.select(count)].replace("{count}", count);
// "5 apples"
```

Get the right plural form for numbers in any language.

------------------------------------------------------------------------

## Display Locale Info with `Intl.DisplayNames`

`Intl.DisplayNames` converts locale codes or region codes into
human-friendly names:

``` js
const dn = new Intl.DisplayNames(['en'], { type: 'language' });

dn.of('fr'); // "French"
dn.of('en-US'); // "American English"

const regions = new Intl.DisplayNames(['en'], { type: 'region' });
regions.of('DE'); // "Germany"
```

Convert language and region codes into readable names for users.

------------------------------------------------------------------------

## Sort with `Intl.Collator`

`Intl.Collator` lets you compare and sort strings in a way that respects language rules (accents, case, etc.).

```js
const items = ['zebra', 'äpfel', 'apple'];
items.sort(new Intl.Collator('de').compare);
// [ 'äpfel', 'apple', 'zebra' ]
```

Use this for sorting lists so results feel natural to users in any locale.

------------------------------------------------------------------------

## Split Text with `Intl.Segmenter`

`Intl.Segmenter` breaks text into words, sentences, or graphemes, following language-specific rules.

```js
const segmenter = new Intl.Segmenter('en', { granularity: 'word' });
const input = 'Hello world!';
const words = Array.from(segmenter.segment(input), s => s.segment);
// [ 'Hello', ' ', 'world', '!' ]
```

Great for tokenizing text, highlighting, or advanced text processing.

------------------------------------------------------------------------

👉 Learn more on
[MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl).
