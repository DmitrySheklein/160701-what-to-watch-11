import dayjs from 'dayjs';
import objectSupport from 'dayjs/plugin/objectSupport';
import relativeTime from 'dayjs/plugin/relativeTime';
import duration from 'dayjs/plugin/duration';
dayjs.extend(objectSupport);
dayjs.extend(relativeTime);
dayjs.extend(duration);

class HumanizeDate {
  static FilmDuration(minute: number) {
    return dayjs({ minute }).format('H[h] mm[m]');
  }

  static FilmPlayerDuration(seconds: number) {
    const HOUR = 60 * 60;

    return dayjs({ seconds }).format(seconds >= HOUR ? '-hh:mm:ss' : '-mm:ss');
  }

  static FilmReleaseYear(date: Date) {
    return dayjs(date).format('YYYY');
  }

  static FilmRelease(date: Date) {
    return dayjs(date).format('M MMM YYYY');
  }

  static CommentDateTime(date: Date | string) {
    return dayjs(date).format('YYYY-MM-DD');
  }

  static Comment(date: Date | string) {
    return dayjs(date).format('MMMM D, YYYY');
  }

  static FromNow(date: Date) {
    return dayjs(date).fromNow();
  }
}

export { HumanizeDate };
