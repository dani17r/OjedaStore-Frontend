import { errorNotify, sendEmailNotify } from "@helps/customNotify";
import {
  profileFields,
  CreateUserI,
  nameImage,
  StateI,
  ImageT,
  UserT,
} from "@interfaces/user";
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
    profile: null,
  }),
  getters: {
    emailIsVerify: (state) => (state.user ? !state.user.verifiedAt : false),
    currentUserOnly: (state) => state.user?._id == state.profile?._id,
    images: (state) => (name: nameImage) => {
      return state.user?.images[name] as Partial<ImageT>;
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
    setProfile(newProfile: UserT) {
      // verificamos que no sea null
      if (newProfile) {
        let newProfileString = JSON.stringify(newProfile);
        let profileString = JSON.stringify(this.profile);

        //Si son diferentes entonces insertamos el usuario.
        if (newProfileString != profileString) {
          this.profile = newProfile;
        }
      }
    },
    removeProfile() {
      if (this.profile != null) this.profile = null;
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
    changeImage(field: "herou" | "avatar", value: ImageT) {
      if (this.user?.images) this.user.images[field] = value;
    },
    changeField(field: profileFields, newValue: never) {
      if (this.user && this.profile && field) {
        if (this.user[field] != newValue) {
          this.user[field] = newValue;
          this.profile[field] = newValue;
          httpUser.update(this.user?._id, { [field]: this.user[field] });
        }
      }
    },
  },
});
