"use client";
import FileUpload from "@/components/FileUpload";
import StepWrapper from "@/components/StepWrapper";
import { useAddTrackMutation } from "@/lib/track/track.api";
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
  const [addTrack, {isLoading, isError}] = useAddTrackMutation();
  const next = () => {
    if (activeStep !== 2) {
      setActiveStep((prev) => prev + 1);
    } else if (picture && audio) {      
      const formData = new FormData();
      formData.append("name", name || '');
      formData.append("artist", artist || '');
      formData.append("text", text || '');
      formData.append("picture", picture);
      formData.append("audio", audio);
      console.log(formData);
      
      addTrack(formData).then(res => router.push('/tracks'));
    }
  };
  const back = () => {
    setActiveStep((prev) => prev - 1);
  };
  return (
    <div>
      <StepWrapper activeStep={activeStep}>asdasd</StepWrapper>
      {activeStep === 0 && (
        <div>
          <input value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="Название трека" />
          <input value={artist} onChange={(e) => setArtist(e.target.value)} type="text" placeholder="Имя автора" />
          <textarea
            value={text} onChange={(e) => setText(e.target.value)}
            cols={30}
            rows={10}
            placeholder="Слова к треку"
          ></textarea>
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
      <div>
        <button disabled={activeStep === 0} onClick={back}>
          Назад
        </button>
        <button onClick={next}>Далее</button>
      </div>
    </div>
  );
};

export default Create;
