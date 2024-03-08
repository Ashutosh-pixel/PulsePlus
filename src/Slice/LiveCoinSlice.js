import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { env } from "../../env";
// import { env } from "./../../env";

export const fetchlivecoin = createAsyncThunk("fetchlivecoin", async () => {
  try {
    const response = await fetch(
      new Request("https://api.livecoinwatch.com/coins/list"),
      {
        method: "POST",
        headers: new Headers({
          "content-type": "application/json",
          "x-api-key": env.livecoinkey,
        }),
        body: JSON.stringify({
          currency: "USD",
          sort: "rank",
          order: "ascending",
          offset: 0,
          limit: 50,
          meta: true,
        }),
      }
    );
    return await response.json();
    // console.log(response);
  } catch (error) {
    console.log(error);
  }
});

export const LiveCoinSlice = createSlice({
  name: "livecoin",
  initialState: {
    isDataLoading: true,
    isDataError: false,
    data: null,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchlivecoin.pending, (state, action) => {
      state.isDataLoading = true;
    });
    builder.addCase(fetchlivecoin.fulfilled, (state, action) => {
      state.isDataLoading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchlivecoin.rejected, (state, action) => {
      state.isDataError = true;
      console.log("error", action.payload);
    });
  },
});
