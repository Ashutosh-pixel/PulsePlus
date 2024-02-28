import React from "react";
import { useSelector } from "react-redux";

export default function News() {
  const newsstate = useSelector((state) => state.news);
  return (
    <div className="p-4 sm:ml-64 ">
      <div className="mt-12"></div>
      <h1>Global Crypto News</h1>
      {newsstate.newsdata.articles
        .slice(0, newsstate.newsdata.articles.length)
        .map((item) => {
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
  );
}
