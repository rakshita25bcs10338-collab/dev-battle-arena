# ⚔️ Dev Battle Arena

A gamified coding tracker built with React that turns your DSA grind into an RPG-style battle system. Log problems, earn XP, level up, and unlock badges — all saved locally in your browser.

---

## 🚀 Live Demo

Run locally with:
```bash
npm run dev
```

---

## 🛠️ Tech Stack

| Technology | Usage |
|---|---|
| React 19 | UI & component architecture |
| Tailwind CSS 4 | Styling |
| React Router DOM v7 | Client-side routing |
| Context API | Global state management |
| localStorage | Data persistence (no backend needed) |
| Vite | Build tool |

---

## 📁 Folder Structure

```
src/
  context/
    GameContext.jsx       ← Global state (XP, level, streak, badges)
  pages/
    Dashboard.jsx         ← Main dashboard with stats, XP bar, badges
    ProblemLogger.jsx     ← Form to log solved problems
  components/
    Navbar.jsx            ← Navigation bar
    XPBar.jsx             ← Animated XP progress bar
    BadgeCard.jsx         ← Individual badge display
  App.jsx                 ← Route definitions
  main.jsx                ← App entry point
  index.css               ← Tailwind imports
```

---

## ✨ Features

### 🏠 Dashboard
- Personalized welcome screen (first-time name entry)
- Live stats: Current Level, Total XP, Day Streak
- Animated XP progress bar showing progress to next level
- Badges section (locked/unlocked states)
- Recent problems list (last 5 solved)

### 📝 Problem Logger
- Log any solved coding problem
- Fields: Problem Title, Topic, Difficulty, Platform, Notes
- XP awarded based on difficulty:
  - 🟢 Easy → +10 XP
  - 🟡 Medium → +25 XP
  - 🔴 Hard → +50 XP
- Success animation on submission → auto-redirects to dashboard

### 🏆 Badge System
| Badge | Requirement | Emoji |
|---|---|---|
| First Blood | Earn 10 XP | 🩸 |
| Grinder | Reach 100 XP | 💪 |
| Code Warrior | Reach 250 XP | ⚔️ |
| Algorithm God | Reach 500 XP | 🧠 |

### 🔥 Streak System
- Streak increases when you solve problems on consecutive days
- Streak resets if you miss a day
- Tracked using date comparison in localStorage

---

## ⚛️ React Concepts Used

### useState
Used for all local UI states — form inputs, submission status, name input on first visit.

```jsx
const [form, setForm] = useState({
  title: "", difficulty: "Easy", topic: "", platform: "LeetCode", notes: ""
});
```

### useEffect
Used for two purposes in GameContext:
1. **Load** saved data from localStorage on app start
2. **Save** updated state to localStorage whenever it changes

The `loaded` flag prevents the save effect from overwriting data before the load effect finishes — a common real-world React bug fix.

```jsx
useEffect(() => {
  // load from localStorage
  setLoaded(true);
}, []);

useEffect(() => {
  if (!loaded) return; // don't save until loaded first
  localStorage.setItem("devBattleState", JSON.stringify({...}));
}, [loaded, username, xp, ...]);
```

### Context API
`GameContext` provides global state to all components without prop drilling:

```jsx
// Provide once at the top
<GameProvider>
  <App />
</GameProvider>

// Consume anywhere
const { xp, level, addProblem } = useGame();
```

### React Router DOM
Three routes defined in `App.jsx`:
```
/             → redirects to /dashboard
/dashboard    → Dashboard page
/problems     → ProblemLogger page
```

### Custom Hook
`useGame()` is a custom hook that wraps `useContext(GameContext)` for cleaner imports across components.

---

## 💾 Data Persistence

All data is stored in `localStorage` under the key `devBattleState`:

```json
{
  "username": "Rakshita",
  "xp": 135,
  "level": 2,
  "streak": 3,
  "lastSolved": "Thu Mar 26 2026",
  "problems": [...]
}
```

No backend, no database, no auth — works fully offline.

---

## 🏃 Getting Started

```bash
# Clone / open project
cd project2

# Install dependencies
npm install

# Run development server
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🎯 Future Improvements

- Add problem deletion
- Weekly challenge / Boss fight system
- Friends leaderboard (with Firebase)
- Sound effects on level up
- Dark/light theme toggle