import { StateI, AccountT, CreateAccountI } from "@interfaces/account";
import { errorNotify, verifyEmailNotify } from "@helps/customNotify";
import * as httpAccount from "@http/account";
import * as httpAuth from "@http/auth";
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
    create(form: CreateAccountI, onReset: Function) {
      const verifyEmail = () => {
        httpAuth
          .verifyEmail({ email: form.email, model: "accounts" })
          .then(() => {
            verifyEmailNotify("Porfavor revisa tu correo");
            onReset();
          })
          .catch((err) => errorNotify(err.response.data.message));
      };

      httpAccount
        .create(form)
        .then((data: AccountT) => verifyEmail())
        .catch((err) => errorNotify(err.response.data.message));
    },
  },
});
