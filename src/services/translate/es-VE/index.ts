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
      banner: {
        text: "Por favor revisa tu email para verificar la cuenta",
        link: "Enviar de nuevo",
      },
    },
  },
  pages: {
    login,
    register,
  },
};
