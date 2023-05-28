import { TFilmId } from './films';

export type TReview = {
  comment: string;
  date: Date;
  id: number;
  rating: number;
  user: {
    id: number;
    name: string;
  };
};

export type TAddReveiw = {
  comment: string;
  rating: number;
  filmId: TFilmId;
};
