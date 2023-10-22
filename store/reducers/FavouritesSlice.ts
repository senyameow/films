import { Id } from "@/convex/_generated/dataModel";
import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from '@reduxjs/toolkit'

interface FavouritesState {
    filmIds: Id<'films'>[]
}

const initialState: FavouritesState = {
    filmIds: []
}

export const FavouritesSlice = createSlice({
    name: 'favourites',
    initialState,
    reducers: {
        onStore(state, action: PayloadAction<Id<'films'>[]>) {
            state.filmIds = action.payload
        },
    }
})

export default FavouritesSlice.reducer