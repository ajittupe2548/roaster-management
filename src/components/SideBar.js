import React from "react";
import { useDispatch, useSelector } from "react-redux";
import providerSlice from "../redux/providerSlice";
import SearchBar from "./SearchBar";

const { setService, setType, setCenter, setOnlyAvailable, setNewClientsOnly } =
  providerSlice.actions;

function SideBar() {
  const dispatch = useDispatch();
  const filters = useSelector(state => state.filters);

  return (
    <div className="border-r w-64 shrink-0 p-4 space-y-4">
      <h2 className="text-lg font-bold">Filters</h2>

      <div>
        <label className="block mb-1">Service</label>
        <select
          value={filters.service}
          onChange={e => dispatch(setService(e.target.value))}
          className="w-full border rounded px-2 py-1"
        >
          <option value="all">All</option>
          <option value="therapist">Therapist</option>
          <option value="psychiatrist">Psychiatrist</option>
          <option value="counselor">Counselor</option>
        </select>
      </div>

      <div>
        <label className="block mb-1">Type</label>
        <select
          value={filters.type}
          onChange={e => dispatch(setType(e.target.value))}
          className="w-full border rounded px-2 py-1"
        >
          <option value="all">All</option>
          <option value="inhouse">In-house</option>
          <option value="consultant">Consultant</option>
        </select>
      </div>

      <div>
        <label className="block mb-1">Center</label>
        <select
          value={filters.center}
          onChange={e => dispatch(setCenter(e.target.value))}
          className="w-full border rounded px-2 py-1"
        >
          <option value={0}>All</option>
          <option value={1}>Bandra</option>
          <option value={2}>Andheri</option>
          <option value={3}>Juhu</option>
          <option value={4}>Borivali</option>
          <option value={5}>Thane</option>
          <option value={6}>Chembur</option>
        </select>
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="available"
          checked={filters.onlyAvailable}
          onChange={e => dispatch(setOnlyAvailable(e.target.checked))}
        />
        <label htmlFor="available">Only show available</label>
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="newClients"
          checked={filters.newClientsOnly}
          onChange={e => dispatch(setNewClientsOnly(e.target.checked))}
        />
        <label htmlFor="newClients">Taking new clients</label>
      </div>

      <SearchBar />
    </div>
  );
}

export default SideBar;
