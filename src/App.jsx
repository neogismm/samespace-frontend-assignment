import React, { useContext, useEffect, useState } from "react";
import ResizableFlexbox from "./components/ResizableFlexbox";
import Search from "./components/Search";
import SongList from "./components/SongList";
import AudioPlayer from "./components/AudioPlayer";
import { ThemeContext } from "./context/ThemeContext";
import SpotifyLogo from "./components/icons/SpotifyLogo";

const App = () => {
  const { themeColor } = useContext(ThemeContext);

  const [searchQuery, setSearchQuery] = useState("");
  const [activeSong, setActiveSong] = useState(null);
  const [showTopTracks, setShowTopTracks] = useState(false);
  const [songCover, setSongCover] = useState(null);
  const [filteredSongs, setFilteredSongs] = useState([]);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false); // New state for playing status
  const [bgColor, setBgColor] = useState("bg-white");
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    document.body.style.backgroundColor = themeColor;
  }, [themeColor]);

  const showTopTracksList = (show) => {
    setShowTopTracks(show);
  };

  const handleSetActiveSong = (song) => {
    setActiveSong(song);
    const index = filteredSongs.findIndex((s) => s.id === song.id);
    setCurrentSongIndex(index);
    setIsPlaying(true); // Set isPlaying to true when a new song is selected
  };

  const handleNextSong = () => {
    const nextIndex = (currentSongIndex + 1) % filteredSongs.length;
    setActiveSong(filteredSongs[nextIndex]);
    setCurrentSongIndex(nextIndex);
    setIsPlaying(true); // Set isPlaying to true when the next song is played
  };

  const handlePrevSong = () => {
    const prevIndex =
      (currentSongIndex - 1 + filteredSongs.length) % filteredSongs.length;
    setActiveSong(filteredSongs[prevIndex]);
    setCurrentSongIndex(prevIndex);
    setIsPlaying(true); // Set isPlaying to true when the previous song is played
  };

  const handleBgColorChange = (color) => {
    setBgColor(color);
  };

  let flexboxHeight = "h-screen";

  return (
    // <div className={`bg-gradient-to-l from-[${themeColor}]`}>
    <div className="font-montserrat bg-gradient-to-l from-[#191414]">
      <div></div>
      <ResizableFlexbox flexboxHeight={flexboxHeight}>
        <div
          className={`flex mt-6 ml-6 flex-col justify-between ${flexboxHeight}`}
        >
          <div className="flex">
            <SpotifyLogo />
            <p className="font-bold text-2xl">Spotify</p>
            <p className="text-xs">®</p>
          </div>
          <a href="https://linkedin.com/in/pritamneog">
            <img
              alt="profile_image"
              className="size-10 mb-11 rounded-full"
              src="/profile.png"
            />
          </a>
        </div>
        <div className={`${flexboxHeight} w-full`}>
          <div className="flex mt-6 px-2">
            <button
              className={`flex-1 text-left text-2xl font-bold cursor-pointer ${
                !showTopTracks ? "text-white" : "text-gray-400"
              }`}
              onClick={() => showTopTracksList(false)}
            >
              For You
            </button>
            <button
              className={`flex-1 text-center text-2xl font-bold cursor-pointer ${
                showTopTracks ? "text-white" : "text-gray-400"
              }`}
              onClick={() => showTopTracksList(true)}
            >
              Top Tracks
            </button>
            <span className="flex-1 text-right"></span>
          </div>
          <div className="my-10">
            <Search onSearch={setSearchQuery} />
          </div>
          <SongList
            searchQuery={searchQuery}
            setActiveSong={handleSetActiveSong}
            showTopTracks={showTopTracks}
            setSongCover={setSongCover}
            onSetFilteredSongs={setFilteredSongs}
            duration={duration}
          />
        </div>
        <div
          className={`flex items-center justify-center min-w-[361px] ${flexboxHeight}`}
        >
          
            <AudioPlayer
              song={activeSong}
              nextSong={handleNextSong}
              prevSong={handlePrevSong}
              isPlaying={isPlaying}
              setIsPlaying={setIsPlaying}
              setDuration={setDuration}
            />
          
        </div>
      </ResizableFlexbox>
    </div>
  );
};

export default App;
