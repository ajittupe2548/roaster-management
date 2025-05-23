import React from "react";
import { useDispatch, useSelector } from "react-redux";
import providerSlice from "../redux/providerSlice";

const { setSearchText } = providerSlice.actions;

function SearchBar() {
  const dispatch = useDispatch();
  const searchText = useSelector(state => state.filters.searchText);

  return (
    <input
      type="text"
      placeholder="Search providers..."
      value={searchText}
      onChange={e => dispatch(setSearchText(e.target.value))}
      className="border px-2 py-1 rounded w-full"
    />
  );
}

export default SearchBar;
