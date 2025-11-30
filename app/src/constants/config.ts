import pack from '../../package.json';

export interface ICONFIG {
  name: string;
  desc: string;
  version: string;
  author: string;
  author_link: string;
  apikey: string;
}

const config: ICONFIG = {
  name: pack.name,
  desc: pack.description,
  version: pack.version,
  author: pack.author,
  author_link: pack['author-link'],
  apikey: pack.apikey,
};

export default config;
