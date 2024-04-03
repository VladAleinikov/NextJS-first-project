"use client"
import { useActions, useAppSelector } from "@/lib/hooks";
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
  const {pause} = useAppSelector(state => state.player)
  const play = (e) => {
    e.stopPropagation();
    setActiveTrack(track);
    playTrack();
  }
  return (
    <div onClick={() => router.push("/tracks/" + track.id)}>
      <button onClick={play}>{!active ? "Продолжить" : "Стоп"}</button>
      <img src={track.picture} alt="preview" />
      <div>
        <div>{track.name}</div>
        <div>{track.artist}</div>
      </div>
      {active && <div>02:42 / 03:22</div>}
      <button onClick={(e) => e.stopPropagation()}>Удалить</button>
    </div>
  );
};

export default TrackItem;
