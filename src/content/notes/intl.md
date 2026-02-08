---
title: "Notes on JavaScript Intl for Localization"
description: "Key takeaways on using JavaScript Intl for localizing dates, numbers, and lists."
pubDate: "March 18 2025"
---

JavaScript's `Intl` namespace (ECMA-402) helps you localize your app, no extra libraries required. It formats numbers, dates, lists, and
more according to local rules.

------------------------------------------------------------------------

## Format Numbers with `Intl.NumberFormat`

Numbers look different across regions---commas, decimals, and currency
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

Perfect for e-commerce, dashboards, or any numeric UI.

------------------------------------------------------------------------

## Format Lists with `Intl.ListFormat`

Languages differ in how they join items. English: "A, B, and C." French:
"A, B et C." `Intl.ListFormat` handles this:

``` js
const fruits = ['apples', 'bananas', 'cherries'];

new Intl.ListFormat().format(fruits); 
// "apples, bananas, and cherries"
```

Use it for messages, labels, or content.

------------------------------------------------------------------------

## Format Dates with `Intl.DateTimeFormat`

Dates and times vary even more---order, time zones, 12h vs 24h.
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

Ideal for calendars, bookings, or logs.

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

Great for chat apps, notifications, or activity feeds.

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

Essential for dynamic messages and translations.

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

Useful for settings pages, language pickers, or country dropdowns.

------------------------------------------------------------------------

## Other Handy Intl Tools

-   **`Intl.Collator`** -- Locale-aware sorting.\
-   **`Intl.Segmenter`** -- Split text into words/sentences.

------------------------------------------------------------------------

👉 Learn more on
[MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl).
