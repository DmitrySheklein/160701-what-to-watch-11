import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { RouteName } from 'src/const';
import { TFilm } from 'src/types/films';
import { HumanizeDate } from 'src/utils/date';
import { getTestId } from 'src/utils/main';
import Loader from '../loader/loader';

type TPlayer = {
  currentFilm: TFilm;
};

const Player = ({ currentFilm }: TPlayer) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const { id, videoLink, previewImage, name } = currentFilm;
  const [playing, setPlaying] = useState(false);
  const [durationValue, setDurationValue] = useState(0);
  const [progressValue, setProgressValue] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      const onLoadedData = () => {
        const { duration } = video;
        setLoading(false);
        if (duration) {
          setDurationValue(duration);
        }
      };
      const onTimeUpdate = () => {
        const { duration, currentTime } = video;
        const currentDuration = duration - currentTime;
        setDurationValue(currentDuration);

        const offsetPercent = (currentTime * 100) / duration;
        setProgressValue(offsetPercent);
      };
      const onEnded = () => {
        setPlaying(false);
      };
      video.addEventListener('loadeddata', onLoadedData);
      video.addEventListener('timeupdate', onTimeUpdate);
      video.addEventListener('ended', onEnded);
    }
  }, []);

  useEffect(() => {
    const video = videoRef.current;

    video?.[playing ? 'play' : 'pause']();
  }, [playing]);

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  };

  return (
    <div className="player">
      {loading ? <Loader /> : null}
      <div
        style={{
          visibility: loading ? 'hidden' : 'visible',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
      >
        <video
          ref={videoRef}
          src={videoLink}
          className="player__video"
          poster={previewImage}
          {...getTestId('video')}
        />

        <Link className="player__exit" to={`/${RouteName.Films}/${id}`}>
          Exit
        </Link>

        <div className="player__controls">
          <div className="player__controls-row">
            <div className="player__time">
              <progress className="player__progress" value={progressValue} max="100"></progress>
              <div className="player__toggler" style={{ left: `${progressValue}%` }}>
                Toggler
              </div>
            </div>
            <div className="player__time-value">
              {HumanizeDate.FilmPlayerDuration(durationValue)}
            </div>
          </div>

          <div className="player__controls-row">
            <button
              type="button"
              className="player__play"
              onClick={() => {
                setPlaying(!playing);
              }}
              {...getTestId('play-btn')}
            >
              <svg viewBox="0 0 19 19" width="19" height="19">
                <use xlinkHref={`#${playing ? 'pause' : 'play-s'}`}></use>
              </svg>
              <span>Play</span>
            </button>
            <div className="player__name">{name}</div>

            <button
              type="button"
              className="player__full-screen"
              onClick={() => {
                toggleFullScreen();
              }}
            >
              <svg viewBox="0 0 27 27" width="27" height="27">
                <use xlinkHref="#full-screen"></use>
              </svg>
              <span>Full screen</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Player;
