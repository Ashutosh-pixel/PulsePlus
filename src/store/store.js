import { configureStore } from "@reduxjs/toolkit";
import { FetchDataSlice } from "../Slice/FetchDataSlice";
import { FetchNewsSlice } from "../Slice/FetchNewsSlice";
export const store = configureStore({
  reducer: {
    fetch: FetchDataSlice.reducer,
    news: FetchNewsSlice.reducer,
  },
});
