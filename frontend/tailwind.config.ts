import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
    colors: {
      'primaryBlue': '#8BB9FE',
      'primaryDark': '#11151B',
      'secondaryDark': '#151A21',
      'tetraDark': '#0E1F39', // Not sure if this is actually used in design yet
      'quadraDark': '#1D304B', // Not sure if this is actually used in design yet
      'primaryLight': '#B4BFD2',
      'secondaryLight': '#737276',
      'white': '#FFFFFF',
      
    },
  },
  plugins: [],
}
export default config
