import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { env } from "../../env";
// import "dotenv/config";

// require("dotenv").config();

export const fetchdata = createAsyncThunk("fetchdata", async () => {
  const url = env.baseurl;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": env.key,
      "X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
    },
  };
  try {
    const response = await fetch(url, options);
    return response.json();
  } catch (error) {
    console.error(error);
  }
});

export const FetchDataSlice = createSlice({
  name: "fetch",
  initialState: {
    isLoading: true,
    isError: false,
    data: null,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchdata.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchdata.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchdata.rejected, (state, action) => {
      state.isError = true;
      console.log("error", action.payload);
    });
  },
});
