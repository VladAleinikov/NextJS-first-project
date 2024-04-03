import { configureStore } from "@reduxjs/toolkit";
import { playerReducer } from "./player/player.slice";
import { tracksApi } from "./track/track.api";

export const makeStore = () => {
  return configureStore({
    reducer: {
      player: playerReducer,
      [tracksApi.reducerPath]: tracksApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(tracksApi.middleware),
  });
};
