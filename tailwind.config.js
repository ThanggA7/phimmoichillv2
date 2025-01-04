/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-to-t": "linear-gradient(to top, var(--tw-gradient-stops));",
        "gradient-to-r": "linear-gradient(to right, var(--tw-gradient-stops));",
      },
    },
    container: {
      padding: {
        DEFAULT: "1rem",
        sm: "2rem",
        lg: "4rem",
        xl: "5rem",
        "2xl": "6rem",
      },
    },
    keyframes: {
      slideIn: {
        "0%": { transform: "translateX(-100%)", opacity: "0" },
        "100%": { transform: "translateX(0)", opacity: "1" },
      },
    },
    animation: {
      slideIn: "slideIn 0.5s ease-in-out",
    },
    backgroundImage: {
      "pixel-overlay": `
          repeating-linear-gradient(0deg, rgba(0, 0, 0, 0.02) 0, rgba(0, 0, 0, 0.03) 0.5px, transparent 0.5px, transparent 1px),
          repeating-linear-gradient(90deg, rgba(0, 0, 0, 0.02) 0, rgba(0, 0, 0, 0.03) 0.5px, transparent 0.5px, transparent 1px)
      `,
    },
  },
  plugins: [],
};
