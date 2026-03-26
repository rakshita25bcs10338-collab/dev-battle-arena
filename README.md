# ⚔️ Dev Battle Arena

A professional, gamified coding tracker built with React that turns your DSA grind into an RPG-style battle system. Log problems, earn XP, level up, and unlock artifacts — all persisted locally in your browser.

---

## 🚀 Live Demo

Run locally with:
```bash
npm install
npm run dev
🛠️ Tech StackTechnologyUsageReact 19UI & component architectureTailwind CSS 4Modern, high-performance stylingReact Router 7Client-side routingContext APIScalable global state managementlocalStorageData persistence (Zero-latency offline mode)ViteLightning-fast build tool✨ Features🏠 Warrior DashboardDynamic Stats: Real-time tracking of Total Slain, Easy, Medium, and Hard problems.XP Progress: Animated bar showing progress to the next level (100 XP per level).Weekly Conquests: Set and edit custom weekly goals with a dedicated progress tracker.Badge Gallery: Visual feedback for achievements (Glow for unlocked, Grayscale for locked).📝 Problem Logger & ManagementDetailed Logging: Track Title, Topic, Difficulty, and Platform.XP Rewards: Automatic calculation (+10 Easy, +25 Medium, +50 Hard).CRUD Operations: Fully functional Delete and Bookmark (Star) system to manage your history.Smart Filtering: Search bar and Difficulty dropdown to navigate large battle logs.🏆 Artifact System (Badges)BadgeRequirementEmojiFirst BloodEarn 10 XP🩸GrinderReach 100 XP💪Code WarriorReach 250 XP⚔️Algorithm GodReach 500 XP🧠📁 Folder Structuresrc/
  context/
    GameContext.jsx       ← Global state (XP, Level, Weekly Goals, CRUD Logic)
  pages/
    Dashboard.jsx         ← Main HUD with Analytics, Search, and Badges
    ProblemLogger.jsx     ← Form for battle entries
  components/
    XPBar.jsx             ← Progress visualization
    BadgeCard.jsx         ← Conditional rendering for achievements
  App.jsx                 ← Route definitions & Layout
⚛️ Key React Concepts Applied1. Context API (Global State)Used to avoid "Prop Drilling." The GameContext provides all components with access to the user's progress and the addProblem/deleteProblem functions.2. useEffect & PersistenceImplemented a dual-effect strategy for localStorage:Load Effect: Hydrates the state on initial mount.Save Effect: Synchronizes state changes to the browser.Guard Clause: Used a loaded flag to prevent overwriting existing data with default values during initial render.3. Derived State & FilteringInstead of storing filtered lists in state (which causes sync bugs), I calculate filteredProblems and stats directly during the render cycle for better performance and data integrity.💾 Data PersistenceData is stored as a JSON object in localStorage under the key devBattleState. This ensures a seamless, no-login-required experience that works fully offline.🎯 Future RoadmapBoss Fights: Monthly challenges with high-XP rewards.Leaderboards: Global rankings using Firebase/Supabase.Dark/Light Theme: Custom UI skins for different "Warrior" classes.Data Export: Export battle history to CSV or PDF for portfolio use.
---

### 🏁 Final Step to Push:
1. Save the file.
2. In your terminal, type:
   - `git add .`
   - `git commit -m "docs: finalized project readme with all CRUD and goal features"`
   - `git push origin main`

**You are now 100% Viva-ready. Good luck, Warrior! Would you like a list of the 5 most common React questions an examiner might ask about this code?**git add .