import { parseFrame, parseSize } from '../scripts/frames';
import type { Unit } from '../scripts/types';

export interface Props {
  unit: Unit;
  frameName?: string;
}

const Frame: React.FC<Props> = ({ unit, frameName }) => {
  const frameKeys = Object.keys(unit.plist.frames);
  const frameKey =
    frameName ??
    frameKeys.find((name) => name.includes('breath')) ??
    frameKeys[0];

  const frame = parseFrame(unit.plist.frames[frameKey].frame);
  const size = parseSize(unit.plist.metadata.size);

  return (
    <div
      className="position-relative overflow-hidden"
      style={{ width: frame.w, height: frame.h }}
    >
      <img
        src={unit.image}
        width={size.w}
        height={size.h}
        loading="lazy"
        className="position-absolute"
        style={{ left: -frame.x, top: -frame.y }}
      />
    </div>
  );
};

export default Frame;
