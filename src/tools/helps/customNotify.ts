import { Notify } from "quasar";

export const sendEmailNotify = (msg: string) => {
  Notify.create({
    position: "bottom-right",
    type: "positive",
    group: "emails",
    message: msg,
  });
};

export const errorNotify = (msg: string) => {
  Notify.create({
    position: "bottom-right",
    type: "negative",
    group: "error",
    message: msg,
  });
};

export const successNotify = (msg: string) => {
  Notify.create({
    position: "bottom-right",
    type: "positive",
    group: "success",
    message: msg,
  });
};

export const autoDestroyNotify = (msg: string, time = 300) => {
  Notify.create({
    onDismiss: () => setTimeout(() => window.close(), time),
    position: "bottom-right",
    group: "autoDestroy",
    type: "negative",
    message: msg,
  });
};
