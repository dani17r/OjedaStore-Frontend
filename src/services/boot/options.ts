import { Dark, SessionStorage } from "quasar";
import { boot } from "quasar/wrappers";
import { LoadingBar } from "quasar";

LoadingBar.setDefaults({
  position: "bottom",
  color: "grey",
  size: "3px",
});

export default boot(({ router }) => {
  let dark = Boolean(SessionStorage.getItem("mode-dark"));

  LoadingBar.start();
  Dark.set(dark);

  router.beforeEach(() => {
    LoadingBar.stop();
  });
});
