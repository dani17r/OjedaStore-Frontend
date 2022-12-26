import { Cookies } from "quasar";

export const removeSession = () => {
  Cookies.remove("session");
};
