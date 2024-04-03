"use client";
import FileUpload from "@/components/FileUpload";
import StepWrapper from "@/components/StepWrapper";
import React, { useState } from "react";

const Create = () => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [picture, setPicture] = useState(null)
  const [audio, setAudio] = useState(null)
  const next = () => {
    if (activeStep !== 2) {
      setActiveStep((prev) => prev + 1);
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
          <input type="text" placeholder="Название трека" />
          <input type="text" placeholder="Имя автора" />
          <textarea cols="30" rows="10" placeholder="Слова к треку"></textarea>
        </div>
      )}
      {activeStep === 1 && <FileUpload setFile={setPicture} accept="image/*" ><button>Загрузить изображение</button></FileUpload>}
      {activeStep === 2 && <FileUpload setFile={setAudio} accept="audio/*" ><button>Загрузить аудио</button></FileUpload>}
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
