<template>
  <div class="full-width row justify-center items-center content-center q-mb-xl">
    <div class="full-width q-mt-xl" style="max-width: 400px">
      <q-form
        @submit="authStore.resetPassword(form, onReset)"
        @reset="onReset"
        class="q-gutter-lg"
      >
        <q-input
          :label="$t('pages.login.inputs.password.label')"
          :hint="$t('pages.login.inputs.password.hint')"
          :type="isPwd ? 'password' : 'text'"
          v-model="form.new_password"
          :rules="[empty]"
        >
          <template v-slot:append>
            <q-icon
              :name="isPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPwd = !isPwd"
            />
          </template>
        </q-input>

        <q-input
          :label="$t('pages.register.inputs.verifyPassword.label')"
          :hint="$t('pages.register.inputs.verifyPassword.hint')"
          :rules="[empty, verifyValue(form.new_password)]"
          v-model="verifyPassword"
          type="password"
          lazy-rules
        >
        </q-input>

        <div class="mt-10">
          <q-btn label="Accept" color="primary" type="submit" unelevated />
          <q-btn label="Reset" color="primary" class="q-ml-sm" type="reset" flat />
        </div>
      </q-form>

      <div class="mt-6 grid gap-3">
        <RouterLink class="contents" :to="{ name: 'login' }">Go to login</RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { empty, verifyValue } from "@helps/inputsValidations";
import { useAuthStore } from "@stores/auth";
import { useRoute } from "vue-router";
import { ref, reactive, onMounted } from "vue";

const authStore = useAuthStore();
const route = useRoute();

const verifyPassword = ref("");
const isPwd = ref(true);

const form = reactive({
  model: "accounts",
  new_password: "",
  token: "",
});

const onReset = () => {
  verifyPassword.value = null;
  form.new_password = null;
  isPwd.value = true;
};

onMounted(() => (form.token = route.params.token));
</script>
