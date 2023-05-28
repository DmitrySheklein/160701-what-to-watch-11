import { FilmRateName, getFilmRatingPhrase } from './main';

describe('Utils Logic: check utils function', () => {
  describe('Function: getFilmRatingPhrase', () => {
    it('should return correct phrase 1', () => {
      const ratingValue = 5;
      expect(getFilmRatingPhrase(ratingValue)).toBe(FilmRateName.Good);
    });

    it('should return correct phrase 2', () => {
      const ratingValue = -5;
      expect(getFilmRatingPhrase(ratingValue)).toBe('');
    });

    it('should return correct phrase 3', () => {
      const ratingValue = 1000.112313;
      expect(getFilmRatingPhrase(ratingValue)).toBe(FilmRateName.Awesome);
    });

    it('should return correct phrase 4', () => {
      const ratingValue = NaN;
      expect(getFilmRatingPhrase(ratingValue)).toBe('');
    });
  });
});
