<template>
  <div class="full-width row justify-center items-center content-center q-mb-xl">
    <div class="full-width q-mt-xl" style="max-width: 400px">
      <q-form @submit="authStore.login(form)" @reset="onReset" class="q-gutter-lg">
        <q-input
          :label="$t('pages.login.inputs.email.label')"
          :hint="$t('pages.login.inputs.email.hint')"
          v-model="form.email"
          :rules="[empty]"
          lazy-rules
        />

        <q-input
          :label="$t('pages.login.inputs.password.label')"
          :hint="$t('pages.login.inputs.password.hint')"
          :type="isPwd ? 'password' : 'text'"
          v-model="form.password"
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

        <q-toggle v-model="form.extend" :label="$t('pages.login.toggle')" />

        <div class="mt-10">
          <q-btn
            :label="$t('pages.login.btn.submit')"
            color="primary"
            type="submit"
            unelevated
          />
          <q-btn
            :label="$t('pages.login.btn.reset')"
            color="primary"
            class="q-ml-sm"
            type="reset"
            flat
          />
        </div>
      </q-form>

      <div class="mt-6">
        <RouterLink :to="{ name: 'register' }" class="capitalize">{{
          $t("pages.login.link")
        }}</RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from "@stores/auth";
import { empty } from "@helps/inputsValidations";
import { ref, reactive } from "vue";

const authStore = useAuthStore();
const isPwd = ref(true);
const form = reactive({
  email: "marcos1922@gmail.com",
  password: "123456789",
  model: "accounts",
  extend: false,
});

const onReset = () => {
  form.password = null;
  form.extend = false;
  isPwd.value = true;
  form.email = null;
  form.name = null;
};
</script>
