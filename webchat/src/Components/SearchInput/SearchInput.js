import React from "react";
import { Search } from "@material-ui/icons";
import "./SearchInput.scss";
const SearchInput = () => {
  return (
    <div className="search flex-row adjust">
      <input className="input" /> <Search />
    </div>
  );
};

export default SearchInput;
