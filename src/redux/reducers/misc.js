import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isMobile: false,
    token:null
};

const miscSlice = createSlice({
    name: "misc",
    initialState,
    reducers: {
        setIsMobile: (state, action) => {
            state.isMobile = action.payload;
        },
        setToken:(state,action)=>{
            console.log("Token set:", action.payload);
            state.token=action.payload
        }

     }
});

export const {
    setIsMobile,
    setToken
} = miscSlice.actions;

export default miscSlice.reducer;
