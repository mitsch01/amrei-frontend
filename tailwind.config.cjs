// tailwind.config.cjs
const typography = require("@tailwindcss/typography");

module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        opensans: ["OpenSans", "sans-serif"],
        raleway: ["Raleway", "sans-serif"]
      },
      // simple explicit overrides that definitely work
      typography: {
        DEFAULT: {
          css: {
            p: {
              marginTop: "0",
              marginBottom: "1.25rem" // 20px
            },
            h2: {
              fontSize: "2rem", // 32px
              fontWeight: "600",
              lineHeight: "1.15",
              marginTop: "1.5rem",
              marginBottom: "0.75rem"
            }
          }
        }
      }
    }
  },
  plugins: [typography]
};
