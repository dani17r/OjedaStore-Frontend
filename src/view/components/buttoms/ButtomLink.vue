<template>
  <q-item clickable :to="to" exact>
    <q-item-section v-if="icon" avatar>
      <q-icon :name="icon" />
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ title }}</q-item-label>
      <q-item-label caption>{{ description }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script setup lang="ts">
export interface ButtomLinkDrawerOneI {
  description?: string;
  title: string;
  icon?: string;
  to?: any;
}

withDefaults(defineProps<ButtomLinkDrawerOneI>(), {
  description: "",
  icon: "",
  to: "#",
});
</script>
