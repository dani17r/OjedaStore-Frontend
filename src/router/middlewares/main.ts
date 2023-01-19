import { useUserStore } from "@stores/user";
import { SessionT } from "@interfaces/auth";
import { boot } from "quasar/wrappers";
import * as Auth from "@http/auth";
import { Cookies } from "quasar";
import { pick } from "lodash";

const model = "users";

export default boot(({ router, store }) => {
  const userStore = useUserStore(store);

  router.beforeEach(async (to, from, next) => {
    const session: SessionT = Cookies.get(`session_${model}`);

    if (!!to.meta.public) next();
    else {
      if (session) {
        let status = await Auth.status(model);
        if (status) {
          userStore.set({
            ...status.account,
            ...pick(session, ["expires_at"]),
          });
        }

        if (!!to.meta.protected) next();
        else {
          if (!!to.meta.private) status ? next() : next({ name: "login" });
          else !status ? next() : next({ name: "home-shop" });
        }
      } else {
        if (!!to.meta.protected) next();
        else !to.meta.private ? next() : next({ name: "login" });
      }
    }
  });
});
