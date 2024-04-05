"use client"
import { useActions, useAppSelector } from "@/lib/hooks";
import { useDeleteTrackMutation } from "@/lib/track/track.api";
import { ITrack } from "@/types/track";
import { useRouter } from "next/navigation";
import React from "react";
interface TrackItemProps {
  track: ITrack;
  active?: boolean;
}
const TrackItem: React.FC<TrackItemProps> = ({ track, active = false }) => {
  const router = useRouter();
  const { playTrack, pauseTrack, setActiveTrack } = useActions();
  const [deleteTrack, {}] = useDeleteTrackMutation();
  const {pause} = useAppSelector(state => state.player)
  const play = (e) => {
    e.stopPropagation();
    setActiveTrack(track);
    playTrack();
  }
  const deleteTrackHandler = (e) => {
    e.stopPropagation();
    deleteTrack(track._id);
  }
  return (
    <div onClick={() => router.push("/tracks/" + track._id)}>
      <button onClick={play}>{!active ? "Продолжить" : "Стоп"}</button>
      <img src={"http://localhost:5000/" + track.picture} alt="preview" />
      <div>
        <div>{track.name}</div>
        <div>{track.artist}</div>
      </div>
      {active && <div>02:42 / 03:22</div>}
      <button onClick={deleteTrackHandler}>Удалить</button>
    </div>
  );
};

export default TrackItem;
