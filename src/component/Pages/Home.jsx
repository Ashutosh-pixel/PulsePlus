import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchdata } from "./../../Slice/FetchDataSlice";
import millify from "millify";
import Cryptocurriencies from "./Cryptocurriencies";
import CryptoCard from "./CryptoCard";
import { NavLink } from "react-router-dom";

export default function Home() {
  const state = useSelector((state) => state.fetch);
  const Dispatch = useDispatch();

  console.log(state);

  if (state.data == null) {
    Dispatch(fetchdata());
  }

  return (
    <div className="p-4 sm:ml-64 ">
      <div className="mt-12"></div>
      Home
      {state.isLoading == true ? (
        <div>
          <h1>Loading...</h1>
        </div>
      ) : (
        <div>
          <div>
            <div>
              <span>Total Cryptocurriencies:</span>
              {millify(state.data.data.stats.totalCoins)}
            </div>
            <div>
              <span>Total Markets:</span>
              {millify(state.data.data.stats.totalMarkets)}
            </div>
            <div>
              <span>Total Exchanges:</span>
              {millify(state.data.data.stats.totalExchanges)}
            </div>
            <div>
              <span>Total MarketCap:</span>
              {millify(state.data.data.stats.totalMarketCap)}
            </div>
            <div>
              <span>Total 24 Volume:</span>
              {millify(state.data.data.stats.total24hVolume)}
            </div>
          </div>
          <div>
            <h1>Top 10 Cryptos In The World</h1>
            <NavLink to={"/Cryptocurriencies"}>Show More</NavLink>
            {state.data.data.coins.slice(0, 10).map((item) => {
              return <CryptoCard item={item} key={item.rank}></CryptoCard>;
            })}
          </div>
        </div>
      )}
    </div>
  );
}
