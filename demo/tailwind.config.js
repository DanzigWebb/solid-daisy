module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
        "../dist/**/*.{js,jsx,ts,tsx}"
    ],
    theme: {
        extend: {},
    },
    plugins: [
        require("daisyui")
    ],
}
