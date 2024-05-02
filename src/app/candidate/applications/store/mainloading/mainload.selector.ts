import { createFeatureSelector, createSelector } from "@ngrx/store";
import { MainLoadingState } from "./mainload.reducer";

const cur_val = createFeatureSelector<MainLoadingState>('mainload')
export const isMainLoading = createSelector(cur_val,state => state.status)