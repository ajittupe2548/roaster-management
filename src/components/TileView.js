import React, { useRef } from "react";
import { useSelector } from "react-redux";
import { slotColors } from "../utils";
import { generateTimeSlots, chunkSlots, getSlotStatus } from "../utils";

const TileView = () => {
  const timeSlots = generateTimeSlots();
  const chunkedSlots = chunkSlots(timeSlots, 4);
  const scrollRef = useRef([]);

  const handleScroll = (direction, index) => {
    const container = scrollRef.current[index];
    if (!container) return;

    const scrollAmount = 200;
    container.scrollBy({
      left: direction === "next" ? scrollAmount : -scrollAmount,
      behavior: "smooth",
    });
  };
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

  return (
    <div>
      {providers?.map((provider, index) => {
        const availability = provider.availabilities[activeDate];
        return (service === "all" || service === provider.providerUserType) &&
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
          (!newClientsOnly || provider.newClients) ? (
          <div key={provider.id} className="flex flex-col p-4 mb-8">
            <div className="flex items-start gap-4">
              {/* Left - Provider Info */}
              <div className="w-40 shrink-0">
                <img
                  src={provider.image}
                  alt={provider.name}
                  className="w-20 h-20 rounded-full mb-2 object-cover"
                />
                <h3 className="font-semibold text-base">{provider.name}</h3>
                <p className="text-sm text-gray-600">
                  {provider.clinicDetails.name}
                </p>
                <p className="text-sm text-green-600 mt-2">
                  Online:{" "}
                  {(availability?.onlineSlots.length || 0) +
                    (availability?.bothSlots.length || 0)}
                </p>
                <p className="text-sm text-orange-600">
                  Offline:{" "}
                  {(availability?.offlineSlots.length || 0) +
                    (availability?.bothSlots.length || 0)}
                </p>
              </div>

              {/* Right - Scrollable Grid */}
              <div className="flex-1 relative flex border rounded-md gap-4 overflow-hidden">
                <button
                  onClick={() => handleScroll("prev", index)}
                  className="w-10 text-sm border-r shrink-0"
                >
                  ⬅️
                </button>

                {/* Time Slots - Scrollable Container */}
                <div className="py-4 overflow-hidden">
                  <div
                    ref={ref => (scrollRef.current[index] = ref)}
                    className="flex overflow-x-auto no-scrollbar gap-4"
                  >
                    {chunkedSlots.map((group, idx) => (
                      <div
                        key={idx}
                        className="flex flex-col gap-4 min-w-[64px]"
                      >
                        {group.map(time => {
                          const status = getSlotStatus(time, availability);
                          return (
                            <div
                              key={time}
                              title={status}
                              className={`w-16 h-10 flex items-center justify-center text-xs text-white rounded ${slotColors[status]}`}
                            >
                              {time}
                            </div>
                          );
                        })}
                      </div>
                    ))}
                  </div>
                </div>
                <button
                  onClick={() => handleScroll("next", index)}
                  className="w-10 text-sm border-l rounded shrink-0"
                >
                  ➡️
                </button>
              </div>
            </div>
          </div>
        ) : null;
      })}
    </div>
  );
};

export default TileView;
