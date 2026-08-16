# 🎭 Panto Party — React Game Project

## Project Overview

Build a multiplayer **Pantomime / Charades game** using:

- React
- TypeScript
- React Hook Form
- Zustand
- shadcn/ui

The game should be playable by multiple people in the same room.

Players are divided into teams. During each turn, one player receives a secret word and acts it out without speaking. Their teammates have a limited amount of time to guess the word.

The team with the most points at the end wins.

---

# 🎯 Core Game Flow

The application should follow this basic flow:

```text
Home
  ↓
Game Setup
  ↓
Start Game
  ↓
Player's Turn
  ↓
Correct / Skip
  ↓
Turn Ends
  ↓
Next Team
  ↓
...
  ↓
Game Over
```

---

# ⚙️ 1. Game Setup

Create a setup screen where users can configure a game.

The setup form must use **React Hook Form**.

### Required fields

**Game name**

```text
[ Friday Night Panto ]
```

**Teams**

At least 2 teams must be created.

Each team should have:

- Team name
- At least 1 player

Example:

```text
🐯 Tigers

[ Alex  ] ×
[ Sarah ] ×

[ + Add Player ]
```

Users should be able to:

- Add a team
- Remove a team
- Rename a team
- Add players
- Remove players

### Game settings

Allow the user to select:

**Number of rounds**

```text
3
5
7
```

**Turn duration**

```text
30 seconds
60 seconds
90 seconds
```

---

# 📝 2. Form Validation

Use React Hook Form validation.

At minimum:

- Game name is required.
- Team name is required.
- Player name is required.
- At least 2 teams are required.
- Every team must have at least 1 player.
- A valid number of rounds must be selected.

Display useful error messages.

---

# 🎮 3. Game Screen

After clicking **Start Game**, display the current turn.

The screen should show:

```text
┌─────────────────────────────────┐
│          PANTO PARTY            │
│                                 │
│       🐯 TIGERS' TURN           │
│                                 │
│          Alex is acting         │
│                                 │
│             42                  │
│           seconds               │
│                                 │
│       ┌─────────────────┐       │
│       │   SECRET WORD   │       │
│       │                 │       │
│       │    SPIDER-MAN   │       │
│       └─────────────────┘       │
│                                 │
│    [ ✓ CORRECT ]  [ SKIP ]     │
│                                 │
│       Tigers: 5   Bears: 3     │
└─────────────────────────────────┘
```

The secret word should only be visible to the actor.

You can implement this with a **"Reveal Word"** button.

---

# ⏱️ 4. Timer

Each turn has a countdown timer.

For example:

```text
60 → 59 → 58 → ... → 0
```

The timer must:

- Start when the turn starts.
- Count down every second.
- Stop when the turn ends.
- Automatically end the turn when it reaches zero.

Use React appropriately for handling the timer.

---

# ✅ 5. Correct Answer

When the team guesses correctly, the actor presses:

```text
✓ Correct
```

The team receives **1 point**.

A new word should appear and the game continues until the timer runs out.

Example:

```text
Spider-Man    ✓ +1
Pizza         ✓ +1
Swimming      ✓ +1
Batman        ✓ +1
```

---

# ⏭️ 6. Skip

The actor can skip a word:

```text
→ Skip
```

Skipping:

- Does not give the team a point.
- Generates a new word.
- Does not end the turn.

---

# 🔄 7. Turn Management

Teams take turns.

For example:

```text
Round 1
Tigers → Alex
Bears  → John

Round 2
Tigers → Sarah
Bears  → Emma

Round 3
Tigers → Alex
Bears  → John
```

The game should automatically determine:

- Current team
- Current player
- Next team
- Next player
- Current round

Players within each team should rotate.

---

# 🏆 8. Scoreboard

Display the current score during the game.

Example:

```text
🏆 SCORE

🐯 Tigers     8
🐻 Bears      6
```

The score must update immediately after a correct answer.

---

# 🏁 9. Game Over

When all rounds are completed, display a results screen.

Example:

```text
             🏆 GAME OVER

          TIGERS WIN!

             12 POINTS

     🐯 Tigers       12
     🐻 Bears         9

          [ Play Again ]
          [ New Game ]
```

If the scores are equal:

```text
🤝 IT'S A DRAW!
```

---

# 🗃️ 10. Word Bank

Create a local word bank containing at least **30 words/phrases**.

You can store them in a TypeScript or JSON file.

Example:

```ts
type Word = {
  id: string;
  text: string;
};
```

Example words:

```text
Spider-Man
Pizza
Swimming
Elephant
Harry Potter
Playing football
Sleeping
Superman
Cooking
```

Words should be selected randomly.

Try to avoid showing the same word repeatedly during a single turn.

---

# 🧠 11. Zustand

Use **Zustand to manage the game's global state**.

The store should contain the important game state, such as:

```text
teams
players
scores
current round
current team
current player
current word
game status
```

Create actions for operations such as:

```text
startGame()
correctAnswer()
skipWord()
endTurn()
nextTurn()
resetGame()
```

You are free to design the store structure.

---

# 🎨 12. shadcn/ui

Use shadcn/ui components throughout the application.

At minimum, use appropriate shadcn components for:

- Buttons
- Inputs
- Forms
- Cards
- Dialogs
- Badges
- Progress/timer

You don't need to use every shadcn component.

Focus on creating a clean and usable interface.

---

# 📱 13. Responsive UI

The game should work on:

- Desktop
- Tablet
- Mobile

Pay particular attention to the game screen.

The timer, secret word, buttons, and scoreboard should be easy to use on a phone.

---

# ⭐ EXTRA FEATURES

These features are **not required**, but can be implemented for extra credit.

## ⭐ Categories

Add categories such as:

```text
🎬 Movies
🐶 Animals
🏃 Actions
🍔 Food
🎮 Games
🎵 Music
```

Allow players to select categories during setup.

---

## ⭐ Difficulty

Add difficulty levels:

```text
🟢 Easy
🟡 Medium
🔴 Hard
```

Different difficulties can give different points.

---

## ⭐ Custom Words

Allow users to add their own words using React Hook Form.

```text
Add Custom Word

[ __________________ ]

[ Add Word ]
```

---

## ⭐ Game Statistics

Track:

- Correct answers
- Skipped words
- Player performance
- Team performance

Display the statistics on the results screen.

---

## ⭐ Game Persistence

Use Zustand's `persist` middleware to save the game.

If the browser is refreshed, the current game should be recoverable.

---

## ⭐ Game History

Store completed games and display:

```text
Previous Games

Friday Night
Tigers 12 - Bears 9

Saturday Night
Bears 15 - Tigers 11
```

---

## ⭐ Special Challenges

Add random challenges such as:

**🤫 Silent Mode**

Actor cannot make any sound.

**🐌 Slow Motion**

Actor must act in slow motion.

**👥 Duo**

Two players must act together.

---

## ⭐ Animations & Sound

Add:

- Score animations
- Victory animation
- Countdown sound
- Correct-answer sound
- Game-over animation

Keep animations subtle and don't sacrifice usability.

---

# 📋 MVP Checklist

Your project is complete when it has:

- [ ] React + TypeScript
- [ ] React Hook Form
- [ ] Zustand
- [ ] shadcn/ui
- [ ] Game setup
- [ ] At least 2 teams
- [ ] Players
- [ ] Configurable rounds
- [ ] Configurable timer
- [ ] Random words
- [ ] Secret word
- [ ] Correct button
- [ ] Skip button
- [ ] Score system
- [ ] Turn management
- [ ] Countdown timer
- [ ] Scoreboard
- [ ] Game-over screen
- [ ] Form validation
- [ ] Responsive UI

Everything under **Extra Features** is optional.

---

# 🏆 Evaluation

### Functionality — 35%

Does the game actually work?

### React & Architecture — 20%

- Components
- Reusability
- Clean structure
- Separation of concerns

### Zustand — 15%

- Appropriate global state
- Store structure
- Actions

### React Hook Form — 10%

- Form implementation
- Validation
- Dynamic teams/players

### UI/UX — 15%

- shadcn/ui
- Responsive design
- Usability
- Visual quality

### Code Quality — 5%

- TypeScript
- Naming
- Maintainability
- Clean code

---

# 💡 Final Challenge

The goal isn't simply to satisfy the checklist.

Build something that you could actually use at a party.

Ask yourself:

> **"If I gave this game to five friends, would they immediately understand how to play it?"**

A good project should be **functional, intuitive, responsive, and fun.** 🎭
