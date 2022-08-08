
## Getting Started

**Running the project**

*Tested with Node >=14.19.3 <16.3.1

```bash
git clone https://github.com/gss-patricia/discover-boutiques.git

cd discover-boutiques/

yarn

yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## API

[API routes]can be accessed on [http://localhost:3000/api/boutiques](http://localhost:3000/api/boutiques).

**Additional Notes**
- I´ve created dependency Inversion using React Context, if in the future we want to replace the axios for another http client we can do the replacement easily.
- Apparently the Boutiques API is returning the incorrect distance, so I used an algorithm to calculate the closest distance and order them.

Other Commands:
```
yarn dev - Runs next dev to start Next.js in development mode
yarn build - Runs next build to build the application for production usage
yarn start - Runs next start to start a Next.js production server
yarn lint - Runs next lint to set up Next.js' built-in ESLint configuration
```

## Unit Tests
running the tests:

```
yarn test: runs all tests.
```

## Improvements for the future
- Add env configuration files
- Add configuration files to dev and production env
- Create a more agnostic map component to use with other use cases, perhaps use controller approach and view pattern
- Add loading on the page
- Create Storybook
- Add husky for pre-commit hooks
- Create unit tests and integration tests
- Improve the UX, e.g: allow the user to choose different map styles, interface improvement, allow the user to choose the quantity of boutiques are closest, add filters, radius distance ...
- Show real-time user position

## Deploy on Vercel
Demo: https://discover-boutiques.vercel.app/

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).
