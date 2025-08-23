import React from 'react';
import ReactPlayer from 'react-player/lazy'; // Lazy load the video player

export default function SVP({ images = [] }) {
  const isLap = (url) => /FASTLAP.*\.mp4$/i.test(url);
  const isLap2 = (url) => /DRUGILAP.*\.mp4$/i.test(url);

  const laps1 = images.filter(({ src }) => isLap(src));
  const laps2 = images.filter(({ src }) => isLap2(src));

  return (
    <>
      {/* First section */}
      <div className="flex justify-center flex-col items-center">
        {laps1.length > 0 && (
          <div>
            <p style={{ fontWeight: 'bold' }}>Zapraszam Was na szybkie kółko</p>
          </div>
        )}

        {laps1.length > 0 && (
          <div className="w-full flex justify-center">
            <div className="carousel rounded-box w-4/5 mx-auto">
              {laps1.map((media) => (
                <div key={media.src}>
                  <ReactPlayer
                    className="react-player"
                    url={media.src}
                    width="100%"
                    height="100%"
                    controls
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Second section */}
      <div className="flex justify-center flex-col items-center mt-6">
        {laps2.length > 0 && (
          <div>
            <p style={{ fontWeight: 'bold' }}>...i kolejne</p>
          </div>
        )}

        {laps2.length > 0 && (
          <div className="w-full flex justify-center">
            <div className="carousel rounded-box w-4/5 mx-auto">
              {laps2.map((media) => (
                <div key={media.src}>
                  <ReactPlayer
                    className="react-player"
                    url={media.src}
                    width="100%"
                    height="100%"
                    controls
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

