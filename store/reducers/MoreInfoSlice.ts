import { Id } from "@/convex/_generated/dataModel";
import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from '@reduxjs/toolkit'

interface moreInfoState {
    isOpen: boolean;
    filmId: Id<'films'> | undefined
}

const initialState: moreInfoState = {
    isOpen: false,
    filmId: undefined
}

export const moreInfoSlice = createSlice({
    name: 'moreInfo',
    initialState,
    reducers: {
        onOpen(state, action: PayloadAction<Id<'films'>>) {
            state.isOpen = true
            state.filmId = action.payload
        },
        onClose(state) {
            state.isOpen = false
            state.filmId = undefined
        },
    }
})

export default moreInfoSlice.reducer