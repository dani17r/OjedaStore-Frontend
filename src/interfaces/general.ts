import { RouteLocationNormalizedLoaded } from "vue-router";

export interface LifecyclesI {
  mounted: Boolean;
  updated: Boolean;
}

export interface QueryI {
  fields_search?: string;
  without?: boolean;
  search?: string;
  fields?: string;
  limit?: number;
  sort?: string;
  pag?: number;
}

export type RouterT = RouteLocationNormalizedLoaded;
