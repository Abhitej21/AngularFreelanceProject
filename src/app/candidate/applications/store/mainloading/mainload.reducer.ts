import { createReducer, on } from "@ngrx/store";
import { mainLoadAction } from "./mainload.actions";

export interface MainLoadingState{
    status: boolean;
}

export const mainLoadingInitialState: MainLoadingState = {
    status: true        
}

export const mainLoadReducer = createReducer(
    mainLoadingInitialState,
    on(mainLoadAction, (state,action) => {
        return {
            ...state,
            status: action.status
        }
    })
)