export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      colors: {
        brand: {
          primary: "#660191",
          accent: "#22D3EE",
        },
        bg: "#FFFFFF",
        text: "#111827",
        muted: "#6B7280",
        surface: "#F7F7F7",
        border: "#E3DCDC",
      },
      borderRadius: {
        md: "12px",
        lg: "16px",
        xl: "24px",
      },
      boxShadow: {
        card: "0 10px 30px rgba(17, 24, 39, 0.08)",
        cardHover: "0 20px 40px rgba(17, 24, 39, 0.10)",
      },
    },
  },
  plugins: [],
}
