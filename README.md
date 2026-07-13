# AapkiShayari ✍️✨
<img width="1146" height="656" alt="image" src="https://github.com/user-attachments/assets/73de8e99-9461-4dfa-96e8-ba0bdd475987" />

> **Hindi Shayari Portal** — A premium, modern Hindi Poetry web application featuring dynamic atmospheric moods, advanced search, daily curated verses, and Gemini-powered custom Shayari generation with intelligent deployment fallbacks.

[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=Vite&logoColor=white)](https://vite.dev/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![Gemini](https://img.shields.io/badge/Gemini_AI-8E75FF?style=for-the-badge&logo=google-gemini&logoColor=white)](https://ai.google.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

---

## 🌟 Key Features

*   **📅 Daily Curated Shayari**: Automatically rotates a hand-picked, premium shayari of the day.
*   **🎭 Select Your Atmosphere**: Filter shayaris by deep emotional moods—*Love & Romance*, *Sad & Broken Heart*, *Attitude & Pride*, *Friendship (Dosti)*, *Life & Philosophy*, and *Inspiration & Hope*.
*   **🔮 Shair AI (Gemini Generator)**: Prompt the AI poet with custom topics or keywords, and watch it compose custom couplets in authentic Devanagari script.
*   **📱 Seamless Interaction & Sharing**: One-click social sharing, copying to clipboard, keeping track of your favorites, and reading translated/interpreted meanings.
*   **🌍 Smart Hybrid Mode**: Fully works in server environments (Express proxying Gemini) AND seamlessly downgrades to beautiful local seed poetry databases if deployed on static web hosts (like Vercel) or when hitting API limits.

---

## 🛠️ Tech Stack

*   **Frontend**: React 18, Vite, TypeScript
*   **Styling**: Tailwind CSS (Utility-first modern interface, elegant dark slate aesthetic)
*   **Animations**: Motion (`motion/react`) for smooth, cinematic transitions
*   **Icons**: Lucide React
*   **Backend & API**: Express.js, TypeScript Executor (`tsx`)
*   **AI Integration**: `@google/genai` (SDK utilizing Google Gemini 2.5 Flash)

---

## 💻 Getting Started

### Prerequisites

*   Node.js (v18 or higher recommended)
*   npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/AapkiShayari.git
   cd AapkiShayari
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure Environment Variables:
   Create a `.env` file in the root directory and add your Gemini API Key:
   ```env
   PORT=3000
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

### Running the Application

*   **Development Mode (Full Stack)**:
    Runs the Express server with live Vite middleware.
    ```bash
    npm run dev
    ```
    Open [http://localhost:3000](http://localhost:3000) in your browser.

*   **Static/Client-Only Development (Vite Direct)**:
    If you only want to build or preview the frontend assets:
    ```bash
    npm run build
    ```

*   **Production Build & Start**:
    ```bash
    npm run build
    npm start
    ```

---

## 📂 Project Structure

```text
├── server.ts                 # Full-stack Express server with Vite middleware integration
├── package.json              # App configuration, dependency lists, and execution scripts
├── vite.config.ts            # Vite compiler configuration
├── metadata.json             # Web metadata
├── src/
│   ├── main.tsx              # Application entry point
│   ├── App.tsx               # Main UI Layout and core states
│   ├── types.ts              # Shared TypeScript definitions (Shayari, MoodCategory)
│   ├── index.css             # Tailwind and font styles
│   ├── components/
│   │   ├── AiGenerator.tsx   # Gemini custom poetry component (with client fallback)
│   │   ├── DailyFeatured.tsx # Highlighted Daily Shayari (with calendar-date hash fallback)
│   │   ├── MoodSelector.tsx  # Interactive atmosphere grid selectors
│   │   ├── SearchAndFilters.tsx # Header filters and search inputs
│   │   └── ShayariCard.tsx   # Individual shayari render card with copy/share/favorite tools
│   └── data/
│       └── shayariData.ts    # Seed data categorized under multiple moods
```

