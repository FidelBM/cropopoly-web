import React from 'react';
import ReactPlayer from 'react-player';
import video from '../videos/tutorial.mp4';

export const TutorialComponent = () => {
  return (
    <div className='App-Basic-Color'>
      <h1>Tutorial</h1>
      <ReactPlayer
        url={video}
        className="w-full md:w-1/2"
        width='100%' 
        height='100%' 
        controls 
      />
    </div>
  );
};