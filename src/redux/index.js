import { configureStore } from "@reduxjs/toolkit";
import providerSlide from "./providerSlice";

const store = configureStore({
  reducer: {
    filters: providerSlide.reducer,
  },
});

export default store;
