import { Doc, Id } from "@/convex/_generated/dataModel";
import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from '@reduxjs/toolkit'

interface createReviewState {
    isOpen: boolean;
    film: Doc<'films'> | undefined;
    userId: Id<'users'> | undefined;
}

const initialState: createReviewState = {
    isOpen: false,
    film: undefined,
    userId: undefined
}

export type createReviewPayload = {
    film: Doc<'films'>;
    userId: Id<'users'>
}

export const createReviewSlice = createSlice({
    name: 'createReview',
    initialState,
    reducers: {
        onOpen(state, action: PayloadAction<createReviewPayload>) {
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

export default createReviewSlice.reducer