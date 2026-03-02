# Copilot Instructions for Chef‑Chopra

This repository is a tiny React single‑page application built with Vite. The app allows a user to
enter a list of ingredients and then asks a Hugging‑Face hosted large‑language model (Mixtral) for
a suitable recipe. The front end simply renders the Markdown response.

## Architecture overview

* **Vite/React template** – the project was bootstrapped from the official `create‑vite` React
  template.  `npm run dev` starts the development server with HMR, `npm run build` produces a
  production bundle, and `npm run preview` spins up the static preview. ESLint is configured via
  `eslint.config.js` and can be run with `npm run lint`.
* **src/** contains all application code:
  * `main.jsx` mounts `<App/>` into `index.html`.
  * `App.jsx` is a trivial wrapper that renders `<Header/>` and `<Form/>` inside a styled container.
  * `Header.jsx`, `Form.jsx`, `IngredientsList.jsx`, `ClaudeRecipe.jsx` (plus an unused `pad.jsx`)
    are the only React components; follow the pattern of default exports and use hooks for
    state.  The components communicate via props, and there is no global state management.
  * `ai.js` encapsulates the Hugging‑Face client and exports `getRecipeFromMistral(ingredientsArr)`.
    The system prompt lives in this file – modifications to the assistant’s behavior belong here.
* **Styling** is basic CSS imported per‑component or via `index.css` and `App.css`.

## Key workflows

1. **Setup / Running**
   ```bash
   npm install
   npm run dev        # open http://localhost:5173
   ```
2. **Building / previewing**
   ```bash
   npm run build
   npm run preview    # serve the production build locally
   ```
3. **Linting**
   ```bash
   npm run lint        # runs eslint over the repo
   ```

> ⚠️ There are no tests or CI scripts; feel free to add them if needed.

## Environment variables

The HF access token must be provided in an `.env` file or through other Vite‑compatible
mechanisms.  The code accesses it via `import.meta.env.VITE_HF_ACCESS_TOKEN` when constructing an
`InferenceClient`.  **Never commit** the token to source control.  The README already contains a
warning about exposing API keys; retain and update it when necessary.

## Project‑specific patterns and gotchas

* The form in `Form.jsx` uses a custom `handleSubmit` that expects a `FormData` object passed as
  the `action` prop rather than the usual `onSubmit` event.  That divergence is intentional but
  a bit confusing; any changes to form handling should either restore a normal event handler or
  keep this pattern consistently.
* `recipe` state in `Form.jsx` is set but never consumed – the `getRecipe` function logs output but
  does not update state.  New agents should either fix this bug or be aware when extending the UI.
* Components accept plain props objects (`prop`, `props`) without destructuring.  When mapping lists
  (e.g. `prop.ingredient.map`), keys are simple strings; keep them unique.
* Console `console.log` calls litter the code; they are useful during local development but should
  be removed before production commits.
* `pad.jsx` is currently unused; if adding new UI elements, follow its simple style for small
  presentational components.

## External dependencies

* `@huggingface/inference` – used to call chat completion.  The model is hard‑coded to
  `mistralai/Mixtral-8x7B-Instruct-v0.1` but can be changed.  Be aware of the token scope and
  rate limits when testing.
* `dotenv` is listed in `dependencies` but not actually imported anywhere; the runtime environment
  may load it implicitly via Vite.  Most env handling happens through Vite’s built‑in support.

## Guidance for Copilot/AI agents

1. **Understand the flow** from ingredient input → state update → button click → `getRecipe()` →
   `getRecipeFromMistral` call → response displayed by `ClaudeRecipe.jsx`.
2. **Use existing components** when adding features; they are all in `src/` and follow the
   standard JSX export pattern.  Add new components next to them and import in `App.jsx` as
   required.
3. **When editing `ai.js`** add or modify prompts inside `SYSTEM_PROMPT` rather than altering
   component logic.  The LLM call is the only place that communicates with an external service.
4. **Environment safety**: any change touching environment variables or tokens should include the
   same warning comments found in `ai.js`.
5. **Styling & assets**: CSS files are flat and simple; images live under `src/assets`.  Hard‑coded
   class names are used directly in JSX.
6. **Do not assume tests** – if you add functionality, consider whether a new test harness is
   appropriate, but note that none exists currently.


---

Please review these instructions and let me know if there are other conventions or workflows that
should be documented.  I'm happy to iterate on the document.  Feedback welcome!  🚀