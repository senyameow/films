import { Doc, Id } from "@/convex/_generated/dataModel";
import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from '@reduxjs/toolkit'

interface moreInfoState {
    isOpen: boolean;
    film: Doc<'films'> | undefined
}

const initialState: moreInfoState = {
    isOpen: false,
    film: undefined
}

export const moreInfoSlice = createSlice({
    name: 'more',
    initialState,
    reducers: {
        onOpen(state, action: PayloadAction<Doc<'films'>>) {
            state.isOpen = true
            state.film = action.payload
        },
        onClose(state) {
            state.isOpen = false
            state.film = undefined
        },
    }
})

export default moreInfoSlice.reducer