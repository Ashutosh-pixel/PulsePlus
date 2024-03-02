import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { env } from "../../env";
import { useDispatch, useSelector } from "react-redux";

export const fetchnews = createAsyncThunk("fetchnews", async (searchquery) => {
  console.log(searchquery);
  const url = `https://newsapi.org/v2/everything?q=${searchquery}&sortBy=publishedAt&language=en&${env.newsurl}`;
  console.log(url);
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
