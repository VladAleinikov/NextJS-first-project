"use client";
import { ITrack } from "@/types/track";
import React, { useEffect } from "react";
import TrackProgress from "./TrackProgress";
import { useActions, useAppSelector } from "@/lib/hooks";

let audio: HTMLAudioElement;

const Player = () => {
  const { active, pause, volume, duration, currentTime } = useAppSelector(
    (state) => state.player
  );
  const {
    playTrack,
    pauseTrack,
    setVolume,
    setCurrentTime,
    setDuration,
  } = useActions();
  const play = () => {
    if (pause) {
      playTrack();
      audio.play();
    } else {
      pauseTrack();
      audio.pause();
    }
  };
  const changeVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    audio.volume = Number(e.target.value) / 100;
    setVolume(Number(e.target.value));
  };
  const changeCurrentTime = (e: React.ChangeEvent<HTMLInputElement>) => {
    audio.currentTime = Number(e.target.value);
    setCurrentTime(Number(e.target.value));
  };
  const setAudio = () => {
    if (active) {
      audio.src = "http://localhost:5000/" + active.audio;
      audio.volume = volume / 100;
      audio.onloadedmetadata = () => {
        setDuration(Math.ceil(audio.duration));
      };
      audio.ontimeupdate = () => {
        setCurrentTime(Math.ceil(audio.currentTime));
      };
    }
  };

  useEffect(() => {
    if (!audio) {
      audio = new Audio();
    } else {
      setAudio();
      audio.play();
    }
  }, [active]);

  if (!active) {
    return null;
  }

  return (
    <div className="fixed bottom-0 z-40 w-full backdrop-blur flex-none transition-colors duration-500 lg:z-50 lg:border-t lg:border-slate-900/10 dark:border-slate-50/[0.06] bg-white/95 supports-backdrop-blur:bg-white/60 dark:bg-transparent">
      <div className="flex space-x-8 py-4 border-t border-slate-900/10 lg:px-8 lg:border-0 dark:border-slate-300/10 mx-4 lg:mx-0">
        <button onClick={play}>
          {pause ? (
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
          ) : (
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
          )}
        </button>
        <div>
          <div>{active.name}</div>
          <div>{active.artist}</div>
        </div>
        <TrackProgress
          left={currentTime}
          right={duration}
          isTime={true}
          onChange={changeCurrentTime}
        />
        <TrackProgress isTime={false} left={volume} right={100} onChange={changeVolume} />
      </div>
    </div>
  );
};

export default Player;
