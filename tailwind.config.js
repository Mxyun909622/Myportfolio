/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // 品牌色系：与头像背景（雾霾蓝 #74a0b4）同源
        ink: '#1d1d1f',          // 主文字
        secondary: '#6e6e73',    // 次级文字
        hairline: '#d2d2d7',     // 分隔线
        surface: '#f5f5f7',      // 页面底色
        accent: '#3d6f8c',       // 深雾霾蓝（主强调色，头像背景加深）
        'accent-hover': '#32607b',
        'accent-soft': '#eaf1f5', // 极浅雾蓝（高亮底色）
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
