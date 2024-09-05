import React, { useState } from "react";
import Search from "./Search";
import SongList from "./SongList";
import AudioPlayer from "./AudioPlayer";
import SpotifyLogo from "./icons/SpotifyLogo";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

const ResponsiveLayout = ({
  searchQuery,
  setSearchQuery,
  activeSong,
  setActiveSong,
  showTopTracks,
  setShowTopTracks,
  songCover,
  setSongCover,
  filteredSongs,
  setFilteredSongs,
  currentSongIndex,
  setCurrentSongIndex,
  isPlaying,
  setIsPlaying,
  duration,
  setDuration,
  handleNextSong,
  handlePrevSong,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="relative h-screen flex flex-col">
      <div className="flex justify-between items-center p-2"> {/* Reduced padding */}
        <SpotifyLogo />
        <button
          className="text-white text-2xl font-bold"
          onClick={toggleMenu}
        >
          <Bars3Icon className="size-6"/>
        </button>
      </div>
      {menuOpen && (
        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-90 z-50 flex flex-col">
          <div className="flex flex-col p-2 flex-grow"> {/* Reduced padding */}
            <button
              className="text-white text-xl font-bold self-end"
              onClick={toggleMenu}
            >
              <XMarkIcon className="size-6"/>
            </button>
            <div className="flex mt-4 px-2"> {/* Reduced margin-top */}
              <button
                className={`flex-1 text-left text-2xl font-bold cursor-pointer ${
                  !showTopTracks ? "text-white" : "text-gray-400"
                }`}
                onClick={() => setShowTopTracks(false)}
              >
                For You
              </button>
              <button
                className={`flex-1 text-center text-2xl font-bold cursor-pointer ${
                  showTopTracks ? "text-white" : "text-gray-400"
                }`}
                onClick={() => setShowTopTracks(true)}
              >
                Top Tracks
              </button>
              <span className="flex-1 text-right"></span>
            </div>
            <div className="my-6"> {/* Reduced margin */}
              <Search onSearch={setSearchQuery} />
            </div>
            <div className="flex-grow overflow-y-auto"> {/* Make SongList scrollable */}
              <SongList
                searchQuery={searchQuery}
                setActiveSong={setActiveSong}
                showTopTracks={showTopTracks}
                setSongCover={setSongCover}
                onSetFilteredSongs={setFilteredSongs}
                duration={duration}
              />
            </div>
          </div>
        </div>
      )}
      <div className="flex-grow overflow-y-auto"> {/* Make AudioPlayer scrollable */}
        <AudioPlayer
          song={activeSong}
          nextSong={handleNextSong}
          prevSong={handlePrevSong}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          setDuration={setDuration}
        />
      </div>
    </div>
  );
};

export default ResponsiveLayout;