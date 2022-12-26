import { defineStore, storeToRefs } from "pinia";
import { removeSession } from "@tools/utils";
import { LoginI } from "@interfaces/auth";
import * as Auth from "@http/auth";

import { useAccountStore } from "@stores/account";
const accountStore = useAccountStore();
const { account } = storeToRefs(accountStore);

export const useAuthStore = defineStore("auth", {
  actions: {
    async login(form: LoginI) {
      await Auth.login(form).then(() => {
        this.router.push({ name: "home-shop" });
      });
    },
    async logout() {
      const credentials = {
        email: String(account.value?.email),
        model: String(account.value?.model),
      };
      await Auth.logout(credentials).then(() => {
        this.router.push({ name: "login" });
        accountStore.remove();
        removeSession();
      });
    },
  },
});
