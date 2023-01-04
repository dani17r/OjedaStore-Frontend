<template>
  <div class="full-width row justify-center items-center content-center q-mb-xl">
    <div class="full-width q-mt-xl" style="max-width: 400px">
      <q-form @submit="authStore.login(form)" @reset="onReset" class="q-gutter-lg">
        <q-input
          :label="$t('pages.login.inputs.email.label')"
          :hint="$t('pages.login.inputs.email.hint')"
          v-model="form.email"
          ref="inputEmail"
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

      <div class="mt-6 grid gap-3">
        <div>
          <a class="capitalize underline cursor-pointer" @click="sendEmailForgot()">{{
            $t("pages.login.links.recoveryPassword")
          }}</a>
        </div>
        <RouterLink :to="{ name: 'register' }" class="capitalize contents">{{
          $t("pages.login.links.goTo")
        }}</RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { empty } from "@helps/inputsValidations";
import { useAuthStore } from "@stores/auth";
import { ref, reactive } from "vue";
import { pick } from "lodash";

const authStore = useAuthStore();
const inputEmail = ref(null);
const isPwd = ref(true);

const form = reactive({
  email: "marcos1922@gmail.com",
  password: "123456789",
  model: "accounts",
  extend: false,
});

const sendEmailForgot = () => {
  let validate = inputEmail.value.validate();
  if (validate) {
    let send = pick(form, ["email", "model"]);
    authStore.sendForgotPassword(send, "Revisa tu email.");
  }
};

const onReset = () => {
  form.password = null;
  form.extend = false;
  isPwd.value = true;
  form.email = null;
};
</script>
