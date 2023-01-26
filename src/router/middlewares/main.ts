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

    if (Boolean(to.meta.public)) next();
    else {
      if (session) {
        let status = await Auth.status(model);

        if (status) {
          const user = {
            ...status.account,
            ...pick(session, ["expires_at"]),
          };
          userStore.set(user);
          to.meta.user = user;
          to.meta.userActions = userStore;
        }

        if (Boolean(to.meta.protected)) next();
        else {
          if (Boolean(to.meta.private))
            status ? next() : next({ name: "login" });
          else status ? next({ name: "home" }) : next();
        }
      } else {
        if (Boolean(to.meta.protected)) next();
        else Boolean(to.meta.private) ? next({ name: "login" }) : next();
      }
    }
  });
});
