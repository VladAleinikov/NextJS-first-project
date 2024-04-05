import { ITrack } from "@/types/track";
import TrackItem from "./TrackItem";

interface TrackListProps {
  tracks: ITrack[];
}
const TrackList: React.FC<TrackListProps> = ({ tracks }) => {
  return (
    <ul role="list" className="divide-y divide-gray-100 min-w-[400px]">
      {tracks.map((track) => (
        <TrackItem key={track._id} track={track} />
      ))}
    </ul>
  );
};

export default TrackList;
