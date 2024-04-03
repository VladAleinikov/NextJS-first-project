"use client";

import { ITrack } from "@/types/track";
import { useRouter } from "next/navigation";
import React from "react";
import TrackList from "../../components/TrackList";
import { useAppSelector } from "@/lib/hooks";
import { useFetchTracksQuery } from "@/lib/track/track.api";

const Tracks = () => {
  const { isLoading, isError, data: tracks } = useFetchTracksQuery();
  const router = useRouter();

  if(isError){
    return (<div>Произошла ошибка</div>)
  }
  return (
    <div>
      <div>
        <h1>Список треков</h1>
        <button onClick={() => router.push("/tracks/create")}>Загрузить</button>
      </div>

      {!isLoading && tracks ? <TrackList tracks={tracks} /> : "Загрузка"}
    </div>
  );
};

export default Tracks;
