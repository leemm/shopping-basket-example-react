## Shopping Basket Example

A simple React application example with a reusable Basket component, complete with unit and component level testing.

The `Basket.jsx` component displays a list of items, and a breakdown of subtotal, discount, and total price.

* products: An array of items from a catalogue i.e. 
```bash
         [{
             "id": 1,
             "name": "Baked Beans",
             "price": 0.99
         },
         ...]
```

* offers: An array of currently available offers i.e.
```bash
         [{
             "productid": 1,
             "type": "multibuy",
             "threshold": 3
         },
         ...]
```

* items: An array of items in the basket i.e.
```bash
         [{
              "productid": 6,
              "quantity": 3
         },
         ...]
```

* onModifyBasket: State can also be optionally managed here. Callback function will return a productid and a quantity as 2 properties.

* hideActions: bool that disables any action button e.g. clear basket, add/remove items. You can supply this using a querystring paramater.
i.e. `http://localhost:<port>/?hideactions=true`


### Requirements

* [Node 22+](https://nodejs.org/en/download)


## ⬆️ Running locally

The application is using vite to build the applcation and to hmr.

Clone the repo locally...

```bash
cd <repo>
npm install
npm run dev
```

Vite will build and run the application in memory, usually on [port 5173](http://localhost:5173/). The terminal display will tell you.


## ⏯ Testing

There are tests for the _Basket.jsx_ component and unit tests for _Basket.utils.js_.

```bash
npm test
```

1. Basket.test.jsx

Component level testing for `src/components/Basket.jsx`. This utilises [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) and [Vitest](https://vitest.dev/) to perform in memory rendering, and targets certain elements to check for their contents.

2. Basket.utils.test.js

Unit testing for `src/components/Basket.utils.js`. This uses [Vitest](https://vitest.dev/) to test individual helper functions. Syntax is the same as [Jest](https://jestjs.io/).

Tests must be run before deploying changes to the Basket component.

## TO DO:

1. Optional style configuration object e.g. change font size, widths etc.
2. Futher component level testing
3. Checkout button obviously does nothing atm
4. Flexbox layouts
5. Typing (typescript), and validate arrays of objects
6. Deploy to npm (or equivelent) so Basket can be installed as a module and imported into other React projects.
7. The Build process would expose the Basket component allowing it's use in other projects.
