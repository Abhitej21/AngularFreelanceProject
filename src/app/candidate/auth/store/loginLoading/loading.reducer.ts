import { createReducer, on } from "@ngrx/store";
import { loadingAction } from "./loading.action";

export interface LoadingState{
    status: boolean;
}

export const loadingInitialState: LoadingState = {
    status: false
}

export const loadingReducer = createReducer(
    loadingInitialState,
    on(loadingAction,(state,action) => {
        return {
            ...state,
             status: action.status
        }
    })
)