import type { Config } from "tailwindcss";
 import daisyui from 'daisyui'
const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
     filter: {
        'custom-color': 'invert(1) sepia(1) saturate(5) hue-rotate(-50deg)', // Adjust the values as needed
      },
    },
  },
  variants: {
    filter: ['responsive'],
  },
  plugins: [daisyui],
};
export default config;
