import { QueryI } from "@interfaces/general";
import { useMemoize } from "@vueuse/core";
import { base } from "@boot/axios";

export const countriesStatesCities = useMemoize(async () => {
  const resp = await base
    .get(`/CSCkeyId.min.json`)
    .catch(() => ({ data: null }));
  return resp.data;
});
