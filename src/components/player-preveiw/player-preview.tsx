import { useEffect, useRef, VideoHTMLAttributes } from 'react';
import { getTestId } from 'src/utils/main';

type TPlayer = VideoHTMLAttributes<HTMLVideoElement> & {
  playing?: boolean;
};

const PlayerPreview = ({ playing = false, ...props }: TPlayer) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const video = videoRef.current;

    video?.[playing ? 'play' : 'load']();
  }, [playing]);

  return <video {...props} ref={videoRef} {...getTestId('video')} />;
};

export default PlayerPreview;
