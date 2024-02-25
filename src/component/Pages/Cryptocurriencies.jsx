import React from "react";
import { useDispatch, useSelector } from "react-redux";
import CryptoCard from "./CryptoCard";
import { fetchdata } from "../../Slice/FetchDataSlice";

export default function Cryptocurriencies() {
  const state = useSelector((state) => state.fetch);
  const Dispatch = useDispatch();

  if (state.data == null) {
    Dispatch(fetchdata());
  }

  return (
    <div className="p-4 sm:ml-64 ">
      <div className="mt-12">
        {state.isLoading == true ? (
          <div>
            <h1>Loading...</h1>
          </div>
        ) : (
          <div>
            {state.data.data.coins.map((item) => {
              return <CryptoCard item={item} key={item.rank}></CryptoCard>;
            })}
          </div>
        )}
      </div>
    </div>
  );
}
