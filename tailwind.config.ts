import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#369be4",
        primaryDark: "#115F97",
        primaryOpac: "#D1E9F9",
        primaryTransaparent: "rgba(54, 155, 228, .4)",
        secondary: "#ff7722",
        tertiary: "#fff",
        danger: "orangered",
        dark: "#0a0a0a",
        whiteOne: "#fcfcfc",
        whiteTwo: "#f9f9f9",
        whiteThree: "#eee",
        grayOne: "#767676",
        grayTwo: "#D6D6D6",
        grayThree: "#aaa",
        transaparentDark: "rgba(0,0,0,.4)",
      },
    },
  },
  plugins: [],
};
export default config;
