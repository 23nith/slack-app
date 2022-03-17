module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      flexGrow: {
        2: '.2',
        4: '4',
        16: '16'
      },
      colors: {
        messageArea: "#151819", 
        userMessage: "#3978ff",
        primary: "#27292b",
        dark: "#171a1a",
        senderMessage: "#27292b",
      }
    },
  },
  plugins: [],
};
