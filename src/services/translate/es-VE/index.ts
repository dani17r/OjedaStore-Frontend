import register from "./pages/register";
import login from "./pages/login";

export default {
  layouts: {
    public: {
      btn: {
        login: "Iniciar sesion",
        register: "Registrarme",
      },
    },
    main: {
      items: {
        modeDark: {
          light: "Claro",
          dark: "Oscuro",
        },
        logout: "Salir",
      },
    },
  },
  pages: {
    login,
    register,
  },
};
