import { configureStore } from "@reduxjs/toolkit";
import { SearchReducer, userReducer } from "./reducer";

export const store = configureStore({
  reducer: {
    user: userReducer,
    search: SearchReducer,
  },
});
