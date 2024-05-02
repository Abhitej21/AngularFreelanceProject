import { createAction, props } from "@ngrx/store";

export const loginRequest = createAction('login Request', props<{username: string,password: string}>())
export const loginSuccess = createAction('login Success', props<{data: any}>())

export const loginFailure = createAction('login Failure', props<{error: string}>());
