import { State } from './auth.reducer';
import {  createFeatureSelector, createSelector } from "@ngrx/store";


const loginLoaderState = createFeatureSelector<State>('auth')


export const authLoader = createSelector(loginLoaderState,state => state.username)