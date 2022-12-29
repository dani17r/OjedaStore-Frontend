<template>
  <div class="full-width row justify-center items-center content-center q-mb-xl">
    <div class="full-width q-mt-xl" style="max-width: 400px">
      <q-form @submit="register()" @reset="onReset" class="q-gutter-lg">
        <q-input
          :label="$t('pages.register.inputs.email.label')"
          :hint="$t('pages.register.inputs.email.hint')"
          v-model="form.email"
          :rules="[empty]"
          lazy-rules
        />

        <q-input
          :label="$t('pages.register.inputs.fullname.label')"
          :hint="$t('pages.register.inputs.fullname.hint')"
          :rules="[empty, mini(4)]"
          v-model="form.fullname"
          lazy-rules
        />

        <q-input
          :label="$t('pages.register.inputs.username.label')"
          :hint="$t('pages.register.inputs.username.hint')"
          v-model="form.username"
          :rules="[empty]"
          lazy-rules
        />

        <q-input
          :label="$t('pages.register.inputs.password.label')"
          :hint="$t('pages.register.inputs.password.hint')"
          :type="isPwd ? 'password' : 'text'"
          v-model="form.password"
          :rules="[empty]"
          lazy-rules
        >
          <template v-slot:append>
            <q-icon
              :name="isPwd ? 'visibility_off' : 'visibility'"
              @click="isPwd = !isPwd"
              class="cursor-pointer"
            />
          </template>
        </q-input>

        <q-input
          :label="$t('pages.register.inputs.verifyPassword.label')"
          :hint="$t('pages.register.inputs.verifyPassword.hint')"
          :rules="[empty, verifyValue(form.password)]"
          v-model="verifyPassword"
          type="password"
          lazy-rules
        >
        </q-input>

        <q-toggle v-model="accept" :label="$t('pages.register.toggle')" />

        <div class="mt-10">
          <q-btn :label="$t('pages.register.btn.submit')" type="submit" color="primary" />
          <q-btn
            :label="$t('pages.register.btn.reset')"
            class="q-ml-sm"
            color="primary"
            type="reset"
            flat
          />
        </div>
      </q-form>
      <div class="mt-6">
        <RouterLink :to="{ name: 'login' }">Ir a login</RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { empty, mini } from "@helps/inputsValidations";
import { verifyValue } from "@helps/inputsValidations";
import { useAccountStore } from "@stores/account";
import { ref, reactive } from "vue";

const accountStore = useAccountStore();

const verifyPassword = ref("12345678");
const accept = ref(false);
const isPwd = ref(true);
const form = reactive({
  email: "test1@test.com",
  password: "12345678",
  fullname: "test uno",
  username: "test1",
});

const register = () => {
  accept.value = accountStore.create(form, onReset);
};

const onReset = () => {
  verifyPassword.value = null;
  form.username = null;
  form.fullname = null;
  form.password = null;
  accept.value = false;
  isPwd.value = true;
  form.email = null;
};
</script>
