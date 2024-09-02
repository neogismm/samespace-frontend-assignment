import React, { useState } from "react";
import ResizableFlexbox from "./components/ResizableFlexbox";
import Search from "./components/Search";
import SongList from "./components/SongList";
import AudioPlayer from "./components/AudioPlayer";

const App = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSong, setActiveSong] = useState(null);
  const [showTopTracks, setShowTopTracks] = useState(false);
  const [songCover, setSongCover] = useState(null);

  const showTopTracksList = (show) => {
    setShowTopTracks(show);
  };

  let flexboxHeight = "h-screen";
  
  return (
    <div className="mt-4">
      <ResizableFlexbox flexboxHeight={flexboxHeight}>
        <div className={`flex border items-center justify-center ${flexboxHeight}`}>
          <p>Logo & Profile</p>
        </div>
        <div className={`${flexboxHeight} w-full`}>
          <div className="flex">
            <span className="flex-1 text-left text-2xl font-bold" onClick={() => showTopTracksList(false)}>For You</span>
            <span className="flex-1 text-center text-2xl font-bold" onClick={() => showTopTracksList(true)}>Top Tracks</span>
            <span className="flex-1 text-right"></span>
          </div>

          <Search onSearch={setSearchQuery} />
          <SongList searchQuery={searchQuery} setActiveSong={setActiveSong} showTopTracks={showTopTracks} setSongCover={setSongCover} />
        </div>
        <div className={`flex border items-center justify-center ${flexboxHeight}`}>
          {activeSong && <AudioPlayer song={activeSong} cover={songCover}/>}
        </div>
      </ResizableFlexbox>
    </div>
  );
};

export default App;