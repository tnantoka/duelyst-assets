import type { Unit } from '../scripts/types';
import Frame from './Frame';

export interface Props {
  unit: Unit;
}

const Thumbnail: React.FC<Props> = ({ unit }) => {
  return unit.gif !== null ? <img src={unit.gif} /> : <Frame unit={unit} />;
};

export default Thumbnail;
