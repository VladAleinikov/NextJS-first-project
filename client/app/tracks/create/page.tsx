"use client";
import FileUpload from "@/components/FileUpload";
import StepWrapper from "@/components/StepWrapper";
import { useAddTrackMutation } from "@/lib/tracks/tracks.api";
import { useRouter } from "next/navigation";
import React, { useRef, useState } from "react";

const Create = () => {
  const router = useRouter();
  const [activeStep, setActiveStep] = useState<number>(0);
  const [picture, setPicture] = useState(null);
  const [audio, setAudio] = useState(null);
  const [name, setName] = useState<string>("");
  const [artist, setArtist] = useState<string>("");
  const [text, setText] = useState<string>("");
  const [addTrack, { isLoading, isError }] = useAddTrackMutation();
  const next = () => {
    if (activeStep !== 2) {
      setActiveStep((prev) => prev + 1);
    } else if (picture && audio) {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("artist", artist);
      formData.append("text", text);
      formData.append("picture", picture);
      formData.append("audio", audio);

      addTrack(formData).then(() => router.push("/tracks"));
    }
  };
  const back = () => {
    setActiveStep((prev) => prev - 1);
  };
  return (
    <div className="flex flex-col items-center gap-4 mt-8">
      <StepWrapper activeStep={activeStep}></StepWrapper>
      {activeStep === 0 && (
        <div className="flex flex-col items-center gap-3">
          <div className="max-w-md min-w-[400px]">
            <div className="relative">
              <input
                type="search"
                id="default-search"
                className="block w-full p-4  text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Название трека"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>
          <div className="max-w-md min-w-[400px]">
            <div className="relative">
              <input
                type="search"
                id="default-search"
                className="block w-full p-4  text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Имя автора"
                value={artist}
                onChange={(e) => setArtist(e.target.value)}
              />
            </div>
          </div>
          <div className="max-w-md min-w-[400px]">
            <div className="relative">
              <textarea
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Слова к треку"
                rows={4}
                value={text}
                onChange={(e) => setText(e.target.value)}
              ></textarea>
            </div>
          </div>
        </div>
      )}
      {activeStep === 1 && (
        <FileUpload setFile={setPicture} accept="image/*">
          <button>Загрузить изображение</button>
        </FileUpload>
      )}
      {activeStep === 2 && (
        <FileUpload setFile={setAudio} accept="audio/*">
          <button>Загрузить аудио</button>
        </FileUpload>
      )}
      <div className="flex flex-row justify-between mt-4 min-w-[400px]">
        <button
          className="p-1 hover:px-2 disabled:hover:px-1 dark:hover:text-sky-400 disabled:hover:text-slate-400 border-b border-sky-400 disabled:border-slate-400 ease-in-out duration-300"
          disabled={activeStep === 0}
          onClick={back}
        >
          Назад
        </button>
        <button
          className="p-1 hover:px-2 hover:text-sky-500 dark:hover:text-sky-400 border-b border-sky-400 disabled:border-slate-400 ease-in-out duration-300"
          onClick={next}
        >
          Далее
        </button>
      </div>
    </div>
  );
};

export default Create;
