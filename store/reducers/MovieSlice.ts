import { Doc, Id } from "@/convex/_generated/dataModel";
import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from '@reduxjs/toolkit'

interface filmState {
    filmId: Id<'films'> | undefined;
}

const initialState: filmState = {
    filmId: undefined
}

export const filmSlice = createSlice({
    name: 'film',
    initialState,
    reducers: {
        onStore(state, action: PayloadAction<Id<'films'>>) {
            state.filmId = action.payload
        },
        onClose(state) {
            state.filmId = undefined
        },
    }
})

export default filmSlice.reducer