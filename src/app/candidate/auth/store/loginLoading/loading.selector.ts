import { LoadingState } from './loading.reducer';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { actionState } from './loading.action';


const cur_val = createFeatureSelector<LoadingState>(actionState)

export const loading = createSelector(cur_val,state => {
    console.log(state)
    return state.status
})