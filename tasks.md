# Project Implementation Tasks: RiftRoster

## Phase 1: Environment & Strict Type Setup

- [✔] Task 1: Initialize the project using Vite's React-TypeScript template and configure the base directory skeleton under `/src`.
- [✔] Task 2: Install project dependencies (`react-router-dom`, `vitest`) and verify the `vite.config.ts` setup.
- [✔] Task 3: Design explicit TypeScript data models and interfaces for Champions, Skills, Skins, and Items (No any allowed!).

## Phase 2: Shell, Infrastructure & Core Logic

- [✔] Task 4: Configure client-side routing trees in `App.tsx` and assemble a global NavLink navigation header.
- [✔] Task 5: Author pure data processing helpers for item/champion filtering and write 5 unit tests running on Vitest to validate them.
- [✔] Task 6: Program the centralized API request layer to handle exactly 3 UI states: Loading, Error, and Success.

## Phase 3: Champions Browser UI

- [✔] Task 7: Build the Master View component to display a responsive champion catalog grid mapped with explicit unique keys.
- [✔] Task 8: Complete the dynamic Detail View viewport using `useParams` to parse IDs and map out background champion biographies.
- [✔] Task 9: Assemble the capability grids for skills and build the interactive horizontal image carousel to cycle through skins.

## Phase 4: Extended Custom Modules (Granular Steps)

- [ ] Task 10: Build local utility helper functions to sync champion data selections to and from browser `localStorage`.
- [ ] Task 11: Construct the Favorites Page view to render bookmarked collections with real-time reactive unfavorite triggers.
- [ ] Task 12: Implement the Items Codex view grid, complete with cost displays, descriptions, and functional parameter filter arrays.
