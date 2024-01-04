/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./App.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            colors: {
                'custom-blue': '#067CFF',
                'custom-lightblue': '#9FC7FF',
                'custom-lightpink': '#FFC7C9',
                'custom-beige': '#FFDD9B',
                'custom-pink': '#FF6A8C',
                'custom-yellow': '#FFC900',
            },
        },
    },
    plugins: [],
}
