import React, { useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { Chart } from "chart.js/auto";
import { env } from "../../../env";

export default function CurrencyDetails() {
  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const data = {
    labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
    datasets: [
      {
        label: "# of Votes",
        data: [12, 19, 3, 5, 2, 3],
        borderWidth: 5,
      },
    ],
  };

  function findStartTime() {
    var currentDate = new Date();
    currentDate.setDate(currentDate.getDate() - 1);
    // Set the time to 1 AM
    currentDate.setHours(7);
    currentDate.setMinutes(0);
    currentDate.setSeconds(0);
    currentDate.setMilliseconds(0);

    // Get the time in milliseconds
    var timeInMilliseconds = currentDate.getTime();
    return timeInMilliseconds;
  }

  useEffect(() => {
    const chartdata = async () => {
      const response = await fetch(
        new Request("https://api.livecoinwatch.com/overview/history"),
        {
          method: "POST",
          headers: new Headers({
            "content-type": "application/json",
            "x-api-key": env.livecoinkey,
          }),
          body: JSON.stringify({
            currency: "USD",
            start: findStartTime(),
            end: Date.now(),
            meta: true,
          }),
        }
      )
        .then(async (Response) => await Response.json())
        .catch((error) => {
          console.log("error a gyi");
        });

      console.log(response);
    };
    chartdata();
  }, []);

  return (
    <div className="p-4 sm:ml-64 ">
      <div className="mt-12">
        CurrencyDetails
        <Bar options={options} data={data}></Bar>
      </div>
    </div>
  );
}
