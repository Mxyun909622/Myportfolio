/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Apple 设计语言色板
        ink: '#1d1d1f',        // 主文字
        secondary: '#6e6e73',  // 次级文字（Apple 灰）
        hairline: '#d2d2d7',   // 分隔线
        surface: '#f5f5f7',    // 页面底色
        apple: '#0071e3',      // Apple 蓝（主强调色）
        'apple-hover': '#0077ed',
      },
      fontFamily: {
        sans: [
          '-apple-system', 'BlinkMacSystemFont', '"SF Pro Display"', '"SF Pro Text"',
          '"PingFang SC"', '"Hiragino Sans GB"', '"Microsoft YaHei"', 'Inter',
          '"Segoe UI"', '"Helvetica Neue"', 'Arial', 'sans-serif',
        ],
      },
      boxShadow: {
        card: '0 2px 8px rgba(0,0,0,0.04), 0 12px 32px rgba(0,0,0,0.05)',
        'card-hover': '0 4px 12px rgba(0,0,0,0.06), 0 20px 48px rgba(0,0,0,0.09)',
      },
    },
  },
  plugins: [],
}
