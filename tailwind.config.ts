import type { Config } from "tailwindcss";

const config: Config = {
    content: ["./pages/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}", "./app/**/*.{js,ts,jsx,tsx,mdx}"],
    theme: {
        extend: {
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
            },
            colors: {
                "roof-terracotta": {
                    "50": "#fef2f2",
                    "100": "#fde3e3",
                    "200": "#fdcbcb",
                    "300": "#faa7a8",
                    "400": "#f57475",
                    "500": "#eb4849",
                    "600": "#d72b2c",
                    "700": "#af1f20",
                    "800": "#961e1f",
                    "900": "#7c2021",
                    "950": "#430c0c",
                },
                "pickled-bluewood": {
                    "50": "#f5f7fa",
                    "100": "#eaeff4",
                    "200": "#d0dce7",
                    "300": "#a6bdd3",
                    "400": "#779bb9",
                    "500": "#557fa2",
                    "600": "#426587",
                    "700": "#36526e",
                    "800": "#30475c",
                    "900": "#2d3e50",
                    "950": "#1d2834",
                },
                "spring-rain": {
                    "50": "#f3f6f3",
                    "100": "#e2eae1",
                    "200": "#c5d5c6",
                    "300": "#aec3b0",
                    "400": "#739477",
                    "500": "#537658",
                    "600": "#3e5d43",
                    "700": "#324a37",
                    "800": "#293c2d",
                    "900": "#233127",
                    "950": "#131b15",
                },
                "frost": {
                    "50": "#eff6e0",
                    "100": "#e9f2d5",
                    "200": "#d2e7af",
                    "300": "#b5d581",
                    "400": "#99c259",
                    "500": "#7ba73b",
                    "600": "#5f852b",
                    "700": "#496625",
                    "800": "#3c5222",
                    "900": "#344621",
                    "950": "#1a260d",
                },
                "regal-blue": {
                    "50": "#eef7ff",
                    "100": "#dcf0ff",
                    "200": "#b2e1ff",
                    "300": "#6dcbff",
                    "400": "#20b0ff",
                    "500": "#0096ff",
                    "600": "#0076df",
                    "700": "#005db4",
                    "800": "#004f94",
                    "900": "#003e74",
                    "950": "#002951",
                },
            },
            screens: {
                'tall-mobile': { 'raw': '(max-width: 639px) and (min-height: 800px)' }
            }
        },
    },
    plugins: [],
};
export default config;
