"use client";
import { useDeleteAlbumMutation } from "@/lib/albums/albums.api";
import { useActions, useAppSelector } from "@/lib/hooks";
import { IAlbum } from "@/types/album";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import TrackList from "./TrackList";

interface AlbumItemProps {
  album: IAlbum;
}
const AlbumItem: React.FC<AlbumItemProps> = ({ album }) => {
  const router = useRouter();
  const { albumIds } = useAppSelector((state) => state.album);
  const [showTracks, setShowTracks] = useState<boolean>(false);

  const [deleteAlbum] = useDeleteAlbumMutation();
  const { addFavorite, removeFavorites } = useActions();

  const removeFavoriteHandler = (e) => {
    e.stopPropagation();
    removeFavorites(album._id);
  };
  const addFavoritesHandler = (e) => {
    e.stopPropagation();
    addFavorite(album._id);
  };
  const deleteAlbumHandler = (e) => {
    e.stopPropagation();
    removeFavorites(album._id);
    deleteAlbum(album._id);
  };
  const showTracksHandler = (e) => {
    e.stopPropagation();
    setShowTracks((prev) => !prev);
  }
  return (
    <>
      <li
        className="flex justify-between gap-x-6 py-5 max-w-md"
        onClick={() => router.push("/albums/" + album._id)}
      >
        <div className="flex gap-x-4 w-full p-2 rounded-lg ease-in-out duration-300 hover:ring-slate-300 dark:bg-slate-800 dark:highlight-white/5 dark:hover:bg-slate-700">
          {albumIds.includes(album._id) ? (
            <button className="sm:items-end" onClick={removeFavoriteHandler}>
              <svg
                className="w-8 h-8 text-gray-800 dark:text-white dark:hover:text-sky-400 ease-in-out duration-300"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {" "}
                <path stroke="none" d="M0 0h24v24H0z" />{" "}
                <rect x="4" y="4" width="16" height="16" rx="2" />{" "}
                <line x1="9" y1="12" x2="15" y2="12" />
              </svg>
            </button>
          ) : (
            <button className="sm:items-end" onClick={addFavoritesHandler}>
              <svg
                className="w-8 h-8 text-gray-800 dark:text-white dark:hover:text-sky-400 ease-in-out duration-300"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {" "}
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />{" "}
                <line x1="12" y1="8" x2="12" y2="16" />{" "}
                <line x1="8" y1="12" x2="16" y2="12" />
              </svg>
            </button>
          )}
          <img
            className="h-12 w-12 flex-none rounded-full bg-gray-50"
            src={"http://localhost:5000/" + album.picture}
            alt="preview"
          />
          <div className="min-w-0 flex-auto">
            <p className="text-sm font-semibold leading-6 dark:text-slate-200">
              {album.name}
            </p>
            <p className="mt-1 truncate text-xs leading-5 text-gray-500">
              {album.description}
            </p>
          </div>
          <button className="sm:items-end" onClick={deleteAlbumHandler}>
            <svg
              className="w-8 h-8 text-gray-800 dark:text-white dark:hover:text-sky-400 ease-in-out duration-300"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {" "}
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />{" "}
              <line x1="9" y1="9" x2="15" y2="15" />{" "}
              <line x1="15" y1="9" x2="9" y2="15" />
            </svg>
          </button>
          <button
            className={
              "sm:items-end ease-in-out duration-300 " +
              (showTracks ? "rotate-180" : "")
            }
            onClick={showTracksHandler}
          >
            <svg
              className="w-8 h-8 text-gray-800 dark:text-white dark:hover:text-sky-400 ease-in-out duration-300"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {" "}
              <path stroke="none" d="M0 0h24v24H0z" />{" "}
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>
        </div>
      </li>
      {showTracks && (
        <li className="flex gap-x-4 w-full p-2 my-[-2em] rounded-lg ease-in-out duration-300 hover:ring-slate-300 dark:bg-slate-800 dark:highlight-white/5">
          {" "}
          {album.tracks.length ? (
            <TrackList tracks={album.tracks} />
          ) : (
            <p className="w-full pt-1 text-center">Здесь пока нет треков</p>
          )}
        </li>
      )}
    </>
  );
};

export default AlbumItem;
