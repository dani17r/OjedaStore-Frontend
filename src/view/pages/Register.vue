<template>
  <div class="full-width row justify-center items-center content-center q-mb-xl">
    <div class="full-width q-mt-xl" style="max-width: 400px">
      <q-form @submit="accountStore.create(form)" @reset="onReset" class="q-gutter-lg">
        <q-input
          label="Your email *"
          v-model="form.email"
          hint="Your email"
          :rules="[empty]"
          lazy-rules
        />

        <q-input
          :rules="[empty, mini(4)]"
          v-model="form.fullname"
          hint="Your full name *"
          label="Full name"
          lazy-rules
        />

        <q-input
          v-model="form.username"
          hint="full username"
          label="Username"
          :rules="[empty]"
          lazy-rules
        />

        <q-input
          :type="isPwd ? 'password' : 'text'"
          hint="Password with toggle"
          v-model="form.password"
          label="Your password"
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
          :rules="[empty, verifyValue(form.password)]"
          hint="Verify password with toggle"
          v-model="verifyPassword"
          label="Verify password"
          type="password"
          lazy-rules
        >
        </q-input>

        <div class="mt-10">
          <q-btn label="Register" type="submit" color="primary" />
          <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
        </div>
      </q-form>
      <div class="mt-6">
        <RouterLink :to="{ name: 'login' }">Ir a login</RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAccountStore } from "@stores/account";
import { empty, mini } from "@helps/inputsValidations";
import { ref, reactive } from "vue";
import { verifyValue } from "@helps/inputsValidations";

const accountStore = useAccountStore();

const verifyPassword = ref("12345678");
const isPwd = ref(true);
const form = reactive({
  email: "test1@test.com",
  password: "12345678",
  fullname: "test uno",
  username: "test1",
});

const onReset = () => {
  verifyPassword.value = null;
  form.username = null;
  form.fullname = null;
  form.password = null;
  isPwd.value = true;
  form.email = null;
};
</script>
