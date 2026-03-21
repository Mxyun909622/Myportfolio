/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand': '#1a1a1a',      // 深色/黑色
        'accent': '#0070f3',     // 蓝色
        'light-gray': '#f5f5f7', // 你报错中缺失的这个颜色
      },
    },
  },
  plugins: [],
}
