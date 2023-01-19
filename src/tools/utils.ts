import { Cookies } from "quasar";

export const removeSession = (model: string) => {
  Cookies.remove(`session_${model}`);
};
