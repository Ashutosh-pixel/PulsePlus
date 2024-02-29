import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CryptoCard from "./CryptoCard";
import { fetchdata } from "../../Slice/FetchDataSlice";
import { Input } from "@nextui-org/react";

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
      <div className="mt-12 flex-col flex gap-10">
        <div className=" w-1/2">
          <Input
            type="text"
            placeholder="Search Crypto"
            onChange={(e) => FilterCurrencies(e)}
          />
        </div>
        {/* <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
          
        </div> */}
        {state.isDataLoading == true ? (
          <div>
            <h1>Loading...</h1>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
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
