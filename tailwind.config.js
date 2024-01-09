/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            colors: {
                'custom-blue': '#067CFF',
                'custom-darkblue': '#00499A',
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
