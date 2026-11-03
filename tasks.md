# Project Implementation Tasks: RiftRoster

## Phase 1: Environment & Strict Type Setup

- [✔] Task 1: Initialize the project using Vite's React-TypeScript template and configure the base directory skeleton under `/src`.
  - **Done when:** `npm run dev` opens a page titled "RiftRoster" with no console errors, `npm run build` passes, and `src/` contains `components/`, `pages/`, `hooks/`, `services/`, `types/` and `utils/`.
- [✔] Task 2: Install project dependencies (`react-router-dom`, `vitest`) and verify the `vite.config.ts` setup.
  - **Done when:** `react-router-dom`, `vitest` and `@vitest/ui` appear in `package.json`, and both `npm test` and `npm run test:ui` start without errors.
- [✔] Task 3: Design explicit TypeScript data models and interfaces for Champions, Skills, Skins, and Items (No any allowed!).
  - **Done when:** `src/types/` holds interfaces for `Champion`, `ChampionDetail`, `Skill`, `Skin` and `Item` that match the real Data Dragon JSON, a search for `any` in `src/` finds nothing, and `npm run build` passes.

## Phase 2: Shell, Infrastructure & Core Logic

- [✔] Task 4: Configure client-side routing trees in `App.tsx` and assemble a global NavLink navigation header.
  - **Done when:** clicking Champions / Favorites / Items changes the URL and highlights the active link, `/champions/Ahri` shows "Ahri" read with `useParams`, and an unknown URL like `/abc` shows a 404 page.
- [✔] Task 5: Author pure data processing helpers for item/champion filtering and write 5 unit tests running on Vitest to validate them.
  - **Done when:** `npm test` shows at least 5 passing tests for the filter helpers, and the same tests appear green in `npm run test:ui`.
- [✔] Task 6: Program the centralized API request layer to handle exactly 3 UI states: Loading, Error, and Success.
  - **Done when:** each page shows a spinner while loading, then the data; with the browser set to Offline in DevTools, the page shows a red error message instead of crashing.

## Phase 3: Champions Browser UI

- [✔] Task 7: Build the Master View component to display a responsive champion catalog grid mapped with explicit unique keys.
  - **Done when:** the home page shows a grid of every champion with icon, name, title and roles, the console has no `key` warnings, the grid gets fewer columns on a narrow screen, and clicking a card opens `/champions/:id`.
- [✔] Task 7b: Add a search box and a role dropdown to the champion catalog.
  - **Done when:** typing "an" leaves only champions whose name contains "an", choosing "Mage" leaves only mages, both work together, "Showing X of Y" updates, and a search with no match shows an empty-state message.
- [✔] Task 8: Complete the dynamic Detail View viewport using `useParams` to parse IDs and map out background champion biographies.
  - **Done when:** `/champions/Ahri` shows Ahri's splash art, name, title, roles and full lore, and `/champions/NotAChamp` shows a "not found" error message.
- [✔] Task 9: Assemble the capability grids for skills and build the interactive horizontal image carousel to cycle through skins.
  - **Done when:** the detail page lists the passive and Q/W/E/R with icons, plain-text descriptions, cooldowns and costs; the ‹ › arrows and dots cycle through the skins, wrapping from the last to the first, with no broken images.

## Phase 4: Extended Custom Modules (Granular Steps)

- [✔] Task 10: Build local utility helper functions to sync champion data selections to and from browser `localStorage`.
  - **Done when:** `npm test` passes tests for saving, loading and toggling favorites, including broken JSON and blocked storage, without errors.
- [✔] Task 11: Construct the Favorites Page view to render bookmarked collections with real-time reactive unfavorite triggers.
  - **Done when:** clicking ☆ on a card or the detail header turns it into ★ without opening the page, the champion appears on `/favorites`, clicking ★ there removes the card immediately, favorites survive a page refresh, and an empty list shows a message with a link to the catalog.
- [✔] Task 12: Implement the Items Codex view grid, complete with cost displays, descriptions, and functional parameter filter arrays.
  - **Done when:** `/items` shows each purchasable item once with its icon and total/base/sell gold, "Stats & effects" opens its description, choosing "Ability Power" leaves only AP items, and "Price: high to low" puts the most expensive items first.
