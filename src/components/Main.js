import React from "react";
import DateTileSwiper from "./DateTileSwiper";
import CalendarView from "./CalendarView";
import TileView from "./TileView";
import { useSelector } from "react-redux";

function Main() {
  const { view } = useSelector(state => state.filters);

  return (
    <div className="px-6 py-4 overflow-y-scroll overflow-x-hidden grow">
      {view === "tile" ? (
        <>
          <DateTileSwiper />
          <TileView />
        </>
      ) : (
        <CalendarView />
      )}
    </div>
  );
}

export default Main;
