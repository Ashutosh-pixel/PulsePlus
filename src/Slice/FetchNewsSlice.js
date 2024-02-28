import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { env } from "../../env";

export const fetchnews = createAsyncThunk("fetchnews", async () => {
  const url = env.newsurl;
  try {
    const response = await fetch(url);
    return response.json();
  } catch (error) {
    console.error(error);
  }
});

export const FetchNewsSlice = createSlice({
  name: "news",
  initialState: {
    isNewsLoading: true,
    isNewsError: false,
    newsdata: null,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchnews.pending, (state, action) => {
      state.isNewsLoading = true;
    });
    builder.addCase(fetchnews.fulfilled, (state, action) => {
      state.isNewsLoading = false;
      state.newsdata = action.payload;
    });
    builder.addCase(fetchnews.rejected, (state, action) => {
      state.isNewsError = true;
      console.log("error", action.payload);
    });
  },
});
