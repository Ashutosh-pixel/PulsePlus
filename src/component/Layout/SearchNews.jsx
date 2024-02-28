import React from "react";
import { Select, SelectItem } from "@nextui-org/react";
import { useDispatch, useSelector } from "react-redux";
import { fetchnews } from "../../Slice/FetchNewsSlice";
import { useEffect } from "react";
// import { animals } from "./animals.js";
// import SearchNews from './SearchNews';

export default function SearchNews({ search, setSearch }) {
  const datastate = useSelector((state) => state.fetch);
  const [value, setValue] = React.useState("");
  const dispatch = useDispatch();

  const handleSelectionChange = (e) => {
    setValue(e.target.value);
  };
  const clickHandler = (searchquery) => {
    search = searchquery;
    setSearch(search);
  };

  useEffect(() => {
    dispatch(fetchnews(search));
  }, [search]);

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
          <SelectItem
            key={items.rank}
            value={items.name}
            onClick={() => clickHandler(items.name)}
          >
            {items.name}
          </SelectItem>
        ))}
      </Select>
    </div>
  );
}
