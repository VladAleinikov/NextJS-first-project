import { IAlbum } from "./album"

export interface ITrack{
      id: number
      _id: string,
      name: string,
      artist: string,
      text: string,
      listens: number,
      picture: string,
      audio: string,
      comments: IComment[],
      albums: IAlbum[]
}
export interface IComment{
      _id: number,
      username: string,
      text: string
}