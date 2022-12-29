import { createI18n } from "vue-i18n";
import messages from "@services/translate";
import { boot } from "quasar/wrappers";

export default boot(({ app }) => {
  const i18n = createI18n({
    globalInjection: true,
    locale: "es-VE",
    legacy: false,
    messages,
  });

  app.use(i18n);
});
