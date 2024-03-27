---
title: "How to mock data with an interceptor in Angular 17"
description: "Interceptors allow you to return data from local files and delay response to make them more realistic"
pubDate: "March 27 2024"
---

Interceptors are invaluable for any Angular application. Let's dive into a practical example on how to use them to mock http responses. We will also add some delay to mimic network latency and provide a more accurate representation of real-world application behavior.

## Understanding HTTP Interceptors

[HTTP interceptors](https://angular.io/api/common/http/HttpInterceptor) act as middleware, allowing us to intercept and modify HTTP requests or responses. They're configured globally or locally within Angular modules, offering versatility and ease of management.

## Mocking Data with an Interceptor

Utilizing interceptors, we can seamlessly mock data for targeted endpoints. Here's an example implementation:

```js
import {
  HttpEvent,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from "@angular/common/http";
import { Observable, delay } from "rxjs";

// Whitelist endpoints for mocking
const MOCK_ENDPOINTS = ["posts", "comments"];

export const mocksInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  const fileName = MOCK_ENDPOINTS.find((file) => req.url.endsWith(`/${file}`));

  if (!fileName) {
    return next(req);
  }

  const newFileName = getNewFileName(fileName, req);

  // Redirect the request to a local folder
  const mockReq = req.clone({
    url: `/assets/mock-data/${newFileName}.json`,
  });

  // Delay the request to mimic network latency
  return next(mockReq).pipe(delay(1500));
};

function getNewFileName(fileName: string, req: HttpRequest<unknown>): string {
  // Check query params and redirect based on them
  if (fileName === "posts" && req.params.has("topic")) {
    return "topic-posts";
  }

  if (fileName === "posts" && req.params.has("author")) {
    return "author-posts";
  }

  return fileName;
}
```

You can check for any query params you are interested in and modify the delay as you see fit. The new URL should point to the folder where you store your mock json data, like for example `/assets/mock-data` folder.

## Integrating the Interceptor

Integrating the interceptor is straightforward.

What I like doing first is to create `core/interceptors/index.ts` file like this:

```js
const interceptors: HttpInterceptorFn[] = [mocksInterceptor];
export default interceptors;
```

and then provide it in `app.config.ts`:

```js
import interceptors from "./core/interceptors";

export const appConfig: ApplicationConfig = {
  providers: [provideHttpClient(withInterceptors(interceptors))],
};
```

By following these steps, you can efficiently mock data in your Angular application and delay the response so it would look like it comes from a remote API. 🚀
