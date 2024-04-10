"use client";
import { useConvertToTime } from "@/hooks/convertToTime";
import { useActions, useAppSelector } from "@/lib/hooks";
import { useDeleteTrackMutation } from "@/lib/tracks/tracks.api";
import { ITrack } from "@/types/track";
import { useRouter } from "next/navigation";
import React from "react";
interface TrackItemProps {
  track: ITrack;
  active?: boolean;
}
const TrackItem: React.FC<TrackItemProps> = ({ track }) => {
  const router = useRouter();
  const { playTrack, pauseTrack, setActiveTrack } = useActions();
  const [deleteTrack, {}] = useDeleteTrackMutation();
  const { pause, active, duration, currentTime } = useAppSelector(
    (state) => state.player
  );
  const play = (e) => {
    e.stopPropagation();
    setActiveTrack(track);
    playTrack();
  };
  const stop = (e) => {
    e.stopPropagation();
    pauseTrack();
  };
  const deleteTrackHandler = (e) => {
    e.stopPropagation();
    deleteTrack(track._id);
  };
  return (
    <li
      className="flex justify-between gap-x-6 py-5 max-w-md"
      onClick={() => router.push("/tracks/" + track._id)}
    >
      <div className="flex gap-x-4 w-full p-2 rounded-lg ease-in-out duration-300 hover:ring-slate-300 dark:bg-slate-800 dark:highlight-white/5 dark:hover:bg-slate-700">
        {active?._id !== track._id || pause ? (
          <button onClick={play}>
            <svg
              className="w-6 h-6 text-gray-800 dark:text-white dark:hover:text-sky-400 ease-in-out duration-300"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {" "}
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
          </button>
        ) : (
          <button onClick={stop}>
            <svg
              className="w-6 h-6 text-gray-800 dark:text-white dark:hover:text-sky-400 ease-in-out duration-300"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {" "}
              <rect x="6" y="4" width="4" height="16" />{" "}
              <rect x="14" y="4" width="4" height="16" />
            </svg>
          </button>
        )}
        <img
          className="h-12 w-12 flex-none rounded-full bg-gray-50"
          src={"http://localhost:5000/" + track.picture}
          alt="preview"
        />
        <div className="min-w-0 flex-auto">
          <p className="text-sm font-semibold leading-6 dark:text-slate-200">
            {track.name}
          </p>
          <p className="mt-1 truncate text-xs leading-5 text-gray-500">
            {track.artist}
          </p>
        </div>
        {active?._id === track._id && (
          <div>
            {useConvertToTime(currentTime)} / {useConvertToTime(duration)}
          </div>
        )}
        <button className="sm:items-end" onClick={deleteTrackHandler}>
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
      </div>
    </li>
  );
};

export default TrackItem;
