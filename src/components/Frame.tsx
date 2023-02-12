import { parseFrame } from '../scripts/frames';
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

  const style = {
    backgroundImage: `url(${unit.image})`,
    backgroundPosition: `left -${frame.x}px top -${frame.y}px`,
    width: `${frame.w}px`,
    height: `${frame.h}px`,
  };

  return <div style={style} />;
};

export default Frame;
