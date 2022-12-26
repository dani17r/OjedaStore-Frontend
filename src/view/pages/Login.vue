<template>
  <div class="full-width row justify-center items-center content-center q-mb-xl">
    <div class="full-width q-mt-xl" style="max-width: 400px">
      <q-form @submit="authStore.login(form)" @reset="onReset" class="q-gutter-lg">
        <q-input
          label="Your email *"
          v-model="form.email"
          hint="Your email"
          :rules="[empty]"
          lazy-rules
        />

        <q-input
          :type="isPwd ? 'password' : 'text'"
          hint="Password with toggle"
          v-model="form.password"
          label="Your password"
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

        <q-toggle v-model="accept" label="I accept the license and terms" />

        <div class="mt-10">
          <q-btn label="Submit" type="submit" color="primary" />
          <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
        </div>
      </q-form>

      <div class="mt-6">
        <RouterLink :to="{ name: 'register' }">Ir a registro</RouterLink>
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
const accept = ref(true);
const form = reactive({
  email: "marcos1922@gmail.com",
  password: "123456789",
  model: "accounts",
});

const onReset = () => {
  form.name = null;
  form.password = null;
  accept.value = false;
  isPwd.value = true;
};
</script>
