# ⚔️ Dev Battle Arena

> A gamified coding tracker built with React — log problems, earn XP, level up, and conquer weekly goals like a true dev warrior.

---

## 🚀 Live Demo

[Play Now →](#) <!-- Replace with your deployed URL -->

---

## 🎮 About the Project

**Dev Battle Arena** transforms your daily coding practice into an RPG-style experience. Every problem you solve earns XP, unlocks badges, and pushes you toward your weekly conquest goal. Built with React + Vite, with all progress saved locally in your browser — no backend needed.

---

## ✨ Features

### ⚔️ Problem Logger
Log any coding problem you've solved with full metadata:
- **Problem Title** — name of the problem (e.g. *Two Sum*)
- **Topic** — data structure or algorithm category (e.g. Arrays, DP, Binary Trees)
- **Difficulty** — Easy 🟢, Medium 🟡, or Hard 🔴
- **Platform** — LeetCode, HackerRank, CodeChef, Codeforces, or Other
- **Notes** — personal notes on what you learned or key tricks

### 💠 XP & Leveling System
Earn XP every time you log a solved problem:
| Difficulty | XP Earned |
|------------|-----------|
| 🟢 Easy    | +10 XP    |
| 🟡 Medium  | +25 XP    |
| 🔴 Hard    | +50 XP    |

Your level automatically increases every 100 XP, displayed on a live progress bar.

### 🏆 Badge System (Unlockable Artifacts)
Unlock badges as you accumulate XP:
| Badge | Emoji | Requirement |
|-------|-------|-------------|
| First Blood | 🩸 | Solve your first problem (10 XP) |
| Grinder | 💪 | Reach 100 XP |
| Code Warrior | ⚔️ | Reach 250 XP |
| Algorithm God | 🧠 | Reach 500 XP |

Locked badges appear greyed out — unlocked ones glow with style.

### 📅 Weekly Conquest Goal
- Set a custom weekly target for problems to solve
- Visual progress bar tracks how close you are to your goal
- Counts only problems logged in the current week
- Hit your target and get a 🔥 Legendary celebration message
- Edit your goal anytime with one click

### 🔍 Search & Filter (Battle History)
On the Dashboard, filter your logged problems by:
- **Search** — search by problem title
- **Difficulty filter** — filter by Easy, Medium, Hard, or All

### ⭐ Bookmark Problems
Star any problem in your history to bookmark it for later review. Bookmarks are highlighted in gold.

### 🗑️ Delete Problems
Remove any logged problem from your history with a hover-reveal delete button.

### 💾 Persistent State (No Backend!)
All your data — XP, level, problems, weekly goal — is automatically saved to `localStorage` and restored when you reopen the app.

---

## 🛠️ Tech Stack

| Tech | Usage |
|------|-------|
| React 18 | UI & component architecture |
| React Router | Client-side routing (Dashboard / Problem Logger) |
| React Context API | Global game state management |
| Vite | Fast dev server & bundler |
| Tailwind CSS | Styling & responsive layout |
| React Toastify | In-app toast notifications |
| localStorage | Persistent state without a backend |

---

## 📁 Project Structure

```
src/
├── assets/          # Static assets (hero image, icons)
├── components/
│   ├── BadgeCard.jsx   # Individual badge display (locked/unlocked)
│   ├── Navbar.jsx      # Fixed top navigation bar
│   └── XPBar.jsx       # XP progress bar component
├── context/
│   └── GameContext.jsx # Global state: XP, level, problems, badges, weekly goal
├── pages/
│   ├── Dashboard.jsx   # Warrior Dashboard — history, badges, weekly goal
│   └── ProblemLogger.jsx # Form to log a new solved problem
├── App.jsx
└── main.jsx
```

---

## 🏁 Getting Started

### Prerequisites

- Node.js v18+
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/rakshita25bcs10338-collab/dev-battle-arena.git

# Navigate into the project
cd dev-battle-arena

# Install dependencies
npm install

# Start the development server
npm run dev
```

The app will be available at `http://localhost:5173`.

---

## 👩‍💻 Authors

Built by **Rakshita** and **Rakshi** as a web development project.

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<p align="center">Made with ❤️, ☕, and way too many LeetCode problems</p>