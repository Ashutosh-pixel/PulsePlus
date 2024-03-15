import React, { useEffect, useState } from "react";
import { Bar, Line } from "react-chartjs-2";
import { Chart } from "chart.js/auto";
import { env } from "../../../env";
import millify from "millify";
import { useParams } from "react-router-dom";

export default function CurrencyDetails() {
  let [response, setResponse] = useState([]);
  let [label, setLabel] = useState([]);
  let [points, setPoints] = useState([]);
  const currency = useParams().currency;
  const options = {
    scales: {
      y: {
        beginAtZero: false, // Start the y-axis at the minimum value in the dataset
        ticks: {
          callback: function (value, index, values) {
            return "$" + value.toFixed(2); // Customize the y-axis labels by adding a dollar sign ('$')
          },
        },
      },
    },
    animations: {
      tension: {
        duration: 900,
        easing: "linear",
        from: 1,
        to: 0,
        loop: true,
      },
    },
    interaction: {
      intersect: false,
      mode: "index",
    },
    plugins: {
      title: {
        display: true,
      },
      tooltip: {
        callbacks: {
          // Use the 'label' callback to customize the tooltip label
          label: function (tooltipItem) {
            let label = tooltipItem.dataset.label || "";
            if (label) {
              label += ": ";
            }
            // label += new Date().toLocaleString(); // Format date and time
            label += "\n Rate: $" + tooltipItem.parsed.y.toFixed(2); // Add rate
            // label += "\n Volume: " + tooltipItem.parsed.volume; // Add volume
            return label;
          },
        },
      },
    },
  };

  const data = {
    labels: label,
    datasets: [
      {
        label: "",
        data: points,
        fill: true,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
        borderWidth: 1,
      },
    ],
  };

  function findStartTime() {
    var currentDate = new Date();
    currentDate.setDate(currentDate.getDate() - 1);
    // Set the time to 1 AM

    currentDate.setHours(currentDate.getHours());
    currentDate.setMinutes(0);
    currentDate.setSeconds(0);
    currentDate.setMilliseconds(0);

    // Get the time in milliseconds
    var timeInMilliseconds = currentDate.getTime();

    console.log(new Date(timeInMilliseconds).toLocaleTimeString());
    console.log(new Date(timeInMilliseconds).toDateString());
    // console.log(currentDate.getHours());
    return timeInMilliseconds;
  }

  useEffect(() => {
    const chartdata = async () => {
      response = await fetch(
        new Request("https://api.livecoinwatch.com/coins/single/history"),
        {
          method: "POST",
          headers: new Headers({
            "content-type": "application/json",
            "x-api-key": env.livecoinkey,
          }),
          body: JSON.stringify({
            currency: "USD",
            code: `${currency}`,
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

      // console.log(response);
      if (response.history) {
        setResponse(response.history);
      } else {
        console.log("error in history");
      }
    };
    chartdata();
  }, []);

  useEffect(() => {
    const labels = [];
    const dataPoints = [];
    response.map((item) => {
      labels.push(new Date(item.date).toLocaleTimeString());
      dataPoints.push(item.rate);
    });
    setLabel(labels);
    setPoints(dataPoints);
    console.log(label);
  }, [response]);

  return (
    <div className="p-4 sm:ml-64 ">
      <div className="mt-12">
        {response.length === 0 ? (
          <h1>Loading...</h1>
        ) : (
          <Line options={options} data={data}></Line>
        )}
      </div>
    </div>
  );
}
