import { createFeatureSelector, createReducer, createSelector, on } from "@ngrx/store";
import { loginFailure, loginRequest, loginSuccess } from "./auth.action";

 export interface State{
    username: string;
    message: string;
    error: string;
    token: string;
 } 

 export const initialState: State = {
    username: '',
    message: '',
    error: '',
    token: ''
 }

 export const authReducer = createReducer(initialState,
        on(loginRequest,(state) => {
            return {
                ...state,
                error: ''
            }
        }),
        on(loginSuccess,(state,{data}) => {
            console.log("hi",data)
            return {
                ...state,
                 username: data.username,
                 message: data.message,
                 error: '',
                 token: data.token,
            }
        }),
        on(loginFailure,(state,{error}) => {
            return {
                ...state,
                token: '',
                error: error
            }
        })
    )

const selectAuthState = createFeatureSelector<State>('auth')
export const selectUsername = createSelector(selectAuthState,state => state.username)