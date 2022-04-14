module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
        "../src/lib/**/*.{js,jsx,ts,tsx}"
    ],
    theme: {
        extend: {},
    },
    plugins: [
        require("daisyui")
    ],
}
