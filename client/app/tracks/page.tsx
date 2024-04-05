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
  const { isLoading, isError, data: tracks } = useFetchTracksQuery(debounced);

  if (isError) {
    return <div>Произошла ошибка</div>;
  }
  return (
    <div className="flex flex-col items-center gap-4 mt-8">
      <div className="flex flex-col items-center gap-3">
        <h1 className="text-slate-900 font-extrabold text-4xl tracking-tight text-center dark:text-white">
          Список треков
        </h1>
        <button
          className="text-white bg-blue-700 ease-in-out duration-300 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          onClick={() => router.push("/tracks/create")}
        >
          Загрузить трек
        </button>
      </div>
      <div className="max-w-md min-w-[400px]">
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="search"
            id="default-search"
            className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Поиск по названию"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>
      {!isLoading && tracks ? <TrackList tracks={tracks} /> : "Загрузка"}
    </div>
  );
};

export default Tracks;
