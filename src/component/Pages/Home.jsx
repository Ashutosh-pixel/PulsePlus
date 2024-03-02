import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchdata } from "./../../Slice/FetchDataSlice";
import millify from "millify";
import Cryptocurriencies from "./Cryptocurriencies";
import CryptoCard from "./CryptoCard";
import { NavLink } from "react-router-dom";
import { fetchnews } from "../../Slice/FetchNewsSlice";
import News from "./News";
import Title from "antd/es/typography/Title";
import { Col, Statistic, Row } from "antd";
import { Card, CardBody, CardHeader, Image } from "@nextui-org/react";
import moment from "moment";

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
    Dispatch(fetchnews("bitcoin"));
  }, []);

  return (
    <div className="p-4 sm:ml-64 ">
      <div className="mt-12"></div>
      {datastate.isDataLoading == true || newsstate.isNewsLoading == true ? (
        <div>
          <h1>Loading...</h1>
        </div>
      ) : (
        <div>
          <Title level={2} className="heading">
            Global Cryptocurrency Stats
          </Title>
          <Row>
            <Col span={12}>
              <Statistic
                title="Total Cryptocurriencies:"
                value={millify(datastate.data.data.stats.totalCoins)}
              ></Statistic>
            </Col>
            <Col span={12}>
              <Statistic
                title="Total Markets:"
                value={millify(datastate.data.data.stats.totalMarkets)}
              ></Statistic>
            </Col>
            <Col span={12}>
              <Statistic
                title="Total Exchanges:"
                value={millify(datastate.data.data.stats.totalExchanges)}
              ></Statistic>
            </Col>
            <Col span={12}>
              <Statistic
                title="Total MarketCap:"
                value={millify(datastate.data.data.stats.totalMarketCap)}
              ></Statistic>
            </Col>
            <Col span={12}>
              <Statistic
                title="Total 24 Volume:"
                value={millify(datastate.data.data.stats.total24hVolume)}
              ></Statistic>
            </Col>
          </Row>
          <br />
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              justifyContent: "space-between",
            }}
          >
            <Title level={2} className="home-title">
              Popular Cryptos In The World
            </Title>
            <Title level={4} className="show-more">
              <NavLink to={"/Cryptocurriencies"}>Show More</NavLink>
            </Title>
          </div>
          <br />

          <div className="home-heading-container grid grid-cols-2 md:grid-cols-4 gap-4">
            {datastate.data.data.coins.slice(0, 10).map((item) => {
              return <CryptoCard item={item} key={item.rank}></CryptoCard>;
            })}
          </div>

          <br />

          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              justifyContent: "space-between",
            }}
          >
            <Title level={2} className="news-title">
              Latest News
            </Title>
            <Title level={4} className="show-more">
              <NavLink to={"/News"}>Show More</NavLink>
            </Title>
          </div>
          <br />

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 news-heading-container">
            {newsstate.newsdata.articles.slice(0, 6).map((item) => {
              return (
                <Card className="transition-transform duration-700 ease-in-out transform hover:scale-105 hover:shadow-lg hover:cursor-pointer">
                  <CardBody className="news-card max-w-[380px] p-4">
                    <div className="flex justify-between">
                      <div className=" font-semibold">{item.title}</div>
                      <img
                        className=" w-28 h-28 object-cover rounded-xl"
                        src={item.urlToImage}
                        alt=""
                      />
                    </div>
                    <div
                      className="flex flex-col items-end
                  "
                    >
                      <div className="">{item.description}</div>
                      <div className="  text-red-400">
                        {moment(item.publishedAt).format("hh:mm A")}
                      </div>
                    </div>
                  </CardBody>
                </Card>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
