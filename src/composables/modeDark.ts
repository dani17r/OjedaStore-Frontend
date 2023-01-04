import { Dark, SessionStorage } from "quasar";
import { computed } from "vue";

let light = { icon: "light_mode", title: "Light" };
let dark = { icon: "dark_mode", title: "Dark" };

export default () => {
  Dark.set(Boolean(SessionStorage.getItem("mode-dark")));

  let mode = computed(() => (Dark.mode ? light : dark));
  let flippedMode = computed(() => (Dark.mode ? dark : light));

  const toggle = () => {
    SessionStorage.set("mode-dark", !Dark.mode);
    Dark.toggle();
  };

  let status = computed({
    get: () => Boolean(Dark.mode),
    set: () => toggle(),
  });

  return {
    flippedMode,
    status,
    toggle,
    mode,
  };
};
