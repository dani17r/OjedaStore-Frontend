import { Dark, SessionStorage } from "quasar";
import { computed } from "vue";

export default () => {
  let modeDark = computed(() => {
    return Dark.mode
      ? { icon: "light_mode", title: "light" }
      : { icon: "dark_mode", title: "dark" };
  });

  const toggleDark = () => {
    SessionStorage.set("mode-dark", !Dark.mode);
    Dark.toggle();
  };

  return {
    toggleDark,
    modeDark,
  };
};
