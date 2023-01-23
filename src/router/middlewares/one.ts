import { useUserStore } from "@stores/user";
import * as httpUser from "@http/user";
import { storeToRefs } from "pinia";

export const verifyToken = (to: any) => {
  if (to.params.token.length == 228) return true;
  else return { name: "error-404" };
};

export const verifyProfile = async (to: any) => {
  const userStore = useUserStore();
  const { user } = storeToRefs(userStore);
  if (user.value?._id != to.params.id) {
    try {
      const getProfile = await httpUser.one(to.params.id);
      if (getProfile) userStore.setProfile(getProfile);
    } catch (error) {
      return { name: "profile-user-error", params: to.params };
    }
  } else userStore.setProfile(user.value);
};
