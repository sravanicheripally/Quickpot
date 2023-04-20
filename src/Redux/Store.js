import { configureStore } from "@reduxjs/toolkit";
import SliceReducer from "./Actions"
export const Store = configureStore({
    reducer:{
       display : SliceReducer
    }
})
