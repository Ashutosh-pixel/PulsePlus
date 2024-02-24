import { configureStore } from "@reduxjs/toolkit";
import { FetchDataSlice } from "../Slice/FetchDataSlice";
export const store = configureStore({
  reducer: {
    fetch: FetchDataSlice.reducer,
  },
});
