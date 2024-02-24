import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchdata = createAsyncThunk("fetchdata", async () => {
  const url =
    "https://coinranking1.p.rapidapi.com/coins?referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=24h&tiers%5B0%5D=1&orderBy=marketCap&orderDirection=desc&limit=50&offset=0";
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "6386f1e016msh80f6bf8041acd09p1331e3jsn7d0adafec67f",
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
