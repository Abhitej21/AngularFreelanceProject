import { createAction, props } from "@ngrx/store"

const MAIN_LOAD_NAME = '[mainload action]'

export const mainLoadAction = createAction(MAIN_LOAD_NAME,props<{status: boolean}>())