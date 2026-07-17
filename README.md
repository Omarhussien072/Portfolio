# 🖥️ Interactive Terminal Portfolio

A sleek, retro-modern, terminal-inspired portfolio website designed for developers. Built using **Next.js 15+ (App Router)**, **React 19**, **TypeScript**, and **Tailwind CSS v4**.

It provides an interactive command-line interface (CLI) in the browser, allowing visitors to navigate modules, trigger visual layout states, and check system execution logs.

---

<div align="center">

[![Next.js](https://img.shields.io/badge/Next.js-16.x-black?style=for-the-badge&logo=nextdotjs)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.x-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.0-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![EmailJS](https://img.shields.io/badge/EmailJS-Integrate-orange?style=for-the-badge&logo=email)](https://www.emailjs.com/)

</div>

---

## ✨ Key Features

- **🐚 Interactive Shell Terminal:** 
  - Complete with dynamic auto-completion suggestions.
  - History traversal using `ArrowUp` and `ArrowDown` keys.
  - Commands support modules like `home`, `about`, `projects`, and `contact`.
- **📂 Dynamic Folder Traversal:** Navigating modules updates the terminal breadcrumbs (`~/portfolio/projects`, etc.) and scrolls smoothly to the active panel section.
- **📜 Live System Logs Panel:** A right-hand debug panel that prints pseudo-system events such as `[OK]`, `[warn]`, and `[error]` corresponding to CLI actions.
- **✉️ Interactive Contact Form:** Built-in contact form powered by **EmailJS** for instant email messaging and dynamic delivery feedback.
- **🎨 Glassmorphic Slate Aesthetics:** Custom theme styling utilizing Tailwind's opacity borders and smooth hover glows.

---

## 🛠️ CLI Commands Available

| Command | Action |
| :--- | :--- |
| `home` | Renders the primary bio landing section |
| `about` | Renders technical skills and work details |
| `projects` | Displays the listing of portfolio works |
| `contact` | Opens the interactive contact form |
| `cd <module>` | Focuses & scrolls view directly to an active module |
| `clear` | Clears command logs and unloads all modules |
| `help` | Outputs terminal command guidance instructions |

---

## 🚀 Getting Started

Follow these steps to run the portfolio locally on your computer:

### 1. Clone the Project
```bash
git clone https://github.com/Omarhusien072/Portfolio.git
cd Portfolio
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Setup Environment Variables
Create a file named `.env.local` in the root directory and add your **EmailJS** credentials:
```env
NEXT_PUBLIC_EMAIL_SERVICE_ID=your_emailjs_service_id
NEXT_PUBLIC_EMAIL_TEMPLATE_ID=your_emailjs_template_id
NEXT_PUBLIC_EMAIL_KEY=your_emailjs_public_key
```

### 4. Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to interact with the project!

---

## ⚙️ Customization Guide

All data displayed on the portfolio is centralized inside [SharedData.tsx](file:///C:/Users/Omar/Documents/GitHub/Portfolio/components/SharedData.tsx). To customize the website for your own profile:

1. **Edit Social Connections:** Locate `socialLinks` and replace URLs with your GitHub, LinkedIn, X, and Email.
2. **Update Skills:** Modify the `techSkills` string array to list your custom stack.
3. **Change Achievements:** Modify `achievements` to update total experience or project counts.
4. **Update Projects:** Modify `projectData` array using the format:
   ```typescript
   {
       projectId: crypto.randomUUID(),
       projectTitle: "Your Project Name",
       projectDescription: "Detailed summary of your project.",
       projectState: "completed" | "in development" | "alpha",
       projectTechs: ['React', 'Next.js', 'Tailwind'],
       projectLiveLink: "https://github.com/your-repo",
       borderClass: "hover:border-amber-400/25",
       stateClass: "border border-amber-400/50 text-amber-400",
   }
   ```

---

## 📂 Project Structure

```
Portfolio/
├── app/                      # Next.js App Router (Layout & main Page view)
├── components/               # React functional modules
│   ├── About.tsx             # Skill matrices and profile blocks
│   ├── Contact.tsx           # EmailJS interface & input fields
│   ├── Home.tsx              # Overview landing module
│   ├── Projects.tsx          # Maps projects lists to cards
│   ├── SharedData.tsx        # Centralized static configuration & states
│   ├── Terminal.tsx          # Shell command input & key handler
│   └── SystemLogs.tsx        # Shell log feed output
├── public/                   # Static icons and assets
├── tsconfig.json             # TypeScript configuration
├── next.config.ts            # Next.js configurations
└── tailwind.config.ts        # Tailwind stylesheet rules
```

---

## 📄 License

This project is licensed under the MIT License. See `LICENSE` for details.
