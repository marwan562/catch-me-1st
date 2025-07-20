import { cssVar } from 'tailwindcss/colors'

export default {
  purge: ['./index.html', './src/**/*.js'],
  theme: {
    extend: {
      
      fontFamily: {
        opensans: ["Open Sans", "sans-serif"],
        orbitron: ["Orbitron"],
        playfairDisplay: ["Playfair Display"],
      },
      colors: {
        primary: cssVar('--primary'),
        'primary-foreground': cssVar('--primary-foreground'),
        secondary: cssVar('--secondary'),
        'secondary-foreground': cssVar('--secondary-foreground'),
      },
    },
  },
  plugins: [],
  darkMode: "class",
};
