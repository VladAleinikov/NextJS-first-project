"use client";

import { ITrack } from "@/types/track";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import TrackList from "../../components/TrackList";
import { useAppSelector } from "@/lib/hooks";
import { useFetchTracksQuery } from "@/lib/track/track.api";
import { useDebounce } from "@/hooks/debounce";

const Tracks = () => {
  const router = useRouter();
  const [search, setSearch] = useState<string>("");
  const debounced = useDebounce(search);
  const  { isLoading, isError, data: tracks } =
    useFetchTracksQuery(debounced);
  

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
        <input
          type="text"
          placeholder="Поиск по названию"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      {!isLoading && tracks ? <TrackList tracks={tracks} /> : "Загрузка"}
    </div>
  );
};

export default Tracks;
