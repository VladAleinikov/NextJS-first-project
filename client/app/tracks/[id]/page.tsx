"use client";
import {
  useAddCommentMutation,
  useFetchTrackQuery,
} from "@/lib/track/track.api";
import { useRouter } from "next/navigation";
import React, { useRef } from "react";

const TrackPage = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const { isLoading, isError, data: track } = useFetchTrackQuery(params.id);
  const [
    addComment,
    {
      isSuccess: isSuccessComment,
      isLoading: isLoadingComment,
      data: trackWithComment,
    },
  ] = useAddCommentMutation();
  const nameRef = useRef<HTMLInputElement>(null);
  const textRef = useRef<HTMLTextAreaElement>(null);

  const addCommentHandler = () => {
    if (nameRef.current && textRef.current && track) {
      addComment({
        comment: {
          username: nameRef.current?.value,
          text: textRef.current?.value,
        },
        trackId: track.id,
      });
    }
  };
  if (isSuccessComment && isLoadingComment && track) {
    track.comments = trackWithComment?.comments || [];
  }
  if (isSuccessComment)
    return (
      <div>
        <button onClick={() => router.push("/tracks")}>К списку</button>
        {!isLoading && track ? (
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
              <input type="text" placeholder="Ваше имя" ref={nameRef} />
              <textarea
                cols={30}
                rows={10}
                placeholder="Комментарий"
                ref={textRef}
              ></textarea>
              <button onClick={addCommentHandler}>Отправить</button>
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
        ) : (
          "Загрузка"
        )}
      </div>
    );
};

export default TrackPage;
