/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.{html,js}"],
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

      "2xl": "1440px",
      // => @media (min-width: 1536px) { ... }
      se: { max: "359px" }, // Брекпоинт активируется для экранов 359px и ниже
    },
    extend: {
      backgroundImage: {
        back2: "url('/img/first_bg_mob.png')",
        from_human: "url('/img/from_human.png')",
        high: "url('/img/high.png')",
        free: "url('img/free.png')",
        footer_bg: "url('img/footer.png')",
      },
      fontFamily: {
        rfdewi: ["RFDewi"],
        druk: ["DrukCyr"],
        notoserif: ["NotoSerifDisplay"],
        dotgothic: ["DotGothic"],
      },
      colors: {
        bg_black: "#070106",
        black: "#0D0D0D",
        gray_04: "#1A1A1A",
        gray_03: "#353535",
        gray_02: "#B5B5B5",
        white: "#F7F7F7",
        green: "#9FCE48",
        bg: "#444444",
        blackt: "#1E1E1E",
        semyblackt: "#000000CC",
        ultrawhite: "#FFFFFF",
        ultrablack: "#000000",
        gray05: "#535353",
        gray06: "#484848",
        gray07: "#919191",
        gray08: "#868686",
        gray09: "#B4B4B4",
        semywhite: "#FFFFFFCC",
        placeholder_text: "#F7F7F780",
        mentor_bg: "#1C1C1C",
        mentor_block: "#282828",
        blocks_mob: "#1F1F1F",
        upgrade_whyte: "#F3F3F3",
        gray10: "#C7C7C7",
        faq: "#B5B5B5",
      },
    },
  },
  gridTemplateColumns: {
    // Simple 16 column grid
    cv_2lx: "repeat(2, minmax(0, 1fr)) 480px",
    cv_xl: "repeat(2, minmax(0, 1fr)) 480px",
    cv_lg: "repeat(2, minmax(0, 1fr)) 480px",
    cv_md: "repeat(2, minmax(0, 1fr)) 480px",
    cv_sm: "repeat(2, minmax(0, 1fr)) 480px",
  },
  plugins: [],
};
