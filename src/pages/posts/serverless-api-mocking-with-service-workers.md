---
date: 2019-05-01
category: OSS
author: kettanaito
title: Serverless API mocking with Service Workers
description: Learn how to mock an API without spawning a server, or changing a single character in your existing code base. Intercept production requests, and mock their responses.
thumbnail: https://images.unsplash.com/photo-1550828486-68812fa3f966?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80
keywords: api, mocking, service worker, msw, mock service worker, serverless
---

Following Agile methodologies often means developing in parallel. While it has its benefits, it's certainly hard to assume details about an API that doesn't exist yet. One of the ways to cope with this issue is to take advantage of API mocking. Today I would like to show you how front-end developers can improve their mocks using modern browser API.

_API mocking_ — [definition].

And the closer your mock is to the actual implementation, the faster it will be to adopt it.

---

## Traditional mocking

...

### Disadvantages

1. **Spawning a server.** All the current tools rely on spawning a dedicated mocking server, which you need to run and maintain. Obviously, you use packages to establish a server, and those dependencies bring extra complexity to mocking.
1. **Resource replacement.** It's common to conditionally compose request urls so that your application requests data from a mocking server during development. This serves close to nothing in the future adoption of a real API, as you are effectively **communicating with another server, instead of mocking a non-existing one.**

---

## Service Workers

_Service Worker_ is [...]

### How can Service Worker help in API mocking?

One of the main lifecycle methods of a Service Worker is the `fetch` event. It processes all the outgoing requests from a page, and decides whether to resolve them, or return responses from cache. What if we made it match requests through our mocking routes, and resolve with mock definitions instead of cache..?

---

## Getting started

### 1. Install

First of all, let's install `msw` (MockServiceWorker) as a development dependency of a project.

```bash
yarn add msw --dev
```

### 2. Generate ServiceWorker

The next step we would need to create and serve a Service Worker file. This file contains the _request matching_ logic, but has no control over response resolvers, as it's being performed on the library's side.

To create a new instance of a MockServiceWorker, execute the following command:

```bash
msw create <rootDir>
```

> Replace `rootDir` with a relative path to your server's root directory.

This is going to emit the `mockServiceWorker.js` file into the specified directory on the server, so that client can register that Service Worker on runtime.

### 3. Define mocks

Create a simple JavaScript module that describes your mocks.

```js
// src/app/mocks.js
import { msw } from 'msw'

msw.get('https://api.github.com/users/:username', (req, res, { json }) => {
  return res(json({ firstName: 'John', lastName: 'Doe' }))
})

msw.start()
```

You are free to split your mocks into submodules, but make sure to call `msw.start()` just once.

### 4. Integrate

Mocking is a **development-only procedure**. We highly recommend to conditionally include your mocking module (`app/mocks.js`) into your application's entry during the build. Please see examples of how this can be done below.

#### Using webpack

```js
// ./webpack.config.js
const __DEV__ = process.env.NODE_ENV === 'development'

module.exports = {
  entry: [
    /* Include mocks in development */
    __DEV__ && 'src/app/mocks.js',

    /* Include your application's entry */
    'src/app/index.js',
  ].filter(Boolean),

  /* Rest of your config here */
}
```

#### Client-side import

Alternatively, you can import mocking file(s) conditionally in your client bundle.

```js
// src/app/index.js

if (__DEV__) {
  require('./mocks.js')
}
```