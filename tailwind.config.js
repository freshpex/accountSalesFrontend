/** @type {import('tailwindcss').Config} */

export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        screens: {
            'mobile-sm': '320px',
            'mobile-md': '375px',
            'mobile-lg': '425px',
            'tablet': '768px',
            'laptop': '1024px',
            'laptop-lg': '1440px',
        },
        container: {
            center: true,
            padding: {
                DEFAULT: '1.5rem',
            },
            screens: {
                'laptop-lg': '1360px',
            },
        },
        colors: {
            inherit: 'inherit',
            transparent: 'transparent',
            current: 'currentColor',
            primary: '#3D00B7',
            accent: {
                300: '#14C8B0',
                400: '#00AC4F',
                900: '#FF002E',
            },
            neutral: {
                100: '#FFFFFF',
                200: '#f7f9fb',
                300: '#f2f3f5',
                400: '#EFEFEF',
                500: '#A4A4A4',
                600: '#636363',
                900: '#000000',
            }
        },
        fontSize: {
            200: '0.6875rem',
            300: '0.75rem',
            400: '0.875rem',
            500: '1rem',
            600: '1.25rem',
            700: '1.5rem',
            800: '2rem',
            900: '2.5rem',
        },
        extend: {
            animation: {
                'spin-slow': 'spin 10s linear infinite',
            }
        },
    },
    plugins: [],
}

