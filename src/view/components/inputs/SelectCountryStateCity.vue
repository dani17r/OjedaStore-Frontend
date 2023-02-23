<template>
  <q-select
    @update:model-value="(val:CountryT) => emits('saveCountry', omit(val, 'states'))"
    @filter="filterCountries"
    :options="optionCountries"
    option-label="name"
    input-debounce="0"
    v-model="country"
    label="Pais"
    use-input
  >
    <template v-slot:option="{ opt, itemProps }">
      <q-item @click="selectCountry(opt)" v-bind="itemProps">
        <q-item-section avatar>
          <q-icon name="place" />
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ opt.name }}</q-item-label>
          <q-item-label caption>{{ opt.iso3 }}</q-item-label>
        </q-item-section>
      </q-item>
    </template>
  </q-select>

  <q-select
    @update:model-value="(val:StateT) => emits('saveState', omit(val, 'cities'))"
    v-show="country != null && optionStates.length"
    :disabled="country != null"
    :options="optionStates"
    @filter="filterState"
    option-label="name"
    input-debounce="0"
    v-model="state"
    label="Estado"
    use-input
  >
    <template v-slot:option="{ opt, itemProps }">
      <q-item @click="selectState(opt)" v-bind="itemProps">
        <q-item-section avatar>
          <q-icon name="place" />
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ opt.name }}</q-item-label>
        </q-item-section>
      </q-item>
    </template>
  </q-select>

  <q-select
    @update:model-value="(val:CityT) => emits('saveCity', val)"
    v-show="state != null && optionCities.length"
    :disabled="country != null"
    :options="optionCities"
    @filter="filterCity"
    option-label="name"
    input-debounce="0"
    v-model="city"
    label="Ciudad"
    use-input
  >
    <template v-slot:option="{ opt, itemProps }">
      <q-item v-bind="itemProps">
        <q-item-section avatar>
          <q-icon name="place" />
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ opt.name }}</q-item-label>
        </q-item-section>
      </q-item>
    </template>
  </q-select>
</template>

<script setup lang="ts">
// Internal proyect
import {
  CountryT,
  CountryI,
  StateI,
  StateT,
  CityI,
  CityT,
  LocationI,
} from "@interfaces/user";
import { searchWorld } from "@tools/utils";
import { omit } from "lodash";

//Libraries
import { onMounted, ref } from "vue";

const props = defineProps<{
  countries: { [key: string]: CountryI };
  location: LocationI;
}>();
const emits = defineEmits({
  saveCountry: (val: CountryT) => val,
  saveState: (val: StateT) => val,
  saveCity: (val: CityT) => val,
});

const idCountry = 238; //Venezuela
const idState = 24; //Zulia
const idCity = 1; //Ojeda

const countriesStatesCities = ref<{ [key: string]: CountryI }>({});

const optionCountries = ref<CountryI[]>([]);
const optionStates = ref<StateI[]>([]);
const optionCities = ref<CityI[]>([]);

const country = ref<CountryT>(null);
const state = ref<StateT>(null);
const city = ref<CityT>(null);

const selectCountry = (val: CountryI) => {
  optionStates.value = Object.values(val.states);
  state.value = null;
  city.value = null;
};

const selectState = (val: StateI) => {
  optionCities.value = Object.values(val.cities);
  city.value = null;
};

const filterCountries = (val: string, update: (arg0: () => void) => void) => {
  update(() => {
    const needle = val.toLocaleLowerCase();
    const $countries = Object.values(countriesStatesCities.value);
    optionCountries.value = $countries.filter((v) => {
      return searchWorld(v.name, needle) || searchWorld(v.iso3, needle);
    });
  });
};

const filterState = (val: string, update: (arg0: () => void) => void) => {
  update(() => {
    const needle = val.toLocaleLowerCase();
    if (country.value != null) {
      const $states = Object.values(
        countriesStatesCities.value[country.value.id].states
      );
      optionStates.value = $states.filter((v) => {
        return searchWorld(v.name, needle) || searchWorld(v.state_code, needle);
      });
    }
  });
};

const filterCity = (val: string, update: (arg0: () => void) => void) => {
  update(() => {
    const needle = val.toLocaleLowerCase();
    if (country.value != null && state.value != null) {
      const $cities = Object.values(
        countriesStatesCities.value[country.value.id].states[state.value.id]
          .cities
      );
      optionCities.value = $cities.filter((v) => searchWorld(v.name, needle));
    }
  });
};

onMounted(() => {
  countriesStatesCities.value = props.countries;

  optionCities.value = Object.values(
    props.countries[idCountry].states[idState].cities
  );
  optionStates.value = Object.values(props.countries[idCountry].states);
  optionCountries.value = Object.values(props.countries);

  country.value = props.location.country ?? props.countries[idCountry];
  state.value =
    props.location.state ?? props.countries[idCountry].states[idState];
  city.value =
    props.location.city ??
    props.countries[idCountry].states[idState].cities[idCity];

  emits("saveCountry", omit(country.value, "states"));
  emits("saveState", omit(state.value, "cities"));
  emits("saveCity", city.value);
});
</script>
