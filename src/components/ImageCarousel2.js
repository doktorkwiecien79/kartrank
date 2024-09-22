import React, { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import ReactPlayer from 'react-player/lazy'; // Lazy load the video player

export default function ImageCarousel2({ images }) {
  const [activeIndex, setActiveIndex] = useState(0); // State to track active image
  const [isMuted, setIsMuted] = useState(true);
  const carouselRef = useRef(null);

  // Helper function to determine if the URL is a video based on the extension
  const isVideo = (url) => /\.(mp4|webm|ogg)$/i.test(url);

  const isLap = (url) => /LAP.*\.mp4$/i.test(url);

  const shouldDisplayItem = (url) => !isLap(url);

  const handleVideoError = (e) => {
    console.error('Error playing video:', e);
  };

  const updateActiveIndex = useCallback((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const currentIndex = Number(entry.target.dataset.index);
        setActiveIndex(currentIndex);
      }
    });
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(updateActiveIndex, {
      root: carouselRef.current,
      threshold: 0.5,
    });

    const items = carouselRef.current.querySelectorAll('.carousel-item');
    items.forEach((item) => observer.observe(item));

    return () => {
      items.forEach((item) => observer.unobserve(item));
    };
  }, [updateActiveIndex]);

  return (
    <div>
      <div ref={carouselRef} className="w-96 carousel rounded-box">
        {images.filter(({ src }) => shouldDisplayItem(src)).map((media, index) => (
          <div
            key={index}
            id={`item${index + 1}`}
            className="carousel-item w-full"
            data-index={index}
          >
            {!isVideo(media.src) ? (
              // Render an image if the media is not a video
              <Image
                src={media.src}
                alt={media.alt}
                width={1920}
                height={1080}
                //layout="fill"
                objectFit="cover"
              />
            ) : (
              // Render a video if the media is a video but does not contain 'LAP' in name
              <div className="player-wrapper">
                <ReactPlayer
                  url={media.src}
                  className="react-player"
                  playing={true}
                  width="100%"
                  height="100%"
                  controls={true}
                  playsInline={true} // Correct attribute for inline playback in JSX
                  muted={isMuted}
                  onError={handleVideoError}
                />
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="flex justify-center w-full py-2 gap-2">
        {images.filter(({ src }) => shouldDisplayItem(src)).map((_, index) => (
          <a
            key={index}
            href={`#item${index + 1}`}
            className={`btn btn-xs ${index === activeIndex ? 'bg-oceanBlue' : ''}`}
            onClick={() => setActiveIndex(index)} // Set active index on click
          >
            {index + 1}
          </a>
        ))}
      </div>
    </div>
  );
}

