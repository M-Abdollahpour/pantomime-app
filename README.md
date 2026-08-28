# 🎭 Pantomime

A local, pass-the-device party game where teams act out words from different categories and difficulty levels while racing against the clock. Built with React Router, Zustand, and Ant Design.

## Features

- **Custom teams** — Add up to 6 teams (2 minimum), each with 1–10 players and editable names.
- **Configurable rules** — Adjust rounds (1–10) and time per turn (30–90s) before starting.
- **12 word categories** — Food & Drink, Movies & TV, Celebrities, Landmarks, Idioms, City & Country, Kids, Animals, Sports, Jobs, Objects, and Technology — each with Easy / Medium / Hard word pools.
- **Points-based difficulty** — Easy (3pts), Medium (5pts), Hard (7pts). Points shrink each time a team rerolls a word, so choosing wisely matters.
- **Per-team category lock** — Once a team plays a specific category + difficulty combo, that exact combo is locked for that team for the rest of the game (other teams are unaffected).
- **Live countdown timer** — Animated circular timer with color feedback (green → orange → red) as time runs low, plus optional tick and success sound effects.
- **Turn results & final scoreboard** — See the word, category, and points earned after every turn, and a full ranked scoreboard (with draw detection) at the end of the game.
- **Editable game title** — Rename the app title from the home screen; resets to "PANTOMIME" when returning home.
- **Sound & music settings** — Toggle sound effects and party music independently.
- **Persistent state** — Game progress, teams, and settings are saved to `localStorage` via Zustand's `persist` middleware, so a refresh won't lose your game.

## Tech Stack

- [React Router](https://reactrouter.com/) (framework mode) — routing
- [Zustand](https://github.com/pmndrs/zustand) — state management, with `persist` middleware
- [Ant Design](https://ant.design/) — UI components
- [React Hook Form](https://react-hook-form.com/) + [Yup](https://github.com/jquense/yup) — forms & validation
- [Tailwind CSS](https://tailwindcss.com/) — styling
- TypeScript

## Getting Started

```bash
# install dependencies
npm install

# run the dev server
npm run dev
```

The app will be available at `http://localhost:5173` (or whichever port your dev server prints).

## How to Play

1. **Set up teams** on the home screen — add/remove teams, rename them, and set player counts.
2. **Adjust game settings** — number of rounds and time per turn.
3. Hit **Start Game**. The active team and acting player are shown before each turn.
4. **Pick a word** — choose a category, then a difficulty. Locked (already-used) combos for that team are grayed out.
5. **Review the word**, reroll if needed (each reroll costs 1 point, up to a difficulty-based limit), then **Start Timer**.
6. Act it out! Tap **Correct Guess** if your team guesses it, or **End Turn** / let the timer run out if not.
7. See the **turn result**, then continue to the next team automatically.
8. After the final round, the **Game Over** screen shows the final scoreboard and the winning team (or a draw).
9. **Play Again** keeps the same teams with scores reset, or go **Back to Home** to fully reset everything.

## Project Structure (high level)

```
app/
├── routes/            # StartGame, PickWord, StartTimer, TurnTeam, GameOver, etc.
├── stores/            # gameStore.ts — the single Zustand store for all game state
├── components/        # Reusable UI: GameSetting, TeamItem, FormAddTeam, CountDown, etc.
├── data/              # categories.ts — word lists per category/difficulty
├── types/             # Shared TypeScript types (GameStore, Team, Category, etc.)
└── utils/             # Helper functions (capitalString, playSound, etc.)
```

## License

This project is for personal/educational use. Add a license of your choice if you plan to distribute it.
