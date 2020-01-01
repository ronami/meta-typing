## 📚 Meta-Typing

> Writting Lodash's functions with TypeScript's type system

### Introduction

[TypeScript](https://github.com/Microsoft/TypeScript)'s type system is a programming language that runs when we compile our code. Normally, we use it to annotate our code so TypeScript can help us find bugs before we run it. In this project however, I tried to push TypeScript's type system to its limits by implementing many of [Lodash](https://github.com/lodash/lodash)'s functions, purely on the shoulders of the type system.

The goal of this project is educational and humoristic. I had to write a lot of recursions and use creative solutions to overcome [some of the limitations](https://github.com/microsoft/TypeScript/issues/28663) of the type system. Even though I tried, it's impossible to implement a handful of functions until [several features are implemented](https://github.com/microsoft/TypeScript/issues/1213) in TypeScript.

### Nice! Where's the code?

Every function has its own folder inside the [src]() folder. In each folder you will find the function implementation and a test file for that function.

I add comments to each function's code to explain what's going on.

<!-- Here's the list of currently implemented functions. -->

### Run the code locally

Start by installing dependencies:

```
$ npm install
```

Open a file of any function and hover over the types to see the results of "running" that function with some input.

You can also run the tests with:

```
$ npm test
```

#### Additional links

- [Utility TypeScript types](https://www.typescriptlang.org/docs/handbook/utility-types.html)
- [Advanced TypeScript types](https://www.typescriptlang.org/docs/handbook/advanced-types.html)
- [TypeScript video tutorials from Egghead.io](https://egghead.io/browse/languages/typescript)
