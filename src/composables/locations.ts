import { deleteProxys, verifyObjects } from "@tools/utils";
import { CountryI, LocationI } from "@interfaces/user";
import * as httpLocation from "@http/locations";
import { shallowRef, computed, ref } from "vue";
import { cloneDeep } from "lodash";

const countriesStatesCities = ref<{ [key: string]: CountryI }>({});
const lengthLocation = shallowRef<number | null>(null);
const copyLocations = shallowRef<LocationI[]>([]);
const locations = ref<LocationI[]>([]);
const modeEdit = shallowRef(false);

export default () => {
  const init = (valueDefault: LocationI[]) => {
    if (valueDefault.length) {
      if (verifyObjects(locations, valueDefault)) {
        const locationDefault = deleteProxys(valueDefault);
        copyLocations.value = cloneDeep(locationDefault);
        locations.value = locationDefault;
      }
    }
    httpLocation.countriesStatesCities().then((data) => {
      countriesStatesCities.value = <{ [key: string]: CountryI }>data;
    });
  };

  const position = computed(
    () => lengthLocation.value ?? locations.value.length - 1
  );

  const newLocation = () =>
    locations.value.push({
      references: "",
      country: null,
      address: "",
      state: null,
      city: null,
    });

  const removeLocation = (index?: number) => {
    const position = index != undefined ? index : locations.value.length - 1;
    locations.value.splice(position, 1);
    locations.value = locations.value.length != 0 ? locations.value : [];
    return locations.value;
  };

  return {
    countriesStatesCities,
    removeLocation,
    lengthLocation,
    copyLocations,
    newLocation,
    locations,
    position,
    modeEdit,
    init,
  };
};
