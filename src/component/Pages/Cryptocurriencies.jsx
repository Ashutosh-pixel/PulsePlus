import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchlivecoin } from "../../Slice/LiveCoinSlice";
import millify from "millify";
import { useNavigate } from "react-router-dom";
import { Input } from "@nextui-org/react";

export default function Cryptocurriencies() {
  const state = useSelector((state) => state.livecoin);
  const Dispatch = useDispatch();
  const navigate = useNavigate();
  let [updatedarray, setUpdatedArray] = useState([]);

  useEffect(() => {
    Dispatch(fetchlivecoin());
    console.log(state.data);
  }, []);

  function FilterCurrencies(event) {
    updatedarray = state.data.filter((coin) =>
      coin.name.toLowerCase().includes(event.target.value.toLowerCase())
    );

    setUpdatedArray(updatedarray);
  }

  console.log(updatedarray);

  function clickHandler(item) {
    // const updateurlname = item.name.replace(/\s/g, "");
    navigate(`/Cryptocurriencies/${item.code}`);
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

        {state.isDataLoading == true ? (
          <div>Loading....</div>
        ) : (
          <div class="relative overflow-x-auto rounded-lg">
            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-900 dark:text-gray-400">
                <tr>
                  <th scope="col" class="px-6 py-3">
                    Coin
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Price
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Market Cap
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Volume 24h
                  </th>
                  <th scope="col" class="px-6 py-3">
                    All-time High
                  </th>
                  <th scope="col" class="px-6 py-3">
                    1h
                  </th>
                  <th scope="col" class="px-6 py-3">
                    24h
                  </th>
                </tr>
              </thead>
              <tbody>
                {updatedarray.length == 0
                  ? state.data.map((item) => {
                      return (
                        <tr
                          class="bg-white border-b dark:bg-slate-800 dark:border-gray-900 hover:bg-slate-700 hover:cursor-pointer"
                          onClick={() => clickHandler(item)}
                        >
                          <th
                            scope="row"
                            class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                          >
                            <span className="flex items-center gap-2">
                              <img src={item.png32} alt="" />
                              <span className="">
                                <div>{item.code}</div>
                                <div>{item.name}</div>
                              </span>
                            </span>
                          </th>
                          <td class="px-6 py-4 dark:text-white">
                            ${item.rate.toFixed(2)}
                          </td>
                          <td class="px-6 py-4 dark:text-white">
                            ${millify(item.cap)}
                          </td>
                          <td class="px-6 py-4 dark:text-white">
                            ${millify(item.volume)}
                          </td>
                          <td class="px-6 py-4 dark:text-white">
                            ${item.allTimeHighUSD.toFixed(2)}
                          </td>
                          {(100 - item.delta.hour * 100).toFixed(2) * -1 < 0 ? (
                            <td class="px-6 py-4 dark:text-red-500">
                              {(100 - item.delta.hour * 100).toFixed(2) * -1}%
                            </td>
                          ) : (
                            <td class="px-6 py- dark:text-green-500">
                              {(100 - item.delta.hour * 100).toFixed(2) * -1}%
                            </td>
                          )}
                          {(100 - item.delta.day * 100).toFixed(2) * -1 < 0 ? (
                            <td class="px-6 py-4 dark:text-red-500">
                              {(100 - item.delta.day * 100).toFixed(2) * -1}%
                            </td>
                          ) : (
                            <td class="px-6 py-4 dark:text-green-500">
                              {(100 - item.delta.day * 100).toFixed(2) * -1}%
                            </td>
                          )}
                        </tr>
                      );
                    })
                  : updatedarray.map((item) => {
                      return (
                        <tr
                          class="bg-white border-b dark:bg-slate-800 dark:border-gray-900 hover:bg-slate-700 hover:cursor-pointer"
                          onClick={() => clickHandler(item)}
                        >
                          <th
                            scope="row"
                            class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                          >
                            <span className="flex items-center gap-2">
                              <img src={item.png32} alt="" />
                              <span className="">
                                <div>{item.code}</div>
                                <div>{item.name}</div>
                              </span>
                            </span>
                          </th>
                          <td class="px-6 py-4 dark:text-white">
                            ${item.rate.toFixed(2)}
                          </td>
                          <td class="px-6 py-4 dark:text-white">
                            ${millify(item.cap)}
                          </td>
                          <td class="px-6 py-4 dark:text-white">
                            ${millify(item.volume)}
                          </td>
                          <td class="px-6 py-4 dark:text-white">
                            ${item.allTimeHighUSD.toFixed(2)}
                          </td>
                          {(100 - item.delta.hour * 100).toFixed(2) * -1 < 0 ? (
                            <td class="px-6 py-4 dark:text-red-500">
                              {(100 - item.delta.hour * 100).toFixed(2) * -1}%
                            </td>
                          ) : (
                            <td class="px-6 py- dark:text-green-500">
                              {(100 - item.delta.hour * 100).toFixed(2) * -1}%
                            </td>
                          )}
                          {(100 - item.delta.day * 100).toFixed(2) * -1 < 0 ? (
                            <td class="px-6 py-4 dark:text-red-500">
                              {(100 - item.delta.day * 100).toFixed(2) * -1}%
                            </td>
                          ) : (
                            <td class="px-6 py-4 dark:text-green-500">
                              {(100 - item.delta.day * 100).toFixed(2) * -1}%
                            </td>
                          )}
                        </tr>
                      );
                    })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
