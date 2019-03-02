---
date: '2019-02-20'
category: Education
title: Thinking in functions
description: We all write functions. But do we often think in functions? Discover the essentials of functional development, and learn a few practical tips.
thumbnail: https://images.unsplash.com/photo-1550945771-515f118cef86?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80
---

## Summary

- [ ] Prefer pure, whenever you can/should
- [ ] Always ask "what its input?" and "what its output?"
- [ ] Keep a function testable (don't rely on context, use arguments)
- [ ] Avoid complexity (use composition, use high-order functions)
- [ ] Useful resources to read

---

## Separate pure and impure

_Pure function_ is a function that accepts all the data it needs through its arguments. In order words, it's a function that _doesn't rely on the surrounding context_. Those functions that do rely on context are called _impure_ and may cause undesirable behavior. Take the following function as an example:

```js
const foo = 2

function add(num) {
  return num + foo
}

add(3) // 3 (num) + 2 (foo) = 5
```

As you can see, the `add` function accepts a number (`num`) and adds it to the `foo` variable. However, that variable is defined outside of the function's scope, making our `add` function impure. The biggest disatvangage of impure functions is that they are unpredictable, as their output depends from an external data.

> A function demanding too many arguments is most likely an overly complex function. Try to break it into a few smaller functions instead.

### When to write a pure function?

Don't be obsessed with pure functions. Instead, know when to write one.

Write pure a function when you operate on the **data you own at the moment**. For example, a function that gets a user by ID cannot be pure, since it fetches a user from a database (side-effect), but a function that returns the total amount of user's publications _can_ be pure, as it can accept a user through its arguments.

```js
function getUser(userId) {
  // "getUser" function is impure, because its output
  // depends on a database (external context).
  return queryDatabase(userId)
}

function getUserPosts(user) {
  // "getUserPosts" function, despite operating on a "user",
  // is pure, as it accepts already fetched user as an argument.
  return user.posts.length
}

getUserPosts(getUser(1))
```

---

## Input and Output (I/O)

One of the first things I suggest is to always ask yourself exactly two questions when creating a function:

1. _What is this function's input?_
1. _What is this function's output?_

> Note that "nothing" is a valid answer to either of those questions. Function that doesn't accept anything, may produce something, and function that doesn't return anything may perform a side-effect.

The answers to these questions define the _constrains_ your function would have. Sometimes it also helps you to understand the action performed by a function, since you can compare the input and output data types.

### Example 1: Authors list

Let's say we have a list of posts, and we want to find out all their authors. Our answers to the I/O questions would be:

1. **Input:** A list of posts (`Array<Post>`).
1. **Output:** A list of authors (`Array<Author>`).

Without writing a single line of code, we can see that we transform Array into Array, so we may use methods like `Array.prototype.map()`, or `Array.prototype.filter()`, which also accept a list and return a list. In our case, it would be a `.map()` method:

```js
function getAuthors(posts) {
  return posts.map(post => post.author)
}
```

### Example 2: Total posts count

Now, let's say we need to calculate the total amount of posts written by the set of given authors. Once more, starting from I/O questions:

1. **Input:** List of authors (`Array<Author>`).
1. **Output:** Number of posts (`Number`).

We can see our input and output data types differ. Taking this into account, picking `Array.prototype.reduce()` may be an option for such case:

```js
function getTotalPosts(authors) {
  return authors.reduce((acc, author) => acc + author.postCount, 0)
}
```

---

## Composition over complexity

Function composition is the most powerful technique to leverage complexity in your logic and increase code reusability. Taking the statements above, let's say we need to design a complex function that would accept a list of posts and return the sum of posts that their authors wrote. We may attempt to implement it the following way:

```js
function getTotalPosts(posts) {
  posts.map(post => author.XYZ)
}
```

> THIS IS PROBABLY A BAD EXAMPLE, SINCE GETTING AUTHOR IS PRESENTED AS SYNC ACTION. THAT WAY YOU CAN JUST REDUCE THE LIST OF POSTS INTO TOTAL AUTHORS POSTS COUNT WITHOUT FUNCTIONAL COMPOSITION.

### Example 3: I/O pipelines

Now we need to create a function that accepts a list of posts and returns the sum total amount of posts written by their authors.

Thinking of functions as of input/output processors makes it easier to define more complex logic.