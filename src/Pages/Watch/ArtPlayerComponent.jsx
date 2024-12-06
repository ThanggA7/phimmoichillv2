import React, { useEffect, useRef } from "react";
import Artplayer from "artplayer";
import artplayerPluginHlsControl from "artplayer-plugin-hls-control";
import Hls from "hls.js";

const ArtPlayerComponent = ({ url, className }) => {
  const playerRef = useRef(null);

  useEffect(() => {
    if (!playerRef.current) {
      playerRef.current = new Artplayer({
        container: "#artplayer-container",
        url: url,
        autoSize: true,
        autoplay: false,
        plugins: [
          artplayerPluginHlsControl({
            quality: {
              control: true,
              setting: true,
              getName: (level) => level.height + "P",
              title: "Quality",
              auto: "Auto",
            },
            audio: {
              control: true,
              setting: true,
              getName: (track) => track.name,
              title: "Audio",
              auto: "Auto",
            },
          }),
        ],
        customType: {
          m3u8: function playM3u8(video, url, art) {
              if (Hls.isSupported()) {
          if (art.hls) art.hls.destroy();
          const hls = new Hls();
          hls.loadSource(url);
          hls.attachMedia(video);
          art.hls = hls;
          art.on('destroy', () => hls.destroy());
              } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
                  video.src = url;
              } else {
                  art.notice.show = 'Unsupported playback format: m3u8';
              }
          }
      },
      });
    }

    return () => {
      if (playerRef.current) {
        playerRef.current.destroy();
        playerRef.current = null;
      }
    };
  }, [url]);

  return (
    <div
      id="artplayer-container"
      className={`${className} w-full aspect-video  object-cover`}
    />
  );
};

export default ArtPlayerComponent;
