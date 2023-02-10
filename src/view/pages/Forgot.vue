<template>
  <div class="full-width row justify-center items-center content-center q-mb-xl">
    <div class="full-width q-mt-xl" style="max-width: 400px">
      <q-form @submit="resetPassword" @reset="onReset" ref="elementForm" class="q-gutter-lg">
        <q-input :label="$t('pages.login.inputs.password.label')" :hint="$t('pages.login.inputs.password.hint')"
          :type="isPwd ? 'password' : 'text'" v-model="form.new_password" :rules="[empty]">
          <template v-slot:append>
            <q-icon :name="isPwd ? 'visibility_off' : 'visibility'" class="tw-cursor-pointer" @click="isPwd = !isPwd" />
          </template>
        </q-input>

        <q-input :label="$t('pages.register.inputs.verifyPassword.label')"
          :hint="$t('pages.register.inputs.verifyPassword.hint')" :rules="[empty, verifyValue(form.new_password)]"
          v-model="verifyPassword" type="password" lazy-rules>
        </q-input>

        <div class="tw-mt-10">
          <q-btn label="Accept" color="primary" type="submit" unelevated />
          <q-btn label="Reset" color="primary" class="q-ml-sm" type="reset" flat />
        </div>
      </q-form>

      <div class="tw-mt-6 tw-grid tw-gap-3">
        <RouterLink class="contents" :to="{ name: 'login' }">Go to login</RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup>
// Imports
import { empty, verifyValue } from "@helps/inputsValidations";
import { ref, reactive, onMounted } from "vue";
import { useAuthStore } from "@stores/auth";
import { useRoute } from "vue-router";
// End - Imports

// From Outside
const authStore = useAuthStore();
const route = useRoute();
// End - From Outside

// Instances
const verifyPassword = ref("");
const elementForm = ref(null); //refElement
const isPwd = ref(true);

const form = reactive({
  new_password: "",
  token: "",
});
// End - Instances

// Methods
const onReset = () => {
  verifyPassword.value = null;
  form.new_password = null;
  isPwd.value = true;
};

const resetPassword = () => {
  let resetForm = elementForm.value.reset();
  authStore.resetPassword(form, resetForm);
};
// End - Methods

// Lifecycle
onMounted(() => {
  form.token = route.params.token;
});
// End - Lifecycle
</script>
