# RiftRoster

A fast, responsive reference guide for **League of Legends** champions and items.
Browse every champion, open a page with their lore, abilities and skins, save favorites, and look up item prices and stats.

Built with **React + Vite + TypeScript** as a front-end-only app: there is no server and no database. All game data comes live from Riot's public **Data Dragon** API.

## Features

| Page | Address | What you can do |
| --- | --- | --- |
| **Champion Catalog** | `/` | Browse all champions in a grid, search by name, and filter by role (Assassin, Fighter, Mage, Marksman, Support, Tank). |
| **Champion Details** | `/champions/:id` (e.g. `/champions/Ahri`) | Read the champion's lore, see their passive and Q/W/E/R abilities with cooldowns and costs, and step through every skin in a carousel. |
| **Favorites** | `/favorites` | See the champions you starred (☆). Favorites are saved in `localStorage`, so they are still there after a refresh. |
| **Items Codex** | `/items` | Look up every purchasable item with its total, base and sell gold; search, filter by stat (Attack Damage, Ability Power, Health…) and sort by price. |
| **Not Found** | any other address | A 404 page with a link back to the catalog. |

Every page that loads data shows a **loading** spinner, an **error** message if the request fails, or the **data**.

## Getting started

**Requirements:** [Node.js](https://nodejs.org/) 20.19+ or 22.12+ (needed by Vite 8).

```bash
git clone https://github.com/roi2109/Rift-Roster.git
cd Rift-Roster
npm install
npm run dev
```

Then open the address Vite prints (usually <http://localhost:5173>).

### Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Starts the development server with hot reload. |
| `npm run build` | Type-checks the project (`tsc -b`) and builds it into `dist/`. |
| `npm run preview` | Serves the built `dist/` folder locally. |
| `npm test` | Runs all unit tests once in the terminal. |
| `npm run test:watch` | Runs the tests again on every file save. |
| `npm run test:ui` | Opens the **Vitest UI** in the browser to run and inspect the tests. |
| `npm run lint` | Lints the code with oxlint. |

## Tests

The project has **31 unit tests** written with [Vitest](https://vitest.dev/). They test the app's own logic as pure functions, without React or the network:

| Test file | What it checks |
| --- | --- |
| `src/utils/filters.test.ts` | Champion search and role filter, item search and stat filter, turning the API's object into a list, keeping only shop items, removing duplicate items and skin chromas, picking out favorites, and sorting items by price. |
| `src/utils/format.test.ts` | Turning the API's HTML descriptions into plain text, formatting per-rank values (`[10, 9, 8]` → `10 / 9 / 8`), and wrapping the carousel index. |
| `src/utils/favorites.test.ts` | Saving and loading favorites from `localStorage`, toggling a favorite, and staying safe with broken JSON or blocked storage. |

```bash
npm test          # in the terminal
npm run test:ui   # in the browser
```

## API

All data comes from **[Riot Data Dragon](https://developer.riotgames.com/docs/lol#data-dragon)**, Riot's free public CDN for League of Legends data. It needs **no API key** and allows requests straight from the browser.

| Data | Endpoint |
| --- | --- |
| Latest patch version | `https://ddragon.leagueoflegends.com/api/versions.json` |
| All champions | `https://ddragon.leagueoflegends.com/cdn/{version}/data/en_US/champion.json` |
| One champion (lore, abilities, skins) | `https://ddragon.leagueoflegends.com/cdn/{version}/data/en_US/champion/{id}.json` |
| All items | `https://ddragon.leagueoflegends.com/cdn/{version}/data/en_US/item.json` |
| Images | `…/cdn/{version}/img/champion/…`, `…/img/spell/…`, `…/img/item/…`, `…/cdn/img/champion/splash/{id}_{num}.jpg` |

The app first fetches the latest patch version, then uses it in every other request, so the data always matches the current game patch.

## Project structure

```
src/
├── components/   Reusable UI pieces (NavBar, ChampionCard, ChampionGrid, SkinCarousel, ItemCard, …)
├── pages/        One component per route (ChampionsPage, ChampionDetailPage, FavoritesPage, ItemsPage, NotFoundPage)
├── hooks/        useFetch (loading / error / success), the Data Dragon hooks, and useFavorites
├── services/     dataDragon.ts — the only file that calls fetch, plus image URL builders
├── types/        TypeScript interfaces for the API data (Champion, Skill, Skin, Item, …)
├── utils/        Pure helper functions and their Vitest tests
├── App.tsx       Routes and the shared favorites state
└── main.tsx      Entry point, wraps the app in BrowserRouter
```

## Project documents

- [`PRD.md`](PRD.md): what the app is, who it is for, its pages and the acceptance criteria.
- [`tasks.md`](tasks.md): the build plan, one task at a time, each with a "Done when:" line.
- [`PROMPTS.md`](PROMPTS.md): every prompt sent to the AI coding agent during development, logged automatically.

---

RiftRoster isn't endorsed by Riot Games and doesn't reflect the views or opinions of Riot Games or anyone officially involved in producing or managing League of Legends. League of Legends and Riot Games are trademarks or registered trademarks of Riot Games, Inc.
