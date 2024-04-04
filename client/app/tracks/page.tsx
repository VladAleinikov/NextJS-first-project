"use client";

import { ITrack } from "@/types/track";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef } from "react";
import TrackList from "../../components/TrackList";
import { useAppSelector } from "@/lib/hooks";
import { useLazyFetchTracksQuery } from "@/lib/track/track.api";

const Tracks = () => {
  const [fetchTracks, { isLoading, isError, data: tracks }] =
    useLazyFetchTracksQuery();
  const router = useRouter();
  const searchRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    fetchTracks();
  }, []);

  const searchTracks = () => {
    if (searchRef.current) {
      fetchTracks(searchRef.current.value);
    }
  };

  if (isError) {
    return <div>Произошла ошибка</div>;
  }
  return (
    <div>
      <div>
        <h1>Список треков</h1>
        <button onClick={() => router.push("/tracks/create")}>Загрузить</button>
      </div>
      <div>
        <input type="text" ref={searchRef} />
        <button onClick={searchTracks}>Найти</button>
      </div>
      {!isLoading && tracks ? <TrackList tracks={tracks} /> : "Загрузка"}
    </div>
  );
};

export default Tracks;
