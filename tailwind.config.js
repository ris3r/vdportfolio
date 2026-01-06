/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                gold: {
                    DEFAULT: '#FFD700',
                    light: '#FFDF33',
                    dark: '#B39700',
                },
                black: {
                    DEFAULT: '#050505',
                    deep: '#000000',
                },
                gray: {
                    dark: '#121212',
                    light: '#1E1E1E',
                    muted: '#A0A0A0',
                }
            },
            fontFamily: {
                main: ['Inter', 'system-ui', 'sans-serif'],
                heading: ['Outfit', 'sans-serif'],
            },
            animation: {
                'fade-in': 'fadeIn 0.8s ease-out forwards',
                'shimmer': 'shimmer 3s infinite ease-in-out',
                'float': 'float 6s infinite ease-in-out',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0', transform: 'translateY(20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                shimmer: {
                    '0%': { textShadow: '0 0 10px rgba(255, 215, 0, 0.2)' },
                    '50%': { textShadow: '0 0 20px rgba(255, 215, 0, 0.5), 0 0 30px rgba(255, 215, 0, 0.3)' },
                    '100%': { textShadow: '0 0 10px rgba(255, 215, 0, 0.2)' },
                },
                float: {
                    '0%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-20px)' },
                    '100%': { transform: 'translateY(0px)' },
                }
            }
        },
    },
    plugins: [],
}
