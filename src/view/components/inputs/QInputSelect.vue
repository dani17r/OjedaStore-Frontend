<template>
    <div tabindex="1" class="absolute" ref="divElement"></div>
    <q-select v-bind="$attrs" :class="['capitalize edit-select', !modeActive ? 'q-field--disabled' : 'not-select']"
        @popupHide="desactive" popupContentClass="capitalize" @popupShow="modeActive = true" style="padding-left: 15px;"
        v-model="value">
    </q-select>
</template>

<script setup lang="ts">
import { ref, Ref } from "vue";

const props = defineProps({
    modelValue: {
        type: String,
    },
});

const value = ref(props.modelValue)
const divElement = ref<Ref | null>(null);
const modeActive = ref(false);

const desactive = () => {
    modeActive.value = false
    setTimeout(() => divElement.value.focus(), 150)
}
</script>

<style>
.edit-select .q-field__inner {
    cursor: default;
}

.edit-select .q-field__control:before {
    border: 0px !important;
}

.edit-select.not-select .q-field__control:after {
    height: 0px !important;
}
</style>