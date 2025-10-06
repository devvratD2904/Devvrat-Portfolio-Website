/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],              
        creative: ['"Playfair Display"', 'serif'],  
        vibe: ['"Great Vibes"', 'cursive'],         
        funky: ['Pacifico', 'cursive'],   
        mine: ['"Permanent Marker"', 'sans-serif'],
        elegant: [],
        rubik80s: ['"Rubik 80s Fade"', 'cursive'],  
      },
    },
  },
  plugins: [],
};
