import { createReducer } from "@reduxjs/toolkit";

export const userReducer = createReducer(
  { user: null, isValid: false },
  (builder) => {
    builder
      .addCase("login", (state, action) => {
        state.user = action.payload;
        state.isValid = true;
      })
      .addCase("load", (state, action) => {
        state.user = action.payload;
        state.isValid = true;
      })
      .addCase("logout", (state, action) => {
        state.user = null;
        state.isValid = false;
      });
  }
);

export const SearchReducer = createReducer(
  {
    searchquery: "",
    counts: [],
    filter: [],
    counts: [],
    depend: { name: "", text: "" },
  },
  (builder) => {
    builder
      .addCase("count", (state, action) => {
        state.searchquery = action.payload;
      })
      .addCase("cd", (state, action) => {
        state.counts = action.payload;
      })
      .addCase("addfilter", (state, action) => {
        state.filter = action.payload;
      })
      .addCase("sidebar", (state, action) => {
        state.counts = action.payload;
      })
      .addCase("tab", (state, action) => {
        state.tab = action.payload;
      })
      .addCase("addSearch", (state, action) => {
        state.depend = action.payload;
      });
  }
);
