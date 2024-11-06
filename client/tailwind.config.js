/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#F8F9FA",         // Light White
        secondary: "#E9ECEF",       // Light Gray
        dark: "#343A40",            // Dark Gray
        darker: "#212529",          // Very Dark Gray
        accent: "#FFC107",          // Warning Yellow
        success: "#28A745",         // Success Green
        error: "#DC3545",           // Error Red
        info: "#17A2B8",            // Info Blue
      },
      borderRadius: {
        'custom': '0.75rem',        // Custom rounded corners
      },
      spacing: {
        '5': '1.25rem',
        '6': '1.5rem',
        '7': '1.75rem',
        '8': '2rem',
        '9': '2.25rem',
        '10': '2.5rem',
      },
      fontSize: {
        'sm': '0.875rem',
        'base': '1rem',
        'lg': '1.125rem',
        'xl': '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.875rem',
        '4xl': '2.25rem',
      },
    },
  },
  plugins: [],
}