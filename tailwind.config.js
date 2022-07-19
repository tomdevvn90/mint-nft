module.exports = {
  mode: "jit",
  purge: ['./public/index.html','./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    screens: {
      sm: "640px",
      // => @media (min-width: 640px) { ... }

      md: "768px",
      // => @media (min-width: 768px) { ... }

      lg: "1024px",
      // => @media (min-width: 1024px) { ... }

      xl: "1280px",
      // => @media (min-width: 1280px) { ... }

      "2xl": "1536px"
      // => @media (min-width: 1536px) { ... }
    },
    extend: {
      colors: {
        stroke: "#505050",
        "outrageous-orange": "#FF1158",
        "outrageous-orange-archive": "#FF2E59",
        "primary-red": "#FF0236",
        "social-blue": "#1D9BF0",
        "primary-text": "#333333",
        "light-gray": "#BCBCBC",
        gray: "#828282",
        "dark-gray": "#2F2F2F",
        "alert-purple": "#5762F2",
        "black-alt": "#181818"
      },
      fontFamily: {
        "simplon-bp": ["Simplon BP", "sans-serif"],
        "simplon-bp-mono": ["Simplon BP Mono", "sans-serif"]
      },
      fontSize: {
        header: "86px",
        "header-sm": "56px",
        subheader: "32px"
      },
      height: {
        custom: "296.6px",
        "custom-sm": "193px",
        input: "68px"
      },
      width: {
        custom: "329.6px",
        mint: "640px"
      },
      padding: {
        thin: "1px"
      },
      display: ["group-hover"]
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
};
