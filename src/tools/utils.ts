import { Cookies } from "quasar";

export const removeSession = (model: string) => {
  Cookies.remove(`session_${model}`);
};

export const base64URL = async (file: File) => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.addEventListener("loadend", () => resolve(reader.result));
    reader.readAsDataURL(file);
  });
};
