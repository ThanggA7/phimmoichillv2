import React, { useEffect, useRef } from "react";
import Hls from "hls.js";

const VideoPlayer = ({ url }) => {
  const videoRef = useRef(null);
  const adStart = 15 * 60 + 1;
  const adEnd = 15 * 60 + 32;

  useEffect(() => {
    if (videoRef.current) {
      const video = videoRef.current;

      if (Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource(url);
        hls.attachMedia(video);

        hls.on(Hls.Events.ERROR, (event, data) => {
          console.error("HLS.js error:", data);
        });

        const onTimeUpdate = () => {
          if (video.currentTime >= adStart && video.currentTime <= adEnd) {
            const nextTime = adEnd;
            if (Math.abs(video.currentTime - nextTime) > 0.5) {
              video.currentTime = nextTime;
            }
          }
        };

        video.addEventListener("timeupdate", onTimeUpdate);

        return () => {
          hls.destroy();
          video.removeEventListener("timeupdate", onTimeUpdate);
        };
      } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
        video.src = url;
      } else {
        console.error("HLS not supported");
      }
    }
  }, [url]);

  return <video ref={videoRef} controls autoPlay width="100%" />;
};

export default VideoPlayer;
