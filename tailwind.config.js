/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#111430",
        secondary: "#fd4766",
        accent: "#474747",
      },
      fontFamily: {
        primary: ["Poppins", "sans-serif"],
      },
    },
    screens: {
      xss: "200px",
      xs: "360px",
      sm: "480px",
      md: "768px",
      // ipad: '830px',
      lg: "1200px",
      // minixl: '1200px',
      xl: "1440px",
      "2xl": "1536px",
      "3xl": "1920px",
      maxmd: { max: "768px" },
    },
  },
  plugins: [],
};
