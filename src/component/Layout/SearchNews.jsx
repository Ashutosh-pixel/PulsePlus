import React from "react";
import { Select, SelectItem } from "@nextui-org/react";
import { useSelector } from "react-redux";
// import { animals } from "./animals.js";
// import SearchNews from './SearchNews';

export default function SearchNews() {
  const datastate = useSelector((state) => state.fetch);
  const [value, setValue] = React.useState("");

  const handleSelectionChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <div className="flex w-full max-w-xs flex-col gap-2">
      <Select
        // label=""
        aria-label=" "
        // variant="bordered"
        placeholder="Crypto News"
        className="max-w-xs"
        onChange={handleSelectionChange}
        size="sm"
      >
        {datastate.data.data.coins.map((items) => (
          <SelectItem key={items.rank} value={items.name}>
            {items.name}
          </SelectItem>
        ))}
      </Select>
    </div>
  );
}
