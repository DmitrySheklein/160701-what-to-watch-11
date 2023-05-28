import { internet, name, datatype, lorem, image, music, date, random } from 'faker';
import { TFilm, TFilmComment } from 'src/types/films';
import { UserData } from 'src/types/user-data';

export const makeFakeUserData = (): UserData => ({
  id: datatype.number(),
  email: internet.email(),
  token: datatype.uuid(),
  avatarUrl: internet.avatar(),
  name: name.title(),
});

export const makeFakeFilm = (idx = 1): TFilm => ({
  name: name.title(),
  posterImage: image.imageUrl(),
  previewImage: image.imageUrl(),
  backgroundImage: image.imageUrl(),
  backgroundColor: '#C4C0C0',
  description: lorem.paragraphs(2),
  rating: datatype.float({
    min: 0,
    max: 10,
  }),
  scoresCount: datatype.number({ min: 10, max: 250000 }),
  director: `${name.firstName()} ${name.lastName()}`,
  starring: random.arrayElements(
    Array.from({ length: 10 }, () => `${name.firstName()} ${name.lastName()}`),
    5,
  ),
  runTime: datatype.number({ min: 10, max: 150 }),
  genre: music.genre(),
  released: datatype.number({
    min: 1900,
    max: 2022,
  }),
  id: idx,
  isFavorite: datatype.boolean(),
  videoLink: image.imageUrl(),
  previewVideoLink: image.imageUrl(),
});
export const makeFakeFilmsArray = (number = 10) =>
  Array.from({ length: number }, (_, idx) => makeFakeFilm(idx + 1));

export const makeFakeComment = (): TFilmComment => ({
  id: datatype.number(),
  user: {
    id: datatype.number(),
    name: name.title(),
  },
  rating: datatype.float({
    min: 0,
    max: 10,
  }),
  comment: lorem.paragraphs(1),
  date: date.past(2010).toISOString(),
});

export const makeFakeCommentsArray = (number = 10) =>
  Array.from({ length: number }, makeFakeComment);
