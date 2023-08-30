/** @type {import('tailwindcss').Config} */
export default {
  daisyui: {
    themes: [
      {
        mytheme: {
          "primary": "#3abff8",
          "secondary": "#828df8",
          "accent": "#f471b5",
          "neutral": "#1d283a",
          "base-100": "#0f1729",
          "info": "#0ca6e9",
          "success": "#2bd4bd",
          "warning": "#f4c152",
          "error": "#ff0000",
                },
              },
            ],
          },
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require('daisyui')],
}