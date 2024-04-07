import { RootState, AppStore, AppDispatch } from "@/types/redux";
import { bindActionCreators } from "@reduxjs/toolkit";
import { useDispatch, useSelector, useStore } from "react-redux";
import { playerActions } from "./player/player.slice";
import { albumActions } from "./albums/album.slice";

export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppStore = useStore.withTypes<AppStore>();

const actions = {
  ...playerActions,
  ...albumActions
};

export const useActions = () => {
      const dispatch = useDispatch();
      return bindActionCreators(actions, dispatch)
}