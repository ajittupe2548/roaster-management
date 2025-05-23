export function formatToYYYYMMDD(dateStr) {
  const date = new Date(dateStr);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function getNextNDays(n) {
  const days = [];
  for (let i = 0; i < n; i++) {
    const date = new Date();
    date.setDate(date.getDate() - 7 + i);
    const day = date.toLocaleDateString("en-US", { weekday: "short" });
    const dateStr = date.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
    days.push({ id: i, date, label: `${day}, ${dateStr}` });
  }
  return days;
}

export const getProviderSlotStatuses = (providers, dateKey, time) => {
  const statuses = [];

  providers.forEach(provider => {
    const availability = provider.availabilities?.[dateKey];
    if (!availability) return;

    const {
      blockedSlots = [],
      onlineBookedSlots = [],
      offlineBookedSlots = [],
      bothSlots = [],
      onlineSlots = [],
      offlineSlots = [],
    } = availability;

    let status = null;
    if (blockedSlots.some(b => b.slot === time)) status = "blocked";
    else if (onlineBookedSlots.includes(time)) status = "online_booked";
    else if (offlineBookedSlots.includes(time)) status = "offline_booked";
    else if (bothSlots.includes(time)) status = "both";
    else if (onlineSlots.includes(time)) status = "online";
    else if (offlineSlots.includes(time)) status = "offline";

    if (status) {
      statuses.push({
        provider: provider.name || "P",
        status,
        color: slotColors[status] || slotColors.other,
      });
    }
  });

  return statuses;
};

export const slotColors = {
  online: "bg-green-500",
  offline: "bg-orange-500",
  both: "bg-blue-500",
  online_booked: "bg-blue-900",
  offline_booked: "bg-yellow-800",
  blocked: "bg-red-500",
  other: "bg-gray-400",
};

export const statuses = [
  { label: "Online", color: slotColors.online },
  { label: "Offline", color: slotColors.offline },
  { label: "Online + Offline", color: slotColors.both },
  { label: "Online Booked", color: slotColors.online_booked },
  { label: "Offline Booked", color: slotColors.offline_booked },
  { label: "Blocked", color: slotColors.blocked },
];

export const generateTimeSlots = () => {
  const slots = [];
  const start = new Date();
  start.setHours(8, 0, 0, 0);
  for (let i = 0; i < 64; i++) {
    const time = new Date(start.getTime() + i * 15 * 60000);
    slots.push(time.toTimeString().slice(0, 5));
  }
  return slots;
};

export const chunkSlots = (slots, size = 4) => {
  const result = [];
  for (let i = 0; i < slots.length; i += size) {
    result.push(slots.slice(i, i + size));
  }
  return result;
};

export const getSlotStatus = (time, availability) => {
  if (availability?.onlineBookedSlots.includes(time)) return "online_booked";
  if (availability?.offlineBookedSlots.includes(time)) return "offline_booked";
  if (availability?.blockedSlots.some(slot => slot.slot === time))
    return "blocked";
  if (availability?.bothSlots.includes(time)) return "both";
  if (availability?.onlineSlots.includes(time)) return "online";
  if (availability?.offlineSlots.includes(time)) return "offline";
  return "other";
};
