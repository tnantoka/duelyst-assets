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
export const unitNames = Object.keys(images);
const gifs = loadResources('unit_gifs', 'gif');
const plists = loadResources('units', 'plist');

type Unit = {
  name: string;
  image: string;
  gif?: string;
  plist: any;
};

export const units = unitNames.reduce(
  (dict: { [key: string]: Unit }, name: string) => ({
    ...dict,
    [name]: {
      name,
      image: images[name],
      gif: gifs[name],
      plist: plists[name],
    },
  }),
  {}
);
