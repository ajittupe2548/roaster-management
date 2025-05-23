import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "./initialState";

const providerSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setService: (state, action) => void (state.service = action.payload),
    setType: (state, action) => void (state.type = action.payload),
    setCenter: (state, action) => void (state.center = action.payload),
    setOnlyAvailable: (state, action) =>
      void (state.onlyAvailable = action.payload),
    setNewClientsOnly: (state, action) =>
      void (state.newClientsOnly = action.payload),
    setSearchText: (state, action) => void (state.searchText = action.payload),
    setActiveDate: (state, action) => void (state.activeDate = action.payload),
    setView: (state, action) => void (state.view = action.payload),
  },
});

export const {
  setService,
  setType,
  setCenter,
  setOnlyAvailable,
  setNewClientsOnly,
  setSearchText,
  setActiveDate,
  toggleView,
} = providerSlice.actions;
export default providerSlice;
