import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { env } from "../../env";

export const fetchdata = createAsyncThunk("fetchdata", async () => {
  const url = env.dataurl;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": env.datakey,
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
    isDataLoading: true,
    isDataError: false,
    data: null,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchdata.pending, (state, action) => {
      state.isDataLoading = true;
    });
    builder.addCase(fetchdata.fulfilled, (state, action) => {
      state.isDataLoading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchdata.rejected, (state, action) => {
      state.isDataError = true;
      console.log("error", action.payload);
    });
  },
});
