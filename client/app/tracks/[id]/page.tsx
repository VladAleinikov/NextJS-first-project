"use client";
import { ITrack } from "@/types/track";
import { useRouter } from "next/navigation";
import React from "react";

const TrackPage = () => {
  const router = useRouter();
  const track: ITrack = {
    id: "1",
    name: "Трэк 1",
    artist: "Исполнитель 1",
    text: "Текст 1",
    listens: 5,
    picture: "",
    audio: "",
    comments: [],
  };
  return (
    <div>
      <button onClick={() => router.push("/tracks")}>К списку</button>
      <div>
        <img src={track.picture} alt="preview" />
        <div>
          <h1>Название трека - {track.name}</h1>
          <h1>Исполнитель - {track.artist}</h1>
          <h1>Прослушиваний - {track.listens}</h1>
        </div>
        <div>
          <h1>Слова в треке</h1>
        </div>
        <p>{track.text}</p>
        <div>
          <h1>Комментарии</h1>
          <input type="text" placeholder="Ваше имя" />
          <textarea cols="30" rows="10" placeholder="Комментарий"></textarea>
          <button>Отправить</button>
        </div>
        <div>
          {track.comments.map((comment) => (
            <div key={comment.id}>
              <div>Автор - {comment.username}</div>
              <div>Комментарий - {comment.text}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrackPage;
