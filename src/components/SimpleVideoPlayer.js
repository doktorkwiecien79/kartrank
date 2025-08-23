import React from 'react';
import ReactPlayer from 'react-player/lazy'; // Lazy load the video player

export default function SVP({ images }) {

    const isLap = (url) => {
        return /LAP.*\.mp4$/i.test(url);
    };

    const shouldDisplayItem = (url) => {
        return isLap(url);
    };

    return (
        <div className='flex justify-center flex-col items-center'>

            {images.filter(({ src }) => shouldDisplayItem(src)).length > 0 && (
                <div>
                <p style={{ fontWeight: 'bold' }}>Zapraszam Was na szybkie kółko</p>
                </div>
            )}





            <div className="w-full flex justify-center">
                <div className="carousel rounded-box w-4/5 mx-auto">
                    {images.filter(({ src }) => shouldDisplayItem(src)).map((media, index) => (
                        <div key={index}>
                            <ReactPlayer
                                className='react-player'
                                url={media.src}
                                width='100%'
                                height='100%'
                                controls
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

