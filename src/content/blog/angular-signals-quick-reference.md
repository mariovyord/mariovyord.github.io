---
title: "Angular Signals: Quick Reference"
description: "Signals introduce a powerful mechanism for managing reactive state in Angular applications"
pubDate: "March 30 2024"
---

## What are Signals

> A signal is a wrapper around a value that can notify interested consumers when that value changes.

[Signals](https://angular.io/guide/signals) introduce a powerful mechanism for managing reactive state in Angular applications, serving as wrappers around values to notify interested consumers of changes, enabling synchronous tracking, and accommodating a wide range of data structures from simple primitives to complex entities.

## Declaring Signals

Writable signals are initialized using the signal function with an initial value:

```js
import { signal } from "@angular/core";

const value = signal("Hello World");
```

## Reading and Updating Signals

Signals are called like functions to read their values. To update a signal, use either `.set()` for direct assignment or `.update()` for calculated updates:

```js
// Reading a signal
console.log(`Say ${value()}`);

// Updating a signal
value.set("You are welcome");
// or
value.update((prev) => [...prev, "Two"]);
```

## Read-only signals

Create read-only version of a signal with `.asReadonly()`:

```js
import { input } from "@angular/core";

@Component({...})
export class MyComponent {
  private mySignal = signal();

  readonly myReadonlySignal = mySignal.asReadonly()
}

```

## Typing Signals

Signals are generic, allowing you to specify their types:

```js
import { signal } from '@angular/core';

const value = signal<string[]>(["One"]);

```

## Computed Signals

Derived from other signals, computed signals are defined using `computed` and a derivation function. When `greeting` is updated, `derivedValue` will be updated as well.

```js
import { signal, computed } from "@angular/core";

const greeting = signal("Hello World");

const derivedValue = computed(() => "Always start with " + greeting());
```

## Custom Equality Checks

Define custom equality functions to control when signals trigger updates:

```js
import { signal } from "@angular/core";

function isEqual(arr1, arr2) {
  // Implement your custom equality check here
}

const data = signal(["test"], { equal: isEqual });
```

## Managing Side Effects

Use `effect` to trigger operations based on signal changes. (In developer preview.)

```js
import { effect } from "@angular/core";

effect(() => {
  console.log(`The current count is: ${count()}`);
});
```

## Dependency Management

Prevent signal reads from being tracked with `untracked`. (In developer preview.)

```js
import { effect } from "@angular/core";

effect(() => {
    console.log(`User set to `${currentUser()}` and the counter is ${untracked(counter)}`);
});
```

## Cleanup Operations

Register cleanup functions with `onCleanup` to manage long-running operations. (In developer preview.)

```js
import { effect } from "@angular/core";

effect((onCleanup) => {
  const intervalId = setInterval(() => {
    console.log("Executing periodic task...");
  }, 1000);

  // Register cleanup function to clear interval when effect is destroyed
  onCleanup(() => {
    console.log("Cleanup: Clearing interval");
    clearInterval(intervalId);
  });
});
```

## Using Signals as Component Inputs

Use [`input`](https://angular.io/guide/signal-inputs) from `@angular/core` instead of `@Input()` decorator. (In developer preview)

```js
import { input } from "@angular/core";

@Component({...})
export class MyComponent {
  someValue = input<string>();
}
```

## Additional Input Features

Customize signal inputs with default values, requirements, or transforms. (In developer preview.)

```js
import { input } from "@angular/core";

@Component({...})
export class MyComponent {
  // Optional default value
  someValue = input('some value');

  // Required input
  someValue = input.required<string>();

  // Transforming value
  disabled = input(false, {
    transform: (v: boolean | string) => (typeof v === "string" ? v === "" : v),
  });

  // Aliasing input
  count = input(0, { alias: "totalCount" });
}

```

## Signal models

[Models](https://angular.io/guide/model-inputs) can be used for two-way binding. `model()` defines both an input and an output and can be changed from anywhere using the `.set` and `.update` methods. (In developer preview.)

```js
import { model } from "@angular/core";

@Component({...})
export class MyComponent {
  // This automatically creates an output named "disabledChange".
  // Can be subscribed to using `(disabledChange)="handler()"` in the template.
  disabled = model(false);
}
```

## Transform Observable to a Signal

`toSignal` creates a signal that tracks the value of an Observable. It automatically unsubscribes from the given Observable upon destruction of the component in which toSignal is called.

```js
import { toSignal } from "@angular/core/rxjs-interop";

@Component({...})
export class Ticker {
  counterObservable = interval(1000);

  // You can add an initial value to the created signal
  counter = toSignal(this.counterObservable, { initialValue: 0 });
}
```

## Transform Signal to an Observable

`toObservable` creates an Observable that tracks the value of a signal.

```js
import { Component, signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';

@Component({...})
export class SearchResults {
  query: Signal<string> = inject(QueryService).query;
  query$ = toObservable(this.query);

  results$ = this.query$.pipe(
    switchMap(query => this.http.get('/search?q=' + query ))
  );
}
```

