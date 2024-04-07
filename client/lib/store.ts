import { configureStore } from "@reduxjs/toolkit";
import { playerReducer } from "./player/player.slice";
import { tracksApi } from "./tracks/tracks.api";
import { albumApi } from "./albums/albums.api";
import { albumReducer } from "./albums/album.slice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      player: playerReducer,
      [tracksApi.reducerPath]: tracksApi.reducer,
      [albumApi.reducerPath]: albumApi.reducer,
      album: albumReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(tracksApi.middleware),
  });
};
