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
    setActiveTrack,
    setCurrentTime,
    setDuration,
  } = useActions();
  const play = () => {
    if (pause) {
      playTrack();
      audio.play();
    } else {
      pauseTrack();
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
      play();
    }
  }, [active]);

  if (!active) {
    return null;
  }

  return (
    <div>
      <button onClick={play}>{pause ? "Cтоп" : "Продолжить"}</button>
      <div>
        <div>{active.name}</div>
        <div>{active.artist}</div>
      </div>
      <TrackProgress
        left={currentTime}
        right={duration}
        onChange={changeCurrentTime}
      />
      <TrackProgress left={volume} right={100} onChange={changeVolume} />
    </div>
  );
};

export default Player;
