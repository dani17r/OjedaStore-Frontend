import { Dark, SessionStorage } from "quasar";
import { computed } from "vue";

export default () => {
  let iconDark = computed(() => {
    return Dark.mode ? "light_mode" : "dark_mode";
  });

  const toggleDark = () => {
    SessionStorage.set("mode-dark", !Dark.mode);
    Dark.toggle();
  };

  return {
    toggleDark,
    iconDark,
  };
};
