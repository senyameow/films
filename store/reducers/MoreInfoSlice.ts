import { Doc, Id } from "@/convex/_generated/dataModel";
import { IUser } from "@/models/IUser";
import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from '@reduxjs/toolkit'

interface moreInfoState {
    isOpen: boolean;
    film: Doc<'films'> | undefined;
    user: IUser
}

const initialState: moreInfoState = {
    isOpen: false,
    film: undefined,
    user: undefined
}

export type moreInfoPayload = {
    film: Doc<'films'>;
    user: IUser
}

export const moreInfoSlice = createSlice({
    name: 'more',
    initialState,
    reducers: {
        onOpen(state, action: PayloadAction<moreInfoPayload>) {
            state.isOpen = true
            state.film = action.payload.film
            state.user = action.payload.user
        },
        onClose(state) {
            state.isOpen = false
            state.film = undefined
            state.user = undefined
        },
    }
})

export default moreInfoSlice.reducer