import { Cookies, date } from "quasar";
import { toRaw, unref } from "vue";

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

export const formatDate = (value?: string) =>
  date.formatDate(value, "YYYY/MM/DD HH:mm");

export const searchWorld = (value: string, search: string) => {
  return value.toLocaleLowerCase().includes(search);
};

export const deleteProxys = (vals: any) => {
  return toRaw(vals).map((val: any) => unref({ ...val }));
};

export const verifyObjects = (val1: any, val2: any) => {
  return JSON.stringify({ ...val1 }) != JSON.stringify({ ...val2 });
};
