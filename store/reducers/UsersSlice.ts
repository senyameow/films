import { Id } from "@/convex/_generated/dataModel";
import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from '@reduxjs/toolkit'

interface userState {
    id: Id<'users'> | undefined;

}

const initialState: userState = {
    id: undefined
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        onStore(state, action: PayloadAction<Id<'users'>>) {
            state.id = action.payload
        },
    }
})

export default userSlice.reducer