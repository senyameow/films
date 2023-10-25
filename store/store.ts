import { combineReducers, configureStore } from '@reduxjs/toolkit';
import moreInfoSlice from './reducers/MoreInfoSlice';
import userSlice from './reducers/UsersSlice';
import filmSlice from './reducers/MovieSlice';
import reviewSlice from './reducers/ReviewStateSlice';

const rootReducer = combineReducers({
    more: moreInfoSlice,
    user: userSlice,
    film: filmSlice,
    review: reviewSlice,
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']

export const store = setupStore()
