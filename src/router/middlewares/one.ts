import { RouteLocationNormalized } from "vue-router";
import { UserT } from "@interfaces/user";
import * as httpUser from "@http/user";

export const verifyToken = (to: RouteLocationNormalized) => {
  let tokenLenght = to.params.token.length;
  if (tokenLenght > 116 || tokenLenght <= 228) return true;
  else return { name: "error-404" };
};

export const verifyProfile = async (to: RouteLocationNormalized) => {
  const userStore: any = to.meta.userActions;
  let user: UserT | any = to.meta.user;

  // si el id no es igual al que traemos por parametros
  if (user.username != to.params.username) {
    httpUser.profile(to.params.username).then((data) => {
      if (data) userStore.setProfile(data);
      else userStore.removeProfile();
    });
  } else userStore.setProfile(user);
};

export const authUser = async (to: RouteLocationNormalized) => {
  if (to?.meta?.user == null) return { name: "login" };
};
