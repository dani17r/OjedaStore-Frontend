import { SessionStorage } from "quasar";
import { useI18n } from "vue-i18n";
import { computed, ref } from "vue";

let langs = {
  es: "es-VE",
  en: "en-US",
};

export default () => {
  const { t, locale } = useI18n({ useScope: "global" });

  let langDefault = computed(() =>
    String(locale.value).includes("es") ? "en" : "es"
  );

  locale.value = SessionStorage.getItem("lang") ?? locale.value;

  const setLang = (value: string) => {
    SessionStorage.set("lang", value);
    locale.value = value;
  };

  const toggleLang = () => {
    langs.es == locale.value ? setLang(langs.en) : setLang(langs.es);
  };

  return {
    langDefault,
    toggleLang,
    langs,
    t,
  };
};
