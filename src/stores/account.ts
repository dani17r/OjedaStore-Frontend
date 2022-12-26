import { StateI, AccountT, CreateAccountI } from "@interfaces/account";
import * as httpAccount from "@http/account";
import { defineStore } from "pinia";

export const useAccountStore = defineStore("account", {
  state: (): StateI => ({
    lifecycles: {
      mounted: false,
      updated: false,
    },
    account: null,
  }),
  actions: {
    set(newAccount: AccountT) {
      // si no se ha montado el store
      if (!this.lifecycles.mounted) {
        this.lifecycles.mounted = true;
        // verificamos que no sea null
        if (newAccount) {
          let newAccountString = JSON.stringify(newAccount);
          let accountString = JSON.stringify(this.account);

          //Si son diferentes entonces insertamos el usuario.
          if (newAccountString != accountString) {
            this.account = newAccount;
          }
        }
      }
    },
    remove() {
      if (this.lifecycles.mounted) {
        this.lifecycles.mounted = false;
        this.account = null;
      }
    },
    async create(form: CreateAccountI) {
      await httpAccount.create(form).then((data: any) => {
        console.log(data);
      });
    },
  },
});
