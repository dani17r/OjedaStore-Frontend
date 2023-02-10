import { ForgotPasswordT, ResetPasswordT, LoginI } from "@interfaces/auth";
import { useUserStore } from "@stores/user";
import { defineStore, storeToRefs } from "pinia";
import { RouterT } from "@interfaces/general";
import { removeSession } from "@tools/utils";
import * as Auth from "@http/auth";
import * as User from "@http/user";
import { Ref } from "vue";
import {
  autoDestroyNotify,
  sendEmailNotify,
  successNotify,
  errorNotify,
} from "@helps/customNotify";

const userStore = useUserStore();
const { user } = storeToRefs(userStore);

const model = "users";

export const useAuthStore = defineStore("auth", {
  actions: {
    async login(form: LoginI) {
      return Auth.login(form, model)
        .then(() => this.router.push({ name: "home" }))
        .catch((err) => errorNotify(err.response.data.message));
    },

    async logout() {
      return Auth.logout(String(user.value?.email), model)
        .then(() => {
          this.router.push({ name: "home" });
          userStore.remove();
          removeSession(model);

          //Cache
          Auth.status.clear();
          User.one.clear();
        })
        .catch((err) => errorNotify(err.response.data.message));
    },

    async sendVerifyEmail(route: RouterT, message: Ref<null>) {
      return Auth.activeEmail(String(route.params.token), model)
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

    async sendForgotPassword(form: ForgotPasswordT, msg: string) {
      return Auth.forgotPassword(form, model)
        .then(() => sendEmailNotify(msg))
        .catch((err) => errorNotify(err.response.data.message));
    },

    async resetPassword(form: ResetPasswordT, resetForm: Function) {
      return Auth.resetPassword(form, model)
        .then((data) => {
          successNotify(data.message);
          resetForm();
        })
        .catch((err) => autoDestroyNotify(err.response.data.message));
    },
  },
});
