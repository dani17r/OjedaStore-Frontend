import register from "./pages/register";
import login from "./pages/login";

export default {
  "go-login": "Go to login",
  layouts: {
    public: {
      btn: {
        login: "Login",
        register: "Register",
      },
    },
    main: {
      items: {
        modeDark: {
          light: "Light",
          dark: "Dark",
        },
        logout: "Logout",
      },
    },
  },
  pages: {
    login,
    register,
  },
};
