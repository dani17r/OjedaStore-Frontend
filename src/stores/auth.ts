import { errorNotify } from "@helps/customNotify";
import { useAccountStore } from "@stores/account";
import { defineStore, storeToRefs } from "pinia";
import { removeSession } from "@tools/utils";
import { LoginI } from "@interfaces/auth";
import * as Auth from "@http/auth";

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
  },
});
