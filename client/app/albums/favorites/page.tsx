"use client";
import AlbumList from "@/components/AlbumList";
import { useFetchAlbumsByIdQuery } from "@/lib/albums/albums.api";
import { useAppSelector } from "@/lib/hooks";
import React from "react";

const FavoritesAlbums = () => {
  const { albumIds } = useAppSelector((state) => state.album);
  const {
    isLoading,
    isSuccess,
    data: albums,
  } = useFetchAlbumsByIdQuery(albumIds);
  return (
    <div className="flex flex-col items-center gap-4 mt-8">
      <div className="flex flex-col items-center gap-3">
        <h1 className="text-slate-900 font-extrabold text-4xl tracking-tight text-center dark:text-white">
          Любимые альбомы
        </h1>
        {isSuccess && <AlbumList albums={albums} />}
      </div>
    </div>
  );
};

export default FavoritesAlbums;
