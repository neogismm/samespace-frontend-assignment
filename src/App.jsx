import React, { useContext, useEffect, useState } from "react";
import ResizableFlexbox from "./components/ResizableFlexbox";
import Search from "./components/Search";
import SongList from "./components/SongList";
import AudioPlayer from "./components/AudioPlayer";
import { ThemeContext } from "./context/ThemeContext";

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
    // <div className={`bg-gradient-to-r from-[${themeColor}] to-black`}>
    <div className="bg-gradient-to-l from-[#191414]">
      <div></div>
      <ResizableFlexbox flexboxHeight={flexboxHeight}>
        <div className={`flex items-center justify-center ${flexboxHeight}`}>
          <p>Logo & Profile</p>
        </div>
        <div className={`${flexboxHeight} w-full`}>
          <div className="flex mt-6 px-2">
            <span
              className="flex-1 text-left text-2xl font-bold"
              onClick={() => showTopTracksList(false)}
            >
              For You
            </span>
            <span
              className="flex-1 text-center text-2xl font-bold"
              onClick={() => showTopTracksList(true)}
            >
              Top Tracks
            </span>
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
          {activeSong && (
            <AudioPlayer
              song={activeSong}
              nextSong={handleNextSong}
              prevSong={handlePrevSong}
              isPlaying={isPlaying}
              setIsPlaying={setIsPlaying}
              setDuration={setDuration}
            />
          )}
        </div>
      </ResizableFlexbox>
    </div>
  );
};

export default App;
