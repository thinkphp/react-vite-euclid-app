# GCD Calculator – Euclid’s Algorithm

A web application built with React and Vite that calculates the greatest common divisor (GCD) of two integers. The result and the algorithm steps update automatically as the input values change.

## Features

- Enter two integers, including negative values.
- Calculate the GCD using Euclid’s algorithm.
- Display successive divisions in the form `a = q · b + r`.
- Validate inputs and display error messages.
- Update the browser tab title with the current result.

## Technologies

- React 19
- Vite 8
- JavaScript (ES modules)
- React hooks `useState` and `useEffect`

## How `useState` and `useEffect` work

The main component is `src/Euclid.jsx`. It stores the input values as strings so the controlled inputs can reflect the user’s current edits:

- `a` and `b` — the values entered by the user, updated with `setA` and `setB`.
- `result` — the calculated GCD, or `null` when the inputs are invalid.
- `steps` — the list of divisions performed by the algorithm.
- `error` — the validation message, or an empty string when there is no error.

The first `useEffect` depends on `[a, b]`. Whenever either value changes, it converts the inputs to numbers and checks that both fields are filled in, that both values are safe integers, and that they are not both zero. For valid inputs, it calculates the GCD of their absolute values and stores the result and steps in state. For invalid inputs, it clears the result and steps.

The `euclid` function repeatedly applies `a = q · b + r`, then replaces the pair `(a, b)` with `(b, r)` until the remainder is zero. The last nonzero value is the GCD. If `b` is zero from the start, there are no division steps, and the interface explains that the GCD is `a`.

The second `useEffect` depends on `[result]` and updates `document.title`. After a valid calculation, the title becomes `GCD = …`; when the result is invalid or incomplete, it returns to `Euclid`.

## Input validation

- Empty fields display “Enter both numbers.”
- Values that are not safe integers display “Use integers only.”
- The pair `(0, 0)` displays “GCD(0, 0) is undefined.”
- Negative numbers are accepted; the algorithm uses their absolute values.

## Run locally

You need Node.js and npm installed.

```bash
npm install
npm run dev
```

Vite will print the local address where the application is running.

## Available commands

| Command | Description |
| --- | --- |
| `npm run dev` | Starts the Vite development server. |
| `npm run build` | Builds the production version into `dist/`. |
| `npm run preview` | Serves the production build locally. |
| `npm run lint` | Runs ESLint on the project. |
| `npm run deploy` | Builds the app and publishes `dist/` with `gh-pages`. |

## Relevant project structure

```text
src/
├── App.jsx       # Integrates the Euclid component
├── Euclid.jsx    # UI, state, validation, and algorithm
├── index.css     # Global styles
└── main.jsx      # React entry point
```
