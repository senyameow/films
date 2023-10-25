import { Doc, Id } from "@/convex/_generated/dataModel";
import { IUser } from "@/models/IUser";
import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from '@reduxjs/toolkit'

interface moreInfoState {
    isOpen: boolean;
    film: Doc<'films'> | undefined;
    userId: Id<'users'> | undefined
}

const initialState: moreInfoState = {
    isOpen: false,
    film: undefined,
    userId: undefined
}

export type moreInfoPayload = {
    film: Doc<'films'>;
    userId: Id<'users'>
}

export const moreInfoSlice = createSlice({
    name: 'more',
    initialState,
    reducers: {
        onOpen(state, action: PayloadAction<moreInfoPayload>) {
            state.isOpen = true
            state.film = action.payload.film
            state.userId = action.payload.userId
        },
        onClose(state) {
            state.isOpen = false
            state.film = undefined
            state.userId = undefined
        },
    }
})

export default moreInfoSlice.reducer