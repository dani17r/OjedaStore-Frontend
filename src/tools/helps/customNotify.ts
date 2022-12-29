import { Notify } from "quasar";

export const verifyEmailNotify = (msg: string) => {
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

export const autoDestroyNotify = (msg: string, time = 300) => {
  Notify.create({
    message: msg,
    position: "bottom-right",
    type: "warning",
    color: "red",
    group: "autoDestroy",
    onDismiss: () => {
      setTimeout(() => window.close(), time);
    },
  });
};
