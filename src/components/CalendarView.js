import React, { useState } from "react";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import { getProviderSlotStatuses } from "../utils";

const CalendarView = () => {
  const [weekOffset, setWeekOffset] = useState(0);
  const {
    providers,
    service,
    type,
    center,
    onlyAvailable,
    newClientsOnly,
    searchText,
    activeDate,
  } = useSelector(state => state.filters);

  const filteredProviders = providers?.filter(provider => {
    const availability = provider.availabilities[activeDate];
    return (
      (service === "all" || service === provider.providerUserType) &&
      (type === "all" ||
        (type === "inhouse" && provider.isInHouse) ||
        (type !== "inhouse" && !provider.isInHouse)) &&
      (parseInt(center) === 0 ||
        parseInt(center) === provider.clinicDetails.id) &&
      provider.name.toLowerCase().includes(searchText.toLowerCase()) &&
      (!onlyAvailable ||
        (availability?.onlineSlots?.length || 0) !== 0 ||
        (availability?.offlineSlots?.length || 0) !== 0 ||
        (availability?.bothSlots?.length || 0) !== 0) &&
      (!newClientsOnly || provider.newClients)
    );
  });

  const MAX_NEXT_WEEKS = 3;
  const MIN_PREV_WEEKS = -1;

  const startDate = dayjs().startOf("day").add(weekOffset, "week");
  const days = [...Array(7)].map((_, i) => startDate.add(i, "day"));

  const generate15MinSlots = (start = "08:00", end = "24:00") => {
    const slots = [];
    let current = dayjs(`2025-05-21T${start}`);
    const endTime = dayjs(`2025-05-21T${end}`);
    while (current.isBefore(endTime)) {
      slots.push(current.format("HH:mm"));
      current = current.add(15, "minute");
    }
    return slots;
  };

  const timeSlots = generate15MinSlots();

  return (
    <div className="w-full">
      {/* Navigation */}
      <div className="flex items-center mb-4 gap-2">
        <button
          onClick={() =>
            setWeekOffset(prev => Math.max(MIN_PREV_WEEKS, prev - 1))
          }
          disabled={weekOffset <= MIN_PREV_WEEKS}
          className={`px-3 py-3 rounded-full border text-sm ${
            weekOffset > MIN_PREV_WEEKS
              ? "bg-white hover:bg-gray-100"
              : "bg-gray-100 cursor-not-allowed"
          }`}
        >
          ⬅️
        </button>
        <h2 className="text-lg font-semibold">
          {startDate.format("MMM D")} -{" "}
          {startDate.add(6, "day").format("MMM D, YYYY")}
        </h2>
        <button
          disabled={weekOffset >= MAX_NEXT_WEEKS}
          onClick={() =>
            setWeekOffset(prev => Math.min(MAX_NEXT_WEEKS, prev + 1))
          }
          className={`px-3 py-3 rounded-full border text-sm ${
            weekOffset < MAX_NEXT_WEEKS
              ? "bg-white hover:bg-gray-100"
              : "bg-gray-100 cursor-not-allowed"
          }`}
        >
          ➡️
        </button>
      </div>

      {/* Header */}
      <div className="grid grid-cols-8 gap-2 mb-2">
        <div className="text-left pr-2 font-medium">Time</div>
        {days.map((d, i) => (
          <div key={i} className="text-center font-medium text-sm">
            {d.format("ddd, MMM D")}
          </div>
        ))}
      </div>

      {/* Slot Grid */}
      <div className="grid grid-cols-8 gap-2">
        {timeSlots.map((slot, i) => (
          <React.Fragment key={i}>
            <div className="text-left pr-2 text-xs text-gray-600 pt-1">
              {slot}
            </div>
            {days.map((day, dIndex) => {
              const dateKey = day.format("YYYY-MM-DD");
              const providerStatuses = getProviderSlotStatuses(
                filteredProviders,
                dateKey,
                slot
              );

              return (
                <div
                  key={dIndex}
                  className="border border-gray-300 rounded px-1 py-1 text-[10px] min-h-[32px] flex flex-wrap gap-0.5 justify-center"
                >
                  {providerStatuses.map((ps, i) => (
                    <div key={i} className="relative group">
                      <div
                        className={`${ps.color} text-white px-1 rounded text-[10px] truncate max-w-[48px] cursor-default`}
                      >
                        {ps.provider[0]}: {ps.status.split("_")[0]}
                      </div>
                      <div className="absolute z-10 hidden group-hover:block bg-black text-white text-[10px] rounded px-2 py-1 top-full mt-1 left-1/2 -translate-x-1/2 whitespace-nowrap pointer-events-none">
                        {ps.provider}: {ps.status.replace(/_/g, " ")}
                      </div>
                    </div>
                  ))}
                </div>
              );
            })}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default CalendarView;
