import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const LS_FAV_KEY = "rfk";

interface IFavorites {
      albumIds: string[]
}
const initialState: IFavorites = {
      albumIds: JSON.parse(localStorage.getItem(LS_FAV_KEY) ?? '[]')
}

export const albumSlice = createSlice({
      name: "album",
      initialState,
      reducers: {
            addFavorite(state, action: PayloadAction<string>) {
                  state.albumIds.push(action.payload);
                  localStorage.setItem(LS_FAV_KEY, JSON.stringify(state.albumIds));
            },
            removeFavorites(state, action: PayloadAction<string>) {
                  state.albumIds = state.albumIds.filter(el => el !== action.payload)
                  localStorage.setItem(LS_FAV_KEY, JSON.stringify(state.albumIds));
            }
      }
})

export const albumActions = albumSlice.actions;
export const albumReducer = albumSlice.reducer;