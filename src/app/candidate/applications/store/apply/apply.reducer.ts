import { createFeature, createFeatureSelector, createReducer, createSelector, on } from "@ngrx/store";
import * as ApplyActions from '../apply/apply.action'

export interface ApplyState{
    data: any;
    message: string;
    error: string;
}

export const applyInitialState: ApplyState = {
    data: [],
    message: '',
    error: '', 
}

export const applyReducer = createReducer(
    applyInitialState,
    on(ApplyActions.applyRequest,(state) => {
        return {
            ...state,
            error: '',
        }
    }),
    on(ApplyActions.applySuccess,(state,{data}) => {
        return {
            ...state,
            data: data,
            error: '',
        }
    }),
    // on(ApplyActions.applyFailure,(state,{error}) => {
    //     return {
    //         ...state,
    //         error: error,
    //     }
    // })
)


const selectApplyState = createFeatureSelector<ApplyState>('apply')
export const apply = createSelector(selectApplyState,(state: any) => state.data)

