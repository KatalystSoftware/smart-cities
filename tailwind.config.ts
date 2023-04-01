import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-rd': 'radial-gradient(var(--tw-gradient-stops))',
      }
    }
  },
  plugins: [],
} satisfies Config;
