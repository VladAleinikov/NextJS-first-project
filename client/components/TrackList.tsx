import { ITrack } from "@/types/track";
import TrackItem from "./TrackItem";

interface TrackListProps {
  tracks: ITrack[];
}
const TrackList: React.FC<TrackListProps> = ({ tracks }) => {
  return (
    <div>
      {tracks.map((track) => (
        <TrackItem key={track.id} track={track} />
      ))}
    </div>
  );
};

export default TrackList;
