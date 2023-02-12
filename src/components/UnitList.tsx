import React from 'react';

import Thumbnail from './Thumbnail';
import type { Unit } from '../scripts/types';

export interface Props {
  units: { [key: string]: Unit };
  unitNames: string[];
}

const UnitList: React.FC<Props> = ({ units, unitNames }) => {
  const [query, setQuery] = React.useState('');
  const [isMounted, setIsMounted] = React.useState(false);

  const onChangeQuery = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const query = e.target.value;
      setQuery(query);
    },
    []
  );

  React.useEffect(() => {
    if (!isMounted) {
      return;
    }

    window.history.replaceState(
      null,
      document.title,
      location.href.replace(/\?.*/, '') + `?q=${query}`
    );
  }, [isMounted, query]);

  React.useEffect(() => {
    const query = new URLSearchParams(location.search).get('q') ?? '';
    setQuery(query);
    setIsMounted(true);
  }, []);

  const filteredUnitNames = React.useMemo(() => {
    if (!isMounted) {
      return [];
    }
    if (!query) {
      return unitNames;
    }
    return unitNames.filter((unitName) => unitName.includes(query));
  }, [isMounted, unitNames, query]);

  return (
    <>
      <div>
        <p className="text-end mb-1 text-muted small">
          <span className="">{filteredUnitNames.length}</span> /{' '}
          {unitNames.length}
        </p>
        <input
          type="search"
          className="form-control"
          placeholder="Search"
          value={query}
          onChange={onChangeQuery}
        />
      </div>

      <div className="container mt-4 py-3">
        <div className="row row-gap-3 text-break">
          {filteredUnitNames.map((unitName) => (
            <div
              key={unitName}
              className="col-6 col-sm-4 col-md-3 col-lg-2 d-flex"
            >
              <a
                href={`/units/${unitName}`}
                className="flex-fill d-flex flex-column text-decoration-none text-reset hover:bg-light"
              >
                <div className="flex-fill d-flex align-items-center justify-content-center">
                  <Thumbnail unit={units[unitName]} />
                </div>
                <p className="text-center">{unitName}</p>
              </a>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default UnitList;
