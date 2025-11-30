import { Criteria, Iinital, Pageable } from '@/services';

export interface IMODEL {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}

export interface IENTITY {
  id: number;
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Poster: string;
  Ratings: Array<{
    Source: string;
    Value: string;
  }>;
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  imdbID: string;
  Type: string;
  DVD: string;
  BoxOffice: string;
  Production: string;
  Website: string;
  Response: string;
}

class Model implements Iinital<IMODEL, IENTITY> {
  id: string = 'movies';
  name: string = 'Movies';
  loading!: boolean;
  entity!: IENTITY;
  entities!: Array<IMODEL>;
  pageable!: Pageable;
  criteria: Criteria = { s: 'Pokemon' };
  isSuccess!: boolean;
  findSuccess!: boolean;
  saveSuccess!: boolean;
  deleteSuccess!: boolean;
  updateSuccess!: boolean;
  error!: string | undefined;
}

export const model = new Model();
export default Model;
