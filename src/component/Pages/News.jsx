import React, { useState } from "react";
import { useSelector } from "react-redux";
import SearchNews from "./../Layout/SearchNews";
import moment from "moment/moment";
import { CardBody, Card } from "@nextui-org/react";
import Title from "antd/es/typography/Title";
import date from "date-and-time";

export default function News() {
  const newsstate = useSelector((state) => state.news);
  const [search, setSearch] = useState("crypto");
  return (
    <div className="p-4 sm:ml-64 ">
      <div className="mt-12"></div>
      <Title>Latest Crypto News</Title>
      <SearchNews search={search} setSearch={setSearch}></SearchNews>

      <br />

      {newsstate.isNewsLoading == true ? (
        <div>Loading...</div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-5 news-container">
          {newsstate.newsdata.articles
            .slice(0, newsstate.newsdata.articles.length)
            .map((item) => {
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
      )}
    </div>
  );
}
