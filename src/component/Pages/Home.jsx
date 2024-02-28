import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchdata } from "./../../Slice/FetchDataSlice";
import millify from "millify";
import Cryptocurriencies from "./Cryptocurriencies";
import CryptoCard from "./CryptoCard";
import { NavLink } from "react-router-dom";
import { fetchnews } from "../../Slice/FetchNewsSlice";
import News from "./News";

export default function Home() {
  const datastate = useSelector((state) => state.fetch);
  const newsstate = useSelector((state) => state.news);
  const Dispatch = useDispatch();

  console.log(datastate);
  console.log(newsstate);

  useEffect(() => {
    Dispatch(fetchdata());
  }, []);

  useEffect(() => {
    Dispatch(fetchnews());
  }, []);

  return (
    <div className="p-4 sm:ml-64 ">
      <div className="mt-12"></div>
      Home
      {datastate.isDataLoading == true ? (
        <div>
          <h1>Loading...</h1>
        </div>
      ) : (
        <div>
          <div>
            <div>
              <span>Total Cryptocurriencies:</span>
              {millify(datastate.data.data.stats.totalCoins)}
            </div>
            <div>
              <span>Total Markets:</span>
              {millify(datastate.data.data.stats.totalMarkets)}
            </div>
            <div>
              <span>Total Exchanges:</span>
              {millify(datastate.data.data.stats.totalExchanges)}
            </div>
            <div>
              <span>Total MarketCap:</span>
              {millify(datastate.data.data.stats.totalMarketCap)}
            </div>
            <div>
              <span>Total 24 Volume:</span>
              {millify(datastate.data.data.stats.total24hVolume)}
            </div>
          </div>
          <div>
            <h1>Top 10 Cryptos In The World</h1>
            <NavLink to={"/Cryptocurriencies"}>Show More</NavLink>
            {datastate.data.data.coins.slice(0, 10).map((item) => {
              return <CryptoCard item={item} key={item.rank}></CryptoCard>;
            })}
          </div>
          <div>
            {newsstate.isNewsLoading == true ? (
              <div>Loading...</div>
            ) : (
              <div>
                <h1>Latest News</h1>
                <NavLink to={"/News"}>Show More</NavLink>
                {newsstate.newsdata.articles.slice(0, 6).map((item) => {
                  return (
                    <>
                      <div>{item.title}</div>
                      <div>{item.description}</div>
                      <div>{item.source.name}</div>
                      <div>{item.publishedAt}</div>
                    </>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
