export interface ITrack{
      _id: number,
      name: string,
      artist: string,
      text: string,
      listens: number,
      picture: string,
      audio: string,
      comments: IComment[]
}
export interface IComment{
      _id: number,
      username: string,
      text: string
}