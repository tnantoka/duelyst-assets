import * as fs from 'node:fs';
import plist from 'plist';

const loadResources = (type: string, extname: string) => {
  const dir = `/duelyst-1.97.12/app/resources/${type}/`;
  const resources = fs.readdirSync(`./public${dir}`);
  return resources
    .filter((filename: string) => new RegExp(`\\.${extname}$`).test(filename))
    .filter((filename: string) => !filename.includes(' copy'))
    .reduce((dict: { [key: string]: string }, filename: string) => {
      const key = filename.replace(/\.[^.]+$/, '').replace(/_breathing$/, '');
      const path = `${dir}${filename}`;
      const content =
        extname === 'plist'
          ? plist.parse(fs.readFileSync(`./public${path}`, 'utf8'))
          : path;
      return {
        ...dict,
        [key]: content,
      };
    }, {});
};

const images = loadResources('units', 'png');
export default {
  unit: {
    names: Object.keys(images),
    gifs: loadResources('unit_gifs', 'gif'),
    images,
    plists: loadResources('units', 'plist'),
  },
};
