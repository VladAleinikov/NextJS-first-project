import { IPlayer } from "@/types/player";
import { ITrack } from "@/types/track";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: IPlayer = {
  active: null,
  volume: 50,
  duration: 0,
  currentTime: 0,
  pause: true,
};

export const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    playTrack: (state) => {
      state.pause = false;
    },
    pauseTrack: (state) => {
      state.pause = true;
    },
    setCurrentTime: (state, action: PayloadAction<number>) => {
      state.currentTime = action.payload;
    },
    setVolume: (state, action: PayloadAction<number>) => {
      state.volume = action.payload;
    },
    setDuration: (state, action: PayloadAction<number>) => {
      state.duration = action.payload;
    },
    setActiveTrack: (state, action: PayloadAction<ITrack>) => {
      state.active = action.payload;
      state.duration = 0;
      state.currentTime = 0;
    },
  },
});

export const playerActions = playerSlice.actions;
export const playerReducer = playerSlice.reducer;
