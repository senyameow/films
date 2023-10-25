import { createSlice } from "@reduxjs/toolkit";

interface reviewState {
    editing: boolean

}

const initialState: reviewState = {
    editing: false
}

export const reviewSlice = createSlice({
    name: 'review',
    initialState,
    reducers: {
        onEdit(state) {
            state.editing = true
        },
        onClose(state) {
            state.editing = false
        },
    }
})

export default reviewSlice.reducer