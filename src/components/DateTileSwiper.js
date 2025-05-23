import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import providerSlice from "../redux/providerSlice";
import { getNextNDays, formatToYYYYMMDD, statuses } from "../utils";

const { setActiveDate } = providerSlice.actions;

function DateTileSwiper() {
  const allDays = getNextNDays(35);
  const tilesPerPage = 7;
  const [pageIndex, setPageIndex] = useState(1);
  const [activeIndex, setActiveIndex] = useState(7);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setActiveDate(formatToYYYYMMDD(allDays[activeIndex].label)));
  }, [dispatch, allDays, activeIndex]);

  const start = pageIndex * tilesPerPage;
  const currentTiles = allDays.slice(start, start + tilesPerPage);

  const hasPrev = pageIndex > 0;
  const hasNext = start + tilesPerPage < allDays.length;

  return (
    <div className="w-full">
      <div className="flex items-center gap-2 justify-between">
        <button
          onClick={() => setPageIndex(pageIndex - 1)}
          disabled={!hasPrev}
          className={`px-3 py-3 rounded-full border text-sm ${
            hasPrev
              ? "bg-white hover:bg-gray-100"
              : "bg-gray-100 cursor-not-allowed"
          }`}
        >
          ⬅️
        </button>

        <div className="flex gap-2 flex-1 justify-center">
          {currentTiles.map((tile, index) => {
            const globalIndex = pageIndex * tilesPerPage + index;
            return (
              <div
                key={tile.id}
                onClick={() => setActiveIndex(globalIndex)}
                className={`cursor-pointer px-3 py-2 text-sm rounded-md border text-center select-none
                  ${
                    activeIndex === globalIndex
                      ? "bg-[#4e6137] text-white"
                      : "bg-white text-gray-800 hover:bg-blue-100"
                  }`}
              >
                {tile.label}
              </div>
            );
          })}
        </div>

        <button
          onClick={() => setPageIndex(pageIndex + 1)}
          disabled={!hasNext}
          className={`px-3 py-3 rounded-full border text-sm ${
            hasNext
              ? "bg-white hover:bg-gray-100"
              : "bg-gray-100 cursor-not-allowed"
          }`}
        >
          ➡️
        </button>
      </div>
      <div className="flex justify-between mt-8 mb-6">
        {activeIndex !== null && (
          <div className="text-gray-700 font-medium">
            Showing full schedules for{" "}
            <span className="text-black font-semibold">
              {allDays[activeIndex].label}
            </span>
            <p>Showing slots in the 8 am to 12 am window.</p>
          </div>
        )}
        <div className="grid grid-cols-3 gap-2">
          {statuses.map(status => (
            <div key={status.label} className="flex items-center space-x-2">
              <div className={`w-4 h-4 rounded ${status.color}`} />
              <span className="text-sm font-medium">{status.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DateTileSwiper;
