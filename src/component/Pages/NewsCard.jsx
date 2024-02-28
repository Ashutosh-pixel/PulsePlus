import millify from "millify";
import React from "react";

export default function NewsCard({ item }) {
  return (
    <div>
      <div>
        <div>{millify(item.rank)}.</div>
        <div>{item.name}</div>
      </div>
      <div>
        <div>
          <span>Price:</span>
          {millify(item.price)}
        </div>
        <div>
          <span>Market Cap:</span>
          {millify(item.marketCap)}
        </div>
        <div>
          <span>Daily Changes:</span>
          {millify(item.change)}%
        </div>
      </div>
    </div>
  );
}
