import { VolumeX, Volume2 } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { HiDotsHorizontal } from "react-icons/hi";
import {
  PiFastForwardFill,
  PiPauseFill,
  PiPlayFill,
  PiRewindFill,
} from "react-icons/pi";


const AudioPlayer = ({
  song,
  nextSong,
  prevSong,
  isPlaying,
  setIsPlaying,
  setDuration,
}) => {
  const audioRef = useRef(null);
  const [isMute, setIsMute] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !audioRef.current.muted;
    }
    setIsMute(!isMute);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleSongEnd = () => {
    nextSong();
    setIsPlaying(true);
    setCurrentTime(0);
  };

  useEffect(() => {
    if (audioRef.current && isPlaying) {
      audioRef.current.play();
    }
  }, [isPlaying, song]);

  return (
    <div className="flex flex-col items-center h-screen py-20 p-4 rounded-lg w-screen max-w-[500px]">
      <div className="flex flex-col w-full mb-4">
        <span className="text-2xl font-bold mb-2">{song.name}</span>
        <span className="text-lg mb-4 text-gray-400">{song.artist}</span>
      </div>
      <div className="w-full h-[500px]">
      <img
        src={`https://cms.samespace.com/assets/${song.cover}`}
        alt={song.name}
        className="rounded-lg object-cover object-center h-full w-full"
      />
      </div>
      <audio
        autoPlay
        ref={audioRef}
        src={song.url}
        className="w-full"
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleSongEnd}
      />
      <div className="w-full mt-4">
        <input
          type="range"
          min={0}
          max={audioRef.current ? audioRef.current.duration : 0}
          value={currentTime}
          onChange={(e) => {
            if (audioRef.current) {
              audioRef.current.currentTime = e.target.value;
            }
          }}
          className="w-full"
        />
      </div>
      <div className="flex justify-between w-full">
        <div className="mt-4 size-16 flex justify-center items-center bg-white/10 rounded-full p-2">
          <button><HiDotsHorizontal className="w-10 h-10 rounded-full p-2" /></button>
        </div>
        <div className="mt-4 flex justify-center items-center">
          <button
            className="p-2"
            onClick={() => {
              prevSong();
              setIsPlaying(true);
            }}
          >
            <PiRewindFill className="w-12 h-12  rounded-full p-2" />
          </button>
          <button className="mx-2 p-2 rounded-full" onClick={handlePlayPause}>
            {isPlaying ? (
              <PiPauseFill className="w-10 h-10 rounded-full p-2" />
            ) : (
              <PiPlayFill className="w-10 h-10 rounded-full p-2" />
            )}
          </button>
          <button
            className="p-2"
            onClick={() => {
              nextSong();
              setIsPlaying(true);
            }}
          >
            <PiFastForwardFill className="w-12 h-12  rounded-full p-2" />
          </button>
        </div>
        <button
          className="mt-4 p-2 size-16 flex items-center justify-center rounded-full"
          onClick={handleMute}
        >
          {isMute ? (
            <VolumeX className="w-10 h-10 bg-white/10   rounded-full p-2" />
          ) : (
            <Volume2 className="w-10 h-10 bg-white/10  rounded-full p-2" />
          )}
        </button>
      </div>
    </div>
  );
};

export default AudioPlayer;
