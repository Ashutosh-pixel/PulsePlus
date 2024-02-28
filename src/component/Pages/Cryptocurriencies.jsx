import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CryptoCard from "./CryptoCard";
import { fetchdata } from "../../Slice/FetchDataSlice";

export default function Cryptocurriencies() {
  const state = useSelector((state) => state.fetch);
  const Dispatch = useDispatch();
  let [updatedarray, setUpdatedArray] = useState([]);

  if (state.data == null) {
    Dispatch(fetchdata());
  }

  function FilterCurrencies(event) {
    // console.log(event.target.value);
    const updatedarray = state.data.data.coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(event.target.value.toLowerCase())
      // console.log(coin.name.toLowerCase())
    );

    setUpdatedArray(updatedarray);
    console.log(updatedarray);
  }

  return (
    <div className="p-4 sm:ml-64 ">
      <div className="mt-12">
        <input
          type="text"
          placeholder="Search..."
          onChange={(e) => FilterCurrencies(e)}
        />
        {state.isDataLoading == true ? (
          <div>
            <h1>Loading...</h1>
          </div>
        ) : (
          <div>
            {updatedarray.length != 0
              ? updatedarray.map((item) => {
                  return <CryptoCard item={item} key={item.rank}></CryptoCard>;
                })
              : state.data.data.coins.map((item) => {
                  return <CryptoCard item={item} key={item.rank}></CryptoCard>;
                })}
          </div>
        )}
      </div>
    </div>
  );
}
