import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      boxShadow: {
        'blueTop': '0px -4px 0px 0px #8BB9FE;',
        'glow': '0 0 10px rgba(139, 185, 254, 0.5)', 
      },
      colors: {
        'primaryBlue': '#8BB9FE',
        'primaryDark': '#11151B',
        'secondaryDark': '#151A21',
        'tetraDark': '#252B35', 
        'quadraDark': '#1D304B',
        'primaryLight': '#B4BFD2',
        'secondaryLight': '#737276',
        'grey': '#B4BFD2',
        'white': '#FFFFFF',
        'hoverBlue': '#5b9dff',
      },
      screens: {
        "xs": "475px",
      },
    },
  },
  plugins: [],
};

export default config;
