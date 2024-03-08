import { configureStore } from "@reduxjs/toolkit";
import { FetchDataSlice } from "../Slice/FetchDataSlice";
import { FetchNewsSlice } from "../Slice/FetchNewsSlice";
import { LiveCoinSlice } from "../Slice/LiveCoinSlice";
export const store = configureStore({
  reducer: {
    fetch: FetchDataSlice.reducer,
    news: FetchNewsSlice.reducer,
    livecoin: LiveCoinSlice.reducer,
  },
});
