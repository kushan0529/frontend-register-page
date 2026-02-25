import { configureStore } from "@reduxjs/toolkit";
import authReducer from './slices/AuthSlices'

const store=configureStore({
    reducer:{
        auth:authReducer,
    }
})

export default store;