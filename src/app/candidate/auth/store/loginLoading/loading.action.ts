import { createAction, props } from '@ngrx/store';


const LOADING_ACTION_NAME = '[loading action]'

export const actionState = 'loader'

export const loadingAction = createAction(LOADING_ACTION_NAME,props<{status: boolean}>())

