import { createAction, props } from "@ngrx/store";

export const applyRequest = createAction('[apply] Request',props<{jobId: any}>());

export const applySuccess = createAction('[apply] Success',props<{data: any}>());

export const applyFailure = createAction('[apply] Failure',props<{error: string}>());