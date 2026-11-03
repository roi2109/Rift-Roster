# Product Requirement Document (PRD) — RiftRoster

## 1. Product Overview

**RiftRoster** is a responsive web application built with **React, Vite, and TypeScript**. It implements a seamless **Master-Detail** interface for _League of Legends_ champions, alongside a dedicated user favorites manager and a robust items codex. The app functions strictly as a front-end client, pulling real-time metadata dynamically from the public Riot Games Data Dragon API without needing a dedicated backend server.

---

## 2. Target Audience & Goals

- _League of Legends_ players looking for a snappy, well-structured reference guide to review champion kits and item statistics.
- Demonstrating robust React state architectures, type-safe TypeScript interfaces, and client-side routing structures.

---

## 3. Application Structure & Routing (`react-router-dom`)

The app utilizes a fixed sidebar or navbar using `Link` or `NavLink` with the following distinct views:

1.  **Main Page - Champion Catalog (Master View - `/`):**
    - Displays a responsive list or grid of all available champions.
    - Features a quick **Search and Filter** bar to sort champions by name or role tags (e.g., Mage, Assassin, Tank).
2.  **Champion Details View (Detail View - `/champions/:id`):**
    - A separate view utilizing `useParams` to fetch and render specific champion states.
    - Displays full extended background biography (Lore), ability breakdowns (Skills with names and descriptions), and an interactive splash art asset switcher (Skins carousel).
3.  **Favorites Page (`/favorites`):**
    - A personalized viewport displaying only champions bookmarked by the user.
    - Utilizes browser `localStorage` to ensure saved selections persist across page reloads.
4.  **Items Codex Page (`/items`):**
    - An interactive reference table of in-game items, displaying individual gold costs (base/total) and active/passive stat values.
    - Includes granular filters to isolate items by attributes (e.g., Attack Damage, Ability Power, Health), a name search, and sorting by price.

---

## 4. User Stories (Acceptance Criteria)

- **When I** type "an" in the Champion Catalog search box and choose "Mage" in the role dropdown, **I see** only mages whose name contains "an", with a "Showing X of Y" counter, or a "No champions match your search" message if none match.
- **When I** click a champion card, **I see** its own page at `/champions/:id` with splash art, lore, the passive and Q/W/E/R abilities, and a skins carousel I can step through with the arrows.
- **When I** click the ☆ on a champion and then open Favorites, **I see** that champion there; when I click ★ on it, its card disappears immediately, and the list is still there after I refresh the page.
- **When I** open the Items Codex and choose "Ability Power" with "Price: high to low", **I see** only AP items, most expensive first, each with its total, base and sell gold.
- **When I** open a page while the API is unreachable, **I see** a loading spinner and then an error message instead of a blank or broken page.

---

## 5. Technical Constraints & Grading Requirements

- **Strict Type Safety:** Absolute ban on the `any` type keyword. All incoming API payloads, local state arrays, and component props must use explicit TypeScript `interface` or `type` abstractions.
- **List Rendering:** Every list generated via array mapping (`.map`) must supply a reliable, unique native item ID as its `key` attribute.
- **Three UI States:** Every fetch cycle wrapped in a `useEffect` hook must handle exactly 3 explicit interface states: **Loading**, **Error**, and **Success (Data Present)**.
- **Modular Architecture:** The system must utilize at least 4 standalone UI sub-components beyond the primary page views.
- **Unit Testing:** Contains a minimum of 5 pure unit tests using **Vitest** to validate logical utilities (such as filter matching algorithms or data manipulation helpers).
