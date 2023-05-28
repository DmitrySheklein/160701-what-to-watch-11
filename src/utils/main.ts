const adjustColor = (dataColor: string, amount: number) =>
  `#${dataColor
    .replace(/^#/, '')
    .replace(/../g, (color) =>
      `0${Math.min(255, Math.max(0, parseInt(color, 16) + amount)).toString(16)}`.substr(-2),
    )}`;

const FilmRateName = {
  Bad: 'Bad',
  Normal: 'Normal',
  Good: 'Good',
  VeryGood: 'Very good',
  Awesome: 'Awesome',
} as const;

const FilmRate = {
  0: FilmRateName.Bad,
  3: FilmRateName.Normal,
  5: FilmRateName.Good,
  8: FilmRateName.VeryGood,
  10: FilmRateName.Awesome,
} as const;

const getFilmRatingPhrase = (rating: number) => {
  const phrase = Object.entries(FilmRate).reduce((acc, [key, value]) => {
    if (rating >= Number(key)) {
      return value;
    }
    return acc;
  }, '');

  return phrase;
};

const getTestId = (name: string) => ({ 'data-testid': name });

export { adjustColor, getFilmRatingPhrase, FilmRateName, getTestId };
