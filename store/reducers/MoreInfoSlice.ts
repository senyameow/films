import { Doc, Id } from "@/convex/_generated/dataModel";
import { IUser } from "@/models/IUser";
import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from '@reduxjs/toolkit'

interface moreInfoState {
    isOpen: boolean;
    film: Doc<'films'> | undefined;
}

const initialState: moreInfoState = {
    isOpen: false,
    film: undefined,
}

export type moreInfoPayload = {
    film: Doc<'films'>;
}

export const moreInfoSlice = createSlice({
    name: 'more',
    initialState,
    reducers: {
        onOpen(state, action: PayloadAction<moreInfoPayload>) {
            state.isOpen = true
            state.film = action.payload.film
        },
        onClose(state) {
            state.isOpen = false
            state.film = undefined
        },
    }
})

export default moreInfoSlice.reducer