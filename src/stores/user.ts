import { StateI, UserT, CreateUserI } from "@interfaces/user";
import { errorNotify, sendEmailNotify } from "@helps/customNotify";
import * as httpUser from "@http/user";
import * as httpAuth from "@http/auth";
import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: (): StateI => ({
    lifecycles: {
      mounted: false,
      updated: false,
    },
    user: null,
  }),
  getters: {
    emailIsVerify: (state) => {
      return state.user ? !state.user.verifiedAt : false;
    },
  },
  actions: {
    set(newUser: UserT) {
      // si no se ha montado el store
      if (!this.lifecycles.mounted) {
        this.lifecycles.mounted = true;
        // verificamos que no sea null
        if (newUser) {
          let newUserString = JSON.stringify(newUser);
          let userString = JSON.stringify(this.user);

          //Si son diferentes entonces insertamos el usuario.
          if (newUserString != userString) {
            this.user = newUser;
          }
        }
      }
    },
    remove() {
      if (this.lifecycles.mounted) {
        this.lifecycles.mounted = false;
        this.user = null;
      }
    },
    create(form: CreateUserI, onReset: Function) {
      const verifyEmail = () => {
        httpAuth
          .verifyEmail(form.email, "users")
          .then(() => {
            sendEmailNotify("Porfavor revisa tu correo");
            onReset();
          })
          .catch((err) => errorNotify(err.response.data.message));
      };

      httpUser
        .create(form)
        .then((_data: UserT) => verifyEmail())
        .catch((err) => errorNotify(err.response.data.message));
    },
  },
});
