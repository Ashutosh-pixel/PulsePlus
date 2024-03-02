import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Link,
  Image,
} from "@nextui-org/react";
import { millify } from "millify";
import { NavLink, useNavigate } from "react-router-dom";

export default function CryptoCard({ item }) {
  // console.log(item);

  const navigate = useNavigate();

  function clickHandler() {
    const updateurlname = item.name.replace(/\s/g, "");
    navigate(`/Cryptocurriencies/${updateurlname}`);
  }

  return (
    <div onClick={clickHandler} className=" hover:cursor-pointer">
      <Card className="max-w-[300px] transition-transform duration-700 ease-in-out transform hover:scale-105 hover:shadow-lg">
        <CardHeader className="flex gap-4 max-h-20">
          <Image alt="nextui logo" radius="sm" src={item.iconUrl} width={40} />
          <div className="flex flex-col">
            <p className="text-md">{item.name}</p>
          </div>
        </CardHeader>
        {/* <Divider /> */}
        <CardBody>
          <p>
            Price:<span> </span>
            <span>{millify(item.price)}</span>
          </p>
          {/* <br /> */}
          <p>
            Market Cap:<span> </span>
            <span>{millify(item.marketCap)}</span>
          </p>
          {/* <br /> */}
          <p>
            Daily Changes:<span> </span>
            <span>{millify(item.change)}%</span>
          </p>
        </CardBody>
        {/* <Divider /> */}
      </Card>
    </div>
  );
}
