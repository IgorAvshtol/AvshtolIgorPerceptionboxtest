import {applyMiddleware, combineReducers, createStore} from "redux";
import profileReducer from "./profileReducer";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
    profile: profileReducer
})

export type AppStateType = ReturnType<typeof rootReducer> //типизация стейта всего приложения

export const store = createStore(rootReducer, applyMiddleware(thunk))
