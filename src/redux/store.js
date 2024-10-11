import { configureStore } from "@reduxjs/toolkit";
import miscReducer from "./reducers/misc";
import api from "./api";


const store=configureStore({
    reducer:{
        misc:miscReducer,
        [api.reducerPath]:api.reducer
    },
    middleware:(mid)=>[...mid(),
        api.middleware
    ]
})

export default store