import { SessionStorage } from "quasar";
import { ref } from "vue";

const drawerOne = ref(Boolean(SessionStorage.getItem("drawerOne")));

export default () => {
  const changeStorageDrawerOne = () => {
    SessionStorage.set("drawerOne", drawerOne.value);
  };

  const toggleLeftDrawer = () => {
    drawerOne.value = !drawerOne.value;
    changeStorageDrawerOne();
  };

  return {
    changeStorageDrawerOne,
    toggleLeftDrawer,
    drawerOne,
  };
};
