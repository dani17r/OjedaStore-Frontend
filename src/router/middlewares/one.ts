import { RouteLocationNormalized } from "vue-router";
import { useUserStore } from "@stores/user";
import * as httpUser from "@http/user";
import { storeToRefs } from "pinia";
import { StateI, UserT, CreateUserI } from "@interfaces/user";

export const verifyToken = (to: RouteLocationNormalized) => {
  if (to.params.token.length == 228) return true;
  else return { name: "error-404" };
};

export const verifyProfile = async (to: RouteLocationNormalized) => {
  const userStore: any = to.meta?.userActions;
  let user: UserT | any = to.meta?.user;

  // si el id no es igual al que traemos por parametros
  if (user?._id != to.params?.id) {
    // si el id no cumple con 24 caracteres no es un id
    if (to.params?.id.length == 24) {
      httpUser.one(String(to.params?.id)).then((data) => {
        if (data) userStore.setProfile(data);
        else userStore.removeProfile();
      });
    } else userStore.removeProfile();
  } else userStore.setProfile(user);
};

export const authUser = async (to: RouteLocationNormalized) => {
  if (to?.meta?.user == null) return { name: "login" };
};
