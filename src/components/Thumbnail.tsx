import type { Unit } from '../scripts/types';
import Frame from './Frame';
import { parseFrame } from '../scripts/frames';

export interface Props {
  unit: Unit;
}

const Thumbnail: React.FC<Props> = ({ unit }) => {
  const frame = parseFrame(Object.values(unit.plist.frames)[0].frame);

  return unit.gif !== null ? (
    <img src={unit.gif} width={frame.w} height={frame.h} loading="lazy" />
  ) : (
    <Frame unit={unit} />
  );
};

export default Thumbnail;
