# Aether AI | Autonomous Neural Systems

> **"Constructing autonomous digital architectures for the post-labor economy."**

Aether AI is a next-generation agency website template built to sell high-ticket AI automation services. It features a cinematic, "sci-fi" aesthetic, advanced React animations, and a seamless single-page application (SPA) flow.

![Aether AI Core](https://grainy-gradients.vercel.app/noise.svg) *Note: Add a real screenshot here*

## ⚡ Key Features

*   **Cinematic UI:** Dark mode (`#020202`) with Cyan accents (`#22d3ee`) and holographic effects.
*   **Advanced Animations:**
    *   **Matrix Rain:** Canvas-less implementation in the Hero section.
    *   **Neural Flow:** Complex SVG path animations in the Architecture diagram.
    *   **Physics-Based Scroll:** Scroll-linked animations using `framer-motion`.
*   **Responsive Design:** Fully fluid layouts (Bento grids, flexboxes) that work on Mobile and Desktop.
*   **Lead Capture:** Integrated Booking Modal and interactive Chat Widget.

## 🛠 Tech Stack

*   **Framework:** [React 19](https://react.dev/)
*   **Build Tool:** [Vite](https://vitejs.dev/)
*   **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
*   **Animation:** [Framer Motion](https://www.framer.com/motion/)
*   **Icons:** [Lucide React](https://lucide.dev/)

---

## 📂 Project Structure

```bash
src/
├── components/
│   ├── Architecture.jsx  # Neural Network Visualization (Animated Diagram)
│   ├── BookingModal.jsx  # Lead capture modal overlay
│   ├── ChatWidget.jsx    # Floating AI assistant bubble
│   ├── Footer.jsx        # Site footer with social links
│   ├── Hero.jsx          # Landing section with Matrix effect & 3D tilt
│   ├── Partners.jsx      # (Previous) Social proof marquee [Note: Currently disabled]
│   ├── Pricing.jsx       # Tiered pricing cards (Solo, Company, Enterprise)
│   ├── Process.jsx       # "The Flow" step-by-step timeline
│   ├── ScrollProgress.jsx# Scroll-based video/progress indicator
│   └── Services.jsx      # Bento-grid of core offerings
├── assets/               # Static images/videos
├── App.jsx               # Main layout & component composition
├── index.css             # Global styles, fonts (Inter/Space Mono), and Tailwind imports
└── main.jsx              # Application entry point
```

---

## 🚀 Getting Started

### Prerequisites
*   Node.js (v18+ recommended)
*   npm or yarn

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/VIKESH-kapadiyaa/Aerther-ai.git
    cd Aerther-ai
    ```

2.  **Install Dependencies**
    ```bash
    npm install
    ```

3.  **Run Development Server**
    ```bash
    npm run dev
    ```
    The site will launch at `http://localhost:5173`.

---

## 🧩 Component Documentation & Customization

### 1. **Hero Section (`Hero.jsx`)**
*   **Effect:** Contains the `MatrixBackground` and `ScrambleText` components.
*   **Edit:** Change the `h1` text or the "ScrambleText" string to alter the main headline.
*   **3D Tilt:** The `handleMouseMove` function controls how much the text moves when the mouse hovers.

### 2. **Architecture Diagram (`Architecture.jsx`)**
*   **Logic:** Uses SVG paths with `framer-motion` to act as "data cables".
*   **Customization:**
    *   **Nodes:** Edit the `<ArchitectureNode />` calls to change icons/labels (e.g., "Vector DB" -> "Database").
    *   **Speed:** Adjust `duration` props in `FlowLine` to make the data pulsate faster/slower.

### 3. **Services Grid (`Services.jsx`)**
*   **Layout:** A CSS Grid "Bento Box".
*   **Edit:** Modify the `services` array at the top of the file.
    *   `colSpan`: Controls width (`md:col-span-4` vs `md:col-span-8`).
    *   `bg`: Controls the background gradient/color of the card.

### 4. **Pricing (`Pricing.jsx`)**
*   **Tiers:** "Solo Founder", "Company Systems", "Enterprise".
*   **Edit:** Update the prices, "upto" text, and features checklist directly in the JSX.
*   **Design:** The middle card ("Company Systems") uses a specific gradient to stand out (`bg-gradient-to-b`).

---

## 🚢 Deployment

### Vercel (Recommended)
1.  Push your code to GitHub.
2.  Import the repo into Vercel.
3.  Vercel will auto-detect Vite.
4.  Click **Deploy**.

### Netlify
1.  Drag and drop the `dist/` folder (run `npm run build` first) or connect Git.
2.  Build command: `npm run build`
3.  Publish directory: `dist`

---

## 🎨 Design Tokens

*   **Primary Color:** Cyan-500 (`#06b6d4` / `#22d3ee`)
*   **Background:** Ultra Black (`#020202`)
*   **Fonts:**
    *   Headlines/Body: `'Inter', sans-serif`
    *   Technical Data: `'Space Mono', monospace`

---

© 2026 Aether AI Automation Agency. All Systems Operational.
