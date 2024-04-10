import { useConvertToTime } from "@/hooks/convertToTime";
import React from "react";
interface TrackProgressProps {
  left: number;
  right: number;
  isTime: boolean;
  onChange: (e) => void;
}

const TrackProgress: React.FC<TrackProgressProps> = ({
  left,
  right,
  isTime,
  onChange,
}) => {
  return (
    <div>
      <input
        type="range"
        min="0"
        max={right}
        value={left}
        onChange={onChange}
      />
      {isTime ? (
        <div>{useConvertToTime(left)} / {useConvertToTime(right)}</div>
      ) : (
        <div>
          {left} / {right}
        </div>
      )}
    </div>
  );
};

export default TrackProgress;
