import { ForgotPasswordT, ResetPasswordT, LoginI } from "@interfaces/auth";
import { useAccountStore } from "@stores/account";
import { defineStore, storeToRefs } from "pinia";
import { RouterT } from "@interfaces/general";
import { removeSession } from "@tools/utils";
import * as Auth from "@http/auth";
import { Ref } from "vue";
import {
  autoDestroyNotify,
  sendEmailNotify,
  successNotify,
  errorNotify,
} from "@helps/customNotify";

const accountStore = useAccountStore();
const { account } = storeToRefs(accountStore);

export const useAuthStore = defineStore("auth", {
  actions: {
    login(form: LoginI) {
      Auth.login(form)
        .then(() => this.router.push({ name: "home-shop" }))
        .catch((err) => errorNotify(err.response.data.message));
    },
    logout() {
      const credentials = {
        email: String(account.value?.email),
        model: String(account.value?.model),
      };
      Auth.logout(credentials)
        .then(() => {
          this.router.push({ name: "login" });
          accountStore.remove();
          removeSession();
        })
        .catch((err) => errorNotify(err.response.data.message));
    },
    sendVerifyEmail(route: RouterT, message: Ref<null>) {
      Auth.activeEmail({
        token: String(route.params.token),
        model: "accounts",
      })
        .then((data) => {
          setTimeout(() => {
            message.value = data.message;
            autoDestroyNotify("Esta pestaña se auto cerrara");
          }, 200);
        })
        .catch((data) => {
          setTimeout(() => {
            message.value = data.response.data?.message;
          }, 200);
        });
    },
    sendForgotPassword(form: ForgotPasswordT, msg: string) {
      Auth.forgotPassword(form)
        .then(() => sendEmailNotify(msg))
        .catch((err) => errorNotify(err.response.data.message));
    },
    resetPassword(form: ResetPasswordT, onReset: Function) {
      Auth.resetPassword(form)
        .then((data) => {
          successNotify(data.message);
          onReset();
        })
        .catch((err) => autoDestroyNotify(err.response.data.message));
    },
  },
});
