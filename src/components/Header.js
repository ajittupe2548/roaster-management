import React from "react";
import { useDispatch, useSelector } from "react-redux";
import providerSlice from "../redux/providerSlice";

const { setView } = providerSlice.actions;

function Header() {
  const dispatch = useDispatch();
  const { view } = useSelector(state => state.filters);
  return (
    <div className="flex items-center justify-between h-10 border-b p-3">
      <div className="flex">
        <div>Provider Calendar</div>
      </div>
      <div className="flex border rounded-md overflow-hidden">
        <button
          className={`px-2 ${view === "tile" ? "bg-[#808d71]" : ""}`}
          onClick={() => dispatch(setView("tile"))}
        >
          Tiles
        </button>
        <button
          className={`px-2 ${view === "calendar" ? "bg-[#808d71]" : ""}`}
          onClick={() => dispatch(setView("calendar"))}
        >
          Calendar
        </button>
      </div>
    </div>
  );
}
export default Header;
